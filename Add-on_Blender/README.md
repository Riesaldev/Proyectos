# 📖 Motion FX Library Pro — Documentación de Usuario

Bienvenido a la guía completa de Motion FX Library Pro, el add-on definitivo para efectos visuales avanzados en Blender. Aquí aprenderás a instalar, configurar y utilizar todos los efectos, desde animaciones hasta simulaciones complejas. Esta documentación es útil tanto para principiantes como para usuarios avanzados.

---

## 🚀 Índice

    - [Instalación](#instalación)
    - [Interfaz de Usuario](#interfaz-de-usuario)
    - [Efectos de Animación](#efectos-de-animación)
    - [Efectos de Simulación](#efectos-de-simulación)
    - [Efectos de Partículas](#efectos-de-partículas)
    - [Efectos de Iluminación](#efectos-de-iluminación)
    - [Efectos de Material](#efectos-de-material)
    - [Efectos de Cámara](#efectos-de-cámara)
    - [Efectos Utilitarios](#efectos-utilitarios)
    - [Sistema de Presets](#sistema-de-presets)
    - [Campos Vectoriales](#campos-vectoriales)
    - [Solución de Problemas](#solución-de-problemas)
    - [FAQ](#faq)
    - [Testing Exhaustivo](#testing-exhaustivo)
    - [Conclusión](#conclusión)

---

## 📥 Instalación

**Requisitos:**
    - Blender 3.6.0 o superior
    - Windows, macOS o Linux
    - 4GB RAM (8GB recomendado)
    - 50MB de espacio libre

**Pasos:**
    1. Descarga y descomprime `Motion_FX_Library_Pro.zip` (mantén la estructura de carpetas).
    2. En Blender:  
      `Edit > Preferences > Add-ons > Install...`  
      Selecciona el ZIP y activa: `✅ Motion FX Library Pro`
    3. Verifica la instalación:  
      Ve a `View3D > Sidebar (N)` y busca la pestaña "Motion FX".

**Desinstalación:**  
`Edit > Preferences > Add-ons` → Busca y desactiva/elimina el add-on.

---

## 🎛️ Interfaz de Usuario

    **Panel Principal:**
    ```
    ┌─ Motion FX Library Pro ──────────────┐
    │ Category: [Animation ▼]              │
    │ [Advanced Controls] [Live Update]    │
    │ Effect Categories:                   │
    │ • Animation • Simulation • Particles │
    │ • Lighting • Material • Camera       │
    │ • Utility                            │
    │ Tools: [Create Vector Field]         │
    │ Presets: [Save Preset] [Load Preset] │
└──────────────────────────────────────┘
    ```
    - **Category:** Selección de categoría de efectos
    - **Advanced Controls:** Opciones avanzadas
    - **Live Update:** Actualización en tiempo real
    - **Effect Buttons:** Aplicar efectos específicos

    ---

## 🎬 Efectos de Animación

| Efecto      | Función                | Uso / Objeto         | Duración | Descripción breve                  |
|-------------|------------------------|----------------------|----------|-------------------------------------|
| Bounce      | `add_bounce_effect()`  | Cualquier objeto     | 20 f     | Rebote vertical interpolado         |
| Fade        | `add_fade_effect()`    | Objeto con material  | 30 f     | Desvanecimiento alpha              |
| Scale       | `add_scale_effect()`   | Cualquier objeto     | 15 f     | Escalado de 0.1 a 1.0               |
| Rotation    | `add_rotation_effect()`| Cualquier objeto     | 30 f     | Rotación continua eje Z             |
| Wave        | `add_wave_effect()`    | Malla con Wave Mod.  | 60 f     | Animación de onda                   |
| Follow Path | —                      | Objeto + curva       | —        | Seguir ruta seleccionada            |

---

## ⚡ Efectos de Simulación

- **Cloth:** Simulación de tela (`add_cloth_effect()`)
- **Fluid:** Simulación de líquidos (`add_fluid_effect()`)
- **Rigid Body:** Cuerpos rígidos (`add_rigid_body_effect()`)
- **Soft Body:** Cuerpos blandos (`add_soft_body_effect()`)
- **Ocean:** Simulación de océano (`add_ocean_effect()`)

*Cada efecto incluye parámetros configurables como calidad, masa, resolución, etc.*

---

## 🔥 Efectos de Partículas

- **Fire:** Fuego realista (`add_fire_effect()`)
- **Smoke:** Humo (`add_smoke_effect()`)
- **Explosion:** Explosión con partículas (`add_explosion_effect()`)
- **Sparks:** Chispas (`add_sparks_effect()`)
- **Blood:** Sangre (`add_blood_effect()`)

*Incluyen configuraciones de cantidad, duración, física y materiales.*

---

## 💡 Efectos de Iluminación

- **Lens Flare:** Destello solar (`add_lens_flare_light_effect()`)
- **Global Illumination:** Iluminación realista (requiere Cycles)
- **Volumetric:** Luz volumétrica (`add_volumetric_light_effect()`)
- **Spotlight:** Foco de luz (`add_spotlight_effect()`)
- **Glow:** Brillo suave (`add_glow_light_effect()`)
- **Neon:** Luz de neón (`add_neon_light_effect()`)

---

## 🎨 Efectos de Material

- **Dissolve:** Disolución con ruido (`add_dissolve_effect()`)
- **Hologram:** Holograma animado (`add_hologram_effect()`)
- **Glass:** Material vidrio (`add_glass_effect()`)
- **Metal:** Material metálico (`add_metal_effect()`)
- **Emission:** Material emisivo (`add_emission_effect()`)
- **Fabric:** Material tela (`add_fabric_effect()`)

---

## 📹 Efectos de Cámara

- **Camera Dolly:** Movimiento suave de cámara
- **Focus Pull:** Cambio de enfoque
- **Camera Zoom:** Zoom animado
- **Depth of Field:** Profundidad de campo
- **Camera Follow:** Seguimiento de objeto

---

## 🛠️ Efectos Utilitarios

- **Slow Motion:** Cámara lenta
- **Fast Forward:** Avance rápido
- **Reverse:** Reversa de animación
- **Freeze Frame:** Congelar fotograma
- **Time Warp:** Distorsión temporal
- **Position Shake:** Sacudida de posición
- **Scale/Rotation Oscillation:** Oscilaciones animadas

---

## 💾 Sistema de Presets

- **Guardar:** `motionfx.save_preset` (almacenado en Text Block)
- **Cargar:** `motionfx.load_preset` (aplicación automática)
- **Propiedades:** Nombre, categoría, modo avanzado, live update

---

## 🌪️ Campos Vectoriales

- **Crear:** `motionfx.create_vector_field`
- **Tipos:** Vortex, Turbulence, Gradient, Radial, Spiral
- **Aplicación:** Selecciona objeto → Motion FX → Vector Fields

---

## 🔧 Solución de Problemas

- **Add-on no aparece:** Verifica estructura y consola
- **Efectos no funcionan:** Revisa tipo de objeto y mensajes de error
- **Errores comunes:**  
  - "Effect 'X' only works on mesh objects"
  - "No animation data found on object"
  - "Failed to apply effect"
- **Compatibilidad:**  
  - Blender 4.0+: revisa cambios de API/nodos
  - EEVEE vs Cycles: algunos efectos requieren motor específico

---

## ❓ FAQ

- **¿Funciona en todas las versiones?**  
  Requiere Blender 3.6.0+, optimizado para 4.0+.
- **¿Afecta el rendimiento?**  
  Solo al aplicar efectos complejos.
- **¿Se puede usar comercialmente?**  
  Sí, incluye licencia comercial.
- **¿Por qué algunos efectos cambian el motor de render?**  
  Ej: Global Illumination requiere Cycles.
- **¿Puedo combinar efectos?**  
  Sí, la mayoría son compatibles.
- **¿Dónde reportar bugs?**  
  Contacta al desarrollador con versión, pasos y archivos de ejemplo.

---

## 📊 Testing Exhaustivo

Incluye un script de testing automatizado para validar:
    - Registro de propiedades y operadores
    - Aplicación de todos los efectos
    - Compatibilidad de motores de render
    - Sistema de presets
    - Validaciones de contexto y rendimiento
    - Limpieza de escena y recursos

*Ejecuta el script en la consola de Blender para verificar la instalación y funcionamiento.*

---

## 📈 Conclusión

Esta documentación cubre:
    - Instalación paso a paso
    - Más de 50 efectos disponibles
    - Casos de uso y solución de problemas
    - Testing automatizado y FAQ
    - Compatibilidad y soporte

**Motion FX Library Pro está listo para uso profesional y comercial.**

---

© 2025 RiesalDev — Motion FX Library Pro v1.0.0
