bl_info = {
    "name": "Motion FX Library Pro",
    "author": "RiesalDev",
    "version": (1, 0, 0),
    "blender": (3, 6, 0),
    "location": "View3D > Sidebar > Motion FX Library Pro",
    "description": "Biblioteca avanzada de efectos con +50 herramientas de animación y efectos especiales",
    "category": "Animation",
}

import bpy
from . import operators, panels, properties

def register():
    if hasattr(operators, "register"):
        operators.register()
    if hasattr(panels, "register"):
        panels.register()
    if hasattr(properties, "register"):
        properties.register()

def unregister():
    if hasattr(operators, "unregister"):
        operators.unregister()
    if hasattr(panels, "unregister"):
        panels.unregister()
    if hasattr(properties, "unregister"):
        properties.unregister()