/**
 * Utilidades para validación de formularios
 */

// Patrones de validación
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;

/**
 * Validador para el campo nombre
 * @param {string} name - Nombre a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateName(name) {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'El nombre es requerido' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'El nombre no puede tener más de 50 caracteres' };
  }
  
  if (!NAME_REGEX.test(name.trim())) {
    return { isValid: false, error: 'El nombre solo puede contener letras y espacios' };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador para el campo email
 * @param {string} email - Email a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'El email es requerido' };
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: 'Por favor ingresa un email válido' };
  }
  
  if (email.trim().length > 254) {
    return { isValid: false, error: 'El email es demasiado largo' };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador para el campo mensaje
 * @param {string} message - Mensaje a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateMessage(message) {
  if (!message || message.trim() === '') {
    return { isValid: false, error: 'El mensaje es requerido' };
  }
  
  if (message.trim().length < 10) {
    return { isValid: false, error: 'El mensaje debe tener al menos 10 caracteres' };
  }
  
  if (message.trim().length > 1000) {
    return { isValid: false, error: 'El mensaje no puede tener más de 1000 caracteres' };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador completo del formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Objeto con isValid y errors
 */
export function validateForm(formData) {
  const errors = {};
  let isValid = true;
  
  // Validar nombre
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
    isValid = false;
  }
  
  // Validar email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }
  
  // Validar mensaje
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
    isValid = false;
  }
  
  return { isValid, errors };
}

/**
 * Sanitiza los datos del formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Datos sanitizados
 */
export function sanitizeFormData(formData) {
  return {
    name: formData.name ? formData.name.trim() : '',
    email: formData.email ? formData.email.trim().toLowerCase() : '',
    message: formData.message ? formData.message.trim() : ''
  };
}

/**
 * Obtiene el conteo de caracteres para un campo
 * @param {string} text - Texto a contar
 * @param {number} maxLength - Longitud máxima
 * @returns {Object} - Objeto con count, max y isNearLimit
 */
export function getCharacterCount(text, maxLength) {
  const count = text ? text.length : 0;
  const isNearLimit = count > maxLength * 0.8; // 80% del límite
  
  return {
    count,
    max: maxLength,
    isNearLimit,
    remaining: maxLength - count
  };
}
