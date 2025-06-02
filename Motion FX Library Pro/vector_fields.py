import bpy
import numpy as np
from bpy.props import IntProperty, EnumProperty, FloatProperty
from bpy.types import Operator
from mathutils import Vector
import bmesh
import random

class MOTION_OT_CreateVectorField(Operator):
    bl_idname = "motionfx.create_vector_field"
    bl_label = "Create Vector Field"
    bl_description = "Create a vector field for motion effects"
    bl_options = {'REGISTER', 'UNDO'}

    resolution: IntProperty(
        name="Resolution",
        description="Resolution of the vector field grid (NxNxN)",
        default=8,
        min=2,
        max=32
    )
    
    field_type: EnumProperty(
        name="Field Type",
        description="Type of vector field to generate",
        items=[
            ('VORTEX', "Vortex", "Generates a vortex field around Z axis"),
            ('TURBULENCE', "Turbulence", "Generates a turbulence field"),
            ('GRADIENT', "Gradient", "Generates a gradient field"),
            ('RADIAL', "Radial", "Generates a radial field"),
            ('SPIRAL', "Spiral", "Generates a spiral field")
        ],
        default='VORTEX'
    )

    scale: FloatProperty(
        name="Scale",
        description="Scale of the vector field domain",
        default=2.0,
        min=0.1,
        max=10.0
    )

    strength: FloatProperty(
        name="Strength",
        description="Strength of the vector field",
        default=1.0,
        min=0.0,
        max=5.0
    )

    def execute(self, context):
        try:
            res = self.resolution
            scale = self.scale
            half_scale = scale / 2.0

            x = np.linspace(-half_scale, half_scale, res)
            y = np.linspace(-half_scale, half_scale, res)
            z = np.linspace(-half_scale, half_scale, res)
            
            gx, gy, gz = np.meshgrid(x, y, z, indexing='ij')
            vertices = np.vstack([gx.ravel(), gy.ravel(), gz.ravel()]).T
            num_verts = vertices.shape[0]

            vectors = np.zeros((num_verts, 3), dtype=np.float32)

            if self.field_type == 'VORTEX':
                vectors[:, 0] = -vertices[:, 1]
                vectors[:, 1] = vertices[:, 0]
                vectors[:, 2] = 0
                norm = np.linalg.norm(vectors[:, :2], axis=1)
                mask = norm > 1e-6
                vectors[mask, 0] /= norm[mask]
                vectors[mask, 1] /= norm[mask]
                vectors *= self.strength

            elif self.field_type == 'TURBULENCE':
                np.random.seed(42)
                vectors = (np.random.rand(num_verts, 3) - 0.5) * 2.0 * self.strength
                
            elif self.field_type == 'GRADIENT':
                vectors[:, 0] = 1.0
                vectors[:, 1] = 0.0
                vectors[:, 2] = 0.0
                vectors *= self.strength

            elif self.field_type == 'RADIAL':
                center = np.array([0, 0, 0])
                directions = vertices - center
                distances = np.linalg.norm(directions, axis=1)
                mask = distances > 1e-6
                vectors[mask] = directions[mask] / distances[mask, np.newaxis]
                vectors *= self.strength

            elif self.field_type == 'SPIRAL':
                r = np.sqrt(vertices[:, 0]**2 + vertices[:, 1]**2)
                theta = np.arctan2(vertices[:, 1], vertices[:, 0])
                
                vectors[:, 0] = -np.sin(theta)
                vectors[:, 1] = np.cos(theta)
                vectors[:, 2] = 0.1
                
                attenuation = np.exp(-r / scale)
                vectors *= attenuation[:, np.newaxis] * self.strength

            mesh_name = f"{self.field_type}_VectorField"
            obj_name = f"{self.field_type}_Field"
            
            mesh = bpy.data.meshes.new(name=mesh_name)
            obj = bpy.data.objects.new(name=obj_name, object_data=mesh)

            mesh.from_pydata(vertices.tolist(), [], [])
            mesh.update()

            attr_name = "vector_field"
            if attr_name not in mesh.attributes:
                attribute = mesh.attributes.new(name=attr_name, type='FLOAT_VECTOR', domain='POINT')
            else:
                attribute = mesh.attributes[attr_name]
            
            vectors_flat = vectors.ravel()
            attribute.data.foreach_set('vector', vectors_flat)
            mesh.update()

            context.collection.objects.link(obj)
            context.view_layer.objects.active = obj
            obj.select_set(True)

            obj["vector_field_type"] = self.field_type
            obj["vector_field_strength"] = self.strength
            obj["vector_field_scale"] = self.scale

            self.report({'INFO'}, f"{self.field_type} vector field created with {num_verts} points.")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Failed to create vector field: {str(e)}")
            return {'CANCELLED'}

