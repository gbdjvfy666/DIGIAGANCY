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

    // Материал шейдера
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

        #define BACKGROUND_COLOR vec3(0.07, 0.07, 0.08)
        #define PYRAMID_EDGE_THICKNESS 0.012
        #define PYRAMID_NOISE_STRENGTH 0.3
        #define PYRAMID_BACK_LINE_INTENSITY 0.3
        #define PYRAMID_COLOR vec3(1.0, 1.0, 1.0)
        #define BEAM_CORE_WIDTH 0.005
        #define BEAM_GLOW_WIDTH 0.04
        #define BEAM_GLOW_COLOR vec3(0.4, 0.6, 1.0)
        #define BEAM_NOISE_SPEED 2.0
        #define BEAM_NOISE_STRENGTH 0.4
        #define RAINBOW_ARC_WIDTH 0.30
        #define RAINBOW_FALLOFF 0.5
        #define RAINBOW_FADEOUT_DISTANCE 5.0
        #define NEW_LINE_CORE_WIDTH       0.004
        #define NEW_RAINBOW_SPREAD        0.15
        #define NEW_RAINBOW_INTENSITY     1.5
        #define NEW_RAINBOW_ANIMATION_SPEED 0.5
        #define NEW_RAINBOW_NOISE_STRENGTH 0.4
        #define RAINBOW_COLOR_SHIFT_SPEED 0.1

        // --- НОВЫЕ ПАРАМЕТРЫ ДЛЯ УПРАВЛЕНИЯ ИСКАЖЕНИЕМ ЦВЕТОВ ---
        // Сила искажения. 0.0 - нет искажения, 0.2 - заметное искажение.
        #define RAINBOW_DISTORTION_STRENGTH 0.2
        // Масштаб "волн". Больше значение -> волны мельче и чаще.
        #define RAINBOW_DISTORTION_SCALE    4.0
        // Скорость анимации "волн".
        #define RAINBOW_DISTORTION_SPEED    0.2


        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }

        // --- НОВАЯ ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ ПЛАВНОГО ШУМА ---
        // Она создает псевдо-случайные значения, которые плавно переходят друг в друга.
        float smoothNoise(vec2 uv) {
            vec2 i = floor(uv);
            vec2 f = fract(uv);
            
            // Плавная интерполяция
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        mat3 rotateX(float angle) { float s = sin(angle); float c = cos(angle); return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c); }
        mat3 rotateY(float angle) { float s = sin(angle); float c = cos(angle); return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c); }
        vec2 distToSegment(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a; vec2 ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return vec2(length(pa - ba * h), h); }
        float getTriangleSign(vec2 p1, vec2 p2, vec2 p3) { return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y); }
        bool isInsideTriangle(vec2 pt, vec2 v1, vec2 v2, vec2 v3) { float d1 = getTriangleSign(pt, v1, v2); float d2 = getTriangleSign(pt, v2, v3); float d3 = getTriangleSign(pt, v3, v1); bool has_neg = (d1 < 0.0) || (d2 < 0.0) || (d3 < 0.0); bool has_pos = (d1 > 0.0) || (d2 > 0.0) || (d3 > 0.0); return !(has_neg && has_pos); }
        vec3 drawEnergyBeam(vec2 uv, vec2 start, vec2 end, float time) { float d = distToSegment(uv, start, end).x; d += (hash(uv * 10.0 - time * BEAM_NOISE_SPEED) - 0.5) * 0.01 * BEAM_NOISE_STRENGTH; float core = smoothstep(BEAM_CORE_WIDTH, 0.0, d); float glow = smoothstep(BEAM_GLOW_WIDTH, 0.0, d) * 0.5; return vec3(1.0) * core + BEAM_GLOW_COLOR * glow; }
        vec3 getRainbowColor(float t) { t = fract(t); vec3 red=vec3(1.0,0.0,0.0), orange=vec3(1.0,0.65,0.0), yellow=vec3(1.0,1.0,0.0), green=vec3(0.0,1.0,0.0), blue=vec3(0.0,0.75,1.0), violet=vec3(0.5,0.0,1.0); float seg = 1.0/6.0; if(t<seg) return mix(red,orange,t/seg); if(t<seg*2.0) return mix(orange,yellow,(t-seg)/seg); if(t<seg*3.0) return mix(yellow,green,(t-seg*2.0)/seg); if(t<seg*4.0) return mix(green,blue,(t-seg*3.0)/seg); if(t<seg*5.0) return mix(blue,violet,(t-4.0*seg)/seg); return mix(violet, red, (t-5.0*seg)/seg); }
        vec3 drawPlannedLine_Left(vec2 uv, vec2 start, vec2 end, float time) { vec2 distData = distToSegment(uv, start, end); float perp_dist = distData.x; float along_dist = distData.y; float core_glow = smoothstep(NEW_LINE_CORE_WIDTH * 22.5, 0.0, perp_dist); vec3 core_color = vec3(1.0) * core_glow; float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0); float rainbow_mask = smoothstep(NEW_RAINBOW_SPREAD, 0.0, perp_dist); float noise = hash(uv * 10.0 - time) * NEW_RAINBOW_NOISE_STRENGTH; rainbow_mask *= (1.0 - noise); float color_phase = perp_dist * (10.0 / NEW_RAINBOW_SPREAD) - time * NEW_RAINBOW_ANIMATION_SPEED; vec3 rainbow_color = getRainbowColor(color_phase); float fade_factor = pow(along_dist, 2.0); rainbow_color *= rainbow_mask * end_factor * (NEW_RAINBOW_INTENSITY * 0.4) * fade_factor; return max(core_color, rainbow_color); }
        vec3 drawPlannedLine_Right(vec2 uv, vec2 start, vec2 end, float time) { vec2 distData = distToSegment(uv, start, end); float perp_dist = distData.x; float along_dist = distData.y; float core_glow = smoothstep(NEW_LINE_CORE_WIDTH * 22.5, 0.0, perp_dist); vec3 core_color = vec3(1.0) * core_glow; float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0); float rainbow_mask = smoothstep(NEW_RAINBOW_SPREAD, 0.0, perp_dist); float noise = hash(uv * 10.0 - time) * NEW_RAINBOW_NOISE_STRENGTH; rainbow_mask *= (1.0 - noise); float color_phase = perp_dist * (10.0 / NEW_RAINBOW_SPREAD) - time * NEW_RAINBOW_ANIMATION_SPEED; vec3 rainbow_color = getRainbowColor(color_phase); float fade_factor = pow(along_dist, 2.0); rainbow_color *= rainbow_mask * end_factor * NEW_RAINBOW_INTENSITY * fade_factor; vec3 final_line_color = max(core_color, rainbow_color); return final_line_color * 0.85; }
        
        // --- ИЗМЕНЕННАЯ ФУНКЦИЯ ---
        vec3 drawEtherealRainbow(vec2 uv, vec2 center, float time) {
            vec2 dir_to_pixel = uv - center;
            float dist_from_center = length(dir_to_pixel);
            dir_to_pixel = normalize(dir_to_pixel + 0.0001);
            float angle_diff = acos(clamp(dot(dir_to_pixel, vec2(1.0, 0.0)),-1.0,1.0));
            float arc_mask = smoothstep(RAINBOW_ARC_WIDTH/2.0 + RAINBOW_FALLOFF, RAINBOW_ARC_WIDTH/2.0, angle_diff);
            if(arc_mask < 0.01) return vec3(0.0);
            
            float signed_angle_diff = atan(dir_to_pixel.y, dir_to_pixel.x);
            float normalized_angle = (signed_angle_diff + RAINBOW_ARC_WIDTH/2.0) / RAINBOW_ARC_WIDTH;
            
            float intensity = arc_mask * (1.0 - smoothstep(0.4, RAINBOW_FADEOUT_DISTANCE, dist_from_center));
            intensity = pow(intensity, 1.5) * (1.0 - hash(uv*5.0 + time) * 0.35); // RAINBOW_NOISE_STRENGTH
            
            // 1. Генерируем плавный шум. В качестве координат используем положение на радуге и время.
            float distortion = smoothNoise(vec2(
                normalized_angle * RAINBOW_DISTORTION_SCALE, 
                time * RAINBOW_DISTORTION_SPEED
            ));
            // Переводим шум из диапазона [0, 1] в [-1, 1], чтобы он мог сдвигать цвета в обе стороны.
            distortion = (distortion - 0.5) * 2.0;

            // 2. Рассчитываем итоговую позицию цвета:
            //    - Базовое положение на радуге (normalized_angle)
            //    - Плавное "вращение" всех цветов (time * RAINBOW_COLOR_SHIFT_SPEED)
            //    - Случайное искажение от шума (distortion * RAINBOW_DISTORTION_STRENGTH)
            float color_phase = normalized_angle + time * RAINBOW_COLOR_SHIFT_SPEED + distortion * RAINBOW_DISTORTION_STRENGTH;
            
            // 3. Получаем цвет и умножаем на его интенсивность
            return getRainbowColor(color_phase) * intensity;
        }

        float drawPyramidLine(vec2 uv, vec3 p1_3d, vec3 p2_3d, float time, out float depth) { depth = (p1_3d.z + p2_3d.z) * 0.5; float intensity_by_depth = mix(PYRAMID_BACK_LINE_INTENSITY, 1.0, smoothstep(-0.5, 0.5, depth)); float dist = distToSegment(uv, p1_3d.xy, p2_3d.xy).x + (hash(uv * 10.0 + time * 2.0) - 0.5) * PYRAMID_NOISE_STRENGTH * PYRAMID_EDGE_THICKNESS; return (1.0 - smoothstep(0.0, PYRAMID_EDGE_THICKNESS, dist)) * intensity_by_depth; }
        
        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            float time = iTime * 0.4;

            float h = 1.4; float w = 0.8;
            vec3 apex = vec3(0.0, h/2.0, 0.0);
            vec3 base_fl=vec3(-w,-h/2.0,w), base_fr=vec3(w,-h/2.0,w), base_bl=vec3(-w,-h/2.0,-w), base_br=vec3(w,-h/2.0,-w);
            mat3 rot = rotateY(time) * rotateX(0.25);
            apex*=rot; base_fl*=rot; base_fr*=rot; base_bl*=rot; base_br*=rot;

            float occlusion_mask = 0.0;
            vec3 v1, v2, v3, N;
            v1=apex; v2=base_bl; v3=base_br; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0;
            if(occlusion_mask < 1.0) { v1=apex; v2=base_br; v3=base_fr; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=apex; v2=base_fr; v3=base_fl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=apex; v2=base_fl; v3=base_bl; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=base_fl; v2=base_bl; v3=base_br; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }
            if(occlusion_mask < 1.0) { v1=base_fl; v2=base_br; v3=base_fr; N=cross(v2-v1,v3-v1); if(N.z>0.0 && isInsideTriangle(uv,v1.xy,v2.xy,v3.xy)) occlusion_mask=1.0; }

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

            vec2 rainbow_center = vec2(0.15, 0.0);
            vec2 beam_target_point = vec2(-0.4, 0.0);
            
            vec3 light_color = vec3(0.0);
            light_color += drawEnergyBeam(uv, vec2(-iResolution.x/iResolution.y - 0.1, 0.0), beam_target_point, iTime);
            light_color += drawEtherealRainbow(uv, rainbow_center, iTime);
            light_color += drawPlannedLine_Left(uv, vec2(-3.0, 0.0), vec2(0.0, 0.0), iTime);
            light_color += drawPlannedLine_Right(uv, vec2(-0.1, 0.0), vec2(3.0, 0.0), iTime);
            
            vec3 final_color = BACKGROUND_COLOR;
            final_color += light_color * (1.0 - occlusion_mask);
            final_color = mix(final_color, PYRAMID_COLOR, wireframe_mask);
            
            float grainStrength = 0.15;
            float grainSize = 3.5;
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
      <div className="content"></div>
    </div>
  );
};

export default FractalOrbComponent;