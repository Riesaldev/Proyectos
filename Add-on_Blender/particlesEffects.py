import bpy

class ParticleEffects:
    def add_fire_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Fire effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            bpy.ops.object.quick_effects_add(type='SMOKE')
            
            if obj.modifiers:
                smoke_mod = None
                for mod in obj.modifiers:
                    if mod.type == 'FLUID':
                        smoke_mod = mod
                        break
                
                if smoke_mod and hasattr(smoke_mod, "domain_settings"):
                    smoke_mod.domain_settings.domain_type = 'GAS'
                    smoke_mod.domain_settings.use_adaptive_domain = True
                    
                    if not obj.data.materials:
                        fire_mat = bpy.data.materials.new(name="Fire_Material")
                        fire_mat.use_nodes = True
                        obj.data.materials.append(fire_mat)
                        
                        nodes = fire_mat.node_tree.nodes
                        principled = nodes.get("Principled BSDF")
                        if principled:
                            principled.inputs["Emission"].default_value = (1.0, 0.3, 0.0, 1.0)
                            principled.inputs["Emission Strength"].default_value = 5.0
            
            print(f"Fire effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fire effect: {e}")

    def add_smoke_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Smoke effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            bpy.ops.object.quick_effects_add(type='SMOKE')
            
            print(f"Smoke effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding smoke effect: {e}")

    def add_explosion_effect(self, obj):
        try:
            if not obj.particle_systems:
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            settings = particle_system.settings
            
            settings.type = 'EMITTER'
            settings.count = 1000
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 1
            settings.lifetime = 50
            settings.emit_from = 'VOLUME'
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 10.0
            settings.factor_random = 2.0
            
            print(f"Explosion effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding explosion effect: {e}")

    def add_sparks_effect(self, obj):
        try:
            if not obj.particle_systems:
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            settings = particle_system.settings
            
            settings.type = 'EMITTER'
            settings.count = 500
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 10
            settings.lifetime = 30
            settings.emit_from = 'VERT'
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 3.0
            settings.factor_random = 1.5
            settings.size_random = 0.8
            
            print(f"Sparks effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding sparks effect: {e}")

    def add_blood_effect(self, obj):
        try:
            if not obj.particle_systems:
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            settings = particle_system.settings
            
            settings.type = 'EMITTER'
            settings.count = 200
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 5
            settings.lifetime = 100
            settings.emit_from = 'VERT'
            settings.physics_type = 'FLUID'
            settings.particle_size = 0.02
            settings.size_random = 0.5
            
            if hasattr(settings, 'material'):
                if not settings.material:
                    blood_mat = bpy.data.materials.new(name="Blood_Material")
                    blood_mat.diffuse_color = (0.8, 0.1, 0.1, 1.0)
                    settings.material = blood_mat
            
            print(f"Blood effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding blood effect: {e}")

particle_effects = ParticleEffects()

def register():
    print("MotionFX: Particle effects module loaded")

def unregister():
    print("MotionFX: Particle effects module unloaded")