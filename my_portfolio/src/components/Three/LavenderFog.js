// EFECTO DE NIEBLA INTERACTIVA (ESTILO MONTFORT) - THREE.JS + GLSL
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LavenderFog() {
    const mountRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, fogMaterial, animationId;
        const mouse = new THREE.Vector2(0, 0);
        const mouseTrail = []; // Array para mantener la estela del mouse
        const maxTrailLength = 20; // Máximo número de posiciones en la estela
        const clock = new THREE.Clock();

        function init() {
            // 1. Escena y cámara
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

            // 2. Renderer WebGL
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Agregar al contenedor del componente
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
            }            // 3. Geometría (plano fullscreen)
            const geometry = new THREE.PlaneGeometry(2, 2);

            // 4. Material con shader personalizado
            fogMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    u_time: { value: 0 },
                    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                    u_mouse: { value: new THREE.Vector2(0, 0) },
                    u_mouseTrail: { value: new Array(20).fill().map(() => new THREE.Vector3(0, 0, 0)) }, // [x, y, timestamp]
                    u_trailLength: { value: 0 },
                    u_noiseScale: { value: 3.0 },
                    u_fogDensity: { value: 0.8 },
                    u_speed: { value: 0.3 },
                    u_distortionStrength: { value: 7.0 },
                    u_trailDecay: { value: 5.0 } // Para el efecto de estela
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    precision highp float;
                    uniform float u_time;
                    uniform vec2 u_resolution;
                    uniform vec2 u_mouse;
                    uniform vec3 u_mouseTrail[20]; // Array de posiciones del trail [x, y, timestamp]
                    uniform int u_trailLength;
                    uniform float u_noiseScale;
                    uniform float u_fogDensity;
                    uniform float u_speed;
                    uniform float u_distortionStrength;
                    uniform float u_trailDecay;
                    varying vec2 vUv;

                    // Función de ruido Simplex
                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
                    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                    
                    float snoise(vec3 v) {
                        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
                        vec3 i = floor(v + dot(v, C.yyy));
                        vec3 x0 = v - i + dot(i, C.xxx);
                        
                        vec3 g = step(x0.yzx, x0.xyz);
                        vec3 l = 1.0 - g;
                        vec3 i1 = min(g.xyz, l.zxy);
                        vec3 i2 = max(g.xyz, l.zxy);
                        
                        vec3 x1 = x0 - i1 + C.xxx;
                        vec3 x2 = x0 - i2 + C.yyy;
                        vec3 x3 = x0 - 0.5;
                        
                        i = mod289(i);
                        vec4 p = permute(permute(permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0))
                            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                        
                        vec4 j = p - 49.0 * floor(p / 49.0);  // mod(p, 49.0)
                        
                        vec4 x_ = floor(j / 7.0);
                        vec4 y_ = floor(j - 7.0 * x_);
                        
                        vec4 x = (x_ * 2.0 + 0.5) / 7.0 - 1.0;
                        vec4 y = (y_ * 2.0 + 0.5) / 7.0 - 1.0;
                        
                        vec4 h = 1.0 - abs(x) - abs(y);
                        
                        vec4 b0 = vec4(x.xy, y.xy);
                        vec4 b1 = vec4(x.zw, y.zw);
                        
                        vec4 s0 = floor(b0) * 2.0 + 1.0;
                        vec4 s1 = floor(b1) * 2.0 + 1.0;
                        vec4 sh = -step(h, vec4(0.0));
                        
                        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
                        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
                        
                        vec3 p0 = vec3(a0.xy, h.x);
                        vec3 p1 = vec3(a0.zw, h.y);
                        vec3 p2 = vec3(a1.xy, h.z);
                        vec3 p3 = vec3(a1.zw, h.w);
                        
                        vec4 norm = taylorInvSqrt(vec4(
                            dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)
                        ));
                        p0 *= norm.x;
                        p1 *= norm.y;
                        p2 *= norm.z;
                        p3 *= norm.w;
                        
                        vec4 m = max(0.6 - vec4(
                            dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)
                        ), 0.0);
                        m = m * m;
                        return 42.0 * dot(m * m, vec4(
                            dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)
                        ));
                    }

                    void main() {
                        vec2 uv = vUv;
                        vec2 mouseNorm = u_mouse;
                        float time = u_time * u_speed;
                        
                        // Crear distorsión acumulativa de la estela como ondas en el agua
                        vec2 distortion = vec2(0.0);
                        float trailEffect = 0.0;
                        float wakeIntensity = 0.0;
                        
                        // Procesar cada punto de la estela para crear ondas expansivas
                        for(int i = 0; i < 20; i++) {
                            if(i >= u_trailLength) break;
                            
                            vec2 trailPos = u_mouseTrail[i].xy;
                            float trailTime = u_mouseTrail[i].z;
                            float age = time - trailTime;
                            
                            if(age < 4.0 && age > 0.01) {
                                vec2 toPixel = uv - trailPos;
                                float dist = length(toPixel);
                                
                                // Crear ondas concéntricas como en el agua
                                float ripple = sin(dist * 30.0 - age * 8.0) * exp(-age * 1.2) * exp(-dist * 5.0);
                                
                                // Distorsión direccional
                                vec2 perpendicular = normalize(vec2(-toPixel.y, toPixel.x));
                                float directionalWake = exp(-dist * 12.0) * exp(-age * 0.5);
                                
                                // Combinar efectos
                                distortion += perpendicular * ripple * 0.02;
                                distortion += toPixel * directionalWake * 0.015;
                                
                                // Acumular intensidad para el color
                                trailEffect += directionalWake * 0.6;
                                wakeIntensity += ripple * directionalWake;
                            }
                        }
                          // Efecto actual del ratón
                        float dist = distance(uv, mouseNorm);
                        float mouseInfluence = exp(-dist * 10.0);
                        
                        // Crear remolino alrededor del mouse actual
                        vec2 toMouse = uv - mouseNorm;
                        float angle = atan(toMouse.y, toMouse.x);
                        vec2 swirlDistortion = vec2(-sin(angle), cos(angle)) * mouseInfluence * 0.05;
                        
                        // Aplicar todas las distorsiones al UV para samplear el ruido
                        vec2 distortedUV = uv + distortion + swirlDistortion;
                        
                        // Generar ruido base con las coordenadas distorsionadas
                        float noise = snoise(vec3(distortedUV * u_noiseScale, time)) * 0.5 + 0.5;
                        
                        // Aplicar efectos de la estela y el mouse al ruido
                        float totalEffect = mouseInfluence + trailEffect * 1.0 + abs(wakeIntensity) * 1.0;
                        
                        // El mouse y la estela crean "huecos" en la niebla pero también turbulencia
                        float turbulence = abs(wakeIntensity) * 1.0 + mouseInfluence * 0.5;
                        float clearing = totalEffect * 1.5;
                        
                        float finalNoise = noise - clearing + turbulence;
                        float fog = clamp(finalNoise * u_fogDensity, 0.0, 1.0);

                        // Colores dinámicos basados en la interacción
                        vec3 baseColor = vec3(0.4, 0.6, 0.9); // Azul niebla
                        vec3 wakeColor = vec3(0.8, 0.5, 1.0); // Púrpura para la estela
                        // vec3 mouseColor = vec3(1.0, 0.7, 0.4); // Naranja cálido para el mouse - DESACTIVADO
                        
                        // Mezclar colores basado en los efectos
                        vec3 color = baseColor;
                        color = mix(color, wakeColor, clamp(trailEffect * 2.0, 0.0, 1.0));

                        // color = mix(color, mouseColor, mouseInfluence); // Efecto naranja del mouse - DESACTIVADO
                        
                        // Intensificar color donde hay fog
                        color *= (0.8 + fog * 0.7);
                        
                        gl_FragColor = vec4(color, fog * 0.9);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            // 5. Crear mesh
            const fogPlane = new THREE.Mesh(geometry, fogMaterial);
            scene.add(fogPlane);

            // Eventos
            let lastMouseTime = 0;
            const mouseMoveThrottle = 16; // ~60fps
            
            const handleMouseMove = (e) => {
                const now = Date.now();
                if (now - lastMouseTime < mouseMoveThrottle) return;
                lastMouseTime = now;
                
                const newX = e.clientX / window.innerWidth;
                const newY = 1.0 - (e.clientY / window.innerHeight); // Invertir eje Y
                
                // Solo agregar al trail si el mouse se movió lo suficiente
                const lastPos = mouseTrail[mouseTrail.length - 1];
                const minDistance = 0.02; // Distancia mínima para agregar punto
                
                if (!lastPos || 
                    Math.abs(newX - lastPos.x) > minDistance || 
                    Math.abs(newY - lastPos.y) > minDistance) {
                    
                    mouse.x = newX;
                    mouse.y = newY;
                    
                    // Añadir la posición actual al trail con timestamp
                    mouseTrail.push({
                        x: mouse.x,
                        y: mouse.y,
                        time: clock.getElapsedTime()
                    });
                    
                    // Mantener solo las últimas posiciones
                    if (mouseTrail.length > maxTrailLength) {
                        mouseTrail.shift();
                    }
                    
                    // Actualizar uniforms
                    fogMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
                    
                    // Convertir mouseTrail a formato para el shader
                    const trailArray = fogMaterial.uniforms.u_mouseTrail.value;
                    const currentTime = clock.getElapsedTime();
                    
                    for (let i = 0; i < 20; i++) {
                        if (i < mouseTrail.length) {
                            trailArray[i].set(
                                mouseTrail[i].x, 
                                mouseTrail[i].y, 
                                mouseTrail[i].time
                            );
                        } else {
                            trailArray[i].set(0, 0, currentTime - 10); // Posiciones inválidas
                        }
                    }
                    
                    fogMaterial.uniforms.u_trailLength.value = Math.min(mouseTrail.length, 20);
                }
            };

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();                renderer.setSize(window.innerWidth, window.innerHeight);
                fogMaterial.uniforms.u_resolution.value.set(
                    window.innerWidth, window.innerHeight
                );
            };

            // Añadir eventos tanto al window como al canvas
            window.addEventListener('mousemove', handleMouseMove);
            renderer.domElement.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('resize', handleResize);            // Función de animación
            function animate() {
                animationId = requestAnimationFrame(animate);
                const currentTime = clock.getElapsedTime();
                fogMaterial.uniforms.u_time.value = currentTime;
                
                // Limpiar trail de posiciones viejas (más de 3 segundos)
                const trailLifetime = 3.0; // segundos
                while (mouseTrail.length > 0 && currentTime - mouseTrail[0].time > trailLifetime) {
                    mouseTrail.shift();
                }
                
                renderer.render(scene, camera);
            }

            animate();

            // Cleanup function
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                renderer.domElement.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', handleResize);
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                if (renderer) {
                    renderer.dispose();
                }
                if (mountRef.current && renderer.domElement) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            };        }

        init();
    }, []);    return (
        <div 
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none'
            }}
        />
    );
}
