import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, useHelper } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { DirectionalLightHelper } from 'three';
import { Lights } from './Lights';

function MacbookModel({ isActive, isExiting, direction, isDraggingWithSlide = false }) {
  const { scene } = useGLTF('/models/macbook_air_m2.glb');
  const groupRef = useRef();
  const [hover, setHover] = useState({ x: 0, y: 0 });

  // Начальная позиция
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(0, -4, 0);
    groupRef.current.rotation.set(0, Math.PI, 0);
    groupRef.current.scale.set(0.85, 0.85, 0.85);
  }, []);
  useEffect(() => {
    if (!groupRef.current || isDraggingWithSlide) return;

    gsap.killTweensOf(groupRef.current.position);
    gsap.killTweensOf(groupRef.current.rotation);
    gsap.killTweensOf(groupRef.current.scale);

    const isMobile = window.innerWidth <= 768;
    const targetY = isMobile ? 0.5 : -0.5;

    if (isActive && !isExiting) {
      gsap.to(groupRef.current.position, {
        x: 0,
        y: targetY,
        duration: 1.2,
        ease: 'power3.out',
      });
      gsap.to(groupRef.current.rotation, {
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    }

    if (isExiting) {
      // Уводим далеко за пределы, чтобы точно скрылась
      gsap.to(groupRef.current.position, {
        x: -direction * 15, // 👈 увеличил расстояние
        y: targetY,
        duration: 0.6,
        ease: 'power3.inOut',
      });
      gsap.to(groupRef.current.scale, {
        x: 0.7,
        y: 0.7,
        z: 0.7,
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }

    if (!isActive && !isExiting) {
      // Прячем вниз, для других слайдов
      gsap.to(groupRef.current.position, {
        y: -5,
        duration: 0.7,
        ease: 'power3.inOut',
      });
      gsap.to(groupRef.current.rotation, {
        y: Math.PI,
        duration: 0.7,
        ease: 'power3.inOut',
      });
      gsap.to(groupRef.current.scale, {
        x: 0.85,
        y: 0.85,
        z: 0.85,
        duration: 0.7,
        ease: 'power3.inOut',
      });
    }
  }, [isActive, isExiting, direction, isDraggingWithSlide]);

  // Параллакс
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.2) * 2;
      const y = (e.clientY / window.innerHeight - 0.2) * -2;
      setHover({ x, y });
    };
    if (isActive && !isExiting) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, isExiting]);

  useFrame(() => {
    if (
      groupRef.current &&
      isActive &&
      !isExiting &&
      !isDraggingWithSlide
    ) {
      groupRef.current.rotation.y += (hover.x * 0.04 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (hover.y * 0.04 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return <primitive object={scene} ref={groupRef} />;
}

export default function MacbookWrapper({
  isActive,
  isExiting,
  direction,
  isDraggingWithSlide = false,
}) {
  return (
<Canvas
  shadows
  camera={{ position: [0, 0, 6], fov: 35 }}
  className="w-full h-full"
  gl={{ antialias: true }}
>
  {/* ===== ИЗМЕНЕНИЕ ЗДЕСЬ ===== */}
  <color attach="background" args={['#000000']} />
  <fog attach="fog" args={['#000000', 6, 12]} />
  <Lights />
  <Environment preset="city" background={false} intensity={0.75} />
  <EffectComposer>
    <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.85} />
  </EffectComposer>
  <MacbookModel
    isActive={isActive}
    isExiting={isExiting}
    direction={direction}
    isDraggingWithSlide={isDraggingWithSlide}
  />
</Canvas>
  );
}