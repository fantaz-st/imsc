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
const VERT = (
  /* glsl */
  `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`
);
const FRAG = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uMouseAmt;
uniform float uScene;      // 0 bands, 1 lighthouse, 2 texture
uniform vec3  uC1;
uniform vec3  uC2;
uniform vec3  uC3;
uniform vec3  uBg;
uniform float uSpread;
uniform float uFlutes;
uniform float uAngle;
uniform float uRefract;
uniform float uFluid;
uniform float uAberr;
uniform float uEdges;
uniform float uShadow;
uniform float uHighlight;
uniform float uLight;
uniform float uRough;
uniform float uGrain;
uniform float uPattern;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uVary;
uniform float uContrast;
uniform float uTexAspect;
uniform sampler2D uTex;

const float PI = 3.14159265;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}

vec2 rot(vec2 p) { float c = cos(uAngle), s = sin(uAngle); return vec2(c * p.x + s * p.y, -s * p.x + c * p.y); }

// Soft colour bands parallel to the ribs, centred, liquid.
vec3 bandsScene(vec2 P) {
  float t = uTime * 0.25;
  vec2 Q = rot(P);
  vec2 warp = vec2(fbm(Q * 1.6 + vec2(0.0, t)), fbm(Q * 1.6 + vec2(5.2, -t))) - 0.5;
  float u = Q.x + warp.x * 0.3;
  float v = Q.y + warp.y * 0.3;

  float b1 = exp(-pow((u + 0.30 + 0.05 * sin(t * 1.3)) / 0.10, 2.0));
  float b2 = exp(-pow((u - 0.02 + 0.06 * sin(t * 0.9 + 1.7)) / 0.13, 2.0));
  float b3 = exp(-pow((u - 0.33 + 0.05 * sin(t * 1.1 + 3.1)) / 0.09, 2.0));

  float blob = fbm(vec2(u * 4.5, v * 3.2) + vec2(t * 0.7, -t * 0.5));
  float mask = smoothstep(uSpread, uSpread * 0.15, length(P * vec2(0.72, 1.0)));

  float k = smoothstep(0.25, 0.75, blob);
  vec3 col = uC1 * b1 * (0.15 + k * 1.5)
           + uC2 * b2 * (0.12 + k * 1.4)
           + uC1 * b3 * (0.15 + k * 1.5);
  float hot = pow(max(blob - 0.56, 0.0) * 3.2, 2.0) * (b1 + b2 + b3);
  col += uC3 * hot * 3.0;
  return uBg + col * mask;
}

vec3 lighthouseScene(vec2 uv) {
  float asp = uRes.x / uRes.y;
  vec3 navyDeep = vec3(0.000, 0.129, 0.290);
  vec3 navy     = vec3(0.000, 0.255, 0.522);
  vec3 cyan     = vec3(0.000, 0.682, 0.937);
  vec3 pale     = vec3(0.725, 0.898, 0.984);
  vec3 col = mix(navy, navyDeep * 0.55, smoothstep(0.2, 0.95, uv.y));
  col = mix(mix(cyan, vec3(0.0, 0.443, 0.761), 0.35), col, smoothstep(0.0, 0.42, uv.y));
  vec2 p = vec2(uv.x * asp, uv.y);
  vec2 d = p - vec2(0.64 * asp, 0.70);
  float r = length(d);
  float a = atan(d.y, d.x);
  float da = abs(mod(a - (3.42 + 0.16 * sin(uTime * 0.35)) + PI, 2.0 * PI) - PI);
  col += pale * smoothstep(0.24, 0.0, da) * smoothstep(0.0, 0.06, r) * exp(-r * 0.5);
  col += vec3(1.0) * smoothstep(0.045, 0.0, da) * smoothstep(0.0, 0.04, r) * 0.65 * exp(-r * 0.8);
  col += cyan * 0.55 * exp(-r * 7.0) + pale * 0.6 * exp(-r * 18.0) + vec3(1.0) * exp(-r * 55.0);
  float sx = uv.x + 0.04 * sin(uTime * 0.21);
  col += pale * 0.55 * exp(-pow((sx - 0.36) / 0.17, 2.0)) * exp(-uv.y * 11.0);
  col += cyan * 0.70 * exp(-pow((sx - 0.64) / 0.24, 2.0)) * exp(-uv.y * 8.0);
  return col;
}

