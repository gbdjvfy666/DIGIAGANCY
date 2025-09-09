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

            // Новая функция хэширования для случайных бликов
            float random(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                vec2 centeredUV = (uv * 2.0 - 1.0);
                centeredUV.x *= iResolution.x / iResolution.y;
                
                // Убираем waterGlint, чтобы убрать эффект квадратов и волнового шума
                // float glintValue = waterGlint(centeredUV, iTime);
                
                // Применяем эффект свечения от мыши
                vec2 mousePos = smoothedMouse / iResolution.xy;
                mousePos = (mousePos * 2.0 - 1.0);
                mousePos.x *= iResolution.x / iResolution.y;
                
                float mouseDist = length(centeredUV - mousePos);
                float mouseLight = lightIntensity * 2.0 / (1.0 + mouseDist * mouseDist * 4.0);
                
                // Используем только свечение от мыши
                vec3 finalColor = vec3(0.1, 0.1, 0.2) * mouseLight * 1.5;
                
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

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!animationIdRef.current) {
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

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            observer.disconnect();
            resizeObserver.disconnect();
            
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseup", handleMouseUp);

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