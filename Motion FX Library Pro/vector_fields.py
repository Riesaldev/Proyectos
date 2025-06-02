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
            # Create force field object
            bpy.ops.object.effector_add(type='FORCE')
            obj = context.active_object
            obj.name = f"VectorField_{self.field_type}"
            
            # Configure field properties
            obj.field.type = self.field_type
            obj.field.strength = self.strength
            
            # Store properties
            obj["vector_field_type"] = self.field_type
            obj["vector_field_strength"] = self.strength
            obj["vector_field_scale"] = self.scale
            
            # Calculate vertices for info
            num_verts = 1  # Force fields are single point
            
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
            selected_objects = context.selected_objects
            if not selected_objects:
                self.report({'ERROR'}, "No objects selected")
                return {'CANCELLED'}
            
            # Find vector field in scene
            vector_field = None
            for obj in bpy.data.objects:
                if obj.get("vector_field_type"):
                    vector_field = obj
                    break
            
            if not vector_field:
                self.report({'ERROR'}, "No vector field found. Create one first.")
                return {'CANCELLED'}
            
            # Apply field to selected objects
            for obj in selected_objects:
                if obj.type == 'MESH':
                    # Add physics properties if needed
                    if not obj.rigid_body:
                        bpy.context.view_layer.objects.active = obj
                        bpy.ops.rigidbody.object_add()
                    
                    # Configure physics to respond to field
                    obj.rigid_body.mass = 1.0
            
            self.report({'INFO'}, f"Vector field applied to {len(selected_objects)} objects")
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
    def __init__(self):
        self.fields = []
    
    def create_vector_field(self, field_type='WIND', strength=1.0, location=(0, 0, 0)):
        """Crear un campo vectorial"""
        try:
            bpy.ops.object.effector_add(type='FORCE', location=location)
            field_obj = bpy.context.active_object
            field_obj.field.type = field_type
            field_obj.field.strength = strength
            field_obj.name = f"VectorField_{field_type}"
            
            self.fields.append(field_obj)
            return field_obj
        except Exception as e:
            print(f"Error creating vector field: {e}")
            return None

# Crear instancia global
vector_fields = VectorFields()

# Definir clases para registro (vacía por ahora, agregar clases cuando se necesiten)
classes = ()

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Vector fields module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Vector fields module unloaded")