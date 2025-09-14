import { useRef, useState, useEffect } from "react";
import * as THREE from 'three'; // Добавляем импорт THREE.js
import houseone from '../../assets/House/houseone.jpg';
import housetwo from '../../assets/House/housetwo.jpg';
import housethree from '../../assets/House/housethree.jpg';
import housefour from '../../assets/House/housefour.jpg';
import housefive from '../../assets/House/housefive.jpg';
import housesix from '../../assets/House/housesix.jpg';

const breakpoints = {
  phone: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280
};

const images = [houseone, housetwo, housethree, housefour, housefive, housesix];

export default function ResponsiveDemo() {
  // --- ЛОГИКА ИЗ ВАШЕГО КОМПОНЕНТА (без изменений) ---
  const [width, setWidth] = useState(breakpoints.desktop);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  
  // --- REF'ы ДЛЯ THREE.JS ФОНА ---
  const backgroundContainerRef = useRef(null);
  const sceneRef = useRef(null);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoints.tablet);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const getDisplayMode = () => {
    if (width < breakpoints.phone || isMobile) return 'mobile';
    if (width < breakpoints.tablet) return 'phone';
    if (width < breakpoints.laptop) return 'tablet';
    if (width < breakpoints.desktop) return 'desktop';
    return 'desktop';
  };
  const displayMode = getDisplayMode();

  useEffect(() => {
    const handleMove = (clientX) => {
      if (!isDragging.current) return;
      const dx = clientX - startX.current;
      const newWidth = Math.max(320, Math.min(startWidth.current + dx, 1500));
      setWidth(newWidth);
    };
    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
    const handleEnd = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);
  
  const handleStartDrag = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
    startWidth.current = width;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };
  
  useEffect(() => {
    if (isMobile) {
      setWidth(window.innerWidth - 32);
    }
  }, [isMobile]);

  // --- USE EFFECT ДЛЯ ИНИЦИАЛИЗАЦИИ ФОНА "ЖИДКАЯ ВОЛНА" ---
  useEffect(() => {
    const container = backgroundContainerRef.current;
    const sceneElement = sceneRef.current;
    if (!container || !sceneElement) return;

    let animationIdRef = null;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
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
        #define BACKGROUND_COLOR vec3(0.05, 0.05, 0.08)
        #define LIQUID_COLOR     vec3(0.1, 0.2, 0.5)
        #define GLOW_COLOR       vec3(0.2, 0.8, 1.0)
        #define WAVE_THICKNESS   0.08
        #define WAVE_SPEED       0.2
        #define WAVE_FREQ        3.0
        #define NOISE_SCALE      0.5
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }
        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            float noise_slow = snoise(vec2(uv.x * WAVE_FREQ, iTime * WAVE_SPEED));
            float noise_fast = snoise(vec2(uv.x * WAVE_FREQ * 2.0, iTime * WAVE_SPEED * 3.0));
            float wave_y = (noise_slow + noise_fast * 0.3) * NOISE_SCALE;
            float dist_from_center = abs(uv.y - wave_y);
            float glow_intensity = smoothstep(WAVE_THICKNESS * 2.0, 0.0, dist_from_center);
            float line_intensity = smoothstep(WAVE_THICKNESS, 0.0, dist_from_center);
            float h = 0.01;
            float noise_slow_ahead = snoise(vec2((uv.x + h) * WAVE_FREQ, iTime * WAVE_SPEED));
            float noise_fast_ahead = snoise(vec2((uv.x + h) * WAVE_FREQ * 2.0, iTime * WAVE_SPEED * 3.0));
            float wave_y_ahead = (noise_slow_ahead + noise_fast_ahead * 0.3) * NOISE_SCALE;
            float wave_y_deriv = (wave_y_ahead - wave_y) / h;
            vec2 normal = normalize(vec2(-wave_y_deriv, 1.0));
            float fresnel = 1.0 - abs(normal.y);
            fresnel = pow(fresnel, 3.0);
            vec3 color = BACKGROUND_COLOR;
            color = mix(color, GLOW_COLOR, glow_intensity * 0.2);
            vec3 liquid_final_color = mix(LIQUID_COLOR, GLOW_COLOR, fresnel);
            color = mix(color, liquid_final_color, line_intensity);
            float grain = (fract(sin(dot(vUv, vec2(12.9898,78.233)*2.0)) * 43758.5453) - 0.5) * 0.1;
            color += grain;
            gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);
    
    const updateSize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      shaderMaterial.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
    };
    updateSize();
    
    function animate() {
      animationIdRef = requestAnimationFrame(animate);
      shaderMaterial.uniforms.iTime.value = performance.now() * 0.001;
      renderer.render(scene, camera);
    }
    animate();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      if (animationIdRef) cancelAnimationFrame(animationIdRef);
      resizeObserver.disconnect();
      if (sceneElement.contains(renderer.domElement)) {
        sceneElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const renderImages = () => {
    switch(displayMode) {
      case 'mobile':
        return (
          <div className="relative h-full">
            <img src={images[0]} alt="Дом у моря" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 rounded-lg">
              <p className="text-sm text-zinc-300">Целый дом</p>
              <h2 className="text-xl font-bold">Дом у озера Хурон</h2>
              <div className="text-pink-400 flex items-center gap-1 text-xs mt-1">
                <span>⭐ 2.66</span>
                <span className="text-zinc-300">(128 отзывов)</span>
              </div>
              <button className="bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-lg mt-3 w-full">
                Проверить доступность
              </button>
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="grid grid-cols-2 gap-2 h-full">
            {images.slice(0, 2).map((img, i) => (
              <img key={i} src={img} alt={`Дом ${i+1}`} className="w-full h-full object-cover rounded-lg" />
            ))}
          </div>
        );

      case 'tablet':
        return (
          <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full">
            <div className="row-span-2 col-span-2">
              <img src={images[0]} alt="Дом 1" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="row-span-1">
              <img src={images[1]} alt="Дом 2" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="row-span-1">
              <img src={images[2]} alt="Дом 3" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        );

      case 'laptop':
        return (
          <div className="grid grid-cols-2 gap-2 h-full">
            {images.slice(0, 4).map((img, i) => (
              <img key={i} src={img} alt={`Дом ${i+1}`} className="w-full h-full object-cover rounded-lg" />
            ))}
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-3 gap-2 h-full">
            {images.map((img, i) => (
              <img key={i} src={img} alt={`Дом ${i+1}`} className="w-full h-full object-cover rounded-lg" />
            ))}
          </div>
        );
    }
  };

  return (
    <div 
        ref={backgroundContainerRef}
        className="relative isolate w-full bg-[#0a0a0b] px-4 py-8 sm:py-16 transition-colors duration-300"
    >
        <div ref={sceneRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto bg-white dark:bg-zinc-950 rounded-2xl p-4 sm:p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Адаптивный дизайн
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
            Посмотрите, как ваш контент будет выглядеть на разных устройствах. Перетаскивайте правую границу, чтобы изменить ширину.
          </p>

          <div className="w-full overflow-x-auto relative">
            {!isMobile && (
              <div className="absolute top-0 left-0 h-12 w-full z-20 pointer-events-none">
                {Object.entries(breakpoints).map(([name, bpWidth]) => (
                  <div
                    key={name}
                    className="absolute flex items-center"
                    style={{ left: `${bpWidth}px`, transform: "translateX(-50%)" }}
                  >
                    <div className="w-px h-4 bg-zinc-400 dark:bg-white/30" />
                    <div className="ml-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-white/80 dark:bg-zinc-900/80 px-2 py-1 rounded">
                      {{
                        phone: "Телефон",
                        tablet: "Планшет",
                        laptop: "Ноутбук",
                        desktop: "Компьютер"
                      }[name]}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              ref={containerRef}
              className={`relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 ${isMobile ? "w-full" : ""}`}
              style={{
                width: isMobile ? "100%" : `${width}px`,
                minWidth: isMobile ? "100%" : "320px",
                height: "650px"
              }}
            >
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-4 sm:p-8 rounded-lg h-full">
                {displayMode === 'mobile' ? (
                  renderImages()
                ) : (
                  <div className={`flex ${displayMode === 'phone' || displayMode === 'tablet' ? 'flex-col' : 'flex-row'} gap-6 h-full`}>
                    <div className={
                      displayMode === 'phone' || displayMode === 'tablet' 
                        ? "w-full h-2/3" 
                        : displayMode === 'laptop'
                        ? "w-1/2 h-full"
                        : "w-2/3 h-full"
                    }>
                      {renderImages()}
                    </div>

                    <div className={`
                      ${displayMode === 'phone' || displayMode === 'tablet' ? "w-full h-1/3" : ""}
                      ${displayMode === 'laptop' ? "w-1/2 pl-6 h-full" : ""}
                      ${displayMode === 'desktop' ? "w-1/3 pl-6 h-full" : ""}
                      flex flex-col justify-center
                    `}>
                      <p className="text-sm text-zinc-400">Целый дом</p>
                      <h2 className="text-xl sm:text-2xl font-bold mt-2">Дом у озера Хурон</h2>
                      <div className="text-pink-500 flex items-center gap-1 text-sm mt-1">
                        <span>⭐ 2.66</span>
                        <span className="text-zinc-400">(128 отзывов)</span>
                        {displayMode === 'desktop' && (
                          <span className="text-pink-500">· Бэйфилд, Канада</span>
                        )}
                      </div>
                      {displayMode !== 'phone' && (
                        <p className="text-zinc-400 text-sm mt-2">
                          Солнечная и просторная комната для тех, кто хочет уют и комфорт вдали от городской суеты...
                        </p>
                      )}
                      <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-lg mt-4 w-fit transition-colors duration-200">
                        Проверить доступность
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!isMobile && (
                <div
                  onMouseDown={handleStartDrag}
                  onTouchStart={handleStartDrag}
                  className="absolute top-0 right-0 w-2 h-full cursor-ew-resize flex justify-center items-center select-none group"
                >
                  <div className="w-1 h-16 bg-gray-500 rounded-full group-hover:bg-pink-500 transition-colors duration-200" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}