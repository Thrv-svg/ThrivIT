import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Play, Pause, RotateCcw, Store, ShoppingCart, Cloud, Monitor, ChevronRight, Sparkles, Layers } from 'lucide-react';

export interface EcosystemNodeInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  highlightMetric: string;
  iconName: 'store' | 'pos' | 'cloud' | 'monitor';
}

const ECOSYSTEM_NODES: Record<string, EcosystemNodeInfo> = {
  store: {
    id: 'store',
    name: 'Toko Fisik & Warung Retail UMKM',
    category: 'Omnichannel Merchant',
    description: 'Unit usaha ritel, butik, atau cafe yang terhubung ke cloud. Transaksi penjualan kasir otomatis sinkron dengan stok katalog online.',
    highlightMetric: 'Real-time Stock Synchronization · 0 Selisih Stok',
    iconName: 'store'
  },
  pos: {
    id: 'pos',
    name: 'Smart PoS Terminal & Kasir Digital',
    category: 'Point of Sale Engine',
    description: 'Terminal kasir responsif web/tablet dengan pencetakan struk instan, pembayaran QRIS terintegrasi, dan rekap omset harian otomatis.',
    highlightMetric: 'Kecepatan Cetak Struk < 1 Detik · Terhubung QRIS',
    iconName: 'pos'
  },
  cloud: {
    id: 'cloud',
    name: 'Cloud Database & API Gateway',
    category: 'High-Availability Infrastructure',
    description: 'Pusat integrasi cloud aman berkecepatan tinggi dengan uptime 99.9%. Menyimpan riwayat transaksi, master produk, dan backup berkala.',
    highlightMetric: '99.9% Uptime Server · Enkripsi SSL 256-Bit',
    iconName: 'cloud'
  },
  monitor: {
    id: 'monitor',
    name: 'Central Business Intelligence Dashboard',
    category: 'Owner Control Center',
    description: 'Layar kendali terpadu untuk pemilik bisnis guna memantau grafik penjualan, profit harian, performa staf kasir, dan tren produk terlaris.',
    highlightMetric: 'Grafik Penjualan Real-time · Analitik Laporan Bulanan',
    iconName: 'monitor'
  }
};

interface IsometricEcosystem3DProps {
  onSelectNodeDetail?: (node: EcosystemNodeInfo) => void;
  className?: string;
  interactive?: boolean;
}

