import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// Возвращаем Center в импорты
import { useGLTF, Stage, Center } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('/models/kolonna.glb');
  return <primitive object={scene} {...props} />;
}

export default function StaticColumn() {
  // Укажите здесь желаемый угол в ГРАДУСАХ
  const angleInDegrees = 240; 
  
  // Конвертируем градусы в радианы
  const rotationInRadians = (Math.PI / 180) * angleInDegrees;

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Stage по-прежнему настраивает свет и камеру */}
        <Stage environment="city" intensity={0.6} adjustCamera={1}>
          
          {/* 1. ГРУППА ДЛЯ ВРАЩЕНИЯ */}
          {/* Мы применяем вращение к внешней обертке */}
          <group rotation={[0, rotationInRadians, 0]}>

            {/* 2. ЦЕНТРИРОВАНИЕ ПЕРЕД ВРАЩЕНИЕМ */}
            {/* Center исправляет проблему с точкой вращения. Он центрирует модель, */}
            {/* и теперь внешняя группа будет вращать ее вокруг ее настоящего центра. */}
            <Center>
              <Model />
            </Center>
            
          </group>
        </Stage>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/models/kolonna.glb');