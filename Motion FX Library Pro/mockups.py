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
        """Initialize contemporary mockup library"""
        self.mockups = [
            {
                'name': 'smartphone_2024',
                'display_name': 'Smartphone 2024',
                'category': 'Electronics',
                'description': 'Modern smartphone mockup',
                'type': 'CUBE'
            },
            {
                'name': 'tablet_pro',
                'display_name': 'Tablet Pro',
                'category': 'Electronics',
                'description': 'Professional tablet mockup',
                'type': 'CUBE'
            },
            {
                'name': 'laptop_ultrabook',
                'display_name': 'Laptop Ultrabook',
                'category': 'Electronics',
                'description': 'Ultrabook laptop mockup',
                'type': 'CUBE'
            },
            {
                'name': 'smart_watch',
                'display_name': 'Smart Watch',
                'category': 'Wearables',
                'description': 'Modern smartwatch mockup',
                'type': 'CYLINDER'
            },
            {
                'name': 'vr_headset',
                'display_name': 'VR Headset',
                'category': 'Tech',
                'description': 'Virtual reality headset',
                'type': 'CUBE'
            }
        ]

    def get_categories(self):
        """Get available mockup categories"""
        categories = set()
        for mockup in self.mockups:
            categories.add(mockup.get('category', 'General'))
        return sorted(list(categories))

    def create_mockup(self, name):
        try:
            mockup = None
            for m in self.mockups:
                if m['name'] == name:
                    mockup = m
                    break
            
            if not mockup:
                print(f"Mockup '{name}' not found")
                return None
            
            # Create base geometry
            if mockup['type'] == 'CUBE':
                bpy.ops.mesh.primitive_cube_add()
            elif mockup['type'] == 'CYLINDER':
                bpy.ops.mesh.primitive_cylinder_add()
            elif mockup['type'] == 'SPHERE':
                bpy.ops.mesh.primitive_uv_sphere_add()
            else:
                bpy.ops.mesh.primitive_cube_add()
            
            obj = bpy.context.active_object
            if obj:
                obj.name = mockup.get('display_name', mockup['name'])
                obj['motionfx_category'] = mockup.get('category', 'General')
                obj['motionfx_description'] = mockup.get('description', '')
                obj['motionfx_style'] = 'Contemporary 2024'
                
                # Apply basic material
                mat = bpy.data.materials.new(name=f"Material_{obj.name}")
                mat.use_nodes = True
                mat.node_tree.nodes["Principled BSDF"].inputs[0].default_value = (0.8, 0.8, 0.8, 1.0)
                obj.data.materials.append(mat)
                
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

    def get_mockups_by_category(self, category):
        """Get mockups filtered by category"""
        filtered = [m for m in self.mockups if m.get('category', 'General') == category]
        print(f"Mockups en categoría '{category}': {len(filtered)}")
        return filtered

mockups = Mockups()

def register():
    print("MotionFX: Contemporary mockups module loaded with modern 3D designs")
    print(f"Available categories: {mockups.get_categories()}")

def unregister():
    print("MotionFX: Contemporary mockups module unloaded")
