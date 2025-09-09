import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './FractalPyramidComponent.css'; // Убедитесь, что импортируете правильный CSS-файл

const FractalOrbComponent = ({ width = '100%', height = '100vh' }) => {
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
    const primaryColor = [224, 224, 224];
    const secondaryColor = [255, 244, 244];
    const grainStrength = 0.15;
    const grainSize = 3.5;
    const animationSpeed = 0.3;
    const autoRotate = true;
    const pyramidHeight = 1.0;
    const pyramidWidth = 1.0;

    // Материал шейдера
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        iTime: { value: 0.0 },
        primaryColor: {
          value: new THREE.Color().fromArray(primaryColor.map((c) => c / 255)),
        },
        secondaryColor: {
          value: new THREE.Color().fromArray(secondaryColor.map((c) => c / 255)),
        },
        grainStrength: { value: grainStrength },
        grainSize: { value: grainSize },
        animationSpeed: { value: animationSpeed },
        autoRotate: { value: autoRotate ? 1.0 : 0.0 },
        pyramidHeight: { value: pyramidHeight },
        pyramidWidth: { value: pyramidWidth }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform float grainStrength;
        uniform float grainSize;

        #define PI 3.14159265359

        // --- ОБЩИЕ НАСТРОЙКИ ВИЗУАЛА ---
        #define BACKGROUND_COLOR vec3(0.07, 0.07, 0.08)

        // --- НАСТРОЙКИ ПИРАМИДЫ ---
        #define PYRAMID_EDGE_THICKNESS 0.012
        #define PYRAMID_NOISE_STRENGTH 0.3
        #define PYRAMID_BACK_LINE_INTENSITY 0.3
        #define PYRAMID_COLOR vec3(1.0, 1.0, 1.0)

        // --- НАСТРОЙКИ ВХОДЯЩЕГО ЛУЧА ---
        #define BEAM_CORE_WIDTH 0.005
        #define BEAM_GLOW_WIDTH 0.04
        #define BEAM_GLOW_COLOR vec3(0.4, 0.6, 1.0)
        #define BEAM_NOISE_SPEED 2.0
        #define BEAM_NOISE_STRENGTH 0.4

        // --- НАСТРОЙКИ РАДУГИ ---
        #define RAINBOW_ARC_WIDTH 0.45
        #define RAINBOW_ANGLE_OFFSET -0.35
        #define RAINBOW_FALLOFF 0.5
        #define RAINBOW_NOISE_STRENGTH 0.35
        #define RAINBOW_FADEOUT_DISTANCE 5.0
        #define RAINBOW_HUE_START 0.0
        #define RAINBOW_HUE_END 0.83
        #define RAINBOW_SATURATION 0.9

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
        float distToSegment(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a, ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
            return length(pa - ba * h);
        }
        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        // --- ФУНКЦИЯ ВХОДЯЩЕГО ЛУЧА ---
        vec3 drawEnergyBeam(vec2 uv, vec2 start, vec2 end, float time) {
            float noise_offset = (hash(vec2(uv.y * 20.0, time * 0.1)) - 0.5) * 0.2;
            uv.y += noise_offset * BEAM_NOISE_STRENGTH;
            float d = distToSegment(uv, start, end);
            d += (hash(uv * 10.0 - time * BEAM_NOISE_SPEED) - 0.5) * 0.01 * BEAM_NOISE_STRENGTH;
            float core = smoothstep(BEAM_CORE_WIDTH, 0.0, d);
            float glow = smoothstep(BEAM_GLOW_WIDTH, 0.0, d) * 0.5;
            return vec3(1.0) * core + BEAM_GLOW_COLOR * glow;
        }

        // --- ФУНКЦИЯ РАДУГИ ---
        vec3 drawEtherealRainbow(vec2 uv, vec2 center, float time) {
            vec2 base_ray_dir = vec2(cos(RAINBOW_ANGLE_OFFSET), sin(RAINBOW_ANGLE_OFFSET));
            vec2 dir_to_pixel = uv - center;
            float dist_from_center = length(dir_to_pixel);
            dir_to_pixel = normalize(dir_to_pixel + 0.0001);

            float angle_diff = acos(clamp(dot(dir_to_pixel, base_ray_dir), -1.0, 1.0));

            float arc_mask = smoothstep(RAINBOW_ARC_WIDTH / 2.0 + RAINBOW_FALLOFF, RAINBOW_ARC_WIDTH / 2.0, angle_diff);
            if (arc_mask < 0.01) return vec3(0.0);

            float pixel_angle = atan(dir_to_pixel.y, dir_to_pixel.x);
            float base_angle = atan(base_ray_dir.y, base_ray_dir.x);
            float signed_angle_diff = pixel_angle - base_angle;

            if(signed_angle_diff > PI) signed_angle_diff -= 2.0*PI;
            if(signed_angle_diff < -PI) signed_angle_diff += 2.0*PI;

            float normalized_angle = (signed_angle_diff + RAINBOW_ARC_WIDTH / 2.0) / RAINBOW_ARC_WIDTH;
            float hue = mix(RAINBOW_HUE_START, RAINBOW_HUE_END, normalized_angle);

            float noise_val = (hash(uv*5.0 + time) - 0.5);
            float intensity = arc_mask * (1.0 - smoothstep(0.4, RAINBOW_FADEOUT_DISTANCE, dist_from_center));
            intensity = pow(intensity, 1.5) * (1.0 + noise_val * RAINBOW_NOISE_STRENGTH);

            vec3 rainbow_color = hsv2rgb(vec3(hue, RAINBOW_SATURATION, 1.0));
            return rainbow_color * intensity;
        }

        // --- ФУНКЦИЯ ЛИНИИ ПИРАМИДЫ ---
        float drawPyramidLine(vec2 uv, vec3 p1_3d, vec3 p2_3d, float time) {
            float depth = (p1_3d.z + p2_3d.z) * 0.5;
            float intensity_by_depth = mix(PYRAMID_BACK_LINE_INTENSITY, 1.0, smoothstep(-0.5, 0.5, depth));
            vec2 p1 = p1_3d.xy;
            vec2 p2 = p2_3d.xy;
            float dist = distToSegment(uv, p1, p2);
            float noise = (hash(uv * 10.0 + time * 2.0) - 0.5);
            dist += noise * PYRAMID_NOISE_STRENGTH * PYRAMID_EDGE_THICKNESS;
            float line = 1.0 - smoothstep(0.0, PYRAMID_EDGE_THICKNESS, dist);
            return line * intensity_by_depth;
        }

        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            float time = iTime * 0.4;

            // 3D точки пирамиды и их поворот
            float h = 1.4; float w = 0.8;
            vec3 apex = vec3(0.0, h / 2.0, 0.0); vec3 base_fl = vec3(-w, -h / 2.0, w); vec3 base_fr = vec3(w, -h / 2.0, w); vec3 base_bl = vec3(-w, -h / 2.0, -w); vec3 base_br = vec3(w, -h / 2.0, -w);
            mat3 rot = rotateY(time) * rotateX(0.25);
            apex *= rot; base_fl *= rot; base_fr *= rot; base_bl *= rot; base_br *= rot;

            // Рисуем все 8 линий пирамиды
            float pyramid_mask = 0.0;
            pyramid_mask += drawPyramidLine(uv, apex, base_fl, iTime);
            pyramid_mask += drawPyramidLine(uv, apex, base_fr, iTime);
            pyramid_mask += drawPyramidLine(uv, apex, base_bl, iTime);
            pyramid_mask += drawPyramidLine(uv, apex, base_br, iTime);
            pyramid_mask += drawPyramidLine(uv, base_fl, base_fr, iTime);
            pyramid_mask += drawPyramidLine(uv, base_fr, base_br, iTime);
            pyramid_mask += drawPyramidLine(uv, base_br, base_bl, iTime);
            pyramid_mask += drawPyramidLine(uv, base_bl, base_fl, iTime);
            pyramid_mask = clamp(pyramid_mask, 0.0, 1.0);

            // --- Собираем все источники света ---
            vec3 light_color = vec3(0.0);

            vec2 rainbow_center = vec2(0.3, 0.0);
            vec2 beam_target_point = vec2(-0.4, 0.0);

            // --- ИЗМЕНЕНИЕ: Динамически вычисляем левый край экрана ---
            // Это гарантирует, что луч всегда начинается за кадром, независимо от соотношения сторон.
            float aspect = iResolution.x / iResolution.y;
            vec2 beam_start_point = vec2(-aspect - 0.1, 0.0); // Начинаем с левого края + небольшой буфер

            // Рисуем луч, используя динамическую начальную точку
            light_color += drawEnergyBeam(uv, beam_start_point, beam_target_point, iTime);

            // Рисуем радугу из ее собственного центра
            light_color += drawEtherealRainbow(uv, rainbow_center, iTime);

            // --- Финальная композиция ---
            vec3 final_color = BACKGROUND_COLOR;
            final_color = mix(final_color, PYRAMID_COLOR, pyramid_mask);
            final_color = max(final_color, light_color);
            vec2 uvRandom = vUv;
            uvRandom.y *= hash(vec2(uvRandom.y, iTime * 0.01));
            float bg_noise = hash(uvRandom * grainSize + iTime * 0.1) * grainStrength;
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

export default FractalOrbComponent;