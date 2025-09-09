import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Line.css'; // Убедитесь, что импортируете правильный CSS-файл

const Line = ({ width = '100%', height = '100vh' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sceneElement = sceneRef.current;
    if (!container || !sceneElement) return;

    // Инициализация Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    // --- НАСТРОЙКИ ЭФФЕКТА ---
    const grainStrength = 0.15;
    const grainSize = 3.5;

    // Материал шейдера
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        iTime: { value: 0.0 },
        grainStrength: { value: grainStrength },
        grainSize: { value: grainSize },
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
        uniform float grainStrength;
        uniform float grainSize;

        #define PI 3.14159265359

        // --- НАСТРОЙКИ ЭФФЕКТА ---
        #define BACKGROUND_COLOR      vec3(0.07, 0.07, 0.08)
        #define LINE_CORE_COLOR       vec3(1.0, 1.0, 1.0)
        #define LINE_CORE_WIDTH       0.004
        #define RAINBOW_SPREAD        0.15   // Насколько далеко распространяется радуга
        #define RAINBOW_INTENSITY     1.5    // Яркость радуги
        #define RAINBOW_FALLOFF       2.5    // Резкость затухания радуги от линии
        #define RAINBOW_ANIMATION_SPEED 0.5  // Скорость смены цветов
        #define RAINBOW_NOISE_STRENGTH 0.4   // Сила "мерцания" радуги

        // Функция для получения цвета радуги по значению от 0 до 1
        vec3 getRainbowColor(float t) {
            t = fract(t); // Убедимся, что t в диапазоне [0, 1)
            vec3 c;
            float segment = 1.0 / 6.0;
            if (t < segment) c = mix(vec3(1,0,0), vec3(1,0.5,0), t/segment);
            else if (t < 2.0 * segment) c = mix(vec3(1,0.5,0), vec3(1,1,0), (t-segment)/segment);
            else if (t < 3.0 * segment) c = mix(vec3(1,1,0), vec3(0,1,0), (t-2.0*segment)/segment);
            else if (t < 4.0 * segment) c = mix(vec3(0,1,0), vec3(0,0.5,1), (t-3.0*segment)/segment);
            else if (t < 5.0 * segment) c = mix(vec3(0,0.5,1), vec3(0,0,1), (t-4.0*segment)/segment);
            else c = mix(vec3(0,0,1), vec3(0.5,0,1), (t-5.0*segment)/segment);
            return c;
        }

        // Хелпер-функция для вычисления расстояния от точки до отрезка
        // Возвращает .x = расстояние, .y = позиция вдоль отрезка (0-1)
        vec2 distToSegment(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a; vec2 ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
            return vec2(length(pa - ba * h), h);
        }
        
        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }

        // --- ОСНОВНАЯ ФУНКЦИЯ ДЛЯ РИСОВАНИЯ ЛИНИИ И РАССЕЯННОЙ РАДУГИ ---
        vec3 drawLineAndRainbow(vec2 uv, vec2 start, vec2 end, float time) {
            // Вычисляем расстояние до отрезка и позицию на нем
            vec2 distData = distToSegment(uv, start, end);
            float perp_dist = distData.x; // перпендикулярное расстояние до линии
            float along_dist = distData.y; // позиция вдоль линии (0.0 на start, 1.0 на end)

            // 1. Рисуем ядро (белая яркая линия в центре)
            float core_glow = smoothstep(LINE_CORE_WIDTH * 2.0, 0.0, perp_dist);
            vec3 core_color = LINE_CORE_COLOR * core_glow;
            
            // 2. Рисуем радужное рассеивание
            // Интенсивность радуги зависит от расстояния от центра линии (максимум на концах)
            float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0);

            // Интенсивность затухает по мере удаления от линии
            float rainbow_mask = smoothstep(RAINBOW_SPREAD, 0.0, perp_dist);
            
            // Добавляем немного шума для "оживления"
            float noise = hash(uv * 10.0 - time) * RAINBOW_NOISE_STRENGTH;
            rainbow_mask *= 1.0 - noise;

            // Определяем цвет радуги на основе расстояния и времени
            float color_phase = perp_dist * (10.0 / RAINBOW_SPREAD) - time * RAINBOW_ANIMATION_SPEED;
            vec3 rainbow_color = getRainbowColor(color_phase);
            
            // Собираем итоговый цвет радуги
            rainbow_color *= rainbow_mask * end_factor * RAINBOW_INTENSITY;
            
            // Смешиваем ядро и радугу
            return max(core_color, rainbow_color);
        }


        void main() {
            // Нормализуем координаты
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            float time = iTime;

            // Определяем начальную и конечную точки линии
            vec2 start_point = vec2(-0.7, 0.0);
            vec2 end_point = vec2(0.7, 0.0);

            // Рисуем линию с эффектом
            vec3 effect_color = drawLineAndRainbow(uv, start_point, end_point, time);
            
            // Устанавливаем фон и добавляем эффект
            vec3 final_color = BACKGROUND_COLOR + effect_color;
            
            // Добавляем зернистость для атмосферы
            float bg_noise = hash(vUv * grainSize + time * 0.1) * grainStrength;
            final_color += bg_noise - grainStrength * 0.5;

            gl_FragColor = vec4(final_color, 1.0);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationIdRef.current) animate();
        } else {
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
          }
        }
      },
      { root: null, threshold: 0 }
    );

    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

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
    <div
      ref={containerRef}
      className="fractal-orb-container"
      style={{ width, height }}
    >
      <div ref={sceneRef} className="three-container"></div>
      <div className="content">
        {/* Ваш контент здесь, если он нужен */}
      </div>
    </div>
  );
};

export default Line;