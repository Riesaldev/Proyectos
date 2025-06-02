import bpy

class SimulationEffects:
    
    def add_collision_effect(self, obj):
        """Añade propiedades de colisión al objeto"""
        try:
            if obj.type != 'MESH':
                print("Collision effect only works on mesh objects")
                return False
            
            # Añadir modificador de colisión
            collision_mod = obj.modifiers.new(name="Collision", type='COLLISION')
            
            # Configurar propiedades de colisión
            obj.collision.use = True
            obj.collision.damping_factor = 0.5
            obj.collision.thickness_outer = 0.02
            
            print(f"Collision effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding collision effect: {e}")
            return False

    def add_cloth_effect(self, obj):
        """Añade simulación de tela"""
        try:
            if obj.type != 'MESH':
                print("Cloth effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir modificador de tela
            bpy.ops.object.modifier_add(type='CLOTH')
            cloth_mod = obj.modifiers[-1]
            
            # Configurar propiedades básicas
            cloth_mod.settings.quality = 5
            cloth_mod.settings.mass = 0.3
            cloth_mod.settings.tension_stiffness = 15
            cloth_mod.settings.compression_stiffness = 15
            
            print(f"Cloth effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding cloth effect: {e}")
            return False

    def add_fluid_effect(self, obj):
        """Añade simulación de fluidos"""
        try:
            if obj.type != 'MESH':
                print("Fluid effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir modificador de fluidos
            bpy.ops.object.modifier_add(type='FLUID')
            fluid_mod = obj.modifiers[-1]
            
            # Configurar como dominio de fluido
            fluid_mod.fluid_type = 'DOMAIN'
            fluid_mod.domain_settings.domain_type = 'LIQUID'
            
            print(f"Fluid effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding fluid effect: {e}")
            return False

    def add_rigid_body_effect(self, obj):
        """Añade física de cuerpo rígido"""
        try:
            if obj.type != 'MESH':
                print("Rigid body effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir rigid body
            bpy.ops.rigidbody.object_add()
            
            # Configurar propiedades
            obj.rigid_body.type = 'ACTIVE'
            obj.rigid_body.mass = 1.0
            obj.rigid_body.friction = 0.5
            obj.rigid_body.restitution = 0.5
            
            print(f"Rigid body effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding rigid body effect: {e}")
            return False

    def add_soft_body_effect(self, obj):
        """Añade simulación de cuerpo blando"""
        try:
            if obj.type != 'MESH':
                print("Soft body effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir modificador de soft body
            bpy.ops.object.modifier_add(type='SOFT_BODY')
            softbody_mod = obj.modifiers[-1]
            
            # Configurar propiedades básicas
            obj.soft_body.settings.mass = 1.0
            obj.soft_body.settings.friction = 5.0
            obj.soft_body.settings.gravity = 9.8
            
            print(f"Soft body effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding soft body effect: {e}")
            return False

    def add_ocean_effect(self, obj):
        """Añade simulación oceánica"""
        try:
            if obj.type != 'MESH':
                print("Ocean effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir modificador de océano
            bpy.ops.object.modifier_add(type='OCEAN')
            ocean_mod = obj.modifiers[-1]
            
            # Configurar propiedades
            ocean_mod.geometry_mode = 'GENERATE'
            ocean_mod.size = 7.0
            ocean_mod.wave_scale = 1.0
            ocean_mod.wave_scale_min = 0.0
            ocean_mod.choppiness = 1.0
            
            print(f"Ocean effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding ocean effect: {e}")
            return False

simulation_effects = SimulationEffects()

def register():
    print("MotionFX: Simulation effects module loaded")

def unregister():
    print("MotionFX: Simulation effects module unloaded")