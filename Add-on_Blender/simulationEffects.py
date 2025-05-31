import bpy

class SimulationEffects:
    def add_cloth_effect(self, obj):
        """Añade simulación de tela al objeto"""
        try:
            if obj.type != 'MESH':
                print("Cloth simulation only works on mesh objects")
                return
            
            # Asegurar que el objeto esté activo
            bpy.context.view_layer.objects.active = obj
            
            # Verificar si ya tiene modificador de tela
            cloth_modifier = None
            for mod in obj.modifiers:
                if mod.type == 'CLOTH':
                    cloth_modifier = mod
                    break
            
            if not cloth_modifier:
                cloth_modifier = obj.modifiers.new(name="Cloth", type='CLOTH')
                
            # Configurar propiedades básicas de la tela
            if hasattr(cloth_modifier, "settings"):
                cloth_modifier.settings.quality = 10
                cloth_modifier.settings.mass = 0.3
                cloth_modifier.settings.air_damping = 1.0
                
        except Exception as e:
            print(f"Error adding cloth effect: {e}")

    def add_fluid_effect(self, obj):
        """Añade simulación de fluidos al objeto"""
        try:
            if obj.type != 'MESH':
                print("Fluid simulation only works on mesh objects")
                return
            
            # Asegurar que el objeto esté activo
            bpy.context.view_layer.objects.active = obj
            
            # Verificar si ya tiene modificador de fluido
            fluid_modifier = None
            for mod in obj.modifiers:
                if mod.type == 'FLUID':
                    fluid_modifier = mod
                    break
            
            if not fluid_modifier:
                fluid_modifier = obj.modifiers.new(name="Fluid", type='FLUID')
                
            # Configurar como dominio de fluido líquido
            if hasattr(fluid_modifier, "fluid_type"):
                fluid_modifier.fluid_type = 'DOMAIN'
                if hasattr(fluid_modifier, "domain_settings"):
                    fluid_modifier.domain_settings.domain_type = 'LIQUID'
                    fluid_modifier.domain_settings.resolution_max = 64
                    
        except Exception as e:
            print(f"Error adding fluid effect: {e}")

    def add_rigid_body_effect(self, obj):
        """Añade simulación de cuerpo rígido al objeto"""
        try:
            if obj.type != 'MESH':
                print("Rigid body simulation only works on mesh objects")
                return
            
            # Asegurar que el objeto esté activo y seleccionado
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Verificar si ya tiene propiedades de cuerpo rígido
            if not obj.rigid_body:
                bpy.ops.rigidbody.object_add()
                
            # Configurar propiedades básicas
            if obj.rigid_body:
                obj.rigid_body.type = 'ACTIVE'
                obj.rigid_body.mass = 1.0
                obj.rigid_body.friction = 0.5
                obj.rigid_body.restitution = 0.0
                
        except Exception as e:
            print(f"Error adding rigid body effect: {e}")

    def add_soft_body_effect(self, obj):
        """Añade simulación de cuerpo blando al objeto"""
        try:
            if obj.type != 'MESH':
                print("Soft body simulation only works on mesh objects")
                return
            
            # Asegurar que el objeto esté activo
            bpy.context.view_layer.objects.active = obj
            
            # Verificar si ya tiene modificador de cuerpo blando
            softbody_modifier = None
            for mod in obj.modifiers:
                if mod.type == 'SOFT_BODY':
                    softbody_modifier = mod
                    break
            
            if not softbody_modifier:
                softbody_modifier = obj.modifiers.new(name="Softbody", type='SOFT_BODY')
                
            # Configurar propiedades básicas
            if hasattr(obj, "soft_body") and obj.soft_body:
                obj.soft_body.mass = 1.0
                obj.soft_body.friction = 5.0
                obj.soft_body.speed = 1.0
                
        except Exception as e:
            print(f"Error adding soft body effect: {e}")

    def add_ocean_effect(self, obj):
        """Añade simulación de océano al objeto"""
        try:
            if obj.type != 'MESH':
                print("Ocean modifier only works on mesh objects")
                return
            
            # Verificar si ya tiene modificador de océano
            ocean_modifier = None
            for mod in obj.modifiers:
                if mod.type == 'OCEAN':
                    ocean_modifier = mod
                    break
            
            if not ocean_modifier:
                ocean_modifier = obj.modifiers.new(name="Ocean", type='OCEAN')
                
            # Configurar propiedades básicas del océano
            ocean_modifier.resolution = 7
            ocean_modifier.size = 1.0
            ocean_modifier.spatial_size = 50.0
            ocean_modifier.wave_scale = 1.0
            ocean_modifier.wave_scale_min = 0.0
            ocean_modifier.depth = 200.0
            
        except Exception as e:
            print(f"Error adding ocean effect: {e}")

# Instancia singleton
simulation_effects = SimulationEffects()

def register():
    pass

def unregister():
    pass