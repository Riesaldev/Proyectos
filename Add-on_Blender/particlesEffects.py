import bpy

class ParticleEffect:
  # Particle effects

  def add_blood_effect(self, obj):
    # Simulate blood splatter using a red particle system
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("BloodParticles", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 500
    psettings.lifetime = 30
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 2
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.05
    # Blender's particle system does not have 'color_maximum' property.
    # To color particles, you need to use a material. Example:
    # Create a red material and assign it to the object or particle system.

  def add_bubbles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Bubbles", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 300
    psettings.lifetime = 80
    psettings.frame_start = 1
    psettings.frame_end = 40
    psettings.normal_factor = 0.5
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.07

  def add_confetti_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Confetti", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 1000
    psettings.lifetime = 60
    psettings.frame_start = 1
    psettings.frame_end = 10
    psettings.normal_factor = 2
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.03

  def add_dust_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Dust", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 400
    psettings.lifetime = 100
    psettings.frame_start = 1
    psettings.frame_end = 30
    psettings.normal_factor = 0.2
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.01

  def add_explosion_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Explosion", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 800
    psettings.lifetime = 40
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 4
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.04

  def add_fire_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.quick_effect_add(type='SMOKE')
    # Check if the modifier is present and has domain_settings
    mod = obj.modifiers[-1]
    if hasattr(mod, "domain_settings"):
      mod.domain_settings.use_noise = True
      mod.domain_settings.cache_type = 'ALL'
      mod.domain_settings.domain_type = 'GAS'

  def add_fireworks_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Fireworks", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 300
    psettings.lifetime = 60
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 6
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.06

  def add_frost_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Frost", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 600
    psettings.lifetime = 80
    psettings.frame_start = 1
    psettings.frame_end = 20
    psettings.normal_factor = 0.3
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.02

  def add_ghost_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("GhostParticles", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 200
    psettings.lifetime = 120
    psettings.frame_start = 1
    psettings.frame_end = 60
    psettings.normal_factor = 0.1
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.04

  def add_glitter_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Glitter", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 1200
    psettings.lifetime = 50
    psettings.frame_start = 1
    psettings.frame_end = 10
    psettings.normal_factor = 1
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.01

  def add_leaves_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Leaves", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 200
    psettings.lifetime = 100
    psettings.frame_start = 1
    psettings.frame_end = 40
    psettings.normal_factor = 0.5
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.08

  def add_lightning_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Lightning", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 50
    psettings.lifetime = 10
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 10
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.1

  def add_mist_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Mist", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 800
    psettings.lifetime = 200
    psettings.frame_start = 1
    psettings.frame_end = 100
    psettings.normal_factor = 0.1
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.02

  def add_plasma_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Plasma", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 400
    psettings.lifetime = 30
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 3
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.05

  def add_rain_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Rain", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 2000
    psettings.lifetime = 60
    psettings.frame_start = 1
    psettings.frame_end = 60
    psettings.normal_factor = -9.8
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.02

  def add_rainbow_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("RainbowParticles", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 700
    psettings.lifetime = 80
    psettings.frame_start = 1
    psettings.frame_end = 20
    psettings.normal_factor = 1
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.03

  def add_smoke_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.quick_effect_add(type='SMOKE')
    mod = obj.modifiers[-1]
    if hasattr(mod, "domain_settings"):
      mod.domain_settings.use_noise = True
      mod.domain_settings.cache_type = 'ALL'
      mod.domain_settings.domain_type = 'GAS'

  def add_snow_particles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Snow", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 1500
    psettings.lifetime = 120
    psettings.frame_start = 1
    psettings.frame_end = 100
    psettings.normal_factor = 0.2
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.04

  def add_sparkles_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Sparkles", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 1000
    psettings.lifetime = 40
    psettings.frame_start = 1
    psettings.frame_end = 10
    psettings.normal_factor = 2
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.01

  def add_sparks_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("Sparks", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 500
    psettings.lifetime = 20
    psettings.frame_start = 1
    psettings.frame_end = 2
    psettings.normal_factor = 5
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.01

  def add_spider_web_effect(self, obj):
    bpy.context.view_layer.objects.active = obj
    ps = obj.modifiers.new("SpiderWeb", type='PARTICLE_SYSTEM')
    psettings = ps.particle_system.settings
    psettings.count = 100
    psettings.lifetime = 200
    psettings.frame_start = 1
    psettings.frame_end = 100
    psettings.normal_factor = 0.05
    psettings.render_type = 'HALO'
    psettings.particle_size = 0.02
