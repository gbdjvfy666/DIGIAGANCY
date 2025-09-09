import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LinePrisma.css';

const LinePrisma = ({ width = '100%', height = '100vh' }) => {
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

        // --- ОБЩИЕ НАСТРОЙКИ ---
        #define BACKGROUND_COLOR vec3(0.07, 0.07, 0.08)

        // --- НАСТРОЙКИ ПИРАМИДЫ ---
        #define PYRAMID_EDGE_THICKNESS 0.012
        #define PYRAMID_NOISE_STRENGTH 0.3
        #define PYRAMID_BACK_LINE_INTENSITY 0.3
        #define PYRAMID_COLOR vec3(1.0, 1.0, 1.0)
        
        // --- НАСТРОЙКИ ЛИНИИ/РАДУГИ ---
        #define LINE_CORE_COLOR       vec3(1.0, 1.0, 1.0)
        #define LINE_CORE_WIDTH       0.004
        #define RAINBOW_SPREAD        0.15   // Насколько далеко распространяется радуга
        #define RAINBOW_INTENSITY     1.5    // Яркость радуги
        #define RAINBOW_ANIMATION_SPEED 0.5  // Скорость смены цветов
        #define RAINBOW_NOISE_STRENGTH 0.4   // Сила "мерцания" радуги
        
        // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        mat3 rotateX(float angle) {
            float s = sin(angle); float c = cos(angle);
            return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
        }
        mat3 rotateY(float angle) {
            float s = sin(angle); float c = cos(angle);
            return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
        }
        
        // Возвращает .x = расстояние до отрезка, .y = позиция вдоль отрезка (0-1)
        vec2 distToSegment(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a; vec2 ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
            return vec2(length(pa - ba * h), h);
        }

        float getTriangleSign(vec2 p1, vec2 p2, vec2 p3) {
            return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        }
        bool isInsideTriangle(vec2 pt, vec2 v1, vec2 v2, vec2 v3) {
            float d1 = getTriangleSign(pt, v1, v2);
            float d2 = getTriangleSign(pt, v2, v3);
            float d3 = getTriangleSign(pt, v3, v1);
            bool has_neg = (d1 < 0.0) || (d2 < 0.0) || (d3 < 0.0);
            bool has_pos = (d1 > 0.0) || (d2 > 0.0) || (d3 > 0.0);
            return !(has_neg && has_pos);
        }
        
        // --- ФУНКЦИИ РИСОВАНИЯ ---
        
        vec3 getRainbowColor(float t) {
            t = fract(t);
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

        vec3 drawLineAndRainbow(vec2 uv, vec2 start, vec2 end, float time) {
            vec2 distData = distToSegment(uv, start, end);
            float perp_dist = distData.x;
            float along_dist = distData.y;

            float core_glow = smoothstep(LINE_CORE_WIDTH * 2.0, 0.0, perp_dist);
            vec3 core_color = LINE_CORE_COLOR * core_glow;
            
            float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0);
            float rainbow_mask = smoothstep(RAINBOW_SPREAD, 0.0, perp_dist);
            float noise = hash(uv * 10.0 - time) * RAINBOW_NOISE_STRENGTH;
            rainbow_mask *= 1.0 - noise;

            float color_phase = perp_dist * (10.0 / RAINBOW_SPREAD) - time * RAINBOW_ANIMATION_SPEED;
            vec3 rainbow_color = getRainbowColor(color_phase);
            
            rainbow_color *= rainbow_mask * end_factor * RAINBOW_INTENSITY;
            
            return max(core_color, rainbow_color);
        }

        float drawPyramidLine(vec2 uv, vec3 p1_3d, vec3 p2_3d, float time, out float depth) {
            depth = (p1_3d.z + p2_3d.z) * 0.5;
            float intensity_by_depth = mix(PYRAMID_BACK_LINE_INTENSITY, 1.0, smoothstep(-0.5, 0.5, depth));
            float dist = distToSegment(uv, p1_3d.xy, p2_3d.xy).x + (hash(uv * 10.0 + time * 2.0) - 0.5) * PYRAMID_NOISE_STRENGTH * PYRAMID_EDGE_THICKNESS;
            return (1.0 - smoothstep(0.0, PYRAMID_EDGE_THICKNESS, dist)) * intensity_by_depth;
        }

        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            float time = iTime * 0.4;

            // 1. ОПРЕДЕЛЯЕМ ВЕРШИНЫ И ВРАЩЕНИЕ ПИРАМИДЫ
            float h = 1.4; float w = 0.8;
            vec3 apex = vec3(0.0, h/2.0, 0.0);
            vec3 base_fl=vec3(-w,-h/2.0,w), base_fr=vec3(w,-h/2.0,w), base_bl=vec3(-w,-h/2.0,-w), base_br=vec3(w,-h/2.0,-w);
            
            mat3 rot = rotateY(time) * rotateX(0.25);
            apex*=rot; base_fl*=rot; base_fr*=rot; base_bl*=rot; base_br*=rot;

            // 2. СОЗДАЕМ МАСКУ ОККЛЮЗИИ (чтобы линия была позади пирамиды)
            float occlusion_mask = 0.0;
            vec3 v1, v2, v3, N;
            
            v1=apex; v2=base_bl; v3=base_br; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0;
            if(occlusion_mask < 1.0) { v1=apex; v2=base_br; v3=base_fr; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=apex; v2=base_fr; v3=base_fl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=apex; v2=base_fl; v3=base_bl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            
            // 3. РИСУЕМ РЕБРА ПИРАМИДЫ
            float wireframe_mask = 0.0; float line_depth;
            wireframe_mask+=drawPyramidLine(uv,apex,base_fl,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,apex,base_fr,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,apex,base_bl,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,apex,base_br,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,base_fl,base_fr,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,base_fr,base_br,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,base_br,base_bl,iTime,line_depth);
            wireframe_mask+=drawPyramidLine(uv,base_bl,base_fl,iTime,line_depth);
            wireframe_mask = clamp(wireframe_mask, 0.0, 1.0);

            // 4. РИСУЕМ НОВЫЙ ЭФФЕКТ ЛИНИИ
            vec2 start_point = vec2(-1.5, 0.0);
            vec2 end_point = vec2(1.5, 0.0);
            vec3 light_effect = drawLineAndRainbow(uv, start_point, end_point, iTime);

            // 5. СОБИРАЕМ ВСЕ ВМЕСТЕ
            vec3 final_color = BACKGROUND_COLOR;
            // Добавляем эффект света, но убираем его там, где пирамида его перекрывает
            final_color += light_effect * (1.0 - occlusion_mask);
            // Накладываем ребра пирамиды поверх всего
            final_color = mix(final_color, PYRAMID_COLOR, wireframe_mask);

            // 6. Добавляем зернистость
            float bg_noise = hash(vUv * grainSize + iTime * 0.1) * grainStrength;
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

export default LinePrisma;

// большая линия
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import './FractalPyramidComponent.css'; // Убедитесь, что импортируете правильный CSS-файл

// const FractalOrbComponent = ({ width = '100%', height = '100vh' }) => {
//   const containerRef = useRef(null);
//   const sceneRef = useRef(null);
//   const rendererRef = useRef(null);
//   const animationIdRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const sceneElement = sceneRef.current;
//     if (!container || !sceneElement) return;

//     // Инициализация Three.js
//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
//     camera.position.z = 1;
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     rendererRef.current = renderer;
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     sceneElement.appendChild(renderer.domElement);

//     // --- НАСТРОЙКИ ЭФФЕКТА ---
//     const grainStrength = 0.15;
//     const grainSize = 3.5;

//     // Материал шейдера
//     const shaderMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         iResolution: {
//           value: new THREE.Vector2(container.clientWidth, container.clientHeight),
//         },
//         iTime: { value: 0.0 },
//         grainStrength: { value: grainStrength },
//         grainSize: { value: grainSize },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         precision highp float;

//         varying vec2 vUv;
//         uniform vec2 iResolution;
//         uniform float iTime;
//         uniform float grainStrength;
//         uniform float grainSize;

//         #define PI 3.14159265359

//         // --- ОБЩИЕ НАСТРОЙКИ ---
//         #define BACKGROUND_COLOR vec3(0.07, 0.07, 0.08)

//         // --- НАСТРОЙКИ ПИРАМИДЫ ---
//         #define PYRAMID_EDGE_THICKNESS 0.012
//         #define PYRAMID_NOISE_STRENGTH 0.3
//         #define PYRAMID_BACK_LINE_INTENSITY 0.3
//         #define PYRAMID_COLOR vec3(1.0, 1.0, 1.0)
        
//         // --- НАСТРОЙКИ НОВОЙ ЛИНИИ/РАДУГИ ---
//         #define LINE_CORE_COLOR       vec3(1.0, 1.0, 1.0)
//         #define LINE_CORE_WIDTH       0.004
//         #define RAINBOW_SPREAD        0.15   // Насколько далеко распространяется радуга
//         #define RAINBOW_INTENSITY     1.5    // Яркость радуги
//         #define RAINBOW_ANIMATION_SPEED 0.5  // Скорость смены цветов
//         #define RAINBOW_NOISE_STRENGTH 0.4   // Сила "мерцания" радуги

//         // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
//         float hash(vec2 p) {
//             p = fract(p * vec2(123.34, 456.21));
//             p += dot(p, p + 45.32);
//             return fract(p.x * p.y);
//         }
//         mat3 rotateX(float angle) {
//             float s = sin(angle); float c = cos(angle);
//             return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
//         }
//         mat3 rotateY(float angle) {
//             float s = sin(angle); float c = cos(angle);
//             return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
//         }

//         // ОБНОВЛЕННАЯ ФУНКЦИЯ: возвращает vec2(расстояние, позиция_на_отрезке)
//         vec2 distToSegment(vec2 p, vec2 a, vec2 b) {
//             vec2 pa = p - a; vec2 ba = b - a;
//             float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
//             return vec2(length(pa - ba * h), h);
//         }

//         float getTriangleSign(vec2 p1, vec2 p2, vec2 p3) {
//             return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
//         }
//         bool isInsideTriangle(vec2 pt, vec2 v1, vec2 v2, vec2 v3) {
//             float d1 = getTriangleSign(pt, v1, v2);
//             float d2 = getTriangleSign(pt, v2, v3);
//             float d3 = getTriangleSign(pt, v3, v1);
//             bool has_neg = (d1 < 0.0) || (d2 < 0.0) || (d3 < 0.0);
//             bool has_pos = (d1 > 0.0) || (d2 > 0.0) || (d3 > 0.0);
//             return !(has_neg && has_pos);
//         }
        
//         // --- ФУНКЦИИ РИСОВАНИЯ ---
        
//         // Улучшенная функция для радуги
//         vec3 getRainbowColor(float t) {
//             t = fract(t);
//             vec3 c;
//             float segment = 1.0 / 6.0;
//             if (t < segment) c = mix(vec3(1,0,0), vec3(1,0.5,0), t/segment);
//             else if (t < 2.0 * segment) c = mix(vec3(1,0.5,0), vec3(1,1,0), (t-segment)/segment);
//             else if (t < 3.0 * segment) c = mix(vec3(1,1,0), vec3(0,1,0), (t-2.0*segment)/segment);
//             else if (t < 4.0 * segment) c = mix(vec3(0,1,0), vec3(0,0.5,1), (t-3.0*segment)/segment);
//             else if (t < 5.0 * segment) c = mix(vec3(0,0.5,1), vec3(0,0,1), (t-4.0*segment)/segment);
//             else c = mix(vec3(0,0,1), vec3(0.5,0,1), (t-5.0*segment)/segment);
//             return c;
//         }

//         // НОВАЯ ЕДИНАЯ ФУНКЦИЯ ДЛЯ СВЕТОВОГО ЭФФЕКТА
//         vec3 drawLineAndRainbow(vec2 uv, vec2 start, vec2 end, float time) {
//             vec2 distData = distToSegment(uv, start, end);
//             float perp_dist = distData.x; // перпендикулярное расстояние до линии
//             float along_dist = distData.y; // позиция вдоль линии (0.0 на start, 1.0 на end)

//             // 1. Рисуем ядро (белая яркая линия в центре)
//             float core_glow = smoothstep(LINE_CORE_WIDTH * 1.5, 0.0, perp_dist);
//             vec3 core_color = LINE_CORE_COLOR * core_glow;
            
//             // 2. Рисуем радужное рассеивание
//             // Интенсивность радуги зависит от расстояния от центра линии (максимум на концах)
//             float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0);
//             float rainbow_mask = smoothstep(RAINBOW_SPREAD, 0.0, perp_dist);
            
//             // Добавляем немного шума для "оживления"
//             float noise = hash(uv * 10.0 - time) * RAINBOW_NOISE_STRENGTH;
//             rainbow_mask *= (1.0 - noise);

//             // Определяем цвет радуги на основе расстояния и времени
//             float color_phase = perp_dist * (10.0 / RAINBOW_SPREAD) - time * RAINBOW_ANIMATION_SPEED;
//             vec3 rainbow_color = getRainbowColor(color_phase);
            
//             // Собираем итоговый цвет радуги
//             rainbow_color *= rainbow_mask * end_factor * RAINBOW_INTENSITY;
            
//             // Смешиваем ядро и радугу, возвращая самый яркий цвет
//             return max(core_color, rainbow_color);
//         }

//         float drawPyramidLine(vec2 uv, vec3 p1_3d, vec3 p2_3d, float time, out float depth) {
//             depth = (p1_3d.z + p2_3d.z) * 0.5;
//             float intensity_by_depth = mix(PYRAMID_BACK_LINE_INTENSITY, 1.0, smoothstep(-0.5, 0.5, depth));
//             // ИСПРАВЛЕНИЕ: используем .x, т.к. distToSegment теперь возвращает vec2
//             float dist = distToSegment(uv, p1_3d.xy, p2_3d.xy).x + (hash(uv * 10.0 + time * 2.0) - 0.5) * PYRAMID_NOISE_STRENGTH * PYRAMID_EDGE_THICKNESS;
//             return (1.0 - smoothstep(0.0, PYRAMID_EDGE_THICKNESS, dist)) * intensity_by_depth;
//         }

//         void main() {
//             vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
//             float time = iTime * 0.4;

//             // 1. ОПРЕДЕЛЯЕМ ВЕРШИНЫ И ВРАЩЕНИЕ ПИРАМИДЫ
//             float h = 1.4; float w = 0.8;
//             vec3 apex = vec3(0.0, h/2.0, 0.0);
//             vec3 base_fl=vec3(-w,-h/2.0,w), base_fr=vec3(w,-h/2.0,w), base_bl=vec3(-w,-h/2.0,-w), base_br=vec3(w,-h/2.0,-w);
            
//             mat3 rot = rotateY(time) * rotateX(0.25);
//             apex*=rot; base_fl*=rot; base_fr*=rot; base_bl*=rot; base_br*=rot;

//             // 2. СОЗДАЕМ МАСКУ ОККЛЮЗИИ (чтобы линия была позади пирамиды)
//             float occlusion_mask = 0.0;
//             vec3 v1, v2, v3, N;
            
//             v1=apex; v2=base_bl; v3=base_br; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0;
//             if(occlusion_mask < 1.0) { v1=apex; v2=base_br; v3=base_fr; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
//             if(occlusion_mask < 1.0) { v1=apex; v2=base_fr; v3=base_fl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
//             if(occlusion_mask < 1.0) { v1=apex; v2=base_fl; v3=base_bl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
//             if(occlusion_mask < 1.0) { v1=base_fl; v2=base_bl; v3=base_br; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
//             if(occlusion_mask < 1.0) { v1=base_fl; v2=base_br; v3=base_fr; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }

//             // 3. РИСУЕМ РЕБРА ПИРАМИДЫ
//             float wireframe_mask = 0.0; float line_depth;
//             wireframe_mask+=drawPyramidLine(uv,apex,base_fl,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,apex,base_fr,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,apex,base_bl,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,apex,base_br,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,base_fl,base_fr,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,base_fr,base_br,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,base_br,base_bl,iTime,line_depth);
//             wireframe_mask+=drawPyramidLine(uv,base_bl,base_fl,iTime,line_depth);
//             wireframe_mask = clamp(wireframe_mask, 0.0, 1.0);

//             // 4. РИСУЕМ НОВЫЙ ЭФФЕКТ ЛИНИИ
//             // Растягиваем линию далеко за пределы экрана, чтобы она выглядела "бесконечной"
//             vec2 start_point = vec2(-2.0, 0.0);
//             vec2 end_point = vec2(2.0, 0.0);
//             vec3 light_effect = drawLineAndRainbow(uv, start_point, end_point, iTime);
            
//             // 5. СОБИРАЕМ ИЗОБРАЖЕНИЕ
//             vec3 final_color = BACKGROUND_COLOR;
//             // Добавляем световой эффект, применяя к нему маску окклюзии от пирамиды
//             final_color += light_effect * (1.0 - occlusion_mask);
//             // Накладываем каркас пирамиды поверх всего
//             final_color = mix(final_color, PYRAMID_COLOR, wireframe_mask);

//             // 6. Добавляем финальную зернистость
//             float bg_noise = hash(vUv * grainSize + iTime * 0.1) * grainStrength;
//             final_color += bg_noise - grainStrength * 0.5;

//             gl_FragColor = vec4(final_color, 1.0);
//         }
//       `
//     });

//     const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
//     scene.add(plane);

//     const updateSize = () => {
//       const width = container.clientWidth;
//       const height = container.clientHeight;
//       renderer.setSize(width, height);
//       shaderMaterial.uniforms.iResolution.value.set(width, height);
//     };

//     updateSize();

//     function animate() {
//       animationIdRef.current = requestAnimationFrame(animate);
//       const time = performance.now() * 0.001;
//       shaderMaterial.uniforms.iTime.value = time;
//       renderer.render(scene, camera);
//     }

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           if (!animationIdRef.current) animate();
//         } else {
//           if (animationIdRef.current) {
//             cancelAnimationFrame(animationIdRef.current);
//             animationIdRef.current = null;
//           }
//         }
//       },
//       { root: null, threshold: 0 }
//     );

//     observer.observe(container);

//     const resizeObserver = new ResizeObserver(() => {
//       updateSize();
//     });

//     resizeObserver.observe(container);

//     return () => {
//       if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
//       observer.disconnect();
//       resizeObserver.disconnect();
//       if (sceneElement.contains(renderer.domElement)) {
//         sceneElement.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="fractal-orb-container"
//       style={{ width, height }}
//     >
//       <div ref={sceneRef} className="three-container"></div>
//       <div className="content">
//         {/* Ваш контент здесь, если он нужен */}
//       </div>
//     </div>
//   );
// };

// export default FractalOrbComponent;