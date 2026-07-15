import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ShapeBlur — React Bits component, adapted for the Dunhuang site.
 *
 * Renders a full-bleed WebGL quad whose fragment shader draws a soft glowing
 * shape that follows the cursor (a "spotlight" effect). The original React Bits
 * source is kept intact; the only site-specific tweaks are:
 *   - gold default `color` so it matches the carousel / home palette,
 *   - `pointerEvents: "none"` by default so it never blocks the cards/links
 *     beneath it (it is purely a hover-reactive visual layer),
 *   - additive blending so the glow *adds* light over the dark backgrounds
 *     instead of painting an opaque patch on top of the imagery.
 *
 * Props mirror the React Bits API:
 *   variation  0..3  shape variant (0 rounded box, 1 circle, 2 polygon, 3 mixed)
 *   pixelRatioProp     override devicePixelRatio (optional)
 *   shapeSize          size of the cursor shape
 *   roundness          corner radius (rounded-box variant)
 *   borderSize         glow thickness around the shape
 *   circleSize         radius of the faint cursor halo
 *   circleEdge         softness of that halo edge
 *   color              glow tint
 */

const vertex = `
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 1.0);
  vUv = uv;
}`;

const fragment = `
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdPolygon(vec2 p, float r, int n) {
  float an = 3.1415927 / float(n);
  vec2 acs = vec2(cos(an), sin(an));
  vec2 a = mod(atan(p.x, p.y) + 3.1415927 / 2.0, 6.2831853 / float(n)) - 3.1415927 / float(n);
  p = length(p) * vec2(cos(a), sin(a));
  p -= acs * r;
  p.y += r * 0.15;
  return max(p.x, p.y);
}

void main() {
  vec2 uv = (vUv - 0.5) * 2.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec2 mouse = (u_mouse - 0.5) * 2.0;
  mouse.x *= u_resolution.x / u_resolution.y;

  float dist = length(uv - mouse);
  float hover = 1.0 - smoothstep(0.0, 0.3, dist);
  float circleHover = 1.0 - smoothstep(0.0, u_circleSize + u_circleEdge, dist);

  vec2 p = uv;
  float d = 0.0;

  #if VAR == 0
    d = sdRoundedBox(p, vec2(u_shapeSize), u_roundness);
    d -= u_borderSize * hover;
  #elif VAR == 1
    d = sdCircle(p, u_shapeSize);
    d -= u_borderSize * hover;
  #elif VAR == 2
    d = sdPolygon(p, u_shapeSize, 6);
    d -= u_borderSize * hover;
  #else
    d = sdRoundedBox(p, vec2(u_shapeSize), u_roundness);
    d = min(d, sdCircle(p, u_shapeSize * 0.5));
    d -= u_borderSize * hover;
  #endif

  float mask = 1.0 - smoothstep(-u_borderSize, u_borderSize, d);
  float circleMask = 1.0 - smoothstep(u_circleSize, u_circleSize + u_circleEdge, length(uv - mouse));

  float alpha = mask * hover + circleMask * (1.0 - hover);
  vec3 color = u_color;

  gl_FragColor = vec4(color, alpha);
}`;

export default function ShapeBlur({
  variation = 0,
  pixelRatioProp,
  shapeSize = 1,
  roundness = 0,
  borderSize = 0.5,
  circleSize = 0.5,
  circleEdge = 0.5,
  color = "#c9a84c",
  className = "",
  style,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(pixelRatioProp || Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_pixelRatio: { value: renderer.getPixelRatio() },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_color: { value: new THREE.Color(color) },
      u_shapeSize: { value: shapeSize },
      u_roundness: { value: roundness },
      u_borderSize: { value: borderSize },
      u_circleSize: { value: circleSize },
      u_circleEdge: { value: circleEdge },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      defines: { VAR: variation },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      uniforms.u_mouse.value.set(x, y);
    };

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationId;
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge, color]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}
