"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Sphere, useTexture, Line } from "@react-three/drei";
import * as THREE from "three";
import { Line2 } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EARTH_TEXTURE_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";

/**
 * latLongToVector3 - Correctly maps Lat/Long to 3D Sphere Coordinates.
 * Adds a small surface offset to prevent clipping (radius + 0.02)
 */
const latLongToVector3 = (lat: number, lon: number, radius: number, offset = 0.02) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const r = radius + offset;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

export const GlobalNetwork: React.FC = () => {
  return (
    <section id="network" className="h-screen w-full bg-background overflow-hidden grid grid-cols-1 md:grid-cols-2 border-y border-white/5">
      <div className="relative h-full w-full order-2 md:order-1">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.8], fov: 38 }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 3.8]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={50} color="#7B61FF" castShadow />
            <pointLight position={[-10, -10, -10]} intensity={25} color="#C9A84C" />
            <EarthGlobe />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-24 py-16 lg:py-0 bg-gradient-to-l from-black/60 to-transparent order-1 lg:order-2 z-10 backdrop-blur-sm">
        <span className="font-data text-accent text-[10px] md:text-sm tracking-[0.4em] mb-4 uppercase">Network_Presence</span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-12 italic leading-tight">Localized Anywhere.</h2>
        <div className="space-y-8 md:space-y-12">
          <StatItem label="Global Instances" value="142" suffix="+" />
          <StatItem label="Avg Synchronization" value="12" suffix="ms" />
          <StatItem label="Active Protocols" value="8,920" />
        </div>
      </div>
    </section>
  );
};

const EarthGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, normal, specular] = useTexture([EARTH_TEXTURE_URL, EARTH_NORMAL_URL, EARTH_SPECULAR_URL]);
  const radius = 1.1;

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const cityData = useMemo(() => [
    { name: "New York", lat: 40.7, lon: -74.0, color: "#7B61FF" },
    { name: "London", lat: 51.5, lon: -0.1, color: "#C9A84C" },
    { name: "Tokyo", lat: 35.7, lon: 139.7, color: "#E63B2E" },
    { name: "Sydney", lat: -33.9, lon: 151.2, color: "#7B61FF" },
    { name: "São Paulo", lat: -23.5, lon: -46.6, color: "#C9A84C" },
    { name: "Lagos", lat: 6.5, lon: 3.4, color: "#E63B2E" },
    { name: "Dubai", lat: 25.2, lon: 55.3, color: "#7B61FF" },
    { name: "Shanghai", lat: 31.2, lon: 121.5, color: "#C9A84C" },
    { name: "San Francisco", lat: 37.7, lon: -122.4, color: "#E63B2E" },
    { name: "Paris", lat: 48.8, lon: 2.3, color: "#7B61FF" },
    { name: "Singapore", lat: 1.3, lon: 103.8, color: "#C9A84C" },
  ], []);

  const nodes = useMemo(() => 
    cityData.map(city => ({
      pos: latLongToVector3(city.lat, city.lon, radius).toArray() as [number, number, number],
      color: city.color
    })), [cityData, radius]);

  const tracks = useMemo(() => {
    // 10 key global pathways for balanced saturation
    const connections = [
      [0, 1], [1, 9], [9, 6], [6, 2], [2, 7], [7, 10], [10, 3], [3, 4], [4, 5], [5, 0], [8, 0]
    ];
    return connections.map(([sIdx, eIdx], i) => ({
      start: nodes[sIdx].pos,
      end: nodes[eIdx].pos,
      color: nodes[sIdx].color,
      speed: 0.35 + (Math.sin(i * 1.5) * 0.5 + 0.5) * 0.4
    }));
  }, [nodes]);

  return (
    <group ref={groupRef}>
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial 
          map={texture} 
          normalMap={normal}
          normalScale={new THREE.Vector2(1.2, 1.2)}
          specularMap={specular}
          specular={new THREE.Color("#666")}
          shininess={30}
          emissive={new THREE.Color("#0c0c0c")}
        />
      </mesh>

      <mesh scale={1.002}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial color="#8a74ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>

      <Sphere args={[radius * 1.08, 64, 64]}>
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </Sphere>

      {nodes.map((node, i) => <CityNode key={i} position={node.pos} color={node.color} />)}

      {tracks.map((track, i) => (
        <CometArc key={i} start={track.start} end={track.end} color={track.color} speed={track.speed} radius={radius} />
      ))}
    </group>
  );
};

const CometArc = ({ start, end, color, speed, radius }: { start: [number, number, number], end: [number, number, number], color: string, speed: number, radius: number }) => {
  const lineRef = useRef<Line2>(null);
  const headRef = useRef<Line2>(null);
  
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const dist = startVec.distanceTo(endVec);
    // Arc altitude (stays well above globe to avoid clipping)
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5).normalize().multiplyScalar(radius + 0.15 + dist * 0.45);
    const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    return curve.getPoints(100);
  }, [start, end, radius]);

  useFrame((state) => {
    const dt = state.clock.getDelta();
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.ShaderMaterial & { dashOffset: number };
      if (mat) mat.dashOffset -= dt * speed * 0.2;
    }
    if (headRef.current) {
      const mat = headRef.current.material as THREE.ShaderMaterial & { dashOffset: number };
      if (mat) mat.dashOffset -= dt * speed * 0.4;
    }
  });

  return (
    <group>
      <Line ref={lineRef} points={points} color={color} lineWidth={1.8} transparent opacity={0.65} />
      <Line
        ref={headRef}
        points={points}
        color="#fff" 
        lineWidth={3.8}
        dashed
        dashSize={0.05} // Smaller pulse length
        gapSize={12}    // Increased pulse frequency
        transparent
        opacity={1}
      />
    </group>
  );
};

const CityNode = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh scale={2.5}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const StatItem = ({ label, value, suffix }: { label: string, value: string, suffix?: string }) => (
  <div className="group">
    <p className="font-data text-[10px] uppercase text-foreground/40 mb-2 tracking-widest">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="font-heading text-4xl md:text-5xl font-bold text-foreground group-hover:text-accent transition-colors duration-500">{value}</span>
      {suffix && <span className="font-drama text-xl md:text-2xl italic text-accent">{suffix}</span>}
    </div>
    <div className="mt-4 h-[1px] w-full bg-foreground/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
    </div>
  </div>
);
