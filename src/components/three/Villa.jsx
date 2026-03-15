import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, useHelper } from '@react-three/drei'
import * as THREE from 'three'

export function Villa() {
  const group = useRef()

  // Slow rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 8) * 0.1
  })

  return (
    <group ref={group}>
      {/* Base Floor - Reflector */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={60}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#f0f0f0"
          metalness={0.1}
        />
      </mesh>

      {/* Modern Villa Structure */}
      {/* Main Ground Volume */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 2, 8]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          roughness={0.1} 
          metalness={0.05} 
          reflectivity={0.5} 
        />
      </mesh>

      {/* Floating First Floor */}
      <mesh position={[1.5, 2, -1]}>
        <boxGeometry args={[5, 1.8, 6]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Large Glass Facade */}
      <mesh position={[-2.95, 0.5, 1]}>
        <boxGeometry args={[0.1, 3, 5]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.2} 
          transmission={0.95}
          thickness={0.5}
          roughness={0} 
          metalness={0.9} 
          ior={1.5}
        />
      </mesh>

      {/* Accent Wall - Navy Blue */}
      <mesh position={[3.01, 0, -1]}>
        <boxGeometry args={[0.1, 4, 3]} />
        <meshStandardMaterial color="#001F3F" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Roof Overhang */}
      <mesh position={[-0.5, 2.9, -0.5]}>
        <boxGeometry args={[8, 0.1, 8.5]} />
        <meshStandardMaterial color="#1D1D1F" />
      </mesh>

      {/* Decorative Columns - Metallic */}
      {[ -2.5, -1, 0.5 ].map((z, i) => (
        <mesh key={i} position={[-2.5, 0, z]}>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Interior light glow */}
      <pointLight position={[0, 1, 0]} intensity={2} color="#ffaa00" distance={5} />
    </group>
  )
}

