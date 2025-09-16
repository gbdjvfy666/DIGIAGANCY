import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './NoiseBacgroundBig.css';

const NoiseBacgroundBig = ({ children }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;

    const container = containerRef.current;
    const sceneElement = sceneRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    const fixedLightPosition = new THREE.Vector2(0.28, 0.5); 

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        iTime: { value: 0.0 },
        fixedLightPosition: { value: fixedLightPosition },
        screenAspectRatio: { value: window.innerWidth / window.innerHeight },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 fixedLightPosition;
        uniform float screenAspectRatio;
        varying vec2 vUv;
        
        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        
        float calculateLight(vec2 uv) {
            vec2 lightPos = (fixedLightPosition * 2.0 - 1.0);
            lightPos.x *= screenAspectRatio;
            float dist = length(uv - lightPos);
            float totalLight = 0.5 * 2.0 / (1.0 + dist * dist * 8.0);
            return totalLight;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / iResolution.xy;
            vec2 centeredUV = (uv * 2.0 - 1.0);
            centeredUV.x *= iResolution.x / iResolution.y;
            float light = calculateLight(centeredUV);
            vec3 baseColor = vec3(0.0);
            baseColor = mix(baseColor, vec3(1.0), light * 2.0);
            float noise = hash(vUv * 3.5 + iTime * 0.1) * 0.15;
            baseColor += noise - 0.15 * 0.5;
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
      shaderMaterial.uniforms.iResolution.value.set(width, height);
      shaderMaterial.uniforms.screenAspectRatio.value = window.innerWidth / window.innerHeight;
    };
    
    updateSize();
    
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      shaderMaterial.uniforms.iTime.value = performance.now() * 0.001;
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
      }, { threshold: 0 }
    );
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
    <div 
      ref={containerRef}
      className="noise-background-container relative"
      style={{ width: '100%', height: '250vh' }}
    >
      <div className="absolute inset-0 z-0">
        <div ref={sceneRef} className="three-container"></div>
        <div className="noise-effect"></div>
      </div>
      {/* Здесь будет отображаться все содержимое, которое передается
        внутрь компонента <NoiseBackgroundBig>.
      */}
      <div className="z-10 relative">
        {children}
      </div>
    </div>
  );
};

export default NoiseBacgroundBig;