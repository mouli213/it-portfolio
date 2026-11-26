import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function createSoftShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 124);
  grad.addColorStop(0, 'rgba(2, 4, 3, 0.45)');
  grad.addColorStop(0.55, 'rgba(2, 4, 3, 0.16)');
  grad.addColorStop(1, 'rgba(2, 4, 3, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function buildReferenceRobot() {
  const root = new THREE.Group();

  const pearlMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1eee8,
    roughness: 0.18,
    metalness: 0.12,
    clearcoat: 0.9,
    clearcoatRoughness: 0.12,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc8734b,
    roughness: 0.24,
    metalness: 0.88,
  });

  const goldDeepMat = new THREE.MeshStandardMaterial({
    color: 0x5f2e1b,
    roughness: 0.3,
    metalness: 0.9,
  });

  const gunmetalMat = new THREE.MeshStandardMaterial({
    color: 0x1a2324,
    roughness: 0.32,
    metalness: 0.82,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x141413,
    roughness: 0.4,
    metalness: 0.74,
  });

  const eyeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x020403,
    roughness: 0.04,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const cyanGlowMat = new THREE.MeshStandardMaterial({
    color: 0x5da5aa,
    emissive: 0x5da5aa,
    emissiveIntensity: 2.3,
    roughness: 0.15,
    metalness: 0.1,
  });

  const smileGlowMat = new THREE.MeshStandardMaterial({
    color: 0x262d38,
    emissive: 0xc8734b,
    emissiveIntensity: 0.2,
    roughness: 0.3,
    metalness: 0.6,
  });

  const bodyRoot = new THREE.Group();
  root.add(bodyRoot);

  // ==================== HEAD GROUP ====================
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.02, 0);
  bodyRoot.add(headGroup);

  const headDome = new THREE.Mesh(new THREE.SphereGeometry(0.6, 48, 36), pearlMat);
  headDome.scale.set(1.08, 0.92, 0.96);
  headDome.castShadow = true;
  headGroup.add(headDome);

  const crestPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.08, 0.16),
    pearlMat
  );
  crestPlate.position.set(0, 0.48, 0.26);
  crestPlate.rotation.x = -0.35;
  headGroup.add(crestPlate);

  const foreheadNotch = new THREE.Mesh(
    new THREE.BoxGeometry(0.065, 0.035, 0.03),
    goldMat
  );
  foreheadNotch.position.set(0, 0.34, 0.49);
  foreheadNotch.rotation.x = -0.25;
  headGroup.add(foreheadNotch);

  [-1, 1].forEach((side) => {
    const stud = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), goldMat);
    stud.position.set(side * 0.28, 0.34, 0.42);
    headGroup.add(stud);

    const earPod = new THREE.Group();
    earPod.position.set(side * 0.62, -0.02, -0.02);
    earPod.rotation.z = side * -0.08;

    const earBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.23, 0.1, 32),
      goldDeepMat
    );
    earBase.rotation.z = Math.PI / 2;
    earPod.add(earBase);

    const earMid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.2, 0.13, 32),
      goldMat
    );
    earMid.rotation.z = Math.PI / 2;
    earMid.position.x = side * 0.03;
    earPod.add(earMid);

    const earCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 28, 20),
      goldMat
    );
    earCap.scale.set(0.45, 1, 1);
    earCap.position.x = side * 0.07;
    earPod.add(earCap);

    const earRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.014, 12, 32),
      darkMetalMat
    );
    earRing.rotation.y = Math.PI / 2;
    earRing.position.x = side * 0.01;
    earPod.add(earRing);

    headGroup.add(earPod);
  });

  // Circular Glowing Eyes
  const eyeGroups = [];
  const irisGroups = [];
  [-1, 1].forEach((side) => {
    const eyeSocket = new THREE.Group();
    eyeSocket.position.set(side * 0.255, 0.02, 0.485);
    eyeSocket.rotation.y = side * 0.2;
    eyeSocket.rotation.x = -0.04;

    const outerBezel = new THREE.Mesh(
      new THREE.TorusGeometry(0.175, 0.028, 20, 48),
      darkMetalMat
    );
    eyeSocket.add(outerBezel);

    const innerRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.155, 0.012, 16, 48),
      gunmetalMat
    );
    innerRim.position.z = 0.01;
    eyeSocket.add(innerRim);

    const glassLens = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 32, 24),
      eyeGlassMat
    );
    glassLens.scale.set(1, 1, 0.48);
    glassLens.position.z = -0.01;
    eyeSocket.add(glassLens);

    const iris = new THREE.Group();
    iris.position.z = 0.055;

    const cyanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.105, 0.015, 16, 48),
      cyanGlowMat
    );
    iris.add(cyanRing);

    const innerCyanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.068, 0.005, 12, 36),
      cyanGlowMat
    );
    innerCyanRing.position.z = 0.004;
    iris.add(innerCyanRing);

    const catchlight = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    catchlight.position.set(-0.045, 0.05, 0.02);
    iris.add(catchlight);

    eyeSocket.add(iris);
    headGroup.add(eyeSocket);

    eyeGroups.push(eyeSocket);
    irisGroups.push(iris);
  });

  const smileCurve = new THREE.Mesh(
    new THREE.TorusGeometry(0.085, 0.009, 12, 24, Math.PI * 0.42),
    smileGlowMat
  );
  smileCurve.position.set(0, -0.175, 0.53);
  smileCurve.rotation.z = Math.PI + Math.PI * 0.29;
  smileCurve.rotation.x = 0.28;
  headGroup.add(smileCurve);

  // ==================== NECK & TORSO ====================
  const neckCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.145, 0.14, 24),
    darkMetalMat
  );
  neckCollar.position.set(0, 0.44, 0);
  bodyRoot.add(neckCollar);

  const neckRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.018, 12, 24),
    gunmetalMat
  );
  neckRing.rotation.x = Math.PI / 2;
  neckRing.position.set(0, 0.43, 0);
  bodyRoot.add(neckRing);

  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 0.16, 0);
  bodyRoot.add(torsoGroup);

  const chestCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.29, 32, 24),
    pearlMat
  );
  chestCore.scale.set(1.12, 0.92, 0.82);
  chestCore.position.set(0, 0.08, 0);
  chestCore.castShadow = true;
  torsoGroup.add(chestCore);

  const chestBadge = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.06, 0.06),
    gunmetalMat
  );
  chestBadge.position.set(0, 0.11, 0.22);
  torsoGroup.add(chestBadge);

  const chestStatusLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.015, 0.02),
    cyanGlowMat
  );
  chestStatusLed.position.set(0, 0.11, 0.245);
  torsoGroup.add(chestStatusLed);

  const goldChestTrim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.18, 0.11, 24),
    goldMat
  );
  goldChestTrim.scale.set(1.08, 1, 0.8);
  goldChestTrim.position.set(0, -0.08, 0);
  torsoGroup.add(goldChestTrim);

  const waistCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.15, 0.15, 20),
    darkMetalMat
  );
  waistCore.position.set(0, -0.2, 0);
  torsoGroup.add(waistCore);

  const pelvisBlock = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.11, 0.18),
    gunmetalMat
  );
  pelvisBlock.position.set(0, -0.29, 0);
  torsoGroup.add(pelvisBlock);

  // ==================== ARTICULATED ARMS ====================
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.36, 0.29, 0);
  bodyRoot.add(leftArmPivot);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.36, 0.29, 0);
  bodyRoot.add(rightArmPivot);

  const buildArm = (pivot, side) => {
    const shoulderJoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 20, 16),
      gunmetalMat
    );
    pivot.add(shoulderJoint);

    const shoulderCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
      pearlMat
    );
    shoulderCap.rotation.z = side * -0.55;
    shoulderCap.position.set(side * 0.01, 0.02, 0);
    pivot.add(shoulderCap);

    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.038, 0.22, 16),
      darkMetalMat
    );
    upperArm.position.set(side * 0.04, -0.12, 0);
    upperArm.rotation.z = side * 0.15;
    pivot.add(upperArm);

    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(side * 0.06, -0.24, 0);
    pivot.add(elbowPivot);

    const elbowJoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.048, 16, 16),
      gunmetalMat
    );
    elbowPivot.add(elbowJoint);

    const forearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.056, 0.044, 0.2, 20),
      pearlMat
    );
    forearm.position.set(side * 0.02, -0.11, 0.02);
    forearm.rotation.z = side * 0.06;
    forearm.rotation.x = -0.15;
    elbowPivot.add(forearm);

    const wristGold = new THREE.Mesh(
      new THREE.CylinderGeometry(0.046, 0.046, 0.03, 18),
      goldMat
    );
    wristGold.position.set(side * 0.025, -0.205, 0.035);
    wristGold.rotation.x = -0.15;
    elbowPivot.add(wristGold);

    const hand = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.09, 0.08),
      darkMetalMat
    );
    hand.position.set(side * 0.03, -0.26, 0.045);
    elbowPivot.add(hand);

    return { elbowPivot };
  };

  const leftArmRig = buildArm(leftArmPivot, -1);
  const rightArmRig = buildArm(rightArmPivot, 1);

  // ==================== LEGS & METALLIC BOOTS ====================
  const buildLeg = (side) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(side * 0.165, -0.15, 0);
    bodyRoot.add(legGroup);

    const hipJoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.072, 18, 16),
      darkMetalMat
    );
    legGroup.add(hipJoint);

    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.058, 0.052, 0.22, 18),
      gunmetalMat
    );
    thigh.position.set(side * 0.01, -0.12, 0);
    thigh.rotation.z = side * 0.05;
    legGroup.add(thigh);

    const knee = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.09, 16),
      darkMetalMat
    );
    knee.rotation.z = Math.PI / 2;
    knee.position.set(side * 0.02, -0.24, 0.02);
    legGroup.add(knee);

    const shinArmor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.105, 0.28, 24),
      goldMat
    );
    shinArmor.position.set(side * 0.025, -0.39, 0.01);
    shinArmor.rotation.z = side * 0.04;
    shinArmor.castShadow = true;
    legGroup.add(shinArmor);

    const bootGroup = new THREE.Group();
    bootGroup.position.set(side * 0.03, -0.55, 0.05);

    const bootBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.175, 0.1, 0.26),
      goldMat
    );
    bootBase.castShadow = true;
    bootGroup.add(bootBase);

    const bootSole = new THREE.Mesh(
      new THREE.BoxGeometry(0.185, 0.035, 0.275),
      darkMetalMat
    );
    bootSole.position.y = -0.055;
    bootGroup.add(bootSole);

    const toeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 20, 16),
      goldMat
    );
    toeCap.scale.set(1, 0.65, 1.15);
    toeCap.position.set(0, -0.01, 0.08);
    bootGroup.add(toeCap);

    legGroup.add(bootGroup);
    return legGroup;
  };

  buildLeg(-1);
  buildLeg(1);

  return {
    root,
    bodyRoot,
    headGroup,
    eyeGroups,
    irisGroups,
    cyanGlowMat,
    smileGlowMat,
    goldMat,
    goldDeepMat,
    leftArmPivot,
    rightArmPivot,
    leftArmRig,
    rightArmRig,
  };
}

