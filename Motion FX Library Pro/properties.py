import bpy
from bpy.props import EnumProperty, StringProperty, BoolProperty, FloatProperty, IntProperty, PointerProperty

def get_preset_items(self, context):
    """Obtiene la lista de presets según la categoría seleccionada"""
    category = self.preset_category
    
    presets_by_category = {
        'animation': [
            ('bounce_soft', "Rebote Suave", "Animación de rebote con curvas suaves"),
            ('rotation_smooth', "Rotación Suave", "Rotación continua con aceleración"),
            ('scale_elastic', "Escala Elástica", "Escalado con efecto elástico"),
            ('fade_cinematic', "Fade Cinematográfico", "Desvanecimiento profesional"),
        ],
        'particles': [
            ('fire_realistic', "Fuego Realista", "Simulación de fuego con temperatura"),
            ('explosion_dramatic', "Explosión Dramática", "Explosión con ondas de choque"),
            ('smoke_volumetric', "Humo Volumétrico", "Humo con iluminación volumétrica"),
        ],
        'lighting': [
            ('studio_lighting', "Iluminación Estudio", "Setup de luces profesional"),
            ('dramatic_shadows', "Sombras Dramáticas", "Iluminación cinematográfica"),
            ('neon_cyberpunk', "Neón Cyberpunk", "Iluminación futurista"),
        ],
        'materials': [
            ('glass_realistic', "Cristal Realista", "Material de vidrio fotorrealista"),
            ('metal_brushed', "Metal Pulido", "Superficie metálica reflectante"),
            ('hologram_sci_fi', "Holograma Sci-Fi", "Material holográfico futurista"),
        ]
    }
    
    items = [('none', "-- Seleccionar Preset --", "")]
    items.extend(presets_by_category.get(category, []))
    return items

def get_mockup_items(self, context):
    """Obtiene la lista de mockups según la categoría seleccionada"""
    category = self.mockup_category
    
    mockups_by_category = {
        'abstract': [
            ('fluid_wave_abstract', "Onda Fluida", "Forma de onda abstracta"),
            ('geometric_crystal', "Cristal Geométrico", "Estructura cristalina"),
            ('organic_blob', "Forma Orgánica", "Estructura orgánica suave"),
        ],
        'architectural': [
            ('minimal_arch', "Arco Minimalista", "Arquitectura minimalista"),
            ('parametric_tower', "Torre Paramétrica", "Geometría arquitectónica"),
            ('spiral_staircase', "Escalera Espiral", "Estructura en espiral"),
        ],
        'scientific': [
            ('molecular_bond', "Enlace Molecular", "Visualización científica"),
            ('neural_network', "Red Neuronal", "Visualización de IA"),
            ('quantum_tunnel', "Túnel Cuántico", "Efecto de física cuántica"),
        ],
        'natural': [
            ('crystal_formation', "Formación Cristalina", "Crecimiento de cristales"),
            ('spiral_galaxy', "Galaxia Espiral", "Estructura cósmica"),
            ('liquid_drop', "Gota Líquida", "Gota de agua realista"),
        ],
        'futuristic': [
            ('holographic_panel', "Panel Holográfico", "Interface futurista"),
            ('plasma_sphere', "Esfera de Plasma", "Energía eléctrica"),
            ('biomechanical_wing', "Ala Biomecánica", "Fusión orgánica-mecánica"),
        ]
    }
    
    items = [('none', "-- Seleccionar Mockup --", "")]
    items.extend(mockups_by_category.get(category, []))
    return items

class MotionFXSettings(bpy.types.PropertyGroup):
    """Configuraciones principales de Motion FX"""
    
    # Configuración de efectos
    effect_category: EnumProperty(
        name="Categoría de Efectos",
        description="Selecciona la categoría de efectos",
        items=[
            ('ANIMATION', "Animación", "Efectos de animación básicos"),
            ('PARTICLES', "Partículas", "Sistemas de partículas"),
            ('LIGHTING', "Iluminación", "Efectos de luces"),
            ('MATERIALS', "Materiales", "Materiales especiales"),
            ('SIMULATION', "Simulación", "Física y simulaciones"),
            ('CAMERA', "Cámara", "Efectos de cámara"),
            ('UTILITIES', "Utilidades", "Herramientas auxiliares"),
            ('VISUAL', "Visual", "Efectos visuales"),
        ],
        default='ANIMATION'
    )
    
    # Configuración avanzada
    advanced_mode: BoolProperty(
        name="Modo Avanzado",
        description="Habilita controles avanzados",
        default=False
    )
    
    live_update: BoolProperty(
        name="Actualización en Vivo",
        description="Actualiza efectos en tiempo real",
        default=False
    )
    
    effect_intensity: FloatProperty(
        name="Intensidad",
        description="Intensidad del efecto",
        default=1.0,
        min=0.1,
        max=3.0,
        step=0.1
    )
    
    animation_length: IntProperty(
        name="Duración (frames)",
        description="Duración de la animación en frames",
        default=120,
        min=10,
        max=1000
    )
    
    auto_keyframe: BoolProperty(
        name="Auto Keyframe",
        description="Insertar keyframes automáticamente",
        default=True
    )
    
    # Configuración de presets
    preset_category: EnumProperty(
        name="Categoría de Presets",
        description="Categoría de presets",
        items=[
            ('animation', "Animación", "Presets de animación"),
            ('particles', "Partículas", "Presets de partículas"),
            ('lighting', "Iluminación", "Presets de iluminación"),
            ('materials', "Materiales", "Presets de materiales"),
        ],
        default='animation'
    )
    
    selected_preset: EnumProperty(
        name="Preset",
        description="Preset seleccionado",
        items=get_preset_items
    )
    
    # Configuración de mockups
    mockup_category: EnumProperty(
        name="Categoría de Mockups",
        description="Categoría de mockups 3D",
        items=[
            ('abstract', "Abstracto", "Formas abstractas"),
            ('architectural', "Arquitectónico", "Estructuras arquitectónicas"),
            ('scientific', "Científico", "Visualizaciones científicas"),
            ('natural', "Natural", "Formas naturales"),
            ('futuristic', "Futurista", "Diseños futuristas"),
        ],
        default='abstract'
    )
    
    selected_mockup: EnumProperty(
        name="Mockup",
        description="Mockup seleccionado",
        items=get_mockup_items
    )

classes = (
    MotionFXSettings,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    
    bpy.types.Scene.motionfx_settings = PointerProperty(type=MotionFXSettings)
    print("MotionFX: Properties registered")

def unregister():
    del bpy.types.Scene.motionfx_settings
    
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Properties unregistered")