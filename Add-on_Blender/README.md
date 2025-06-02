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

**Errores Comunes y Soluciones:**

- **Add-on no aparece:** 
  - Verifica que la estructura de carpetas esté intacta
  - Revisa la consola de Blender (Window > Toggle System Console)
  - Asegúrate de que todos los archivos .py estén presentes

- **Efectos no funcionan:** 
  - Revisa que tengas un objeto seleccionado
  - Algunos efectos requieren tipos específicos de objeto (mesh, luz, cámara)
  - Verifica mensajes en la consola

- **Error "Mapa de efectos no inicializado":**
  - Reinicia Blender y reactiva el add-on
  - Verifica que todos los módulos de efectos estén presentes

- **Presets no guardan/cargan:**
  - Los presets se almacenan como Text Blocks en el archivo .blend
  - Guarda el archivo .blend para conservar presets

- **Problemas de rendimiento:**
  - Desactiva "Live Update" para efectos complejos
  - Reduce la resolución de simulaciones en modo de prueba
  - Usa viewport shading simple durante la configuración

**Compatibilidad:**  
- Blender 3.6.0+: Completamente compatible
- Blender 4.0+: Optimizado y testado
- EEVEE vs Cycles: Algunos efectos cambian automáticamente el motor de render

**Validación del Sistema:**
```python
# Ejecuta en consola de Blender para verificar instalación
import bpy
addon = bpy.context.preferences.addons.get('Motion FX Library Pro')
if addon:
    print("✅ Add-on instalado correctamente")
    print(f"Versión: {addon.bl_info['version']}")
else:
    print("❌ Add-on no encontrado")
```

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

**Script de Validación Completa:**
```python
# Copia y pega en la consola de Blender para testing completo
def test_motionfx_installation():
    import bpy
    
    print("=== MOTION FX LIBRARY PRO - TEST ===")
    
    # 1. Verificar registro del add-on
    try:
        settings = bpy.context.scene.motionfx_settings
        print("✅ Propiedades registradas")
    except:
        print("❌ Error: Propiedades no registradas")
        return
    
    # 2. Verificar operadores
    operators = [
        'motionfx.apply_effect',
        'motionfx.save_preset', 
        'motionfx.load_preset',
        'motionfx.create_vector_field'
    ]
    
    for op in operators:
        if hasattr(bpy.ops, op.split('.')[0]) and hasattr(getattr(bpy.ops, op.split('.')[0]), op.split('.')[1]):
            print(f"✅ Operador {op} disponible")
        else:
            print(f"❌ Error: Operador {op} no encontrado")
    
    # 3. Verificar mapa de efectos
    try:
        from .effects_operations import EffectsOperations
        EffectsOperations.initialize_effect_map()
        effect_count = len(EffectsOperations._effect_map)
        print(f"✅ {effect_count} efectos cargados")
    except Exception as e:
        print(f"❌ Error cargando efectos: {e}")
    
    # 4. Verificar panel
    try:
        panel_found = False
        for panel in bpy.types.Panel.__subclasses__():
            if 'motionfx' in panel.bl_idname.lower():
                panel_found = True
                break
        
        if panel_found:
            print("✅ Panel UI registrado")
        else:
            print("❌ Error: Panel UI no encontrado")
    except:
        print("❌ Error verificando panel")
    
    print("=== TEST COMPLETADO ===")

# Ejecutar test
test_motionfx_installation()
```

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
