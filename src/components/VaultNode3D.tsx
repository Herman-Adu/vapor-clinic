"use client";

import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Constants ───────────────────────────────────────────────────────────────
const PROTOCOLS = [
  {
    id: "neural-synthesis",
    title: "Neural Synthesis",
    code: "0xFA4B",
    description: "Deep-layer synaptic re-mapping via adaptive neuro-plasticity protocols.",
    stats: ["Latency: -42ms", "Efficiency: +89%", "Integrity: 0.999"],
    color: "#7B61FF",
    statName: "Latency",
  },
  {
    id: "genomic-sculpting",
    title: "Genomic Sculpting",
    code: "0xB21A",
    description: "Real-time nucleotide sequence optimization and telomere stabilization.",
    stats: ["Stability: +120%", "Drift: <0.001%", "Longevity: Enhanced"],
    color: "#E63B2E",
    statName: "Stability",
  },
  {
    id: "kinetic-overdrive",
    title: "Kinetic Overdrive",
    code: "0xC9D3",
    description: "Mitochondrial output amplification and motor neuron synchronization.",
    stats: ["ATP Output: 4.2x", "Reflexes: +200%", "Recovery: Instant"],
    color: "#C9A84C",
    statName: "ATP Output",
  },
];

// ─── Particle Buffers (module-level) ────
const PARTICLE_COUNT = 320;
const PARTICLE_POSITIONS = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return pos;
})();
const PARTICLE_SPEEDS = (() => {
  const spd = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    spd[i] = 0.001 + Math.random() * 0.003;
  }
  return spd;
})();

// ─── Components ──────────────────────────────────────────────────────────────

