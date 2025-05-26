import bpy

class SimulationEffects:
  # Simulation effects

  def add_cloth_effect(self, obj):
    # Adds cloth physics to the object
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_add(type='CLOTH')
    obj.modifiers[-1].settings.quality = 5

  def add_fluid_effect(self, obj):
    # Adds fluid simulation to the object
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_add(type='FLUID')
    obj.modifiers[-1].fluid_type = 'DOMAIN'
    obj.modifiers[-1].domain_settings.domain_type = 'LIQUID'

  def add_rigid_body_effect(self, obj):
    # Adds rigid body physics to the object
    bpy.context.view_layer.objects.active = obj
    bpy.ops.rigidbody.object_add()
    obj.rigid_body.type = 'ACTIVE'

  def add_soft_body_effect(self, obj):
    # Adds soft body physics to the object
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_add(type='SOFT_BODY')
    obj.modifiers[-1].settings.goal_default = 0.7

  def add_vortex_effect(self, obj):
    # Adds a vortex force field to the object
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.forcefield_toggle()
    obj.field.type = 'VORTEX'
    obj.field.strength = 1.0
