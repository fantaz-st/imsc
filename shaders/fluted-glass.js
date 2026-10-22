export const VERTEX_SHADER = String.raw`
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = String.raw`
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
`;