function ParticleField({ scrollProgress, color }: { scrollProgress: React.MutableRefObject<number>, color: string }) {
  const mesh = useRef<THREE.Points>(null);
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const geo = mesh.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] -= PARTICLE_SPEEDS[i];
      if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] = 5;
    }
    geo.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.03 + scrollProgress.current * 0.5;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={colorObj}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function VaultGeometry({ scrollProgress, color, isMobile }: { scrollProgress: React.MutableRefObject<number>, color: string, isMobile: boolean }) {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  const scale = isMobile ? 0.7 : 1;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = scrollProgress.current;

    if (solidRef.current) {
      solidRef.current.rotation.y = t * 0.18 + s * Math.PI * 1.5;
      solidRef.current.rotation.x = t * 0.09 + s * 0.4;
      const solidOpacity = 0.15 + Math.sin(t * 0.5) * 0.05;
      (solidRef.current.material as THREE.MeshStandardMaterial).opacity = solidOpacity;
      (solidRef.current.material as THREE.MeshStandardMaterial).color.lerp(colorObj, 0.05);
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.18 + s * Math.PI * 1.5;
      wireRef.current.rotation.x = t * 0.09 + s * 0.4;
      (wireRef.current.material as THREE.MeshBasicMaterial).color.lerp(colorObj, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.25 + s * Math.PI;
      outerRingRef.current.rotation.x = Math.PI * 0.35;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.4 + s * Math.PI * 0.8;
      innerRingRef.current.rotation.x = Math.PI * 0.6;
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color={colorObj} wireframe transparent opacity={0.6} />
      </mesh>

      <mesh ref={solidRef}>
        <icosahedronGeometry args={[1.38, 1]} />
        <meshStandardMaterial
          color={colorObj}
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.1, 0.012, 8, 80]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.35} />
      </mesh>

      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.7, 0.008, 8, 80]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.2} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={colorObj} />
      </mesh>
    </group>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.5;
    const targetZ = 5 + scrollProgress.current * 0.5;

    camera.position.set(
      THREE.MathUtils.lerp(camera.position.x, targetX, 0.04),
      THREE.MathUtils.lerp(camera.position.y, targetY, 0.04),
      THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04)
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VaultNode3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
            const index = Math.min(
              Math.floor(self.progress * PROTOCOLS.length),
              PROTOCOLS.length - 1
            );
            if (index !== activeIndexRef.current) {
              activeIndexRef.current = index;
              setActiveIndex(index);
            }
          },
        },
      });

      PROTOCOLS.forEach((_, i) => {
        const startPos = i / PROTOCOLS.length;
        const endPos = (i + 1) / PROTOCOLS.length;

        masterTl.fromTo(`.prose-${i}`, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.3 }, 
          i === 0 ? 0 : startPos
        );
        masterTl.fromTo(`.metric-${i}`, 
          { x: isMobile ? 0 : 50, y: isMobile ? 50 : 0, opacity: 0 }, 
          { x: 0, y: 0, opacity: 1, duration: 0.3 }, 
          i === 0 ? 0 : startPos
        );

        if (i < PROTOCOLS.length - 1) {
          masterTl.to(`.prose-${i}`, { y: -50, opacity: 0, duration: 0.3 }, endPos - 0.1);
          masterTl.to(`.metric-${i}`, { x: isMobile ? 0 : -50, y: isMobile ? -50 : 0, opacity: 0, duration: 0.3 }, endPos - 0.1);
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile]);

  const activeColor = PROTOCOLS[activeIndex].color;

  return (
    <section id="vault" ref={containerRef} className="relative w-full bg-background overflow-hidden">
      <div className="relative h-screen w-full flex items-center justify-center px-6 md:px-24">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 transition-colors duration-1000" 
          style={{ 
            backgroundImage: `radial-gradient(circle at center, ${activeColor}0D 0%, transparent 70%)` 
          }} 
        />

        {/* Central 3D Core */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color={activeColor} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={activeColor} />
            
            <Suspense fallback={null}>
              <CameraRig scrollProgress={scrollProgress} />
              <ParticleField scrollProgress={scrollProgress} color={activeColor} />
              <VaultGeometry scrollProgress={scrollProgress} color={activeColor} isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>

        {/* Flanking Content Layer */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center pointer-events-none gap-4 lg:gap-0">
          {/* Top/Left: Narrative Prose */}
          <div className="w-full lg:w-1/3 relative h-40 lg:h-64 text-center lg:text-left">
            {PROTOCOLS.map((protocol, i) => (
              <div key={protocol.id} className={`prose-${i} absolute inset-0 flex flex-col justify-center items-center lg:items-start p-4 lg:p-0 rounded-2xl bg-background/5 lg:bg-transparent backdrop-blur-[2px] lg:backdrop-blur-0 shadow-lg lg:shadow-none border border-white/5 lg:border-none`}>
                <div className="flex items-center gap-3 mb-2 lg:mb-6">
                  <span className="font-data text-[8px] md:text-[10px] tracking-widest whitespace-nowrap" style={{ color: protocol.color }}>
                    0{i + 1} — {protocol.id.toUpperCase().replace('-', '_')}
                  </span>
                  <div className="hidden lg:block w-12 h-[1px] bg-foreground/20" />
                </div>
                <h3 className="font-heading text-2xl md:text-5xl font-black text-white mb-2 lg:mb-6 leading-tight max-w-sm drop-shadow-md">
                  {protocol.title}.
                </h3>
                <p className="font-sans text-foreground/60 text-[10px] md:text-sm leading-relaxed max-w-xs px-2 lg:px-0 font-medium">
                  {protocol.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom/Right: Data Metrics */}
          <div className="w-full lg:w-1/3 relative h-40 lg:h-64 text-center lg:text-right flex flex-col items-center lg:items-end justify-center">
            {PROTOCOLS.map((protocol, i) => (
              <div key={protocol.id} className={`metric-${i} absolute inset-0 flex flex-col justify-center items-center lg:items-end p-4 lg:p-0 rounded-2xl bg-background/5 lg:bg-transparent backdrop-blur-[2px] lg:backdrop-blur-0 shadow-lg lg:shadow-none border border-white/5 lg:border-none`}>
                <div className="mb-1 lg:mb-2">
                  <span className="font-heading text-5xl md:text-8xl font-black italic tracking-tighter block mb-1 md:mb-2 drop-shadow-lg" style={{ color: protocol.color }}>
                    {protocol.stats[0].split(': ')[1]}
                  </span>
                  <div className="h-[2px] w-12 md:w-24 lg:ml-auto mb-2 md:mb-4" style={{ backgroundColor: protocol.color }} />
                </div>
                <span className="font-data text-[8px] md:text-[10px] text-white/60 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">
                  {protocol.statName} STANDARD
                </span>
                <p className="font-sans text-white/30 text-[8px] md:text-[10px] mt-1 md:mt-4 max-w-[150px] font-bold">
                  CRYPTO-GENOMIC VARIANCE DETECTED AT {protocol.code}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Progress Indicator */}
        <div className="absolute bottom-8 lg:bottom-24 left-6 md:left-12 right-6 md:right-12 z-20">
          <div className="flex gap-2 md:gap-4 items-end max-w-4xl mx-auto">
            {PROTOCOLS.map((protocol, i) => (
              <div key={protocol.id} className="flex-1">
                <div className="flex items-center justify-between mb-1 md:mb-4">
                  <span className={`font-data text-[6px] md:text-[8px] tracking-widest transition-colors duration-500 font-bold ${i === activeIndex ? 'text-white' : 'text-white/20'}`}>
                    0{i + 1} — {protocol.title.split(' ')[0].toUpperCase()}
                  </span>
                </div>
                <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 transition-all duration-1000 ease-out" 
                    style={{ 
                      width: i === activeIndex ? '100%' : i < activeIndex ? '100%' : '0%',
                      backgroundColor: protocol.color
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
