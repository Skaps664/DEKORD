"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Center, ContactShadows } from "@react-three/drei"
import { Suspense, useMemo } from "react"
import type { JSX } from "react"
import { Vector3, CatmullRomCurve3 } from "three"
import { Reveal } from "./reveal"

function UsbCable(props: JSX.IntrinsicElements["group"]) {
  const { viewport } = useThree()
  const w = viewport.width
  const h = viewport.height

  const mx = w * 0.08
  const my = h * 0.08

  const leftX = -w / 2 + mx
  const rightX = w / 2 - mx
  const topY = h / 2 - my
  const bottomY = -h / 2 + my

  const points = useMemo(
    () => [
      new Vector3(leftX, topY, 0.0),
      new Vector3(-w * 0.18, bottomY, 0.12),
      new Vector3(0, topY * 0.8, -0.08),
      new Vector3(w * 0.18, bottomY * 0.9, 0.08),
      new Vector3(rightX, topY * 0.96, 0.0),
    ],
    [leftX, rightX, topY, bottomY, w],
  )

  const curve = useMemo(() => new CatmullRomCurve3(points, false, "catmullrom", 0.35), [points])

  const tubeRadius = Math.max(0.06, Math.min(w, h) * 0.025)

  const leftEnd = points[0]
  const rightEnd = points[points.length - 1]

  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 480, tubeRadius, 24, false]} />
        <meshStandardMaterial color={"#0e0e0f"} roughness={0.85} metalness={0.08} />
      </mesh>

      <group position={[leftEnd.x, leftEnd.y, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.26, 0.3]} />
          <meshStandardMaterial color={"#1a1a1b"} roughness={0.6} metalness={0.3} />
        </mesh>
        <mesh position={[0.26, 0, 0]}>
          <boxGeometry args={[0.16, 0.18, 0.22]} />
          <meshStandardMaterial color={"#8a8a8a"} roughness={0.35} metalness={0.9} />
        </mesh>
      </group>

      <group position={[rightEnd.x, rightEnd.y, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.22, 0.22]} />
          <meshStandardMaterial color={"#1a1a1b"} roughness={0.6} metalness={0.3} />
        </mesh>
        <mesh position={[-0.19, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.18]} />
          <meshStandardMaterial color={"#8a8a8a"} roughness={0.35} metalness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

export function ThreeProductPreview() {
  return (
    <section aria-labelledby="three-preview-title" className="w-full bg-background">
      <div className="container-custom py-12 sm:py-16 md:py-24 px-2 sm:px-2 md:px-3">
        <Reveal>
          <header className="mb-3 sm:mb-4">
            <h2
              id="three-preview-title"
              className="text-balance text-2xl sm:text-3xl md:text-4xl font-bold leading-none tracking-tight text-foreground"
            >
              Product preview
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-foreground/70">
              Drag to rotate • Scroll to zoom (when hovering) • Pinch on touch
            </p>
          </header>
        </Reveal>

        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <Canvas
            className="h-[50vh] sm:h-[60vh] md:h-[72vh] lg:h-[84vh] min-h-[400px] sm:min-h-[480px] md:min-h-[560px]"
            style={{ touchAction: "pan-y" }}
            camera={{ position: [0, 0, 5], fov: 32 }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 9, 6]} intensity={1.05} castShadow />
            <directionalLight position={[-4, 2, -6]} intensity={0.45} />

            <Suspense fallback={null}>
              <Center disableZ>
                <UsbCable />
              </Center>
              <Environment preset="studio" />
            </Suspense>

            <ContactShadows position={[0, -0.48 * 1, 0]} opacity={0.18} blur={2.8} far={30} scale={60} />

            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom
              zoomSpeed={0.9}
              enableRotate
              autoRotate
              autoRotateSpeed={0.5}
              rotateSpeed={0.7}
              minDistance={2.0}
              maxDistance={12}
              minPolarAngle={Math.PI * 0.18}
              maxPolarAngle={Math.PI * 0.82}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
