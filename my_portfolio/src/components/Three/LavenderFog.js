// EFECTO DE NIEBLA INTERACTIVA (ESTILO MONTFORT) - THREE.JS + GLSL
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LavenderFog() {
    const mountRef = useRef(null);

    useEffect(() => {        let scene, camera, renderer, fogMaterial, animationId;
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
            });            renderer.setPixelRatio(window.devicePixelRatio);
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
                    u_fogDensity: { value: 0.5 },
                    u_speed: { value: 0.5 },
                    u_distortionStrength: { value: 5.0 },
                    u_trailDecay: { value: 2.0 } // Para el efecto de estela
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

                    // Función de ruido Simplex (optimizada)
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
                        m = m * m;                        return 42.0 * dot(m * m, vec4(
                            dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)
                        ));
                    }

                    void main() {
                        // Coordenadas normalizadas
                        vec2 uv = vUv;
                        vec2 mouseNorm = u_mouse;
                          // Tiempo y ruido
                        float time = u_time * u_speed;
                        float noise = snoise(vec3(uv * u_noiseScale, time)) * 0.5 + 0.5;
                        
                        // Distorsión del ratón con efecto de estela
                        float dist = distance(uv, mouseNorm);
                        float mouseInfluence = 1.0 - smoothstep(0.0, 0.1, dist);
                          // Efecto de estela usando las posiciones reales del mouse
                        float trailEffect = 0.0;
                        for(int i = 0; i < 20; i++) {
                            if(i >= u_trailLength) break; // Solo procesar posiciones válidas
                            
                            vec2 trailPos = u_mouseTrail[i].xy;
                            float trailTime = u_mouseTrail[i].z;
                            float age = time - trailTime; // Edad de esta posición
                            
                            // Solo considerar posiciones no muy viejas
                            if(age < 3.0 && age > 0.0) {
                                float trailDist = distance(uv, trailPos);
                                float trailInfluence = (1.0 - smoothstep(0.0, 0.15, trailDist)) * 
                                                     exp(-age * 0.8); // Decaimiento temporal
                                trailEffect += trailInfluence;
                            }
                        }
                          // Combinar efecto actual del mouse con la estela real
                        float totalMouseEffect = mouseInfluence + trailEffect * 0.4;
                        float calmEffect = totalMouseEffect * u_distortionStrength * 0.2;
                        
                        // Efecto de remolino suave que incluye la estela
                        vec2 toMouse = uv - mouseNorm;
                        float angle = atan(toMouse.y, toMouse.x);
                        float gentleSwirl = sin(angle * 2.0 + time) * totalMouseEffect * 0.1;
                          // Combinar efectos (el mouse reduce la intensidad)
                        float finalNoise = noise - calmEffect + gentleSwirl;
                        float fog = finalNoise * u_fogDensity;
                        
                        // Color que cambia con la interacción del mouse
                        vec3 baseColor = vec3(0.5, 0.7, 1.0); // Azul más intenso
                        vec3 interactiveColor = vec3(1.0, 0.4, 1.0); // Púrpura más vibrante
                        
                        vec3 color = mix(
                            baseColor,
                            mix(baseColor, interactiveColor, mouseInfluence),
                            fog
                        );
                          gl_FragColor = vec4(color, clamp(fog * 1.2, 0.0, 1.0)); // Mayor opacidad
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending
            });            // 5. Crear mesh
            const fogPlane = new THREE.Mesh(geometry, fogMaterial);
            scene.add(fogPlane);

            // Eventos
            const handleMouseMove = (e) => {
                mouse.x = e.clientX / window.innerWidth;
                mouse.y = 1.0 - (e.clientY / window.innerHeight); // Invertir eje Y
                
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
    }, []);

    return (
        <div 
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10
            }}
        />
    );
}