vec3 scene(vec2 uv) {
  float asp = uRes.x / uRes.y;
  if (uScene > 1.5) {
    vec2 t = uv;
    if (asp > uTexAspect) t.y = (uv.y - 0.5) * uTexAspect / asp + 0.5;
    else                  t.x = (uv.x - 0.5) * asp / uTexAspect + 0.5;
    return texture2D(uTex, clamp(vec2(t.x, 1.0 - t.y), 0.0, 1.0)).rgb;
  }
  if (uScene > 0.5) return lighthouseScene(uv);
  return bandsScene(vec2((uv.x - 0.5) * asp, uv.y - 0.5));
}

vec3 sampleRGB(vec2 uv, vec2 off) {
  return vec3(
    scene(uv + off * (1.0 + uAberr)).r,
    scene(uv + off).g,
    scene(uv + off * (1.0 - uAberr)).b
  );
}

void main() {
  vec2 uv = vUv;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * asp, uv.y - 0.5);
  float c = cos(uAngle), s = sin(uAngle);
  vec2 q = rot(p);                       // q.x across ribs, q.y along

  // Uneven rib widths (clusters of thin ribs next to wide ones)
  float x = q.x + uVary * (0.11 * sin(q.x * 2.1 + 0.7) + 0.04 * sin(q.x * 5.3 + 2.0));
  if (uPattern > 0.5 && uPattern < 1.5) x += sin(q.y * uWaveFreq + uTime * 0.3) * uWaveAmp;
  else if (uPattern > 1.5) x += (abs(fract(q.y * uWaveFreq * 0.159) - 0.5) * 2.0 - 0.5) * uWaveAmp * 2.0;

  float w = asp / uFlutes;
  float ribId = floor(x / w);
  float f = fract(x / w);
  float n = f * 2.0 - 1.0;
  float h = sqrt(max(1.0 - n * n, 0.0));
  float slope = n / max(h, 0.22);

  // Liquid wobble: each rib refracts through a slowly moving noise field
  float t = uTime * 0.18;
  float fl1 = fbm(vec2(q.y * 4.2 + ribId * 1.7, t * 1.4 + ribId * 0.31)) - 0.5;
  float fl2 = fbm(vec2(q.y * 3.1 - t, ribId * 0.9 + 4.0)) - 0.5;

  vec2 m = vec2((uMouse.x - 0.5) * asp, uMouse.y - 0.5);
  float bulge = uMouseAmt * smoothstep(0.38, 0.0, length(p - m));

  float across = -slope * w * (uRefract + bulge) + fl1 * uFluid * 0.38 * (0.45 + abs(n));
  float along = fl2 * uFluid * 0.28;
  vec2 dirX = vec2(c, s), dirY = vec2(-s, c);
  vec2 offP = dirX * across + dirY * along;
  vec2 off = vec2(offP.x / asp, offP.y);

  vec3 col;
  if (uRough < 0.01) {
    col = sampleRGB(uv, off);
  } else {
    vec2 st = vec2(dirY.x / asp, dirY.y) * uRough * 0.008;
    col = (sampleRGB(uv - st, off) * 0.75 + sampleRGB(uv, off) + sampleRGB(uv + st, off) * 0.75) / 2.5;
  }

  // Rib edges, gaps and highlight
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float centre = smoothstep(uSpread * 1.1, 0.0, length(p * vec2(0.72, 1.0)));
  float gap = smoothstep(0.0, 0.05, f) * smoothstep(1.0, 0.95, f);
  col *= mix(1.0 - uShadow, 1.0, gap);
  col *= 1.0 - pow(1.0 - h, 3.0) * uShadow * 0.6;

  float e1 = exp(-pow((f - 0.075) / 0.018, 2.0));
  float e2 = exp(-pow((f - 0.935) / 0.014, 2.0));
  vec3 edgeCol = mix(uC1 * 1.2, uC3, clamp(lum * 1.6, 0.0, 1.0));
  col += edgeCol * (e1 * 0.9 + e2 * 0.6) * uEdges * (0.06 + lum * 1.6 + centre * 0.3);

  float spec = pow(max(0.0, 1.0 - abs(f - uLight) * 6.0), 3.0) * uHighlight;
  col += uC3 * spec * (0.05 + lum) * 0.6;

  col = pow(max(col, 0.0), vec3(uContrast)) * (1.0 + (uContrast - 1.0) * 1.4);
  col += (hash(uv * uRes + fract(uTime * 0.37) * 113.0) - 0.5) * uGrain;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`
);
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
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
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
