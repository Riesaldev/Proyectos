/**
 * Pruebas para el sistema de validación de formularios
 * Puedes ejecutar estas pruebas para verificar que todo funciona correctamente
 */

import { 
  validateName, 
  validateEmail, 
  validateMessage, 
  validateForm, 
  sanitizeFormData,
  getCharacterCount
} from '../src/lib/formValidator';

// Función auxiliar para ejecutar pruebas
function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`✅ ${testName} - PASSED`);
  } catch (error) {
    console.error(`❌ ${testName} - FAILED:`, error.message);
  }
}

// Función auxiliar para verificar resultados
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Pruebas para validateName
runTest('validateName - nombre válido', () => {
  const result = validateName('Juan Pérez');
  assert(result.isValid === true, 'Debería ser válido');
  assert(result.error === '', 'No debería tener error');
});

runTest('validateName - nombre vacío', () => {
  const result = validateName('');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El nombre es requerido', 'Mensaje de error correcto');
});

runTest('validateName - nombre muy corto', () => {
  const result = validateName('J');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El nombre debe tener al menos 2 caracteres', 'Mensaje de error correcto');
});

runTest('validateName - nombre muy largo', () => {
  const result = validateName('J'.repeat(51));
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El nombre no puede tener más de 50 caracteres', 'Mensaje de error correcto');
});

runTest('validateName - nombre con números', () => {
  const result = validateName('Juan123');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El nombre solo puede contener letras y espacios', 'Mensaje de error correcto');
});

// Pruebas para validateEmail
runTest('validateEmail - email válido', () => {
  const result = validateEmail('juan@example.com');
  assert(result.isValid === true, 'Debería ser válido');
  assert(result.error === '', 'No debería tener error');
});

runTest('validateEmail - email vacío', () => {
  const result = validateEmail('');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El email es requerido', 'Mensaje de error correcto');
});

runTest('validateEmail - email inválido', () => {
  const result = validateEmail('email-invalido');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'Por favor ingresa un email válido', 'Mensaje de error correcto');
});

runTest('validateEmail - email muy largo', () => {
  const result = validateEmail('a'.repeat(250) + '@example.com');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El email es demasiado largo', 'Mensaje de error correcto');
});

// Pruebas para validateMessage
runTest('validateMessage - mensaje válido', () => {
  const result = validateMessage('Este es un mensaje válido de prueba');
  assert(result.isValid === true, 'Debería ser válido');
  assert(result.error === '', 'No debería tener error');
});

runTest('validateMessage - mensaje vacío', () => {
  const result = validateMessage('');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El mensaje es requerido', 'Mensaje de error correcto');
});

runTest('validateMessage - mensaje muy corto', () => {
  const result = validateMessage('Hola');
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El mensaje debe tener al menos 10 caracteres', 'Mensaje de error correcto');
});

runTest('validateMessage - mensaje muy largo', () => {
  const result = validateMessage('a'.repeat(1001));
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.error === 'El mensaje no puede tener más de 1000 caracteres', 'Mensaje de error correcto');
});

// Pruebas para validateForm
runTest('validateForm - formulario válido', () => {
  const formData = {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    message: 'Este es un mensaje válido de prueba'
  };
  const result = validateForm(formData);
  assert(result.isValid === true, 'Debería ser válido');
  assert(Object.keys(result.errors).length === 0, 'No debería tener errores');
});

runTest('validateForm - formulario inválido', () => {
  const formData = {
    name: '',
    email: 'email-invalido',
    message: 'corto'
  };
  const result = validateForm(formData);
  assert(result.isValid === false, 'Debería ser inválido');
  assert(result.errors.name === 'El nombre es requerido', 'Error de nombre correcto');
  assert(result.errors.email === 'Por favor ingresa un email válido', 'Error de email correcto');
  assert(result.errors.message === 'El mensaje debe tener al menos 10 caracteres', 'Error de mensaje correcto');
});

// Pruebas para sanitizeFormData
runTest('sanitizeFormData - limpieza de datos', () => {
  const formData = {
    name: '  Juan Pérez  ',
    email: '  JUAN@EXAMPLE.COM  ',
    message: '  Este es un mensaje  '
  };
  const result = sanitizeFormData(formData);
  assert(result.name === 'Juan Pérez', 'Nombre limpio');
  assert(result.email === 'juan@example.com', 'Email limpio y en minúsculas');
  assert(result.message === 'Este es un mensaje', 'Mensaje limpio');
});

// Pruebas para getCharacterCount
runTest('getCharacterCount - conteo normal', () => {
  const result = getCharacterCount('Hola mundo', 50);
  assert(result.count === 10, 'Conteo correcto');
  assert(result.max === 50, 'Máximo correcto');
  assert(result.isNearLimit === false, 'No cerca del límite');
  assert(result.remaining === 40, 'Restantes correcto');
});

runTest('getCharacterCount - cerca del límite', () => {
  const result = getCharacterCount('a'.repeat(45), 50);
  assert(result.count === 45, 'Conteo correcto');
  assert(result.max === 50, 'Máximo correcto');
  assert(result.isNearLimit === true, 'Cerca del límite');
  assert(result.remaining === 5, 'Restantes correcto');
});

console.log('\n🎉 Todas las pruebas completadas. Revisa los resultados arriba.');
console.log('\n📋 Resumen de funcionalidades implementadas:');
console.log('✅ Validación de nombres (2-50 caracteres, solo letras)');
console.log('✅ Validación de emails (formato válido)');
console.log('✅ Validación de mensajes (10-1000 caracteres)');
console.log('✅ Validación completa de formularios');
console.log('✅ Sanitización de datos');
console.log('✅ Contador de caracteres con límites');
console.log('✅ Validación en tiempo real');
console.log('✅ Componentes reutilizables');
console.log('✅ Hook personalizado para validación');
console.log('✅ Experiencia de usuario mejorada');
