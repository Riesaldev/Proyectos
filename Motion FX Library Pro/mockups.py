import bpy
from bpy.props import StringProperty, BoolProperty
import bmesh
import mathutils
import random
import math

class Mockups:
    def __init__(self):
        self.mockups = []
        self._initialize_contemporary_mockups()

    def _initialize_contemporary_mockups(self):
        contemporary_mockups = [
            # Glassmorphism Category - Tendencia actual
            {
                'name': 'glassmorphism_panel',
                'display_name': 'Glassmorphism Panel',
                'category': 'glassmorphism',
                'description': 'Modern glassmorphism UI panel with frosted glass effect',
                'generator': self._create_glassmorphism_panel
            },
            {
                'name': 'floating_glass_cards',
                'display_name': 'Floating Glass Cards',
                'category': 'glassmorphism',
                'description': 'Stack of floating glassmorphic cards',
                'generator': self._create_floating_glass_cards
            },
            {
                'name': 'neo_glass_sphere',
                'display_name': 'Neo Glass Sphere',
                'category': 'glassmorphism',
                'description': 'Translucent sphere with modern glass effects',
                'generator': self._create_neo_glass_sphere
            },
            
            # Cyberpunk/Neon Category
            {
                'name': 'neon_grid_landscape',
                'display_name': 'Neon Grid Landscape',
                'category': 'cyberpunk',
                'description': 'Retro-futuristic neon grid terrain',
                'generator': self._create_neon_grid_landscape
            },
            {
                'name': 'cyberpunk_tower',
                'display_name': 'Cyberpunk Tower',
                'category': 'cyberpunk',
                'description': 'Futuristic cyberpunk architecture',
                'generator': self._create_cyberpunk_tower
            },
            {
                'name': 'hologram_data_stream',
                'display_name': 'Hologram Data Stream',
                'category': 'cyberpunk',
                'description': 'Flowing data visualization with neon effects',
                'generator': self._create_hologram_data_stream
            },
            
            # Metaverse/NFT Category
            {
                'name': 'nft_art_frame',
                'display_name': 'NFT Art Frame',
                'category': 'metaverse',
                'description': 'Digital art frame with blockchain aesthetics',
                'generator': self._create_nft_art_frame
            },
            {
                'name': 'metaverse_portal',
                'display_name': 'Metaverse Portal',
                'category': 'metaverse',
                'description': 'Portal gateway to virtual worlds',
                'generator': self._create_metaverse_portal
            },
            {
                'name': 'crypto_crystal',
                'display_name': 'Crypto Crystal',
                'category': 'metaverse',
                'description': 'Crystalline structure with digital currency aesthetics',
                'generator': self._create_crypto_crystal
            },
            
            # Parametric Design Category
            {
                'name': 'voronoi_structure',
                'display_name': 'Voronoi Structure',
                'category': 'parametric',
                'description': 'Organic voronoi-based architectural form',
                'generator': self._create_voronoi_structure
            },
            {
                'name': 'algorithmic_facade',
                'display_name': 'Algorithmic Facade',
                'category': 'parametric',
                'description': 'Generative architectural facade pattern',
                'generator': self._create_algorithmic_facade
            },
            {
                'name': 'fractal_tree',
                'display_name': 'Fractal Tree',
                'category': 'parametric',
                'description': 'Procedural fractal tree structure',
                'generator': self._create_fractal_tree
            },
            
            # Sustainable/Bio Design Category
            {
                'name': 'bio_membrane',
                'display_name': 'Bio Membrane',
                'category': 'bio_design',
                'description': 'Organic membrane structure inspired by nature',
                'generator': self._create_bio_membrane
            },
            {
                'name': 'sustainable_pod',
                'display_name': 'Sustainable Pod',
                'category': 'bio_design',
                'description': 'Eco-friendly architectural pod',
                'generator': self._create_sustainable_pod
            },
            {
                'name': 'living_wall',
                'display_name': 'Living Wall',
                'category': 'bio_design',
                'description': 'Vertical garden wall system',
                'generator': self._create_living_wall
            }
        ]
        
        self.mockups.extend(contemporary_mockups)

    def _create_modern_material(self, name, base_color=(1, 1, 1, 1), metallic=0, roughness=0.5, 
                              emission_color=(0, 0, 0, 1), emission_strength=0, alpha=1.0,
                              transmission=0, ior=1.45, clearcoat=0, subsurface=0):
        """Crear materiales modernos con todas las propiedades PBR"""
        try:
            if name in bpy.data.materials:
                bpy.data.materials.remove(bpy.data.materials[name])
            
            mat = bpy.data.materials.new(name=name)
            mat.use_nodes = True
            
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            nodes.clear()
            
            # Nodos principales
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar propiedades modernas
            principled.inputs["Base Color"].default_value = base_color
            principled.inputs["Metallic"].default_value = metallic
            principled.inputs["Roughness"].default_value = roughness
            principled.inputs["Emission"].default_value = emission_color
            principled.inputs["Emission Strength"].default_value = emission_strength
            principled.inputs["Alpha"].default_value = alpha
            principled.inputs["Transmission"].default_value = transmission
            principled.inputs["IOR"].default_value = ior
            
            # Propiedades avanzadas para Blender 3.0+
            try:
                principled.inputs["Clearcoat"].default_value = clearcoat
                principled.inputs["Subsurface"].default_value = subsurface
            except:
                pass
            
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            
            # Configurar blend mode
            if alpha < 1.0 or transmission > 0:
                mat.blend_method = 'BLEND'
                mat.use_screen_refraction = True
            
            return mat
            
        except Exception as e:
            print(f"Error creating modern material {name}: {e}")
            return None

    def _create_glassmorphism_panel(self):
        """Crear panel glassmorfismo contemporáneo"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Panel principal
            bpy.ops.mesh.primitive_cube_add(size=4, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Glassmorphism_Panel"
            obj.scale = (1, 0.1, 1.5)
            
            # Subdivisión para suavidad
            subsurf = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf.levels = 2
            
            # Bevel para bordes suaves
            bevel = obj.modifiers.new(name="Bevel", type='BEVEL')
            bevel.width = 0.05
            bevel.segments = 4
            
            # Material glassmorfismo
            mat = self._create_modern_material(
                "Glassmorphism_Material",
                base_color=(0.95, 0.95, 1.0, 0.15),
                roughness=0.1,
                transmission=0.8,
                ior=1.33,
                alpha=0.15
            )
            
            if mat:
                obj.data.materials.append(mat)
                
                # Añadir ruido para efecto frosted
                nodes = mat.node_tree.nodes
                links = mat.node_tree.links
                
                noise = nodes.new(type='ShaderNodeTexNoise')
                noise.inputs['Scale'].default_value = 50
                noise.inputs['Detail'].default_value = 15
                noise.inputs['Roughness'].default_value = 0.7
                
                principled = nodes.get("Principled BSDF")
                if principled:
                    links.new(noise.outputs['Fac'], principled.inputs['Roughness'])
            
            # Animación flotante sutil
            current_frame = bpy.context.scene.frame_current
            obj.location = (0, 0, 0)
            obj.keyframe_insert(data_path="location", frame=current_frame)
            obj.location = (0, 0, 0.2)
            obj.keyframe_insert(data_path="location", frame=current_frame + 60)
            obj.location = (0, 0, 0)
            obj.keyframe_insert(data_path="location", frame=current_frame + 120)
            
            return obj
            
        except Exception as e:
            print(f"Error creating glassmorphism panel: {e}")
            return None

    def _create_neon_grid_landscape(self):
        """Crear paisaje de grilla neón cyberpunk"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Plano base
            bpy.ops.mesh.primitive_grid_add(x_subdivisions=20, y_subdivisions=20, size=10)
            obj = bpy.context.active_object
            obj.name = "Neon_Grid_Landscape"
            
            # Deformación tipo wave
            wave = obj.modifiers.new(name="Wave", type='WAVE')
            wave.height = 0.5
            wave.width = 2.0
            wave.speed = 1.0
            
            # Wireframe para efecto grid
            wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
            wireframe.thickness = 0.02
            wireframe.use_boundary = True
            
            # Material neón
            mat = self._create_modern_material(
                "Neon_Grid_Material",
                base_color=(1.0, 0.0, 1.0, 1.0),
                emission_color=(1.0, 0.0, 1.0, 1.0),
                emission_strength=5.0,
                metallic=0.8
            )
            
            if mat:
                obj.data.materials.append(mat)
            
            # Animación de ondas
            current_frame = bpy.context.scene.frame_current
            wave.offset = 0
            wave.keyframe_insert(data_path="offset", frame=current_frame)
            wave.offset = 6.28
            wave.keyframe_insert(data_path="offset", frame=current_frame + 100)
            
            return obj
            
        except Exception as e:
            print(f"Error creating neon grid landscape: {e}")
            return None

    def _create_nft_art_frame(self):
        """Crear marco de arte NFT"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Marco exterior
            bpy.ops.mesh.primitive_cube_add(size=4, location=(0, 0, 0))
            frame = bpy.context.active_object
            frame.name = "NFT_Frame"
            frame.scale = (1, 0.1, 1.2)
            
            # Bevel pronunciado
            bevel = frame.modifiers.new(name="Bevel", type='BEVEL')
            bevel.width = 0.1
            bevel.segments = 6
            
            # Panel interior
            bpy.ops.mesh.primitive_cube_add(size=3.5, location=(0, 0.05, 0))
            panel = bpy.context.active_object
            panel.name = "NFT_Panel"
            panel.scale = (1, 0.05, 1.1)
            
            # Material marco dorado
            frame_mat = self._create_modern_material(
                "NFT_Frame_Material",
                base_color=(1.0, 0.8, 0.0, 1.0),
                metallic=1.0,
                roughness=0.1,
                emission_strength=0.5
            )
            
            # Material panel holográfico
            panel_mat = self._create_modern_material(
                "NFT_Panel_Material",
                base_color=(0.5, 0.8, 1.0, 0.8),
                emission_color=(0.3, 0.6, 1.0, 1.0),
                emission_strength=2.0,
                transmission=0.3,
                alpha=0.8
            )
            
            if frame_mat:
                frame.data.materials.append(frame_mat)
            if panel_mat:
                panel.data.materials.append(panel_mat)
            
            # Agrupar objetos
            bpy.ops.object.select_all(action='DESELECT')
            frame.select_set(True)
            panel.select_set(True)
            bpy.context.view_layer.objects.active = frame
            
            # Animación de giro lento
            current_frame = bpy.context.scene.frame_current
            frame.rotation_euler = (0, 0, 0)
            frame.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            frame.rotation_euler = (0, 6.28, 0)
            frame.keyframe_insert(data_path="rotation_euler", frame=current_frame + 200)
            
            return frame
            
        except Exception as e:
            print(f"Error creating NFT art frame: {e}")
            return None

    def _create_voronoi_structure(self):
        """Crear estructura voronoi paramétrica"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Icosphere base
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Voronoi_Structure"
            
            # Modificador cell fracture (simulado con wireframe)
            wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
            wireframe.thickness = 0.05
            wireframe.use_boundary = True
            wireframe.use_crease = True
            
            # Subdivisión para suavidad
            subsurf = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf.levels = 1
            
            # Material paramétrico
            mat = self._create_modern_material(
                "Voronoi_Material",
                base_color=(0.9, 0.9, 0.95, 1.0),
                metallic=0.2,
                roughness=0.3,
                clearcoat=0.8
            )
            
            if mat:
                obj.data.materials.append(mat)
                
                # Añadir textura voronoi
                nodes = mat.node_tree.nodes
                links = mat.node_tree.links
                
                voronoi = nodes.new(type='ShaderNodeTexVoronoi')
                voronoi.inputs['Scale'].default_value = 8
                
                principled = nodes.get("Principled BSDF")
                if principled:
                    links.new(voronoi.outputs['Color'], principled.inputs['Base Color'])
            
            # Rotación compleja
            current_frame = bpy.context.scene.frame_current
            obj.rotation_euler = (0, 0, 0)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            obj.rotation_euler = (3.14, 6.28, 1.57)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 150)
            
            return obj
            
        except Exception as e:
            print(f"Error creating voronoi structure: {e}")
            return None

    def _create_bio_membrane(self):
        """Crear membrana biológica"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Plano base
            bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Bio_Membrane"
            
            # Subdivisión alta
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.subdivide(number_cuts=8)
            bpy.ops.object.mode_set(mode='OBJECT')
            
            # Subdivisión surface
            subsurf = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf.levels = 3
            
            # Desplazamiento orgánico
            displace = obj.modifiers.new(name="Displace", type='DISPLACE')
            displace.strength = 0.8
            displace.mid_level = 0.5
            
            # Wave para movimiento orgánico
            wave = obj.modifiers.new(name="Wave", type='WAVE')
            wave.height = 0.3
            wave.width = 3.0
            wave.speed = 0.5
            
            # Material bio
            mat = self._create_modern_material(
                "Bio_Material",
                base_color=(0.8, 0.9, 0.7, 0.9),
                transmission=0.6,
                subsurface=0.8,
                ior=1.4,
                alpha=0.9
            )
            
            if mat:
                obj.data.materials.append(mat)
                mat.blend_method = 'BLEND'
            
            # Animación ondulante
            current_frame = bpy.context.scene.frame_current
            wave.offset = 0
            wave.keyframe_insert(data_path="offset", frame=current_frame)
            wave.offset = 6.28
            wave.keyframe_insert(data_path="offset", frame=current_frame + 80)
            
            return obj
            
        except Exception as e:
            print(f"Error creating bio membrane: {e}")
            return None

    def _create_floating_glass_cards(self):
        """Crear cartas de cristal flotantes"""
        try:
            cards = []
            for i in range(5):
                bpy.ops.mesh.primitive_cube_add(
                    size=2, 
                    location=(i * 0.5, 0, i * 0.2)
                )
                card = bpy.context.active_object
                card.name = f"Glass_Card_{i}"
                card.scale = (0.8, 0.05, 1.2)
                card.rotation_euler = (0, 0, i * 0.1)
                
                # Bevel para bordes suaves
                bevel = card.modifiers.new(name="Bevel", type='BEVEL')
                bevel.width = 0.02
                
                # Material glassmorfismo individual
                mat = self._create_modern_material(
                    f"Glass_Card_Material_{i}",
                    base_color=(0.9, 0.9 + i*0.02, 1.0, 0.2),
                    transmission=0.85,
                    roughness=0.05,
                    alpha=0.2
                )
                
                if mat:
                    card.data.materials.append(mat)
                
                cards.append(card)
            
            return cards[0]  # Retornar la primera carta como referencia
            
        except Exception as e:
            print(f"Error creating floating glass cards: {e}")
            return None

    def _create_cyberpunk_tower(self):
        """Crear torre cyberpunk"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Torre base
            bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=8, location=(0, 0, 4))
            obj = bpy.context.active_object
            obj.name = "Cyberpunk_Tower"
            
            # Array vertical con offset
            array = obj.modifiers.new(name="Array", type='ARRAY')
            array.count = 8
            array.relative_offset_displace[2] = 0.9
            array.relative_offset_displace[0] = 0.05
            
            # Wireframe para estructura
            wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
            wireframe.thickness = 0.03
            
            # Material neón cyberpunk
            mat = self._create_modern_material(
                "Cyberpunk_Material",
                base_color=(0.0, 1.0, 1.0, 1.0),
                emission_color=(0.0, 1.0, 1.0, 1.0),
                emission_strength=8.0,
                metallic=0.9
            )
            
            if mat:
                obj.data.materials.append(mat)
            
            return obj
            
        except Exception as e:
            print(f"Error creating cyberpunk tower: {e}")
            return None

    def _create_metaverse_portal(self):
        """Crear portal del metaverso"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Anillo exterior
            bpy.ops.mesh.primitive_torus_add(major_radius=3, minor_radius=0.3)
            portal = bpy.context.active_object
            portal.name = "Metaverse_Portal"
            
            # Portal interior
            bpy.ops.mesh.primitive_cylinder_add(radius=2.5, depth=0.1)
            interior = bpy.context.active_object
            interior.name = "Portal_Interior"
            interior.rotation_euler = (1.57, 0, 0)
            
            # Materiales
            ring_mat = self._create_modern_material(
                "Portal_Ring_Material",
                base_color=(0.8, 0.4, 1.0, 1.0),
                emission_color=(0.8, 0.4, 1.0, 1.0),
                emission_strength=5.0,
                metallic=1.0
            )
            
            portal_mat = self._create_modern_material(
                "Portal_Interior_Material",
                base_color=(0.2, 0.6, 1.0, 0.7),
                emission_color=(0.2, 0.6, 1.0, 1.0),
                emission_strength=3.0,
                transmission=0.8,
                alpha=0.7
            )
            
            if ring_mat:
                portal.data.materials.append(ring_mat)
            if portal_mat:
                interior.data.materials.append(portal_mat)
            
            return portal
            
        except Exception as e:
            print(f"Error creating metaverse portal: {e}")
            return None

    def create_mockup(self, name):
        try:
            # Buscar el mockup por nombre o display_name
            mockup = None
            for m in self.mockups:
                if (m['name'] == name or 
                    m.get('display_name', '').lower() == name.lower() or
                    name.lower() in m['name'].lower()):
                    mockup = m
                    break
            
            if not mockup or 'generator' not in mockup:
                print(f"Mockup '{name}' not found. Available contemporary mockups:")
                for m in self.mockups:
                    print(f"  - {m['name']} ({m.get('display_name', 'No display name')})")
                return None
            
            # Guardar contexto actual
            original_active = bpy.context.active_object
            
            # Limpiar selección antes de crear
            bpy.ops.object.select_all(action='DESELECT')
            
            # Crear el mockup
            obj = mockup['generator']()
            
            if obj:
                # Configurar propiedades personalizadas
                obj['motionfx_mockup'] = mockup.get('display_name', mockup['name'])
                obj['motionfx_category'] = mockup.get('category', 'General')
                obj['motionfx_description'] = mockup.get('description', '')
                obj['motionfx_style'] = 'Contemporary 2024'
                
                # Asegurar que esté seleccionado y activo
                bpy.context.view_layer.objects.active = obj
                obj.select_set(True)
                
                # Centrar vista en el objeto si es posible
                try:
                    bpy.ops.view3d.view_selected(use_all_regions=False)
                except:
                    pass  # No hay vista 3D activa
                
                print(f"Contemporary mockup '{mockup.get('display_name', mockup['name'])}' created successfully")
                return obj
            else:
                print(f"Failed to create contemporary mockup '{name}'")
                return None
                
        except Exception as e:
            print(f"Error creating contemporary mockup '{name}': {e}")
            import traceback
            traceback.print_exc()
            return None

    def get_mockups(self):
        return self.mockups
    
    def get_categories(self):
        categories = set()
        for mockup in self.mockups:
            if 'category' in mockup:
                categories.add(mockup['category'])
        return sorted(list(categories))

mockups = Mockups()

def register():
    print("MotionFX: Contemporary mockups module loaded with modern 3D designs")

def unregister():
    print("MotionFX: Contemporary mockups module unloaded")
