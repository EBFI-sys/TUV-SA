"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import points from "@/data/globe-points.json";
import { locations } from "@/lib/content";

const DEG = Math.PI / 180;
// shader colours are written raw, so keep hex values in display space
const raw = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);
const HQ = locations[0];

function toVec(lat: number, lon: number, r = 1) {
  const la = lat * DEG;
  const lo = lon * DEG;
  return new THREE.Vector3(r * Math.cos(la) * Math.cos(lo), r * Math.sin(la), -r * Math.cos(la) * Math.sin(lo));
}

const dotVert = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vFacing;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    vFacing = n.z;
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio * (2.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vFacing;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, d);
    float fade = smoothstep(-0.15, 0.45, vFacing);
    gl_FragColor = vec4(vColor, edge * mix(0.10, 1.0, fade));
  }
`;
const arcVert = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() { vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const arcFrag = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColor;
  varying float vT;
  void main() {
    float head = fract(uTime * 0.16 + uOffset);
    float dist = head - vT;
    float trail = dist >= 0.0 ? exp(-dist * 9.0) * step(dist, 0.45) : 0.0;
    float base = 0.16;
    float a = base + trail * 0.95;
    gl_FragColor = vec4(mix(uColor, vec3(1.0), trail * 0.5), a);
  }
`;
const atmoVert = /* glsl */ `
  varying vec3 vN;
  void main() { vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const atmoFrag = /* glsl */ `
  varying vec3 vN;
  uniform vec3 uColor;
  void main() {
    float i = pow(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.0) * 0.75;
    gl_FragColor = vec4(uColor, 1.0) * i;
  }
