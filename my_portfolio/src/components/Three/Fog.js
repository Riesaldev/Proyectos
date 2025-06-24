// montfort-fog-effect.js
// EFECTO DE NIEBLA INTERACTIVA (ESTILO MONTFORT) - THREE.JS + GLSL

import * as THREE from 'three';

// Configuración inicial
let scene, camera, renderer, fogMaterial;
const mouse = new THREE.Vector2(0, 0);
const clock = new THREE.Clock();

init();
animate();

function init() {
    // 1. Escena y cámara
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, -1, 1
    );

    // 2. Renderer WebGL
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 3. Geometría (plano fullscreen)
    const geometry = new THREE.PlaneGeometry(2, 2);

    // 4. Material con shader personalizado
    fogMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(
                window.innerWidth, window.innerHeight
            )},
            u_mouse: { value: new THREE.Vector2(0, 0) },
            u_noiseScale: { value: 3.0 },
            u_fogDensity: { value: 0.6 },
            u_speed: { value: 0.15 },
            u_distortionStrength: { value: 0.4 }
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
            uniform float u_noiseScale;
            uniform float u_fogDensity;
            uniform float u_speed;
            uniform float u_distortionStrength;
            varying vec2 vUv;

            // Función de ruido Simplex (optimizada)
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
            
            float snoise(vec3 v) {
                const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
                vec3 i = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx));
                
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
                // Coordenadas normalizadas
                vec2 uv = vUv * u_resolution.xy / min(u_resolution.x, u_resolution.y);
                vec2 mouseNorm = u_mouse / u_resolution.xy;
                
                // Tiempo y ruido
                float time = u_time * u_speed;
                float noise = snoise(vec3(uv * u_noiseScale, time)) * 0.5 + 0.5;
                
                // Distorsión del ratón
                float dist = distance(uv, mouseNorm);
                float distortion = smoothstep(0.3, 0.0, dist) * u_distortionStrength;
                
                // Niebla final
                float fog = (noise * u_fogDensity) + (distortion * (1.0 - noise));
                
                // Color azulado (estilo Montfort)
                vec3 color = mix(
                    vec3(0.7, 0.8, 0.9),
                    vec3(0.4, 0.5, 0.8),
                    fog
                );
                
                gl_FragColor = vec4(color, fog * 0.7);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    const fogPlane = new THREE.Mesh(geometry, fogMaterial);
    scene.add(fogPlane);

    // 5. Eventos
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        fogMaterial.uniforms.u_mouse.value.copy(mouse);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        fogMaterial.uniforms.u_resolution.value.set(
            window.innerWidth, window.innerHeight
        );
    });
}

function animate() {
    requestAnimationFrame(animate);
    fogMaterial.uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}