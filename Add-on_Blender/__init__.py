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
from bpy.props import EnumProperty

# Importar módulos con manejo de errores
try:
    from . import (
        operators,
        panels,
        properties,
        utilities,
        vector_fields,
    )
    
    modules = [
        operators,
        panels,
        properties,
        utilities,
        vector_fields,
    ]
    
    modules_loaded = True
    
except Exception as e:
    print(f"MotionFX: Error importing modules: {e}")
    modules = []
    modules_loaded = False

def register():
    if not modules_loaded:
        print("MotionFX: Cannot register - modules failed to load")
        return
    
    try:
        # Registrar módulos
        for module in modules:
            if hasattr(module, "classes"):
                for cls in module.classes:
                    try:
                        bpy.utils.register_class(cls)
                    except Exception as e:
                        print(f"MotionFX: Error registering class {cls}: {e}")
            
            if hasattr(module, "register"):
                try:
                    module.register()
                except Exception as e:
                    print(f"MotionFX: Error in module register {module}: {e}")

        # Registrar propiedad de previews
        try:
            bpy.types.Scene.motionfx_previews = EnumProperty(
                items=utilities.generate_previews
            )
        except Exception as e:
            print(f"MotionFX: Error registering previews property: {e}")
            
        print("MotionFX: Add-on registered successfully")
        
    except Exception as e:
        print(f"MotionFX: Critical error during registration: {e}")

def unregister():
    if not modules_loaded:
        return
        
    try:
        # Desregistrar propiedad de previews
        if hasattr(bpy.types.Scene, "motionfx_previews"):
            del bpy.types.Scene.motionfx_previews
        
        # Desregistrar módulos en orden inverso
        for module in reversed(modules):
            if hasattr(module, "unregister"):
                try:
                    module.unregister()
                except Exception as e:
                    print(f"MotionFX: Error in module unregister {module}: {e}")
            
            if hasattr(module, "classes"):
                for cls in reversed(module.classes):
                    try:
                        bpy.utils.unregister_class(cls)
                    except Exception as e:
                        print(f"MotionFX: Error unregistering class {cls}: {e}")
                        
        print("MotionFX: Add-on unregistered successfully")
        
    except Exception as e:
        print(f"MotionFX: Error during unregistration: {e}")

if __name__ == "__main__":
    register()