`;

export default function Globe({ className = "", focus }: { className?: string; focus?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<number | undefined>(focus);
  const aimRef = useRef(focus !== undefined);

  useEffect(() => {
    focusRef.current = focus;
    aimRef.current = focus !== undefined;
  }, [focus]);

  useEffect(() => {
    const el = wrap.current;
    const labelsEl = labelsRef.current;
    if (!el || !labelsEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the static caption list beside the globe still carries the content
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    // facing: centre between Europe and India
    const lon0 = 58;
    const lat0 = 28;
    tilt.rotation.x = lat0 * DEG * 0.75;
    let theta = (-90 - lon0) * DEG;
    spin.rotation.y = theta;

    // core sphere (occludes the far side softly)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.995, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0a2547, transparent: true, opacity: 0.92 })
    );
    spin.add(core);

    // atmosphere rim
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: atmoVert,
        fragmentShader: atmoFrag,
        uniforms: { uColor: { value: raw(0x2f6fc8) } },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    tilt.add(atmo);

    // land dots
    const data = points as number[];
    const n = data.length / 3;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const cBase = raw(0x3f6aa3);
    const cHi = raw(0x9cc7ff);
    const cIn = raw(0xffffff);
    for (let i = 0; i < n; i++) {
      const lon = data[i * 3] / 10;
      const lat = data[i * 3 + 1] / 10;
      const h = data[i * 3 + 2];
      const v = toVec(lat, lon, 1.002);
      pos.set([v.x, v.y, v.z], i * 3);
      const c = h === 2 ? cIn : h === 1 ? cHi : cBase;
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = h === 2 ? 5.2 : h === 1 ? 4.4 : 3.6;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dotGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    dotGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: dotVert,
      fragmentShader: dotFrag,
      uniforms: { uPixelRatio: { value: dpr } },
      transparent: true,
      depthWrite: false,
    });
    spin.add(new THREE.Points(dotGeo, dotMat));

    // arcs from HQ
    const a = toVec(HQ.lat, HQ.lon);
    const arcMats: THREE.ShaderMaterial[] = [];
    locations.slice(1).forEach((loc, i) => {
      const b = toVec(loc.lat, loc.lon);
      const ang = a.angleTo(b);
      const lift = 0.06 + 0.32 * (ang / Math.PI);
      const segs = 96;
      const p = new Float32Array((segs + 1) * 3);
      const t = new Float32Array(segs + 1);
      for (let s = 0; s <= segs; s++) {
        const k = s / segs;
        const v = a.clone().lerp(b, k).normalize().multiplyScalar(1 + lift * Math.sin(Math.PI * k));
        // slerp-ish via normalise works for < 180°
        p.set([v.x, v.y, v.z], s * 3);
        t[s] = k;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      g.setAttribute("aT", new THREE.BufferAttribute(t, 1));
      const m = new THREE.ShaderMaterial({
        vertexShader: arcVert,
        fragmentShader: arcFrag,
        uniforms: { uTime: { value: 0 }, uOffset: { value: i * 0.21 }, uColor: { value: raw(0x8fbfff) } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      arcMats.push(m);
      spin.add(new THREE.Line(g, m));
    });

    // markers
    const markers: { obj: THREE.Object3D; label: HTMLElement }[] = [];
    const ringGeo = new THREE.RingGeometry(0.018, 0.026, 40);
    const dotGeoM = new THREE.CircleGeometry(0.011, 24);
    const pulseRings: THREE.Mesh[] = [];
    locations.forEach((loc, i) => {
      const g = new THREE.Group();
      const v = toVec(loc.lat, loc.lon, 1.004);
      g.position.copy(v);
      g.lookAt(v.clone().multiplyScalar(2));
      const color = loc.kind === "hq" ? 0xff2a3d : 0xffffff;
      g.add(new THREE.Mesh(dotGeoM, new THREE.MeshBasicMaterial({ color, transparent: true, depthWrite: false })));
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false })
      );
      g.add(ring);
      if (loc.kind === "hq") pulseRings.push(ring);
      spin.add(g);
      const label = labelsEl.children[i] as HTMLElement;
      if (label) markers.push({ obj: g, label });
    });

    // sizing
    let w = 1;
    let h = 1;
    const resize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // drag to rotate
    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      aimRef.current = false;
      lastX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx * 0.005;
      theta += velocity;
    };
    const onUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointercancel", onUp);

    // render loop, paused off-screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(el);

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      const f = focusRef.current;
      if (!dragging && aimRef.current && f !== undefined && locations[f]) {
        let target = (-90 - locations[f].lon) * DEG;
        while (target - theta > Math.PI) target -= Math.PI * 2;
        while (target - theta < -Math.PI) target += Math.PI * 2;
        theta += (target - theta) * (reduce ? 1 : 0.06);
        tilt.rotation.x += (locations[f].lat * DEG * 0.8 - tilt.rotation.x) * (reduce ? 1 : 0.06);
        velocity = 0;
      } else if (!dragging) {
        velocity *= 0.94;
        theta += velocity + (reduce ? 0 : dt * 0.045);
      }
      spin.rotation.y = theta;
      arcMats.forEach((m) => (m.uniforms.uTime.value = reduce ? 1.2 : time));
      pulseRings.forEach((r) => {
        const k = reduce ? 0 : (time * 0.8) % 1;
        r.scale.setScalar(1 + k * 2.2);
        (r.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - k);
      });
      renderer.render(scene, camera);

      camera.getWorldDirection(camDir);
      markers.forEach(({ obj, label }) => {
        obj.getWorldPosition(tmp);
        const facing = tmp.clone().normalize().dot(camDir.clone().negate());
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w;
        const y = (-tmp.y * 0.5 + 0.5) * h;
        label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        label.style.opacity = facing > 0.25 ? "1" : facing > 0.05 ? String((facing - 0.05) * 5) : "0";
      });
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointercancel", onUp);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={wrap} className="absolute inset-0" aria-hidden />
      <div ref={labelsRef} className="pointer-events-none absolute inset-0" aria-hidden>
        {locations.map((l) => (
          <div key={l.name} className="absolute left-0 top-0 opacity-0 will-change-transform" style={{ transition: "opacity .3s" }}>
            <div className="ml-4 -mt-2 whitespace-nowrap">
              <span className={`code !text-[0.6875rem] ${l.kind === "hq" ? "text-white" : "text-sky"}`}>{l.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
