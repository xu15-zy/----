"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Center,
} from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";

function Model({ url, accent }: { url: string; accent: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  // 首次加载时：统一提升亮度、加一点点自发光，避免原材质过黑
  useEffect(() => {
    if (!ref.current) return;
    ref.current.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
        if (mat.color) {
          const c = mat.color.getHex();
          // 若材质接近纯黑，把它提亮为浅暖灰，避免整个模型一团黑
          const r = (c >> 16) & 0xff;
          const g = (c >> 8) & 0xff;
          const b = c & 0xff;
          if (r < 30 && g < 30 && b < 30) {
            mat.color.set("#c9b99a");
          }
        }
        if ("emissive" in mat && mat.emissive) {
          mat.emissive.set(accent);
          mat.emissiveIntensity = 0.08;
        }
      }
    });
  }, [accent]);

  return (
    <Center>
      <primitive object={scene} ref={ref} />
    </Center>
  );
}

export default function ModelViewer({
  src,
  accent = "#9c5b3b",
}: {
  src?: string;
  accent?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [auto, setAuto] = useState(true);
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!src) {
      setExists(false);
      return;
    }
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => alive && setExists(r.ok))
      .catch(() => alive && setExists(false));
    return () => {
      alive = false;
    };
  }, [src]);

  if (!mounted || exists === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-mibai-deep/40 text-sm text-mo/50">
        加载三维视图…
      </div>
    );
  }

  if (!src || !exists) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-mibai-deep/40 text-center">
        <div
          className="h-16 w-16 animate-slow-spin rounded-full border-2 border-dashed"
          style={{ borderColor: accent }}
        />
        <p className="text-sm text-mo/60">3D 模型占位（待补充 .glb）</p>
        <p className="max-w-xs text-xs text-mo/40">
          将对应 .glb 放入 <code className="rounded bg-mo/10 px-1">public/models/</code>{" "}
          即可自动载入可旋转模型。
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 38 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 环境光照：让 PBR 材质有反射，不再死黑 */}
        <Environment preset="sunset" background={false} />

        {/* 多光源补光 */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 3]} intensity={1.6} castShadow />
        <directionalLight position={[-3, 2, 4]} intensity={0.8} />
        <pointLight position={[0, 2, 0]} intensity={0.6} color={accent} />

        <Suspense fallback={null}>
          <Model url={src} accent={accent} />
        </Suspense>

        <OrbitControls
          autoRotate={auto}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
        />
      </Canvas>
      <button
        onClick={() => setAuto((v) => !v)}
        className="btn-dh-ghost absolute bottom-3 right-3 !px-4 !py-1.5 !text-xs"
      >
        {auto ? "暂停旋转" : "自动旋转"}
      </button>
      <p className="absolute left-3 top-3 text-xs text-mo/40">
        拖拽旋转 · 滚轮缩放
      </p>
    </div>
  );
}
