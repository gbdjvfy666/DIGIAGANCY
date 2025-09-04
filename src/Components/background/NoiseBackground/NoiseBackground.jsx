import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './NoiseBackground.css';

const NoiseBackground = ({ width = '100%', height = '100vh', zIndex = 1 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null); // Ссылка для хранения ID анимации

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;

    const container = containerRef.current;
    const sceneElement = sceneRef.current;
    
    // Инициализация Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const smoothedMouse = new THREE.Vector2(0, 0);

    const primaryColor = [255, 255, 255];
    const secondaryColor = [255, 255, 255];
    const accentColor = [0, 0, 0];
    const lightIntensity = 1.0;
    const grainStrength = 0.15;
    const grainSize = 3.5;
    const animationSpeed = 0.02;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        iTime: { value: 0.0 },
        smoothedMouse: { value: new THREE.Vector2(0, 0) },
        primaryColor: {
          value: new THREE.Color().fromArray(primaryColor.map((c) => c / 255)),
        },
        secondaryColor: {
          value: new THREE.Color().fromArray(secondaryColor.map((c) => c / 255)),
        },
        accentColor: {
          value: new THREE.Color().fromArray(accentColor.map((c) => c / 255)),
        },
        lightIntensity: { value: lightIntensity },
        grainStrength: { value: grainStrength },
        grainSize: { value: grainSize },
        animationSpeed: { value: animationSpeed },
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
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 accentColor;
        uniform vec2 smoothedMouse;
        uniform float lightIntensity;
        uniform float grainStrength;
        uniform float grainSize;
        uniform float animationSpeed;

        #define PI 3.14159265359

        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        
        float hash(float n) {
            return fract(sin(n) * 43758.5453);
        }
        
        float orbShape(vec2 uv, float time) {
            uv = (uv * 2.0 - 1.0);
            uv.x *= iResolution.x / iResolution.y;
            
            float d = length(uv);
            float pulse = 0.5;
            
            float shape = smoothstep(pulse, pulse - 0.1, d);
            float innerGlow = smoothstep(pulse * 0.8, 0.0, d) * 0.5;
            float angle = atan(uv.y, uv.x);
            float swirl = 0.16 * sin(angle * 6.0 + time * 3.0 * animationSpeed) * smoothstep(pulse, 0.0, d);
            
            return shape + innerGlow + swirl;
        }

        float calculateLight(vec2 uv, float time) {
            vec2 mousePos = smoothedMouse / iResolution.xy;
            mousePos = (mousePos * 2.0 - 1.0);
            mousePos.x *= iResolution.x / iResolution.y;
            
            float mouseDist = length(uv - mousePos);
            float totalLight = lightIntensity * 2.0 / (1.0 + mouseDist * mouseDist * 4.0);
            
            return totalLight;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / iResolution.xy;
            vec2 centeredUV = (uv * 2.0 - 1.0);
            centeredUV.x *= iResolution.x / iResolution.y;
            
            float light = calculateLight(centeredUV, iTime);
            
            vec3 baseColor = vec3(0.0);
            
            baseColor = mix(baseColor, vec3(1.0), light * 2.0);
            
            vec2 uvRandom = vUv;
            uvRandom.y *= hash(vec2(uvRandom.y, iTime * 0.01));
            float noise = hash(uvRandom * grainSize + iTime * 0.1) * grainStrength;
            baseColor += noise - grainStrength * 0.5;
            
            gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      shaderMaterial.uniforms.iResolution.value.set(width, height);
    };
    
    updateSize();

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / rect.width;
      const mouseY = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.set(mouseX, mouseY);
    };

    container.addEventListener("mousemove", handleMouseMove);
    
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      shaderMaterial.uniforms.iTime.value = time;
      smoothedMouse.lerp(mouse, 0.1);
      shaderMaterial.uniforms.smoothedMouse.value.set(
        smoothedMouse.x * container.clientWidth,
        smoothedMouse.y * container.clientHeight
      );
      renderer.render(scene, camera);
    }

    // --- Главное изменение: Intersection Observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Если компонент видим, запускаем анимацию
          if (!animationIdRef.current) {
            animate();
          }
        } else {
          // Если компонент не виден, останавливаем анимацию
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
          }
        }
      },
      {
        root: null, // Следим относительно viewport
        threshold: 0.1, // Триггер, когда 10% компонента видно
      }
    );

    observer.observe(container);
    // --------------------------------------------------

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      // Очистка при размонтировании
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      if (sceneElement.contains(renderer.domElement)) {
        sceneElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="noise-background-container"
      style={{ width, height, zIndex }}
    >
      <div ref={sceneRef} className="three-container"></div>
      <div className="noise-effect"></div>
    </div>
  );
};

export default NoiseBackground;