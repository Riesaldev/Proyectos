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
    
    # Intentar importar los mockups disponibles
    try:
        from . import mockups
        available_mockups = mockups.mockups.get_mockups()
        
        # Agrupar mockups por categoría
        mockups_by_category = {}
        for mockup in available_mockups:
            cat = mockup.get('category', 'general')
            if cat not in mockups_by_category:
                mockups_by_category[cat] = []
            mockups_by_category[cat].append((
                mockup['name'],
                mockup.get('display_name', mockup['name']),
                mockup.get('description', '')
            ))
        
        # Debug: imprimir categorías disponibles
        print(f"Categorías disponibles: {list(mockups_by_category.keys())}")
        print(f"Categoría seleccionada: {category}")
        
        items = [('none', "-- Seleccionar Mockup --", "")]
        category_items = mockups_by_category.get(category, [])
        
        if category_items:
            items.extend(category_items)
        else:
            # Fallback: mostrar algunos mockups de ejemplo si la categoría está vacía
            print(f"No se encontraron mockups para la categoría '{category}'")
            fallback_items = [
                ('glassmorphism_panel', "Glassmorphism Panel", "Panel de cristal moderno"),
                ('neon_grid_landscape', "Neon Grid", "Paisaje de grilla neón"),
                ('nft_art_frame', "NFT Frame", "Marco de arte NFT"),
            ]
            items.extend(fallback_items)
        
        return items
        
    except ImportError as e:
        print(f"Error importando mockups: {e}")
        # Mockups estáticos como fallback
        fallback_mockups = {
            'glassmorphism': [
                ('glassmorphism_panel', "Glassmorphism Panel", "Panel de cristal moderno"),
                ('floating_glass_cards', "Floating Cards", "Tarjetas flotantes de cristal"),
                ('neo_glass_sphere', "Neo Glass Sphere", "Esfera de cristal neón"),
            ],
            'cyberpunk': [
                ('neon_grid_landscape', "Neon Grid", "Paisaje de grilla neón"),
                ('cyberpunk_tower', "Cyberpunk Tower", "Torre futurista"),
                ('hologram_data_stream', "Data Stream", "Flujo de datos holográfico"),
            ],
            'metaverse': [
                ('nft_art_frame', "NFT Frame", "Marco de arte NFT"),
                ('metaverse_portal', "Portal", "Portal del metaverso"),
                ('crypto_crystal', "Crypto Crystal", "Cristal de criptomoneda"),
            ],
            'parametric': [
                ('voronoi_structure', "Voronoi", "Estructura voronoi"),
                ('algorithmic_facade', "Facade", "Fachada algorítmica"),
                ('fractal_tree', "Fractal Tree", "Árbol fractal"),
            ],
            'bio_design': [
                ('bio_membrane', "Bio Membrane", "Membrana biológica"),
                ('sustainable_pod', "Sustainable Pod", "Pod sostenible"),
                ('living_wall', "Living Wall", "Muro viviente"),
            ]
        }
        
        items = [('none', "-- Seleccionar Mockup --", "")]
        items.extend(fallback_mockups.get(category, []))
        return items
    
    except Exception as e:
        print(f"Error obteniendo mockups: {e}")
        return [('none', "-- Error al cargar mockups --", "")]

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
            ('MATERIALS', "Materiales", "Efectos de materiales"),
            ('SIMULATION', "Simulación", "Simulaciones físicas"),
            ('CAMERA', "Cámara", "Efectos de cámara"),
            ('UTILITIES', "Utilidades", "Herramientas útiles"),
            ('VISUAL', "Visual", "Efectos visuales"),
        ],
        default='ANIMATION'
    )
    
    # Configuración avanzada
    advanced_mode: BoolProperty(
        name="Modo Avanzado",
        description="Habilitar controles avanzados",
        default=False
    )
    
    live_update: BoolProperty(
        name="Actualización en Vivo",
        description="Actualizar efectos en tiempo real",
        default=True
    )
    
    effect_intensity: FloatProperty(
        name="Intensidad del Efecto",
        description="Controla la intensidad del efecto",
        default=1.0,
        min=0.0,
        max=2.0
    )
    
    animation_length: IntProperty(
        name="Duración de Animación",
        description="Duración en frames",
        default=60,
        min=1,
        max=1000
    )
    
    auto_keyframe: BoolProperty(
        name="Auto Keyframe",
        description="Insertar keyframes automáticamente",
        default=True
    )
    
    # Propiedades de presets
    preset_category: EnumProperty(
        name="Categoría de Preset",
        description="Categoría del preset",
        items=[
            ('animation', "Animación", "Presets de animación"),
            ('particles', "Partículas", "Presets de partículas"),
            ('lighting', "Iluminación", "Presets de iluminación"),
            ('materials', "Materiales", "Presets de materiales"),
        ],
        default='animation'
    )
    
    selected_preset: EnumProperty(
        name="Preset Seleccionado",
        description="Preset a cargar",
        items=get_preset_items
    )
    
    # Propiedades de mockups - corregir categorías para que coincidan con mockups.py
    mockup_category: EnumProperty(
        name="Categoría de Mockup",
        description="Categoría del mockup",
        items=[
            ('glassmorphism', "Glassmorphism", "Efectos de cristal moderno"),
            ('cyberpunk', "Cyberpunk", "Estilo cyberpunk"),
            ('metaverse', "Metaverso", "Elementos del metaverso"),
            ('parametric', "Paramétrico", "Diseño paramétrico"),
            ('bio_design', "Bio Diseño", "Diseño biológico"),
        ],
        default='glassmorphism',
        update=lambda self, context: self.refresh_mockup_list(context)
    )
    
    selected_mockup: EnumProperty(
        name="Mockup Seleccionado",
        description="Mockup a crear",
        items=get_mockup_items
    )
    
    def refresh_mockup_list(self, context):
        """Fuerza la actualización de la lista de mockups cuando cambia la categoría"""
        try:
            # Forzar actualización del EnumProperty
            self.selected_mockup = 'none'
            print(f"Lista de mockups actualizada para categoría: {self.mockup_category}")
        except Exception as e:
            print(f"Error actualizando lista de mockups: {e}")

classes = (
    MotionFXSettings,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    
    # Registrar la propiedad en la scene
    bpy.types.Scene.motionfx_settings = PointerProperty(type=MotionFXSettings)
    print("MotionFX: Properties module loaded")

def unregister():
    # Eliminar la propiedad de la scene
    del bpy.types.Scene.motionfx_settings
    
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Properties module unloaded")