export default function HeroRobot3D({
  theme = 'dark',
  animationState = 'idle',
  onRobotClick,
}) {
  const containerRef = useRef(null);
  const animStateRef = useRef(animationState);
  const onClickRef = useRef(onRobotClick);
  const themeTargetsRef = useRef(null);

  useEffect(() => {
    animStateRef.current = animationState;
  }, [animationState]);

  useEffect(() => {
    onClickRef.current = onRobotClick;
  }, [onRobotClick]);

  // Smoothly re-theme the Three.js rig, pedestal ring, and lights without resetting camera
  useEffect(() => {
    const targets = themeTargetsRef.current;
    if (!targets) return;

    if (theme === 'dark') {
      targets.goldMat.color.setHex(0xc8734b);
      targets.goldDeepMat.color.setHex(0x5f2e1b);
      targets.cyanGlowMat.color.setHex(0xe5a483);
      targets.cyanGlowMat.emissive.setHex(0xc8734b);
      targets.smileGlowMat.emissive.setHex(0x5da5aa);
      targets.rimLight.color.setHex(0x5da5aa);
      targets.accentFill.color.setHex(0xc8734b);
      targets.orbitRingMat.color.setHex(0xc8734b);
      targets.innerPedestalMat.color.setHex(0x5da5aa);
      targets.particleMat.color.setHex(0xe5a483);
    } else {
      targets.goldMat.color.setHex(0x1e6d8a);
      targets.goldDeepMat.color.setHex(0x1b4c5f);
      targets.cyanGlowMat.color.setHex(0x2fb6e0);
      targets.cyanGlowMat.emissive.setHex(0x1e6d8a);
      targets.smileGlowMat.emissive.setHex(0x9e4f30);
      targets.rimLight.color.setHex(0x9e4f30);
      targets.accentFill.color.setHex(0x1e6d8a);
      targets.orbitRingMat.color.setHex(0x1b4c5f);
      targets.innerPedestalMat.color.setHex(0x9e4f30);
      targets.particleMat.color.setHex(0x1e6d8a);
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 4.35);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1a2324, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.55);
    keyLight.position.set(2.5, 4, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x5da5aa, 1.15);
    rimLight.position.set(-3, 2.2, -2.5);
    scene.add(rimLight);

    const accentFill = new THREE.PointLight(0xc8734b, 1.1, 10);
    accentFill.position.set(2.2, 0.2, 2.2);
    scene.add(accentFill);

    const rig = buildReferenceRobot();
    rig.root.position.set(0, -0.05, 0);
    scene.add(rig.root);

    // 3D Floating Holographic Pedestal & Orbital Rings for deeper spatial presence
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xc8734b,
      transparent: true,
      opacity: 0.48,
    });
    const outerOrbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.009, 12, 72),
      orbitRingMat
    );
    outerOrbitRing.rotation.x = Math.PI * 0.44;
    outerOrbitRing.rotation.y = -0.18;
    outerOrbitRing.position.set(0, 0.28, 0);
    scene.add(outerOrbitRing);

    const innerPedestalMat = new THREE.MeshBasicMaterial({
      color: 0x5da5aa,
      transparent: true,
      opacity: 0.55,
    });
    const baseHoloRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.76, 0.014, 12, 64),
      innerPedestalMat
    );
    baseHoloRing.rotation.x = Math.PI / 2;
    baseHoloRing.position.set(0, -0.8, 0.02);
    scene.add(baseHoloRing);

    // Floating 3D depth particles around Aura
    const particleCount = 36;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.95 + (i % 5) * 0.18;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = -0.4 + ((i * 0.29) % 1.9);
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5a483,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    themeTargetsRef.current = {
      goldMat: rig.goldMat,
      goldDeepMat: rig.goldDeepMat,
      cyanGlowMat: rig.cyanGlowMat,
      smileGlowMat: rig.smileGlowMat,
      rimLight,
      accentFill,
      orbitRingMat,
      innerPedestalMat,
      particleMat,
    };

    // Apply initial theme colors immediately
    if (theme === 'light') {
      rig.goldMat.color.setHex(0x1e6d8a);
      rig.goldDeepMat.color.setHex(0x1b4c5f);
      rig.cyanGlowMat.color.setHex(0x2fb6e0);
      rig.cyanGlowMat.emissive.setHex(0x1e6d8a);
      rig.smileGlowMat.emissive.setHex(0x9e4f30);
      rimLight.color.setHex(0x9e4f30);
      accentFill.color.setHex(0x1e6d8a);
      orbitRingMat.color.setHex(0x1b4c5f);
      innerPedestalMat.color.setHex(0x9e4f30);
      particleMat.color.setHex(0x1e6d8a);
    }

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.75, 1.75),
      new THREE.MeshBasicMaterial({
        map: createSoftShadowTexture(),
        transparent: true,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -0.82, 0.02);
    scene.add(shadowPlane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minPolarAngle = Math.PI * 0.34;
    controls.maxPolarAngle = Math.PI * 0.58;
    controls.target.set(0, 0.32, 0);
    controls.update();

    const pointer = { x: 0, y: 0 };
    let pointerDownPos = { x: 0, y: 0 };

    const handleWindowPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      pointer.x = THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth * 0.5), -1, 1);
      pointer.y = THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight * 0.5), -1, 1);
    };

    const handleCanvasPointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handleCanvasPointerUp = (e) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 6 && onClickRef.current) {
        onClickRef.current();
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    renderer.domElement.addEventListener('pointerdown', handleCanvasPointerDown);
    renderer.domElement.addEventListener('pointerup', handleCanvasPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;
    let nextBlinkAt = 2.4;
    let blinkProgress = -1;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const mode = animStateRef.current;

      // 1. Gentle floating & breathing
      const floatAmp = mode === 'celebrate' ? 0.045 : 0.022;
      const floatSpeed = mode === 'talk' ? 3.2 : 1.9;
      rig.bodyRoot.position.y = Math.sin(t * floatSpeed) * floatAmp;
      shadowPlane.scale.setScalar(1 - rig.bodyRoot.position.y * 1.4);

      // Animate 3D orbital rings & depth particles
      outerOrbitRing.rotation.z = t * 0.35;
      outerOrbitRing.rotation.x = Math.PI * 0.44 + Math.sin(t * 0.7) * 0.08;
      baseHoloRing.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
      particleField.rotation.y = t * 0.22;

      // 2. Head cursor tracking
      const targetHeadY = pointer.x * 0.28 + (mode === 'talk' ? Math.sin(t * 4.5) * 0.08 : 0);
      const targetHeadX =
        pointer.y * 0.14 +
        (mode === 'talk' ? Math.sin(t * 7) * 0.055 : 0) +
        (mode === 'wave' ? -0.06 : 0);
      const targetHeadZ =
        mode === 'wave' ? 0.1 : mode === 'talk' ? Math.sin(t * 3.1) * 0.05 : -pointer.x * 0.05;

      rig.headGroup.rotation.y = THREE.MathUtils.lerp(rig.headGroup.rotation.y, targetHeadY, dt * 6);
      rig.headGroup.rotation.x = THREE.MathUtils.lerp(rig.headGroup.rotation.x, targetHeadX, dt * 6);
      rig.headGroup.rotation.z = THREE.MathUtils.lerp(rig.headGroup.rotation.z, targetHeadZ, dt * 5);

      rig.irisGroups.forEach((iris) => {
        iris.position.x = THREE.MathUtils.lerp(iris.position.x, pointer.x * 0.024, dt * 8);
        iris.position.y = THREE.MathUtils.lerp(iris.position.y, -pointer.y * 0.02, dt * 8);
      });

      // 3. Natural eye blinking
      if (t >= nextBlinkAt && blinkProgress < 0) {
        blinkProgress = 0;
        nextBlinkAt = t + 2.8 + Math.random() * 2.5;
      }
      let eyeScaleY = 1;
      if (blinkProgress >= 0) {
        blinkProgress += dt * 7.5;
        if (blinkProgress >= 1) {
          blinkProgress = -1;
        } else {
          eyeScaleY = 1 - Math.sin(blinkProgress * Math.PI) * 0.88;
        }
      }
      rig.eyeGroups.forEach((eye) => {
        eye.scale.y = eyeScaleY;
      });

      // 4. Eye & smile glow responsiveness
      const targetEmissive =
        mode === 'talk'
          ? 2.6 + Math.sin(t * 14) * 0.7
          : mode === 'celebrate'
          ? 3.2
          : 2.1 + Math.sin(t * 2) * 0.15;
      rig.cyanGlowMat.emissiveIntensity = THREE.MathUtils.lerp(
        rig.cyanGlowMat.emissiveIntensity,
        targetEmissive,
        dt * 10
      );
      rig.smileGlowMat.emissiveIntensity = THREE.MathUtils.lerp(
        rig.smileGlowMat.emissiveIntensity,
        mode === 'talk' ? 1.5 + Math.sin(t * 15) * 0.6 : 0.2,
        dt * 10
      );

      // 5. Arms animation
      let leftArmZ = -0.14 - Math.sin(t * 1.9) * 0.03;
      let leftArmX = 0.04;
      let rightArmZ = 0.14 + Math.sin(t * 1.9) * 0.03;
      let rightArmX = 0.04;
      let rightElbowZ = 0;
      let rightElbowX = -0.12;

      if (mode === 'wave') {
        rightArmZ = 2.15 + Math.sin(t * 7.5) * 0.3;
        rightArmX = -0.25;
        rightElbowZ = Math.sin(t * 7.5) * 0.22;
        rightElbowX = -0.3;
        leftArmZ = -0.22;
      } else if (mode === 'talk') {
        rightArmZ = 0.35 + Math.sin(t * 5.2) * 0.16;
        rightArmX = -0.35 + Math.cos(t * 4.2) * 0.12;
        rightElbowX = -0.65 + Math.sin(t * 6) * 0.15;
        leftArmZ = -0.26 - Math.sin(t * 4.5) * 0.1;
        leftArmX = -0.22 + Math.sin(t * 3.8) * 0.08;
      } else if (mode === 'celebrate') {
        rightArmZ = 2.35 + Math.sin(t * 9) * 0.2;
        leftArmZ = -2.35 - Math.sin(t * 9) * 0.2;
        rig.bodyRoot.rotation.y = Math.sin(t * 4.5) * 0.22;
      } else {
        rig.bodyRoot.rotation.y = THREE.MathUtils.lerp(rig.bodyRoot.rotation.y, 0, dt * 5);
      }

      rig.leftArmPivot.rotation.z = THREE.MathUtils.lerp(rig.leftArmPivot.rotation.z, leftArmZ, dt * 8);
      rig.leftArmPivot.rotation.x = THREE.MathUtils.lerp(rig.leftArmPivot.rotation.x, leftArmX, dt * 8);
      rig.rightArmPivot.rotation.z = THREE.MathUtils.lerp(rig.rightArmPivot.rotation.z, rightArmZ, dt * 8);
      rig.rightArmPivot.rotation.x = THREE.MathUtils.lerp(rig.rightArmPivot.rotation.x, rightArmX, dt * 8);
      rig.rightArmRig.elbowPivot.rotation.z = THREE.MathUtils.lerp(
        rig.rightArmRig.elbowPivot.rotation.z,
        rightElbowZ,
        dt * 8
      );
      rig.rightArmRig.elbowPivot.rotation.x = THREE.MathUtils.lerp(
        rig.rightArmRig.elbowPivot.rotation.x,
        rightElbowX,
        dt * 8
      );

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handleWindowPointerMove);
      renderer.domElement.removeEventListener('pointerdown', handleCanvasPointerDown);
      renderer.domElement.removeEventListener('pointerup', handleCanvasPointerUp);
      controls.dispose();
      particleGeo.dispose();
      envTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      themeTargetsRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[390px] w-full cursor-grab active:cursor-grabbing sm:h-[460px]"
      title="Drag to rotate 3D robot • Click to say hi!"
      aria-label="Interactive 3D Robot"
    />
  );
}
