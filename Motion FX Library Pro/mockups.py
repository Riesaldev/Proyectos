import bpy
from bpy.props import StringProperty, BoolProperty
import bmesh
import mathutils
import random

class Mockups:
    def __init__(self):
        self.mockups = []
        self._initialize_premium_mockups()

    def _initialize_premium_mockups(self):
        premium_mockups = [
            {
                'name': 'Fluid Wave Abstract',
                'category': 'Abstract',
                'description': 'Modern fluid wave form with dynamic topology',
                'generator': self._create_fluid_wave
            },
            {
                'name': 'Geometric Crystal',
                'category': 'Geometric', 
                'description': 'Low-poly crystalline structure with sharp edges',
                'generator': self._create_geometric_crystal
            },
            {
                'name': 'Neural Network',
                'category': 'Futuristic',
                'description': 'AI neural network visualization',
                'generator': self._create_neural_network
            },
            {
                'name': 'Holographic Panel',
                'category': 'Futuristic',
                'description': 'Sci-fi holographic interface panel',
                'generator': self._create_holographic_panel
            },
            {
                'name': 'Infinity Loop',
                'category': 'Mathematical',
                'description': 'Mathematical infinity symbol in 3D',
                'generator': self._create_infinity_loop
            }
        ]
        
        self.mockups.extend(premium_mockups)

    def _safe_material_creation(self, name, color=(1, 1, 1, 1), emission_strength=0):
        """Crear material de forma segura"""
        try:
            if name in bpy.data.materials:
                return bpy.data.materials[name]
            
            mat = bpy.data.materials.new(name=name)
            mat.use_nodes = True
            
            # Limpiar nodos existentes
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear shader principal
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar y configurar
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            principled.inputs["Base Color"].default_value = color
            
            if emission_strength > 0:
                principled.inputs["Emission"].default_value = color
                principled.inputs["Emission Strength"].default_value = emission_strength
            
            return mat
            
        except Exception as e:
            print(f"Error creating material {name}: {e}")
            return None

    def _create_fluid_wave(self):
        try:
            # Limpiar selección
            bpy.ops.object.select_all(action='DESELECT')
            
            bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Fluid_Wave_Mockup"
            
            # Asegurar que el objeto esté seleccionado y activo
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Subdivisión para más geometría
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.subdivide(number_cuts=10)
            bpy.ops.object.mode_set(mode='OBJECT')
            
            # Modificador de subdivisión
            subsurf = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf.levels = 3
            subsurf.render_levels = 4
            
            # Primer modificador Wave
            wave_mod = obj.modifiers.new(name="Wave1", type='WAVE')
            wave_mod.height = 0.8
            wave_mod.width = 2.0
            wave_mod.speed = 1.5
            wave_mod.use_z = True
            wave_mod.use_x = True
            
            # Segundo modificador Wave
            wave_mod2 = obj.modifiers.new(name="Wave2", type='WAVE')
            wave_mod2.height = 0.4
            wave_mod2.width = 1.2
            wave_mod2.speed = -0.8
            wave_mod2.use_y = True
            wave_mod2.offset = 1.57
            
            # Material fluido
            mat = self._safe_material_creation(
                "Fluid_Material", 
                color=(0.2, 0.6, 1.0, 1.0)
            )
            if mat:
                obj.data.materials.append(mat)
                
                # Configurar propiedades del material
                nodes = mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Metallic"].default_value = 0.0
                    principled.inputs["Roughness"].default_value = 0.1
                    principled.inputs["Transmission"].default_value = 0.8
                    principled.inputs["IOR"].default_value = 1.33
                    mat.blend_method = 'BLEND'
            
            # Animar offset del primer wave
            current_frame = bpy.context.scene.frame_current
            wave_mod.offset = 0
            wave_mod.keyframe_insert(data_path="offset", frame=current_frame)
            wave_mod.offset = 6.28
            wave_mod.keyframe_insert(data_path="offset", frame=current_frame + 120)
            
            return obj
            
        except Exception as e:
            print(f"Error creating fluid wave: {e}")
            return None

    def _create_geometric_crystal(self):
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Geometric_Crystal_Mockup"
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Wireframe modifier
            wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
            wireframe.thickness = 0.02
            wireframe.use_boundary = True
            wireframe.use_even_offset = True
            
            # Solidify para dar grosor
            solidify = obj.modifiers.new(name="Solidify", type='SOLIDIFY')
            solidify.thickness = 0.01
            solidify.use_even_offset = True
            
            # Material cristal
            mat = self._safe_material_creation(
                "Crystal_Material",
                color=(0.9, 0.9, 1.0, 1.0)
            )
            if mat:
                obj.data.materials.append(mat)
                
                nodes = mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Metallic"].default_value = 0.0
                    principled.inputs["Roughness"].default_value = 0.0
                    principled.inputs["Transmission"].default_value = 0.95
                    principled.inputs["IOR"].default_value = 2.4
                    principled.inputs["Alpha"].default_value = 0.8
                    mat.blend_method = 'BLEND'
            
            # Animación de rotación
            current_frame = bpy.context.scene.frame_current
            obj.rotation_euler = (0, 0, 0)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            obj.rotation_euler = (6.28, 6.28, 0)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 120)
            
            return obj
            
        except Exception as e:
            print(f"Error creating geometric crystal: {e}")
            return None

    def _create_neural_network(self):
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Crear esfera principal
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Neural_Network_Mockup"
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Wireframe para estructura de red
            wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
            wireframe.thickness = 0.005
            wireframe.use_boundary = True
            
            # Material neural
            mat = self._safe_material_creation(
                "Neural_Material",
                color=(1.0, 0.3, 0.8, 1.0),
                emission_strength=2.0
            )
            if mat:
                obj.data.materials.append(mat)
                
                nodes = mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Metallic"].default_value = 0.8
            
            # Crear nodos de red
            node_objects = []
            for i in range(8):
                location = (
                    random.uniform(-2, 2),
                    random.uniform(-2, 2), 
                    random.uniform(-2, 2)
                )
                
                bpy.ops.mesh.primitive_uv_sphere_add(radius=0.1, location=location)
                node_obj = bpy.context.active_object
                node_obj.name = f"Neural_Node_{i}"
                
                if mat:
                    node_obj.data.materials.append(mat)
                
                node_objects.append(node_obj)
            
            # Agrupar objetos
            bpy.ops.object.select_all(action='DESELECT')
            obj.select_set(True)
            for node_obj in node_objects:
                node_obj.select_set(True)
            
            bpy.context.view_layer.objects.active = obj
            
            return obj
            
        except Exception as e:
            print(f"Error creating neural network: {e}")
            return None

    def _create_holographic_panel(self):
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            bpy.ops.mesh.primitive_plane_add(size=3, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Holographic_Panel_Mockup"
            obj.rotation_euler = (0.3, 0, 0)
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Solidify para dar grosor
            solidify = obj.modifiers.new(name="Solidify", type='SOLIDIFY')
            solidify.thickness = 0.01
            solidify.use_even_offset = True
            
            # Array para múltiples paneles
            array = obj.modifiers.new(name="Array", type='ARRAY')
            array.count = 5
            array.relative_offset_displace[2] = 0.1
            
            # Material holográfico
            mat = self._safe_material_creation(
                "Hologram_Material",
                color=(0.0, 0.8, 1.0, 1.0),
                emission_strength=3.0
            )
            if mat:
                obj.data.materials.append(mat)
                
                nodes = mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Alpha"].default_value = 0.7
                    principled.inputs["Transmission"].default_value = 0.8
                    mat.blend_method = 'BLEND'
            
            # Animación de escala pulsante
            current_frame = bpy.context.scene.frame_current
            obj.scale = (1, 1, 1)
            obj.keyframe_insert(data_path="scale", frame=current_frame)
            obj.scale = (1.2, 1.2, 1)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 60)
            obj.scale = (1, 1, 1)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 120)
            
            return obj
            
        except Exception as e:
            print(f"Error creating holographic panel: {e}")
            return None

    def _create_infinity_loop(self):
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            bpy.ops.mesh.primitive_torus_add(major_radius=2, minor_radius=0.3, location=(0, 0, 0))
            obj = bpy.context.active_object
            obj.name = "Infinity_Loop_Mockup"
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Deformación twist para forma de infinito
            twist_mod = obj.modifiers.new(name="Twist", type='SIMPLE_DEFORM')
            twist_mod.deform_method = 'TWIST'
            twist_mod.angle = 3.14159
            twist_mod.deform_axis = 'Z'
            
            # Suavizado
            subsurf = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf.levels = 2
            
            # Material dorado brillante
            mat = self._safe_material_creation(
                "Infinity_Material",
                color=(1.0, 0.7, 0.0, 1.0),
                emission_strength=1.0
            )
            if mat:
                obj.data.materials.append(mat)
                
                nodes = mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Metallic"].default_value = 1.0
                    principled.inputs["Roughness"].default_value = 0.1
            
            # Rotación continua
            current_frame = bpy.context.scene.frame_current
            obj.rotation_euler = (0, 0, 0)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            obj.rotation_euler = (0, 0, 6.28)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 120)
            
            return obj
            
        except Exception as e:
            print(f"Error creating infinity loop: {e}")
            return None

    def create_mockup(self, name):
        try:
            # Buscar el mockup por nombre
            mockup = None
            for m in self.mockups:
                if m['name'].lower() == name.lower() or name.lower() in m['name'].lower():
                    mockup = m
                    break
            
            if not mockup or 'generator' not in mockup:
                print(f"Mockup '{name}' not found or no generator available")
                return None
            
            # Guardar contexto actual
            original_active = bpy.context.active_object
            
            # Limpiar selección antes de crear
            bpy.ops.object.select_all(action='DESELECT')
            
            # Crear el mockup
            obj = mockup['generator']()
            
            if obj:
                # Configurar propiedades personalizadas
                obj['motionfx_mockup'] = mockup['name']
                obj['motionfx_category'] = mockup.get('category', 'General')
                obj['motionfx_description'] = mockup.get('description', '')
                
                # Asegurar que esté seleccionado y activo
                bpy.context.view_layer.objects.active = obj
                obj.select_set(True)
                
                # Centrar vista en el objeto si es posible
                try:
                    bpy.ops.view3d.view_selected(use_all_regions=False)
                except:
                    pass  # No hay vista 3D activa
                
                print(f"Mockup '{mockup['name']}' created successfully")
                return obj
            else:
                print(f"Failed to create mockup '{name}'")
                return None
                
        except Exception as e:
            print(f"Error creating mockup '{name}': {e}")
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
    print("MotionFX: Mockups module loaded with premium 3D assets")

def unregister():
    print("MotionFX: Mockups module unloaded")
