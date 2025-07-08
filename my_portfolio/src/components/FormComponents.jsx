import { getCharacterCount } from '../lib/formValidator';

/**
 * Componente de campo de entrada reutilizable con validación
 */
export function FormField({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  maxLength,
  minLength,
  rows,
  fieldProps,
  error,
  placeholder
}) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  
  const characterCount = maxLength ? getCharacterCount(fieldProps.value, maxLength) : null;

  return (
    <div>
      <label htmlFor={name} className="block text-amber-900 mb-1 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Component
        id={name}
        type={isTextarea ? undefined : type}
        rows={isTextarea ? rows : undefined}
        placeholder={placeholder}
        required={required}
        {...fieldProps}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {characterCount && (
        <div className="mt-1 text-xs text-amber-700">
          <span className={characterCount.isNearLimit ? 'text-orange-600' : ''}>
            {characterCount.count}/{characterCount.max} caracteres
          </span>
          {minLength && characterCount.count < minLength && (
            <span className="text-red-500 ml-2">
              Mínimo {minLength} caracteres
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Componente de botón de envío con validación
 */
export function SubmitButton({ 
  isSubmitting, 
  isFormValid, 
  hasTouchedFields, 
  children = 'Enviar',
  submittingText = 'Enviando...'
}) {
  const isDisabled = isSubmitting || !isFormValid;
  
  return (
    <div>
      <button 
        type="submit" 
        className={`px-4 py-2 rounded-md transition-colors font-medium ${
          isDisabled
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-amber-600 hover:bg-amber-700'
        } text-white`}
        disabled={isDisabled}
      >
        {isSubmitting ? submittingText : children}
      </button>
      
      {!isFormValid && hasTouchedFields && (
        <p className="mt-2 text-sm text-amber-600">
          Por favor completa todos los campos correctamente
        </p>
      )}
    </div>
  );
}

/**
 * Componente de mensaje de error general
 */
export function ErrorMessage({ error }) {
  if (!error) return null;
  
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  );
}

/**
 * Componente de mensaje de éxito
 */
export function SuccessMessage({ message, onDismiss, actionText = 'Continuar' }) {
  return (
    <div className="text-center py-6">
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
        <p className="text-green-700 font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
