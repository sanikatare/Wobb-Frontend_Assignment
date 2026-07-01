import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Node extends Point3D {
  lat: number;
  lon: number;
}

interface Arc {
  a: number; // node index
  b: number; // node index
  progress: number;
  speed: number;
  delay: number;
}

interface OrbitBadge {
  label: string;
  color: string;
  angle: number;
  speed: number;
  tilt: number;
  radius: number;
}

const BADGES: OrbitBadge[] = [
  { label: "IG", color: "#E1306C", angle: 0.2, speed: 0.18, tilt: 0.15, radius: 1.55 },
  { label: "YT", color: "#FF0033", angle: 1.6, speed: -0.14, tilt: -0.35, radius: 1.7 },
  { label: "TT", color: "#60a5fa", angle: 3.0, speed: 0.21, tilt: 0.5, radius: 1.5 },
  { label: "TW", color: "#9146FF", angle: 4.2, speed: -0.17, tilt: -0.1, radius: 1.65 },
  { label: "X", color: "#E2E8F0", angle: 5.1, speed: 0.15, tilt: 0.32, radius: 1.6 },
  { label: "in", color: "#0A66C2", angle: 2.3, speed: -0.2, tilt: -0.45, radius: 1.55 },
];

function project(p: Point3D, cx: number, cy: number, scale: number, fov: number) {
  const factor = fov / (fov + p.z);
  return {
    x: cx + p.x * factor * scale,
    y: cy + p.y * factor * scale,
    scale: factor,
  };
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const NODE_COUNT = 90;
    const nodes: Node[] = [];
    // Fibonacci sphere distribution for an even "world" point cloud
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      nodes.push({ x, y, z, lat: 0, lon: 0 });
    }

    const arcs: Arc[] = [];
    for (let i = 0; i < 9; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = Math.floor(Math.random() * NODE_COUNT);
      while (b === a) b = Math.floor(Math.random() * NODE_COUNT);
      arcs.push({ a, b, progress: Math.random(), speed: 0.004 + Math.random() * 0.006, delay: Math.random() * 200 });
    }

    let baseRotation = 0;
    let frame = 0;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : canvas.clientWidth;
      height = parent ? parent.clientHeight : canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTarget.current = { x: nx, y: ny };
    }

    function draw() {
      frame++;
      baseRotation += 0.0022;

      // Friction-based parallax easing toward the pointer target
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.04;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.04;

      const cx = width / 2;
      const cy = height / 2;
      const sphereScale = Math.min(width, height) * 0.36;
      const fov = 4;

      ctx.clearRect(0, 0, width, height);

      const rotY = baseRotation + mouseCurrent.current.x * 0.9;
      const rotX = -0.25 + mouseCurrent.current.y * 0.5;

      // Outer glow ring
      const glow = ctx.createRadialGradient(cx, cy, sphereScale * 0.2, cx, cy, sphereScale * 1.35);
      glow.addColorStop(0, "rgba(29,78,216,0.15)");
      glow.addColorStop(0.6, "rgba(59,130,246,0.07)");
      glow.addColorStop(1, "rgba(5, 8, 22, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereScale * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Project all nodes once per frame
      const projected = nodes.map((n) => {
        let p: Point3D = { x: n.x, y: n.y, z: n.z };
        p = rotateY(p, rotY);
        p = rotateX(p, rotX);
        const proj = project(p, cx, cy, sphereScale, fov);
        return { ...proj, z: p.z };
      });

      // Sphere wireframe latitude/longitude rings (subtle)
      ctx.strokeStyle = "rgba(59,130,246,0.10)";
      ctx.lineWidth = 1;
      for (let ring = -2; ring <= 2; ring++) {
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= 64; a++) {
          const t = (a / 64) * Math.PI * 2;
          const latY = ring * 0.35;
          const r = Math.sqrt(Math.max(0, 1 - latY * latY));
          let p: Point3D = { x: Math.cos(t) * r, y: latY, z: Math.sin(t) * r };
          p = rotateY(p, rotY);
          p = rotateX(p, rotX);
          if (p.z < -0.15) {
            started = false;
            continue;
          }
          const proj = project(p, cx, cy, sphereScale, fov);
          if (!started) {
            ctx.moveTo(proj.x, proj.y);
            started = true;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      // Connection arcs with traveling light pulses
      arcs.forEach((arc) => {
        if (frame < arc.delay) return;
        const nodeA = nodes[arc.a];
        const nodeB = nodes[arc.b];

        const transform = (p: Point3D) => rotateX(rotateY(p, rotY), rotX);
        const pa = transform(nodeA);
        const pb = transform(nodeB);

        // Lift the midpoint outward from the sphere for a great-circle arc look
        const mid: Point3D = {
          x: (pa.x + pb.x) / 2,
          y: (pa.y + pb.y) / 2,
          z: (pa.z + pb.z) / 2,
        };
        const len = Math.sqrt(mid.x ** 2 + mid.y ** 2 + mid.z ** 2) || 1;
        const lift = 1.35;
        const ctrl: Point3D = { x: (mid.x / len) * lift, y: (mid.y / len) * lift, z: (mid.z / len) * lift };

        const A = project(pa, cx, cy, sphereScale, fov);
        const B = project(pb, cx, cy, sphereScale, fov);
        const C = project(ctrl, cx, cy, sphereScale, fov);

        const visible = pa.z > -0.6 || pb.z > -0.6;
        if (!visible) return;

        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(C.x, C.y, B.x, B.y);
        const gradient = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
        gradient.addColorStop(0, "rgba(59,130,246,0.06)");
        gradient.addColorStop(0.5, "rgba(96,165,250,0.50)");
        gradient.addColorStop(1, "rgba(59,130,246,0.06)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Traveling pulse along the quadratic curve
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const t = arc.progress;
        const omt = 1 - t;
        const px = omt * omt * A.x + 2 * omt * t * C.x + t * t * B.x;
        const py = omt * omt * A.y + 2 * omt * t * C.y + t * t * B.y;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#60a5fa";
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Particle nodes, back-to-front for correct depth ordering
      const order = projected
        .map((p, idx) => ({ p, idx }))
        .sort((a, b) => a.p.z - b.p.z);

      order.forEach(({ p }) => {
        const depth = (p.z + 1) / 2; // 0 (back) .. 1 (front)
        const radius = 0.9 + depth * 1.8;
        const alpha = 0.15 + depth * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,182,255, ${alpha})`;
        ctx.fill();
      });

      // Orbiting platform badges in 3D space, scaling/fading behind the globe
      BADGES.forEach((badge) => {
        badge.angle += badge.speed * 0.016;
        let p: Point3D = {
          x: Math.cos(badge.angle) * badge.radius,
          y: Math.sin(badge.angle) * badge.radius * Math.sin(badge.tilt + Math.PI / 2),
          z: Math.sin(badge.angle) * badge.radius * Math.cos(badge.tilt + Math.PI / 2),
        };
        p = rotateY(p, rotY * 0.6);
        p = rotateX(p, rotX * 0.6);
        const proj = project(p, cx, cy, sphereScale, fov);
        const depth = (p.z + badge.radius) / (badge.radius * 2);
        const behind = p.z < -0.2;
        const scale = 0.55 + depth * 0.75;
        const alpha = behind ? 0.25 + depth * 0.3 : 0.85 + depth * 0.15;

        ctx.save();
        ctx.globalAlpha = Math.min(1, alpha);
        const r = 15 * scale;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = badge.color;
        ctx.stroke();
        ctx.fillStyle = badge.color;
        ctx.font = `600 ${10 * scale}px "Inter", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badge.label, proj.x, proj.y + 0.5);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Interactive 3D globe visualizing the creator network"
      role="img"
    />
  );
}
