import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Procedural 3D Neural Core with glowing synaptic nodes & orbital rings
const NeuralCore: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const innerNucleusRef = useRef<THREE.Mesh>(null);

  // Synaptic Nodes positions and instancing
  const nodeCount = 52;
  const { nodePositions, lineGeometry } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.0 + (i % 3) * 0.35;
      const theta = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.25;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }

    // Connect close nodes with synaptic filament lines
    const lineIndices: number[] = [];
    const maxDistSq = 2.2 * 2.2;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceToSquared(positions[j]) < maxDistSq) {
          lineIndices.push(positions[i].x, positions[i].y, positions[i].z);
          lineIndices.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(lineIndices, 3));
    return { nodePositions: positions, lineGeometry: geo };
  }, []);

  // Frame animation loop with smooth rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous smooth auto-rotation
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;

      // Subtle mouse tracking
      const targetMouseX = state.pointer.x * 0.6;
      const targetMouseY = state.pointer.y * 0.4;
      groupRef.current.rotation.y += (targetMouseX - groupRef.current.rotation.y * 0.1) * delta * 0.8;
      groupRef.current.rotation.x += (-targetMouseY - groupRef.current.rotation.x * 0.1) * delta * 0.8;
    }

    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y -= delta * 0.35;
      innerNucleusRef.current.rotation.z += delta * 0.18;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z += delta * 0.45;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z -= delta * 0.38;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Point Light radiating from within the core */}
      <pointLight color="#818cf8" intensity={4.5} distance={14} />

      {/* Part 1: Crystalline Inner Nucleus */}
      <mesh ref={innerNucleusRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.85}
          wireframe
        />
      </mesh>

      {/* Part 2: Outer Geodesic Synaptic Lattice Shell */}
      <mesh>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Part 3: Orbital Torus Ring A (Neon Magenta) */}
      <mesh ref={ringARef} rotation={[Math.PI * 0.35, Math.PI * 0.15, 0]}>
        <torusGeometry args={[3.2, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#f43f5e"
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Part 4: Orbital Torus Ring B (Cyber Cyan) */}
      <mesh ref={ringBRef} rotation={[-Math.PI * 0.3, 0, Math.PI * 0.25]}>
        <torusGeometry args={[3.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Part 5: Synaptic Filament Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#818cf8" transparent opacity={0.55} />
      </lineSegments>

      {/* Part 6: Glowing Synaptic Nodes */}
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#f43f5e' : '#06b6d4'}
            emissive={idx % 2 === 0 ? '#e11d48' : '#0891b2'}
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// 2. Dual-toned Magenta & Cyan Floating Quantum Particles
const MagentaCyanParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 280;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const magenta = new THREE.Color('#f43f5e');
    const cyan = new THREE.Color('#06b6d4');
    const violet = new THREE.Color('#818cf8');

    for (let i = 0; i < particleCount; i++) {
      // Spread across 3D space
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      // Color selection (magenta, cyan, and violet)
      const choice = Math.random();
      const chosenColor = choice < 0.45 ? magenta : choice < 0.85 ? cyan : violet;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 3. Camera Parallax Controller
const CameraRig: React.FC = () => {
  useFrame((state, delta) => {
    // Graceful camera parallax with exponential damping
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.5;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 2.0, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 2.0, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// 4. Main Exported NeuralBackground Component
export const NeuralBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        {/* Atmosphere & Studio Lighting */}
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#a855f7', '#06b6d4', 2.0]} />
        <directionalLight position={[6, 8, 7]} intensity={2.5} color="#f43f5e" />

        {/* 3D Scene Nodes */}
        <CameraRig />
        <NeuralCore />
        <MagentaCyanParticles />
      </Canvas>
    </div>
  );
};