class MOTION_OT_ApplyVectorField(Operator):
    bl_idname = "motionfx.apply_vector_field"
    bl_label = "Apply Vector Field"
    bl_description = "Apply vector field to selected objects"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        try:
            active_obj = context.active_object
            selected_objs = [obj for obj in context.selected_objects if obj != active_obj]
            
            if not active_obj or "vector_field_type" not in active_obj:
                self.report({'ERROR'}, "Please select a vector field object as active.")
                return {'CANCELLED'}
            
            if not selected_objs:
                self.report({'ERROR'}, "Please select objects to apply the vector field to.")
                return {'CANCELLED'}
            
            for obj in selected_objs:
                if not any(mod.type == 'FORCE' for mod in active_obj.modifiers):
                    bpy.ops.object.effector_add(type='FORCE', location=active_obj.location)
                    force_obj = context.active_object
                    force_obj.name = f"{active_obj.name}_Force"
                    
                    force_obj.field.type = 'FORCE'
                    force_obj.field.strength = active_obj.get("vector_field_strength", 1.0)
                    
            self.report({'INFO'}, f"Vector field applied to {len(selected_objs)} objects.")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Failed to apply vector field: {str(e)}")
            return {'CANCELLED'}

classes = (
    MOTION_OT_CreateVectorField,
    MOTION_OT_ApplyVectorField,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

class VectorFields:
    def create_turbulence_field(self, location=(0, 0, 0), strength=10.0):
        """Crea un campo de turbulencia"""
        try:
            bpy.ops.object.effector_add(type='TURBULENCE', location=location)
            field_obj = bpy.context.active_object
            field_obj.name = "Turbulence_Field"
            
            field_obj.field.strength = strength
            field_obj.field.noise = 1.0
            field_obj.field.seed = random.randint(1, 100)
            
            print(f"Turbulence field created at {location}")
            return field_obj
            
        except Exception as e:
            print(f"Error creating turbulence field: {e}")
            return None

    def create_vortex_field(self, location=(0, 0, 0), strength=5.0):
        """Crea un campo de vórtice"""
        try:
            bpy.ops.object.effector_add(type='VORTEX', location=location)
            field_obj = bpy.context.active_object
            field_obj.name = "Vortex_Field"
            
            field_obj.field.strength = strength
            field_obj.field.flow = 1.0
            
            print(f"Vortex field created at {location}")
            return field_obj
            
        except Exception as e:
            print(f"Error creating vortex field: {e}")
            return None

    def create_wind_field(self, location=(0, 0, 0), strength=2.0):
        """Crea un campo de viento"""
        try:
            bpy.ops.object.effector_add(type='WIND', location=location)
            field_obj = bpy.context.active_object
            field_obj.name = "Wind_Field"
            
            field_obj.field.strength = strength
            field_obj.rotation_euler = (0, 0, 0)
            
            print(f"Wind field created at {location}")
            return field_obj
            
        except Exception as e:
            print(f"Error creating wind field: {e}")
            return None

    def create_force_field(self, location=(0, 0, 0), strength=1.0):
        """Crea un campo de fuerza"""
        try:
            bpy.ops.object.effector_add(type='FORCE', location=location)
            field_obj = bpy.context.active_object
            field_obj.name = "Force_Field"
            
            field_obj.field.strength = strength
            field_obj.field.falloff_power = 2.0
            
            print(f"Force field created at {location}")
            return field_obj
            
        except Exception as e:
            print(f"Error creating force field: {e}")
            return None

vector_fields = VectorFields()

def register():
    print("MotionFX: Vector fields module loaded")

def unregister():
    print("MotionFX: Vector fields module unloaded")