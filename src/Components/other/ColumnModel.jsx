import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Center, Bounds, Environment } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('/models/kolonna.glb');
  return <primitive object={scene} {...props} />;
}

// Компонент принимает 'position' и 'rotationInDegrees' как props
export default function StaticColumn({ 
  position = [0, 0, 0], 
  rotationInDegrees = 0 
}) {
  
  const rotationInRadians = (Math.PI / 180) * rotationInDegrees;

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
        <directionalLight intensity={0.6} position={[10, 10, 10]} />

        {/* 1. Внешняя группа использует 'position' из props. ОНА ДВИГАЕТ ВСЁ. */}
        <group position={position}>

          {/* 2. Bounds настраивает камеру ОДИН РАЗ и больше не мешает. */}
          <Bounds fit clip margin={1}>

            {/* 3. Внутренняя группа вращает модель на месте. */}
            <group rotation={[0, rotationInRadians, 0]}>
              <Center>
                <Model />
              </Center>
            </group>
            
          </Bounds>
        </group>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/models/kolonna.glb');