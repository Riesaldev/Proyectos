# Script para testing (ejecutar en la consola de Blender)
import bpy

def test_motionfx_addon():
    """Test básico del addon MotionFX"""
    
    print("=== TESTING MOTION FX ADDON ===")
    
    # 1. Test de registro
    try:
        scene = bpy.context.scene
        assert hasattr(scene, 'motionfx_settings'), "motionfx_settings not found"
        print("✅ Properties registered correctly")
    except Exception as e:
        print(f"❌ Properties test failed: {e}")
    
    # 2. Test de operadores
    try:
        assert hasattr(bpy.ops.motionfx, 'apply_effect'), "apply_effect operator not found"
        assert hasattr(bpy.ops.motionfx, 'create_vector_field'), "create_vector_field operator not found"
        print("✅ Operators registered correctly")
    except Exception as e:
        print(f"❌ Operators test failed: {e}")
    
    # 3. Test de efectos (con objeto de prueba)
    try:
        # Crear cubo de prueba
        bpy.ops.mesh.primitive_cube_add()
        test_obj = bpy.context.active_object
        
        # Test algunos efectos básicos
        from Motion_FX_Library_Pro.effects_operations import EffectsOperations
        
        # Test bounce effect
        EffectsOperations.apply_effect("bounce", test_obj)
        print("✅ Bounce effect works")
        
        # Test scale effect
        EffectsOperations.apply_effect("scale", test_obj)
        print("✅ Scale effect works")
        
        # Limpiar
        bpy.ops.object.delete()
        
    except Exception as e:
        print(f"❌ Effects test failed: {e}")
    
    print("=== TESTING COMPLETE ===")

# Ejecutar test
test_motionfx_addon()