export const IsometricEcosystem3D: React.FC<IsometricEcosystem3DProps> = ({
  onSelectNodeDetail,
  className = '',
  interactive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<EcosystemNodeInfo | null>(ECOSYSTEM_NODES.monitor);
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // References to keep animation loop stable without recreating Three.js scene
  const sceneStateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    orbitAngle: number;
    targetAngle: number;
    mouse: THREE.Vector2;
    targetCameraOffset: THREE.Vector3;
    isAutoRotate: boolean;
    pulses: Array<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }>;
    interactiveMeshes: THREE.Object3D[];
    chartCanvasTexture?: THREE.CanvasTexture;
    chartCtx?: CanvasRenderingContext2D;
    chartAnimTime: number;
    focusTarget: THREE.Vector3;
    currentLookAt: THREE.Vector3;
  }>({
    orbitAngle: 0.785, // ~45 deg isometric
    targetAngle: 0.785,
    mouse: new THREE.Vector2(0, 0),
    targetCameraOffset: new THREE.Vector3(0, 0, 0),
    isAutoRotate: true,
    pulses: [],
    interactiveMeshes: [],
    chartAnimTime: 0,
    focusTarget: new THREE.Vector3(0, 1.2, 0),
    currentLookAt: new THREE.Vector3(0, 1.2, 0)
  });

  const handleSelectNode = useCallback((node: EcosystemNodeInfo) => {
    setSelectedNode(node);
    if (onSelectNodeDetail) {
      onSelectNodeDetail(node);
    }

    // Set camera target focus based on selected node
    const state = sceneStateRef.current;
    if (node.id === 'store') {
      state.focusTarget.set(3.8, 1.2, 1.2);
    } else if (node.id === 'pos') {
      state.focusTarget.set(3.4, 0.9, 3.4);
    } else if (node.id === 'cloud') {
      state.focusTarget.set(-3.6, 2.5, -2.5);
    } else {
      state.focusTarget.set(0, 1.2, 0);
    }
  }, [onSelectNodeDetail]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.022);

    // 2. Isometric Perspective Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const isoDistance = 18;
    camera.position.set(isoDistance * 0.7, isoDistance * 0.65, isoDistance * 0.7);
    camera.lookAt(0, 1.2, 0);

    // 3. PBR WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 1.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(12, 18, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    const d = 10;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const cyanSpot = new THREE.PointLight(0x06b6d4, 4.0, 14);
    cyanSpot.position.set(-3, 3, -1);
    scene.add(cyanSpot);

    const emeraldSpot = new THREE.PointLight(0x10b981, 3.5, 14);
    emeraldSpot.position.set(3, 2.5, 2);
    scene.add(emeraldSpot);

    // 6. Base Isometric Circuit Pedestal
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    // Main dark platform
    const platformGeo = new THREE.BoxGeometry(11, 0.45, 11);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0c0f17,
      roughness: 0.35,
      metalness: 0.85
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -0.225;
    platformMesh.receiveShadow = true;
    baseGroup.add(platformMesh);

    // Platform beveled edge accent (glowing cyan line)
    const edgeTrimGeo = new THREE.BoxGeometry(11.1, 0.08, 11.1);
    const edgeTrimMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const edgeTrim = new THREE.Mesh(edgeTrimGeo, edgeTrimMat);
    edgeTrim.position.y = 0.01;
    baseGroup.add(edgeTrim);

    // Procedural Circuit Board Ground Texture
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 1024;
    groundCanvas.height = 1024;
    const gCtx = groundCanvas.getContext('2d');
    if (gCtx) {
      gCtx.fillStyle = '#0a0d14';
      gCtx.fillRect(0, 0, 1024, 1024);

      // Grid lines
      gCtx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
      gCtx.lineWidth = 1.5;
      for (let i = 0; i < 1024; i += 64) {
        gCtx.beginPath();
        gCtx.moveTo(i, 0);
        gCtx.lineTo(i, 1024);
        gCtx.stroke();
        gCtx.beginPath();
        gCtx.moveTo(0, i);
        gCtx.lineTo(1024, i);
        gCtx.stroke();
      }

      // High-tech circuit traces
      gCtx.strokeStyle = 'rgba(6, 182, 212, 0.55)';
      gCtx.lineWidth = 3;
      const paths = [
        [512, 512, 750, 512, 750, 720],
        [512, 512, 280, 512, 280, 260],
        [512, 512, 512, 750, 720, 750],
        [512, 512, 320, 680, 200, 680],
        [512, 512, 700, 320, 850, 320]
      ];
      paths.forEach((p) => {
        gCtx.beginPath();
        gCtx.moveTo(p[0], p[1]);
        for (let k = 2; k < p.length; k += 2) {
          gCtx.lineTo(p[k], p[k + 1]);
        }
        gCtx.stroke();
      });

      // Circuit pads / vias
      gCtx.fillStyle = '#10b981';
      [
        [750, 720],
        [280, 260],
        [720, 750],
        [200, 680],
        [850, 320],
        [600, 400],
        [400, 600]
      ].forEach(([x, y]) => {
        gCtx.beginPath();
        gCtx.arc(x, y, 6, 0, Math.PI * 2);
        gCtx.fill();
      });
    }

    const groundTex = new THREE.CanvasTexture(groundCanvas);
    groundTex.colorSpace = THREE.SRGBColorSpace;
    const topGridPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(10.8, 10.8),
      new THREE.MeshStandardMaterial({
        map: groundTex,
        roughness: 0.4,
        metalness: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      })
    );
    topGridPlane.rotation.x = -Math.PI / 2;
    topGridPlane.position.y = 0.02;
    topGridPlane.receiveShadow = true;
    baseGroup.add(topGridPlane);

    // Array of interactive meshes for raycasting
    const interactiveMeshes: THREE.Object3D[] = [];

    // ==========================================
    // 7. COMPOSITE MODEL 1: Central Desktop Command Monitor
    // ==========================================
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0, 0);
    monitorGroup.name = 'monitor';
    scene.add(monitorGroup);

    // Beveled stand base
    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.85, 0.08, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 })
    );
    standBase.position.y = 0.06;
    standBase.castShadow = true;
    monitorGroup.add(standBase);

    // Stand neck
    const standNeck = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 1.4, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.25 })
    );
    standNeck.position.set(0, 0.75, -0.2);
    standNeck.rotation.x = 0.08;
    standNeck.castShadow = true;
    monitorGroup.add(standNeck);

    // Monitor Frame
    const monitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 2.2, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
    );
    monitorFrame.position.set(0, 1.85, 0);
    monitorFrame.castShadow = true;
    monitorGroup.add(monitorFrame);

    // Animated Chart Canvas on Monitor Screen
    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = 512;
    chartCanvas.height = 312;
    const chartCtx = chartCanvas.getContext('2d');
    const chartTex = new THREE.CanvasTexture(chartCanvas);
    chartTex.colorSpace = THREE.SRGBColorSpace;

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 2.0),
      new THREE.MeshBasicMaterial({ map: chartTex })
    );
    screenMesh.position.set(0, 1.85, 0.09);
    monitorGroup.add(screenMesh);

    // Screen hitbox for raycast
    const monitorHitbox = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 2.4, 0.6),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    monitorHitbox.position.set(0, 1.85, 0);
    monitorHitbox.userData = { nodeId: 'monitor' };
    monitorGroup.add(monitorHitbox);
    interactiveMeshes.push(monitorHitbox);

    // Glowing base pedestal underneath central monitor
    const centerPedestal = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.14, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.2 })
    );
    centerPedestal.position.set(0, 0.07, 0);
    centerPedestal.receiveShadow = true;
    monitorGroup.add(centerPedestal);

    const centerGlowRing = new THREE.Mesh(
      new THREE.BoxGeometry(2.46, 0.04, 2.06),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
    );
    centerGlowRing.position.set(0, 0.12, 0);
    monitorGroup.add(centerGlowRing);

    // ==========================================
    // 8. COMPOSITE MODEL 2: Miniatur Toko Fisik UMKM
    // ==========================================
    const shopGroup = new THREE.Group();
    shopGroup.position.set(3.6, 0, 0.8);
    shopGroup.name = 'store';
    scene.add(shopGroup);

    // Shop Ground Foundation
    const shopPlinth = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.2, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x1e2230, metalness: 0.5, roughness: 0.5 })
    );
    shopPlinth.position.y = 0.1;
    shopPlinth.receiveShadow = true;
    shopGroup.add(shopPlinth);

    // Main shop walls
    const shopWalls = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.6, 1.9),
      new THREE.MeshStandardMaterial({ color: 0x273549, roughness: 0.35, metalness: 0.3 })
    );
    shopWalls.position.y = 0.98;
    shopWalls.castShadow = true;
    shopWalls.receiveShadow = true;
    shopGroup.add(shopWalls);

    // Flat roof with parapet
    const shopRoof = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.16, 2.1),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    );
    shopRoof.position.y = 1.84;
    shopRoof.castShadow = true;
    shopGroup.add(shopRoof);

    // AC Unit / Vent on Roof
    const roofVent = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
    );
    roofVent.position.set(0.6, 2.05, 0.2);
    shopGroup.add(roofVent);

    // Striped Awning (Canopy) with 3D extrusions
    const awningGroup = new THREE.Group();
    awningGroup.position.set(0, 1.45, 1.05);
    shopGroup.add(awningGroup);

    const stripeCount = 6;
    const stripeWidth = 2.2 / stripeCount;
    for (let s = 0; s < stripeCount; s++) {
      const stripeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(stripeWidth, 0.1, 0.65),
        new THREE.MeshStandardMaterial({
          color: s % 2 === 0 ? 0x2563eb : 0xf8fafc,
          roughness: 0.4
        })
      );
      stripeMesh.position.x = -1.1 + stripeWidth * (s + 0.5);
      stripeMesh.rotation.x = 0.35;
      stripeMesh.castShadow = true;
      awningGroup.add(stripeMesh);
    }

    // Glass storefront window with warm interior illumination
    const windowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.85),
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.65,
        roughness: 0.1,
        metalness: 0.2
      })
    );
    windowMesh.position.set(-0.35, 0.85, 0.96);
    shopGroup.add(windowMesh);

    // Glass door
    const doorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 1.1),
      new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.2,
        roughness: 0.2
      })
    );
    doorMesh.position.set(0.65, 0.75, 0.96);
    shopGroup.add(doorMesh);

    // Hitbox for raycast
    const shopHitbox = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 2.2, 2.4),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    shopHitbox.position.y = 1.1;
    shopHitbox.userData = { nodeId: 'store' };
    shopGroup.add(shopHitbox);
    interactiveMeshes.push(shopHitbox);

    // Small digital tree beside the shop
    const treeGroup = new THREE.Group();
    treeGroup.position.set(-1.6, 0.1, 0.5);
    shopGroup.add(treeGroup);
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0x78350f })
    );
    trunk.position.y = 0.3;
    treeGroup.add(trunk);
    const foliage = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.4
      })
    );
    foliage.position.y = 0.75;
    treeGroup.add(foliage);

    // ==========================================
    // 9. COMPOSITE MODEL 3: Smart Point of Sale (PoS) Terminal
    // ==========================================
    const posGroup = new THREE.Group();
    posGroup.position.set(2.8, 0, 3.2);
    posGroup.name = 'pos';
    scene.add(posGroup);

    // Cashier Stand Counter
    const counterMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.85, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 })
    );
    counterMesh.position.y = 0.425;
    counterMesh.castShadow = true;
    counterMesh.receiveShadow = true;
    posGroup.add(counterMesh);

    // Tablet Base and Angled Screen
    const tabletStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 })
    );
    tabletStem.position.set(-0.25, 0.95, 0.05);
    posGroup.add(tabletStem);

    const tabletBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.7, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.8, roughness: 0.2 })
    );
    tabletBody.position.set(-0.25, 1.2, 0.05);
    tabletBody.rotation.x = -0.45;
    tabletBody.castShadow = true;
    posGroup.add(tabletBody);

    const tabletScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.62),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
    );
    tabletScreen.position.set(-0.25, 1.21, 0.09);
    tabletScreen.rotation.x = -0.45;
    posGroup.add(tabletScreen);

    // Thermal Printer Box
    const printerMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.32, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 })
    );
    printerMesh.position.set(0.4, 0.98, 0.1);
    printerMesh.castShadow = true;
    posGroup.add(printerMesh);

    // Floating Paper Receipt Ribbon
    const receiptMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.24, 0.45),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.6,
        side: THREE.DoubleSide
      })
    );
    receiptMesh.position.set(0.4, 1.25, 0.15);
    receiptMesh.rotation.x = -0.25;
    posGroup.add(receiptMesh);

    // Hitbox for raycast
    const posHitbox = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.6, 1.4),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    posHitbox.position.y = 0.8;
    posHitbox.userData = { nodeId: 'pos' };
    posGroup.add(posHitbox);
    interactiveMeshes.push(posHitbox);

    // ==========================================
    // 10. COMPOSITE MODEL 4: Floating Cloud Database Hub
    // ==========================================
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(-3.4, 2.2, -2.4);
    cloudGroup.name = 'cloud';
    scene.add(cloudGroup);

    // Cloud body made of clustered translucent glowing spheres
    const cloudMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.88,
      ior: 1.4
    });

    const cloudSpheres = [
      { r: 0.7, x: 0, y: 0, z: 0 },
      { r: 0.55, x: -0.65, y: -0.1, z: 0.05 },
      { r: 0.6, x: 0.65, y: -0.05, z: -0.05 },
      { r: 0.48, x: 0.25, y: 0.45, z: 0.1 },
      { r: 0.45, x: -0.3, y: 0.4, z: -0.1 }
    ];

    cloudSpheres.forEach((c) => {
      const sp = new THREE.Mesh(new THREE.SphereGeometry(c.r, 20, 20), cloudMat);
      sp.position.set(c.x, c.y, c.z);
      cloudGroup.add(sp);
    });

    // Database Server Disks Stack beneath the cloud
    const serverPlatterMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.9
    });
    for (let dIdx = 0; dIdx < 3; dIdx++) {
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 24), serverPlatterMat);
      disk.position.set(0, -0.6 - dIdx * 0.16, 0);
      cloudGroup.add(disk);

      // Status indicator ring
      const statusRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.36, 0.02, 24),
        new THREE.MeshBasicMaterial({ color: dIdx === 1 ? 0x10b981 : 0x06b6d4 })
      );
      statusRing.position.set(0, -0.6 - dIdx * 0.16, 0);
      cloudGroup.add(statusRing);
    }

    // Cloud Hitbox for raycast
    const cloudHitbox = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 12, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    cloudHitbox.userData = { nodeId: 'cloud' };
    cloudGroup.add(cloudHitbox);
    interactiveMeshes.push(cloudHitbox);

    // ==========================================
    // 11. Animated Glowing Circuit Bus & Data Pulses
    // ==========================================
    const splinePoints = [
      // Store to central monitor
      [
        new THREE.Vector3(3.6, 0.15, 0.8),
        new THREE.Vector3(2.4, 0.15, 0.8),
        new THREE.Vector3(1.2, 0.15, 0.2),
        new THREE.Vector3(0.5, 0.15, 0)
      ],
      // PoS terminal to central monitor
      [
        new THREE.Vector3(2.8, 0.15, 3.2),
        new THREE.Vector3(1.6, 0.15, 2.4),
        new THREE.Vector3(0.6, 0.15, 1.2),
        new THREE.Vector3(0, 0.15, 0.6)
      ],
      // Cloud to central monitor
      [
        new THREE.Vector3(-3.4, 1.4, -2.4),
        new THREE.Vector3(-2.2, 0.6, -1.8),
        new THREE.Vector3(-1.2, 0.15, -1.0),
        new THREE.Vector3(-0.4, 0.15, -0.2)
      ]
    ];

    const pulses: Array<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }> = [];

    splinePoints.forEach((pts, pathIdx) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.035, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: pathIdx === 2 ? 0x38bdf8 : pathIdx === 1 ? 0x10b981 : 0x6366f1,
        transparent: true,
        opacity: 0.75
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tube);

      // Data pulse packet
      const pulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(pulseMesh);

      pulses.push({
        mesh: pulseMesh,
        curve,
        speed: 0.35 + pathIdx * 0.08,
        progress: pathIdx * 0.33
      });
    });

    // Save references to state
    sceneStateRef.current.renderer = renderer;
    sceneStateRef.current.scene = scene;
    sceneStateRef.current.camera = camera;
    sceneStateRef.current.pulses = pulses;
    sceneStateRef.current.interactiveMeshes = interactiveMeshes;
    sceneStateRef.current.chartCanvasTexture = chartTex;
    sceneStateRef.current.chartCtx = chartCtx || undefined;

    // 12. Pointer Raycasting Event Handlers
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      pointer.x = x;
      pointer.y = y;

      // Parallax mouse tilt
      sceneStateRef.current.mouse.x = x;
      sceneStateRef.current.mouse.y = y;

      // Raycast hover check
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.nodeId as string;
        container.style.cursor = 'pointer';
        setHoveredNodeId(id);
      } else {
        container.style.cursor = 'default';
        setHoveredNodeId(null);
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.nodeId as string;
        if (ECOSYSTEM_NODES[id]) {
          handleSelectNode(ECOSYSTEM_NODES[id]);
        }
      }
    };

    if (interactive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('click', handleClick);
    }

    // 13. Dynamic Canvas Chart Renderer (Runs on requestAnimationFrame)
    const updateMonitorChart = (t: number) => {
      if (!chartCtx) return;
      chartCtx.fillStyle = '#090d16';
      chartCtx.fillRect(0, 0, 512, 312);

      // Top bar title
      chartCtx.fillStyle = '#1e293b';
      chartCtx.fillRect(0, 0, 512, 40);
      chartCtx.fillStyle = '#38bdf8';
      chartCtx.font = 'bold 15px monospace';
      chartCtx.fillText('● THRIVIT OMNICHANNEL CORE v3.8 [LIVE]', 20, 26);

      // Metric Ticker boxes
      const metrics = [
        { label: 'OMSET HARI INI', val: 'Rp 14.820.000', col: '#10b981' },
        { label: 'TRANSAKSI POS', val: '248 Struk', col: '#06b6d4' },
        { label: 'STOK TERSINKRON', val: '99.8%', col: '#a855f7' }
      ];

      metrics.forEach((m, idx) => {
        const bx = 20 + idx * 160;
        chartCtx.fillStyle = '#111827';
        chartCtx.fillRect(bx, 52, 148, 60);
        chartCtx.strokeStyle = 'rgba(255,255,255,0.08)';
        chartCtx.strokeRect(bx, 52, 148, 60);

        chartCtx.fillStyle = '#94a3b8';
        chartCtx.font = '10px sans-serif';
        chartCtx.fillText(m.label, bx + 10, 70);

        chartCtx.fillStyle = m.col;
        chartCtx.font = 'bold 14px monospace';
        chartCtx.fillText(m.val, bx + 10, 96);
      });

      // Animated Sine wave transaction graph
      chartCtx.strokeStyle = '#06b6d4';
      chartCtx.lineWidth = 3;
      chartCtx.beginPath();
      const graphY = 220;
      for (let px = 20; px < 490; px += 4) {
        const py = graphY + Math.sin(px * 0.03 + t * 2) * 22 + Math.cos(px * 0.015 - t) * 14;
        if (px === 20) chartCtx.moveTo(px, py);
        else chartCtx.lineTo(px, py);
      }
      chartCtx.stroke();

      // Second emerald trend line
      chartCtx.strokeStyle = '#10b981';
      chartCtx.lineWidth = 2;
      chartCtx.beginPath();
      for (let px = 20; px < 490; px += 5) {
        const py = graphY + 12 + Math.cos(px * 0.025 + t * 1.5) * 18;
        if (px === 20) chartCtx.moveTo(px, py);
        else chartCtx.lineTo(px, py);
      }
      chartCtx.stroke();

      chartTex.needsUpdate = true;
    };

    // 14. Animation Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const state = sceneStateRef.current;
      state.chartAnimTime += delta;

      // Update screen graphic
      updateMonitorChart(state.chartAnimTime);

      // Smooth camera orbit & damping
      if (state.isAutoRotate) {
        state.orbitAngle += delta * 0.12;
      }

      // Parallax mouse tilt
      const targetRadius = 18;
      const camX = Math.cos(state.orbitAngle) * targetRadius + state.mouse.x * 2.0;
      const camZ = Math.sin(state.orbitAngle) * targetRadius + state.mouse.y * 1.5;
      const camY = 11.5 - state.mouse.y * 2.5;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, camX, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 3.5, delta);

      // Smooth look-at target transition
      state.currentLookAt.x = THREE.MathUtils.damp(state.currentLookAt.x, state.focusTarget.x, 4.0, delta);
      state.currentLookAt.y = THREE.MathUtils.damp(state.currentLookAt.y, state.focusTarget.y, 4.0, delta);
      state.currentLookAt.z = THREE.MathUtils.damp(state.currentLookAt.z, state.focusTarget.z, 4.0, delta);
      camera.lookAt(state.currentLookAt);

      // Subtle float animation on cloud
      cloudGroup.position.y = 2.2 + Math.sin(currentTime * 0.0018) * 0.12;
      cloudGroup.rotation.y += delta * 0.15;

      // Floating receipt animation on POS
      receiptMesh.rotation.z = Math.sin(currentTime * 0.003) * 0.05;

      // Move data packet pulses along splines
      state.pulses.forEach((p) => {
        p.progress = (p.progress + p.speed * delta) % 1;
        const pos = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 15. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 900;
      const newH = container.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('click', handleClick);
      }
      renderer.dispose();
      groundTex.dispose();
      chartTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive, handleSelectNode]);

  const toggleRotation = () => {
    setIsRotating((prev) => {
      const next = !prev;
      sceneStateRef.current.isAutoRotate = next;
      return next;
    });
  };

  const resetCamera = () => {
    sceneStateRef.current.orbitAngle = 0.785;
    sceneStateRef.current.focusTarget.set(0, 1.2, 0);
    setSelectedNode(ECOSYSTEM_NODES.monitor);
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border border-white/[0.12] bg-[#070709] shadow-2xl ${className}`}>
      
      {/* 3D WebGL Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-[520px] sm:h-[620px] lg:h-[680px] touch-none select-none"
        aria-label="3D Interactive Digital Ecosystem Diorama"
      />

      {/* Top Floating Badge (Unobtrusive) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-semibold text-slate-200 shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-mono text-cyan-300">3D Interactive Diorama</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300">Klik node untuk inspeksi</span>
      </div>

      {/* Floating Active Node Card (Inspector) */}
      {selectedNode && (
        <div className="absolute top-4 right-4 z-10 max-w-sm w-full mx-4 sm:mx-0 p-4 rounded-2xl bg-[#0d111a]/95 border border-cyan-500/30 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                {selectedNode.iconName === 'store' && <Store className="w-4 h-4" />}
                {selectedNode.iconName === 'pos' && <ShoppingCart className="w-4 h-4" />}
                {selectedNode.iconName === 'cloud' && <Cloud className="w-4 h-4" />}
                {selectedNode.iconName === 'monitor' && <Monitor className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {selectedNode.category}
                </p>
                <h4 className="text-sm font-bold text-white">
                  {selectedNode.name}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white text-xs p-1 rounded-md hover:bg-white/10"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>

          <p className="pt-2 text-xs text-slate-300 leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-mono text-emerald-300 font-semibold">
              {selectedNode.highlightMetric}
            </span>
          </div>
        </div>
      )}

      {/* Unified Bottom Control Dock (Consolidated, Zero Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-2xl px-4 py-2.5 rounded-2xl bg-black/85 border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Node Focus Switchers */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {Object.values(ECOSYSTEM_NODES).map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {node.iconName === 'store' && <Store className="w-3.5 h-3.5" />}
                {node.iconName === 'pos' && <ShoppingCart className="w-3.5 h-3.5" />}
                {node.iconName === 'cloud' && <Cloud className="w-3.5 h-3.5" />}
                {node.iconName === 'monitor' && <Monitor className="w-3.5 h-3.5" />}
                <span>{node.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Play/Pause Rotation & Reset Camera */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={toggleRotation}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isRotating
                ? 'bg-slate-800 text-slate-200 border-white/10 hover:bg-slate-700'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900'
            }`}
            title={isRotating ? 'Jeda Rotasi' : 'Mulai Rotasi'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">{isRotating ? 'Jeda' : 'Putar'}</span>
          </button>

          <button
            onClick={resetCamera}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-white/10 hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            title="Reset Sudut Kamera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>
        </div>

      </div>

    </div>
  );
};
