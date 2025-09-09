import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './FractalOrbComponentSecond.css';

const FractalOrbComponentSecond = ({ width = '100%', height = '100vh' }) => {
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

        const mouse = new THREE.Vector2(0, 0);
        const smoothedMouse = new THREE.Vector2(0, 0);
        let mouseDown = false;

        // Настройки для шейдера
        const uniforms = {
            iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            iTime: { value: 0.0 },
            smoothedMouse: { value: new THREE.Vector2(0, 0) },
            mouseDown: { value: 0 },
            primaryColor: { value: new THREE.Color(0xffffff) },
            secondaryColor: { value: new THREE.Color(0xffffff) },
            accentColor: { value: new THREE.Color(0x000000) },
            lightCount: { value: 1 },
            lightIntensity: { value: 0.3 },
            lightSpeed: { value: 1.0 },
            grainStrength: { value: 0.15 },
            grainSize: { value: 3.5 },
            animationSpeed: { value: 0.02 },
            autoRotate: { value: 1.0 },
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            varying vec2 vUv;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform vec3 primaryColor;
            uniform vec3 secondaryColor;
            uniform vec3 accentColor;
            uniform vec2 smoothedMouse;
            uniform float mouseDown;
            uniform int lightCount;
            uniform float lightIntensity;
            uniform float lightSpeed;
            uniform float grainStrength;
            uniform float grainSize;
            uniform float animationSpeed;
            uniform float autoRotate;

            #define PI 3.14159265359

            // Хеширование для случайных чисел
            float hash12(vec2 p) {
                vec3 p3 = fract(p.xyx * .1031);
                p3 += dot(p3, p3.yzx + 33.33);
                return fract((p3.x + p3.y) * p3.z);
            }
            
            // Функция шума для волнообразных бликов
            float plasmaNoise(vec2 uv, float time) {
                float v = 0.0;
                v += sin((uv.x + time) * 10.0) * 0.5;
                v += sin((uv.y + time) * 10.0) * 0.5;
                v += sin((uv.x * 2.0 + uv.y + time) * 8.0) * 0.5;
                v += cos((uv.x + uv.y * 2.0 + time) * 12.0) * 0.5;
                return v;
            }
            
            // Функция для создания эффекта водных бликов (без лучей)
            float waterGlint(vec2 uv, float time) {
                float noise = plasmaNoise(uv * 1.5, time * 0.5);
                noise += plasmaNoise(uv * 5.0, time * 0.7) * 0.3;
                return smoothstep(0.7, 0.9, noise) * 2.0;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                vec2 centeredUV = (uv * 2.0 - 1.0);
                centeredUV.x *= iResolution.x / iResolution.y;
                
                // 1. Базовый эффект воды/плазмы
                float glintValue = waterGlint(centeredUV, iTime);
                vec3 baseColor = vec3(0.1, 0.1, 0.2); 
                vec3 lightColor = vec3(1.0, 0.8, 0.5);
                vec3 finalColor = mix(baseColor, lightColor, glintValue); 
                
                // 2. Применяем эффект свечения от мыши
                vec2 mousePos = smoothedMouse / iResolution.xy;
                mousePos = (mousePos * 2.0 - 1.0);
                mousePos.x *= iResolution.x / iResolution.y;
                
                float mouseDist = length(centeredUV - mousePos);
                float mouseLight = lightIntensity * 2.0 / (1.0 + mouseDist * mouseDist * 4.0);
                
                finalColor *= mouseLight * 1.5;
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
        scene.add(plane);

        const updateSize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            shaderMaterial.uniforms.iResolution.value.set(width, height);
        };
        
        updateSize();

        const handleMouseMove = (event) => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = rect.height - (event.clientY - rect.top);
            mouse.set(x, y);
        };

        const handleMouseDown = () => {
            mouseDown = true;
            shaderMaterial.uniforms.mouseDown.value = 1.0;
        };

        const handleMouseUp = () => {
            mouseDown = false;
            shaderMaterial.uniforms.mouseDown.value = 0.0;
        };
        
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseup", handleMouseUp);
        
        let startTime = performance.now();
        function animate() {
            animationIdRef.current = requestAnimationFrame(animate);
            const currentTime = performance.now();
            const time = (currentTime - startTime) * 0.001;
            shaderMaterial.uniforms.iTime.value = time;

            smoothedMouse.lerp(mouse, 0.1); 
            shaderMaterial.uniforms.smoothedMouse.value.copy(smoothedMouse);

            renderer.render(scene, camera);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!animationIdRef.current) {
                        startTime = performance.now() - (shaderMaterial.uniforms.iTime.value * 1000);
                        animate();
                    }
                } else {
                    if (animationIdRef.current) {
                        cancelAnimationFrame(animationIdRef.current);
                        animationIdRef.current = null;
                    }
                }
            },
            {
                root: null,
                threshold: 0, 
            }
        );

        observer.observe(container);

        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        resizeObserver.observe(container);

        const initialMouseX = container.clientWidth / 2;
        const initialMouseY = container.clientHeight / 2;
        mouse.set(initialMouseX, initialMouseY);
        smoothedMouse.set(initialMouseX, initialMouseY);

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            observer.disconnect();
            resizeObserver.disconnect();
            
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseup", handleMouseUp);

            if (sceneElement && renderer.domElement && sceneElement.contains(renderer.domElement)) {
                sceneElement.removeChild(renderer.domElement);
            }
            renderer.dispose();
            shaderMaterial.dispose();
            plane.geometry.dispose();
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
                <div className="quote-container">
                    <div className="quote hoverable">NSBH</div>
                    <div className="author hoverable">Истина в деталях, которые меняют целое</div>
                </div>
                <div className="main-heading">
                    <h1 className="hoverable"> 
                        <span className="text-gray-400">Digital</span><br />
                        <span className="text-gray-500">опыт</span>
                    </h1>
                </div>
                <div className="agency-description">
                    <p className="book hoverable">
                        Мы — digital-агентство, которое разрабатывает
                        эффективные и эстетически безупречные решения
                        для вашего бизнеса. Наша цель — не просто
                        создать продукт, а сформировать будущее вашего
                        бренда.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FractalOrbComponentSecond;