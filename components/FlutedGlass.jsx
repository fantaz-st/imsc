"use client";

/**
 * FlutedGlass — WebGL fluted / fractal glass background. No dependencies.
 * The canvas fills its parent, so give the parent a size.
 *
 *   <section style={{ position: 'relative', height: '100svh' }}>
 *     <FlutedGlass className="absolute inset-0" />
 *     ...content
 *   </section>
 *
 * Props (all optional, defaults tuned to the reference look):
 *   scene       'bands' | 'lighthouse'   scene behind the glass (ignored when src is set)
 *   src         string                   image behind the glass
 *   colors      [main, secondary, hot]   hex colours for the 'bands' scene
 *   background  hex                      background for the 'bands' scene
 *   spread      0.3–1                    how far the bands reach from the centre
 *   flutes      number                   ribs across the width
 *   angle       degrees                  0 = vertical, positive = "\" diagonal
 *   refraction  number                   lens strength
 *   fluid       0–1.5                    liquid wobble inside the ribs
 *   aberration  0–0.6                    colour fringing
 *   edges       0–2                      rib edge brightness
 *   shadow      0–1                      darkness of the gaps between ribs
 *   highlight   0–1.5                    specular highlight
 *   light       0–1                      highlight position across the rib
 *   vary        0–1                      rib width variation
 *   contrast    number                   1 = neutral, higher = deeper blacks
 *   roughness   0–4                      frosted blur (0 is fastest)
 *   grain       0–0.2                    film grain
 *   pattern     'lines' | 'waves' | 'zigzag'
 *   waveAmp, waveFreq                    for waves / zigzag
 *   mouse       number                   extra refraction under the pointer, 0 disables
 *   speed       number                   animation speed
 *   className, style
 */
import { useEffect, useRef } from "react";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "../shaders/fluted-glass.js";

const PATTERN = { lines: 0, waves: 1, zigzag: 2 };
const DEFAULTS = {
  scene: "bands",
  colors: ["#2B4DFF", "#2E7BFF", "#DCEBFF"],
  background: "#000208",
  spread: 0.75,
  flutes: 22,
  angle: 40,
  refraction: 0.95,
  fluid: 0.8,
  aberration: 0.22,
  edges: 1,
  shadow: 0.85,
  highlight: 0.6,
  light: 0.7,
  roughness: 0,
  vary: 1,
  contrast: 1.35,
  grain: 0.07,
  pattern: "lines",
  waveAmp: 0.04,
  waveFreq: 6,
  mouse: 0.8,
  speed: 1
};
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  const n = parseInt(v, 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}
function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error("FlutedGlass shader error: " + log);
  }
  return sh;
}
function FlutedGlass(props) {
  const canvasRef = useRef(null);
  const propsRef = useRef(props);
  propsRef.current = props;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const names = [
      "uRes",
      "uTime",
      "uMouse",
      "uMouseAmt",
      "uScene",
      "uC1",
      "uC2",
      "uC3",
      "uBg",
      "uSpread",
      "uFlutes",
      "uAngle",
      "uRefract",
      "uFluid",
      "uAberr",
      "uEdges",
      "uShadow",
      "uHighlight",
      "uLight",
      "uRough",
      "uGrain",
      "uPattern",
      "uWaveAmp",
      "uWaveFreq",
      "uVary",
      "uContrast",
      "uTexAspect",
      "uTex"
    ];
    const u = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)]));
    let hasTex = false;
    let texAspect = 1;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(u.uTex, 0);
    if (propsRef.current.src) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        hasTex = true;
        texAspect = img.naturalWidth / img.naturalHeight;
        draw(lastT);
      };
      img.src = propsRef.current.src;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(lastT);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const target = { x: 0.5, y: 0.5, on: 0 };
    const mouse = { x: 0.5, y: 0.5, on: 0 };
    const host = canvas.parentElement ?? canvas;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      target.on = 1;
    };
    const onLeave = () => target.on = 0;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    let lastT = 0;
    function draw(t) {
      const p = { ...DEFAULTS, ...propsRef.current };
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
      mouse.on += (target.on - mouse.on) * 0.06;
      const [c1, c2, c3] = p.colors.map(hexToRgb);
      const bg = hexToRgb(p.background);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, t);
      gl.uniform2f(u.uMouse, mouse.x, mouse.y);
      gl.uniform1f(u.uMouseAmt, reduced ? 0 : p.mouse * mouse.on);
      gl.uniform1f(u.uScene, hasTex ? 2 : p.scene === "lighthouse" ? 1 : 0);
      gl.uniform3f(u.uC1, ...c1);
      gl.uniform3f(u.uC2, ...c2);
      gl.uniform3f(u.uC3, ...c3);
      gl.uniform3f(u.uBg, ...bg);
      gl.uniform1f(u.uSpread, p.spread);
      gl.uniform1f(u.uFlutes, p.flutes);
      gl.uniform1f(u.uAngle, p.angle * Math.PI / 180);
      gl.uniform1f(u.uRefract, p.refraction);
      gl.uniform1f(u.uFluid, p.fluid);
      gl.uniform1f(u.uAberr, p.aberration);
      gl.uniform1f(u.uEdges, p.edges);
      gl.uniform1f(u.uShadow, p.shadow);
      gl.uniform1f(u.uHighlight, p.highlight);
      gl.uniform1f(u.uLight, p.light);
      gl.uniform1f(u.uRough, p.roughness);
      gl.uniform1f(u.uGrain, p.grain);
      gl.uniform1f(u.uPattern, PATTERN[p.pattern]);
      gl.uniform1f(u.uWaveAmp, p.waveAmp);
      gl.uniform1f(u.uWaveFreq, p.waveFreq);
      gl.uniform1f(u.uVary, p.vary);
      gl.uniform1f(u.uContrast, p.contrast);
      gl.uniform1f(u.uTexAspect, texAspect);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    let raf = 0;
    let start = performance.now();
    const loop = (now) => {
      const speed = propsRef.current.speed ?? DEFAULTS.speed;
      lastT = (now - start) / 1e3 * speed + 20;
      draw(lastT);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reduced) {
        start = performance.now() - (lastT - 20) * 1e3 / (propsRef.current.speed || 1);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    lastT = 20;
    resize();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [props.src]);
  return <canvas
    ref={canvasRef}
    aria-hidden="true"
    className={props.className}
    style={{ display: "block", width: "100%", height: "100%", background: props.background ?? DEFAULTS.background, ...props.style }}
  />;
}
export {
  FlutedGlass as default
};
