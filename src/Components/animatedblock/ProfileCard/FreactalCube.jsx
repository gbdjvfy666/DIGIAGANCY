import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './FractalPyramidComponent.css'; // Убедитесь, что импортируете правильный CSS-файл

const FractalCube = ({ width = '100%', height = '100vh' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sceneElement = sceneRef.current;
    if (!container || !sceneElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        iTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        varying vec2 vUv;
        uniform vec2 iResolution;
        uniform float iTime;

        #define PI 3.14159265359

        // --- НАСТРОЙКИ ФРАКТАЛА ---
        #define FRACTAL_ITERATIONS 6 // Детализация фрактала. 6 - отлично.
        #define FRACTAL_SCALE 2.0    // Масштаб внутренних элементов
        #define ROTATION_SPEED 0.2   // Скорость вращения

        // --- Утилиты ---
        mat4 rotateY(float angle) {
            float s = sin(angle); 
            float c = cos(angle);
            return mat4(c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1);
        }

        // --- SDF ФРАКТАЛЬНОЙ ПИРАМИДЫ ---
        // Функция, которая математически описывает форму объекта
        float SierpinskiPyramidSDF(vec3 p) {
            p = abs(p);
            float d = max(p.x, p.z) + p.y - 1.0;
            vec3 a = vec3(1, 1, 1);
            float s = FRACTAL_SCALE;

            for(int i = 0; i < FRACTAL_ITERATIONS; i++) {
                p = abs(p - a) * s - a * (s - 1.0);
                d = max(d, (max(p.x,p.z) + p.y - 1.0) / pow(s, float(i + 1)));
            }
            return d;
        }

        // Карта сцены: просто вращаем и рендерим один объект
        float map(vec3 p) {
            vec3 p_rotated = (rotateY(iTime * ROTATION_SPEED) * vec4(p, 1.0)).xyz;
            return SierpinskiPyramidSDF(p_rotated);
        }

        // Расчет нормали для освещения
        vec3 calcNormal(vec3 p) {
            const float e = 0.0001;
            vec2 h = vec2(e, 0);
            return normalize(vec3(map(p+h.xyy)-map(p-h.xyy), map(p+h.yxy)-map(p-h.yxy), map(p+h.yyx)-map(p-h.yyx)));
        }

        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;

            vec3 ro = vec3(0.0, -0.5, 3.5); // Положение камеры
            vec3 rd = normalize(vec3(uv, -2.0)); // Направление луча для каждого пикселя

            vec3 finalColor = vec3(0.0); // Изначально фон черный
            float t = 0.0;
            
            // Рендер-цикл (Raymarching)
            for(int i = 0; i < 80; i++) {
                vec3 p = ro + rd * t;
                float d = map(p);

                // Если луч попал в объект
                if(d < 0.001) {
                    vec3 normal = calcNormal(p);

                    // Освещение: создаем эффект свечения по краям, когда смотрим под углом (эффект Френеля)
                    float glow = pow(1.0 - abs(dot(rd, normal)), 3.0);
                    
                    // Базовый белый цвет + яркое белое свечение
                    finalColor = vec3(0.8) + vec3(1.0) * glow;
                    
                    break; // Выходим из цикла, т.к. нашли поверхность
                }

                t += d * 0.7; // Движемся вдоль луча
                if(t > 20.0) break; // Прекращаем, если луч ушел слишком далеко
            }

            gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height);
    };
    updateSize();

    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      shaderMaterial.uniforms.iTime.value = time;
      renderer.render(scene, camera);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!animationIdRef.current) animate(); }
      else { if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; } }
    }, { root: null, threshold: 0 });
    observer.observe(container);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      observer.disconnect();
      resizeObserver.disconnect();
      if (sceneElement.contains(renderer.domElement)) {
        sceneElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fractal-orb-container" style={{ width, height }}>
      <div ref={sceneRef} className="three-container"></div>
    </div>
  );
};

export default FractalCube;