import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, PerspectiveCamera } from '@react-three/drei'
import { Villa } from './Villa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Scene() {
  const cameraRef = useRef()

  useEffect(() => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        z: 8,
        y: 8,
        x: -5,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
    }
  }, [])

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[10, 5, 15]} fov={35} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Villa />
      </Float>

      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2.4} 
        far={4.5} 
      />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

