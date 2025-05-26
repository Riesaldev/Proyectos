import bpy
import random

from .animationEfects import AnimationEffects
from .visualEffects import VisualEffects
from .materialEffects import MaterialEffects
from .lightingEffects import LightingEffects 
from .cameraEffects import CameraEffects 
from .utilitiesEffects import UtilitiesEffects
from .simulationEffects import SimulationEffects
from .particlesEffects import ParticleEffect

class EffectsOperations:
    animation = AnimationEffects()
    visual = VisualEffects()
    material = MaterialEffects()
    lighting = LightingEffects()
    camera = CameraEffects()
    utilities = UtilitiesEffects()
    simulation = SimulationEffects()
    particles = ParticleEffect()

    effect_map = {}

    @classmethod
    def initialize_effect_map(cls):
        cls.effect_map = {}
        for attr in dir(cls.animation):
            if attr.startswith("add_") and callable(getattr(cls.animation, attr)):
                cls.effect_map[attr] = getattr(cls.animation, attr)
        for attr in dir(cls.visual):
            if attr.startswith("add_") and callable(getattr(cls.visual, attr)):
                cls.effect_map[attr] = getattr(cls.visual, attr)
        for attr in dir(cls.material):
            if attr.startswith("add_") and callable(getattr(cls.material, attr)):
                cls.effect_map[attr] = getattr(cls.material, attr)
        for attr in dir(cls.lighting):
            if attr.startswith("add_") and callable(getattr(cls.lighting, attr)):
                cls.effect_map[attr] = getattr(cls.lighting, attr)
        for attr in dir(cls.camera):
            if attr.startswith("add_") and callable(getattr(cls.camera, attr)):
                cls.effect_map[attr] = getattr(cls.camera, attr)
        for attr in dir(cls.utilities):
            if attr.startswith("add_") and callable(getattr(cls.utilities, attr)):
                cls.effect_map[attr] = getattr(cls.utilities, attr)
        for attr in dir(cls.simulation):
            if attr.startswith("add_") and callable(getattr(cls.simulation, attr)):
                cls.effect_map[attr] = getattr(cls.simulation, attr)
        for attr in dir(cls.particles):
            if attr.startswith("add_") and callable(getattr(cls.particles, attr)):
                cls.effect_map[attr] = getattr(cls.particles, attr)

    @classmethod
    def apply_effect(cls, effect_name, obj, *args):
        if not cls.effect_map:
            cls.initialize_effect_map()
        func = cls.effect_map.get(effect_name)
        if func:
            func(obj, *args)
            return True
        return False

    @classmethod
    def get_effect_items(cls, context=None):
        if not cls.effect_map:
            cls.initialize_effect_map()
        items = []
        for key in cls.effect_map.keys():
            label = key.replace("add_", "").replace("_", " ").title()
            items.append((key, label, f"Aplica el efecto {label}"))
        return items