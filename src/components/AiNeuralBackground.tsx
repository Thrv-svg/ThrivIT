import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AiNeuralBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const getWidth = () => container.clientWidth || window.innerWidth;
    const getHeight = () => container.clientHeight || 750;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, getWidth() / getHeight(), 0.1, 100);
    camera.position.set(0, 0, 9);

    // 2. High-Performance Renderer with Transparent Canvas
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(getWidth(), getHeight());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6; // Brighter exposure so it stands out vividly
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0xa855f7, 0x06b6d4, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf43f5e, 3.0);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const coreLight = new THREE.PointLight(0x60a5fa, 5.0, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 4. Multi-Part 3D AI Neural Hierarchy Group
    const aiCoreGroup = new THREE.Group();
    // Offset slightly to provide balanced visual presence
    aiCoreGroup.position.set(0, 0, 0);
    scene.add(aiCoreGroup);

    // Part 1: Glowing Inner Nucleus (Icosahedron)
    const nucleusGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x8b5cf6,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    aiCoreGroup.add(nucleusMesh);

    // Part 2: Inner Holographic Point Cloud
    const innerPointsCount = 120;
    const innerPointsPositions = new Float32Array(innerPointsCount * 3);
    for (let i = 0; i < innerPointsCount; i++) {
      const radius = 0.5 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      innerPointsPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      innerPointsPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      innerPointsPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const innerPointsGeo = new THREE.BufferGeometry();
    innerPointsGeo.setAttribute('position', new THREE.BufferAttribute(innerPointsPositions, 3));
    const innerPointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.95
    });
    const innerPoints = new THREE.Points(innerPointsGeo, innerPointsMat);
    aiCoreGroup.add(innerPoints);

    // Part 3: Outer Geodesic Synaptic Lattice Shell
    const shellGeo = new THREE.IcosahedronGeometry(2.8, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    aiCoreGroup.add(shellMesh);

    // Part 4: Counter-Rotating Orbital Data Ring A (Magenta)
    const ringAGeo = new THREE.TorusGeometry(3.6, 0.045, 16, 120);
    const ringAMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const ringA = new THREE.Mesh(ringAGeo, ringAMat);
    ringA.rotation.x = Math.PI * 0.35;
    ringA.rotation.y = Math.PI * 0.15;
    aiCoreGroup.add(ringA);

    // Part 5: Counter-Rotating Orbital Data Ring B (Cyan)
    const ringBGeo = new THREE.TorusGeometry(4.2, 0.04, 16, 120);
    const ringBMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9
    });
    const ringB = new THREE.Mesh(ringBGeo, ringBMat);
    ringB.rotation.x = -Math.PI * 0.3;
    ringB.rotation.z = Math.PI * 0.25;
    aiCoreGroup.add(ringB);

    // Part 6: Instanced Synaptic Neural Nodes (64 nodes)
    const nodeCount = 64;
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 1.4,
      roughness: 0.1,
      metalness: 0.8
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const _tempMatrix = new THREE.Matrix4();
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.4 + (i % 3) * 0.4;
      const theta = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.3;
      const phi = Math.acos(Math.random() * 2 - 1);
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);
      _tempMatrix.setPosition(pos);
      instancedNodes.setMatrixAt(i, _tempMatrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    aiCoreGroup.add(instancedNodes);

    // Part 7: Dynamic Neural Synaptic Filament Lines
    const lineIndices: number[] = [];
    const maxDistSq = 2.4 * 2.4;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceToSquared(nodePositions[j]) < maxDistSq) {
          lineIndices.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          lineIndices.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineIndices, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.65
    });
    const neuralLines = new THREE.LineSegments(linesGeo, linesMat);
    aiCoreGroup.add(neuralLines);

    // Part 8: Floating Quantum Data Particles (320 particles)
    const dustCount = 320;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 22;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.75
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 5. Interactive Mouse Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX * 0.6;
      mouse.targetY = normY * 0.45;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Lossless 60fps Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for smooth mouse tracking
      const dampFactor = 1 - Math.exp(-3.0 * dt);
      mouse.x += (mouse.targetX - mouse.x) * dampFactor;
      mouse.y += (mouse.targetY - mouse.y) * dampFactor;

      // Group rotation
      aiCoreGroup.rotation.y = time * 0.28 + mouse.x * 1.5;
      aiCoreGroup.rotation.x = Math.sin(time * 0.2) * 0.15 - mouse.y * 1.0;
      aiCoreGroup.position.y = Math.sin(time * 0.9) * 0.2;

      // Component kinematics
      nucleusMesh.rotation.y = -time * 0.4;
      nucleusMesh.rotation.z = time * 0.2;

      ringA.rotation.z = time * 0.5;
      ringB.rotation.z = -time * 0.42;

      innerPoints.rotation.y = time * 0.6;
      dustParticles.rotation.y = time * 0.05;

      // Pulsing glow on core point light
      coreLight.intensity = 4.0 + Math.sin(time * 3.0) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      nucleusGeo.dispose();
      innerPointsGeo.dispose();
      shellGeo.dispose();
      ringAGeo.dispose();
      ringBGeo.dispose();
      nodeGeo.dispose();
      linesGeo.dispose();
      dustGeo.dispose();

      nucleusMat.dispose();
      innerPointsMat.dispose();
      shellMat.dispose();
      ringAMat.dispose();
      ringBMat.dispose();
      nodeMat.dispose();
      linesMat.dispose();
      dustMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
