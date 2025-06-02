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

    def _create_fluid_wave(self):
        bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 0))
        obj = bpy.context.active_object
        obj.name = "Fluid_Wave_Mockup"
        
        bpy.ops.object.modifier_add(type='SUBSURF')
        subsurf = obj.modifiers[-1]
        subsurf.levels = 4
        subsurf.render_levels = 5
        
        bpy.ops.object.modifier_add(type='WAVE')
        wave_mod = obj.modifiers[-1]
        wave_mod.height = 0.8
        wave_mod.width = 2.0
        wave_mod.speed = 1.5
        wave_mod.use_z = True
        wave_mod.use_x = True
        
        bpy.ops.object.modifier_add(type='WAVE')
        wave_mod2 = obj.modifiers[-1]
        wave_mod2.height = 0.4
        wave_mod2.width = 1.2
        wave_mod2.speed = -0.8
        wave_mod2.use_y = True
        wave_mod2.offset = 1.57
        
        mat = bpy.data.materials.new(name="Fluid_Material")
        mat.use_nodes = True
        obj.data.materials.append(mat)
        
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs["Base Color"].default_value = (0.2, 0.6, 1.0, 1.0)
            principled.inputs["Metallic"].default_value = 0.0
            principled.inputs["Roughness"].default_value = 0.1
            principled.inputs["Transmission"].default_value = 0.8
            principled.inputs["IOR"].default_value = 1.33
        
        obj.keyframe_insert(data_path="modifiers[\"Wave\"].offset", frame=1)
        wave_mod.offset = 6.28
        obj.keyframe_insert(data_path="modifiers[\"Wave\"].offset", frame=120)
        
        return obj

    def _create_geometric_crystal(self):
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, location=(0, 0, 0))
        obj = bpy.context.active_object
        obj.name = "Geometric_Crystal_Mockup"
        
        bpy.ops.object.modifier_add(type='WIREFRAME')
        wireframe = obj.modifiers[-1]
        wireframe.thickness = 0.02
        wireframe.use_boundary = True
        
        bpy.ops.object.modifier_add(type='SOLIDIFY')
        solidify = obj.modifiers[-1]
        solidify.thickness = 0.01
        
        mat = bpy.data.materials.new(name="Crystal_Material")
        mat.use_nodes = True
        obj.data.materials.append(mat)
        
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs["Base Color"].default_value = (0.9, 0.9, 1.0, 1.0)
            principled.inputs["Metallic"].default_value = 0.0
            principled.inputs["Roughness"].default_value = 0.0
            principled.inputs["Transmission"].default_value = 0.95
            principled.inputs["IOR"].default_value = 2.4
            principled.inputs["Alpha"].default_value = 0.8
        
        mat.blend_method = 'BLEND'
        
        obj.rotation_euler = (0, 0, 0)
        obj.keyframe_insert(data_path="rotation_euler", frame=1)
        obj.rotation_euler = (6.28, 6.28, 0)
        obj.keyframe_insert(data_path="rotation_euler", frame=120)
        
        return obj

    def _create_neural_network(self):
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, location=(0, 0, 0))
        obj = bpy.context.active_object
        obj.name = "Neural_Network_Mockup"
        
        bpy.ops.object.modifier_add(type='WIREFRAME')
        wireframe = obj.modifiers[-1]
        wireframe.thickness = 0.005
        wireframe.use_boundary = True
        
        mat = bpy.data.materials.new(name="Neural_Material")
        mat.use_nodes = True
        obj.data.materials.append(mat)
        
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs["Base Color"].default_value = (1.0, 0.3, 0.8, 1.0)
            principled.inputs["Emission"].default_value = (1.0, 0.2, 0.6, 1.0)
            principled.inputs["Emission Strength"].default_value = 2.0
            principled.inputs["Metallic"].default_value = 0.8
        
        for i in range(8):
            bpy.ops.mesh.primitive_uv_sphere_add(
                radius=0.1, 
                location=(
                    random.uniform(-2, 2),
                    random.uniform(-2, 2), 
                    random.uniform(-2, 2)
                )
            )
            node_obj = bpy.context.active_object
            node_obj.name = f"Neural_Node_{i}"
            node_obj.data.materials.append(mat)
        
        return obj

    def _create_holographic_panel(self):
        bpy.ops.mesh.primitive_plane_add(size=3, location=(0, 0, 0))
        obj = bpy.context.active_object
        obj.name = "Holographic_Panel_Mockup"
        obj.rotation_euler = (0.3, 0, 0)
        
        bpy.ops.object.modifier_add(type='SOLIDIFY')
        solidify = obj.modifiers[-1]
        solidify.thickness = 0.01
        
        bpy.ops.object.modifier_add(type='ARRAY')
        array = obj.modifiers[-1]
        array.count = 5
        array.relative_offset_displace[2] = 0.1
        
        mat = bpy.data.materials.new(name="Hologram_Material")
        mat.use_nodes = True
        obj.data.materials.append(mat)
        
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs["Base Color"].default_value = (0.0, 0.8, 1.0, 1.0)
            principled.inputs["Emission"].default_value = (0.0, 0.6, 1.0, 1.0)
            principled.inputs["Emission Strength"].default_value = 3.0
            principled.inputs["Alpha"].default_value = 0.7
            principled.inputs["Transmission"].default_value = 0.8
        
        mat.blend_method = 'BLEND'
        
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=1)
        obj.scale = (1.2, 1.2, 1)
        obj.keyframe_insert(data_path="scale", frame=60)
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=120)
        
        return obj

    def _create_infinity_loop(self):
        bpy.ops.mesh.primitive_torus_add(major_radius=2, minor_radius=0.3, location=(0, 0, 0))
        obj = bpy.context.active_object
        obj.name = "Infinity_Loop_Mockup"
        
        bpy.ops.object.modifier_add(type='SIMPLE_DEFORM')
        twist_mod = obj.modifiers[-1]
        twist_mod.deform_method = 'TWIST'
        twist_mod.angle = 3.14159
        
        bpy.ops.object.modifier_add(type='SUBSURF')
        subsurf = obj.modifiers[-1]
        subsurf.levels = 2
        
        mat = bpy.data.materials.new(name="Infinity_Material")
        mat.use_nodes = True
        obj.data.materials.append(mat)
        
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs["Base Color"].default_value = (1.0, 0.7, 0.0, 1.0)
            principled.inputs["Metallic"].default_value = 1.0
            principled.inputs["Roughness"].default_value = 0.1
            principled.inputs["Emission"].default_value = (1.0, 0.5, 0.0, 1.0)
            principled.inputs["Emission Strength"].default_value = 1.0
        
        obj.rotation_euler = (0, 0, 0)
        obj.keyframe_insert(data_path="rotation_euler", frame=1)
        obj.rotation_euler = (0, 0, 6.28)
        obj.keyframe_insert(data_path="rotation_euler", frame=120)
        
        return obj

    def create_mockup(self, name):
        try:
            mockup = next((m for m in self.mockups if m['name'] == name), None)
            if mockup and 'generator' in mockup:
                obj = mockup['generator']()
                
                bpy.context.view_layer.objects.active = obj
                obj.select_set(True)
                
                obj['motionfx_mockup'] = name
                obj['motionfx_category'] = mockup.get('category', 'General')
                
                bpy.ops.view3d.view_selected(use_all_regions=False)
                
                print(f"Mockup {name} created successfully")
                return obj
            else:
                print(f"Mockup {name} not found or no generator available")
                return None
        except Exception as e:
            print(f"Error creating mockup {name}: {e}")
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
