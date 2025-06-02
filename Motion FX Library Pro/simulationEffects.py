import bpy

class SimulationEffects:
    def add_cloth_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Cloth effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_add(type='CLOTH')
            
            cloth_modifier = obj.modifiers[-1]
            cloth_modifier.settings.quality = 5
            cloth_modifier.settings.mass = 0.3
            
            print(f"Cloth effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding cloth effect: {e}")

    def add_fluid_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Fluid effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_add(type='FLUID')
            
            fluid_modifier = obj.modifiers[-1]
            fluid_modifier.fluid_type = 'FLOW'
            
            print(f"Fluid effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fluid effect: {e}")

    def add_rigid_body_effect(self, obj):
        try:
            bpy.context.view_layer.objects.active = obj
            bpy.ops.rigidbody.object_add()
            
            if obj.rigid_body:
                obj.rigid_body.type = 'ACTIVE'
                obj.rigid_body.mass = 1.0
                
            print(f"Rigid body effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding rigid body effect: {e}")

    def add_soft_body_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Soft body effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_add(type='SOFT_BODY')
            
            print(f"Soft body effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding soft body effect: {e}")

    def add_ocean_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Ocean effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_add(type='OCEAN')
            
            ocean_modifier = obj.modifiers[-1]
            ocean_modifier.geometry_mode = 'GENERATE'
            ocean_modifier.size = 50
            ocean_modifier.wave_scale = 1.0
            
            print(f"Ocean effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding ocean effect: {e}")

simulation_effects = SimulationEffects()

def register():
    print("MotionFX: Simulation effects module loaded")

def unregister():
    print("MotionFX: Simulation effects module unloaded")