"use client";
import { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField, SubmitButton, ErrorMessage, SuccessMessage } from './FormComponents';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    formData,
    fieldErrors,
    touched,
    isFormValid,
    validateAllFields,
    resetForm,
    getFieldProps
  } = useFormValidation({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    const validation = validateAllFields();
    
    if (!validation.isValid) {
      setSubmitting(false);
      setError('Por favor corrige los errores en el formulario');
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.sanitizedData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        resetForm();
      } else {
        setError(result.error || 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.');
      console.error('Error al enviar formulario:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const hasTouchedFields = Object.keys(touched).length > 0;

  return (
    <div className="mt-4 p-4 bg-amber-50/30 rounded-lg border border-amber-800/20">
      {submitted ? (
        <SuccessMessage 
          message="¡Gracias por tu mensaje! Me pondré en contacto contigo pronto."
          onDismiss={() => setSubmitted(false)}
          actionText="Enviar otro mensaje"
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Nombre"
            name="name"
            type="text"
            required
            maxLength={50}
            minLength={2}
            placeholder="Tu nombre completo"
            fieldProps={getFieldProps('name')}
            error={fieldErrors.name}
          />
          
          <FormField
            label="Email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            fieldProps={getFieldProps('email')}
            error={fieldErrors.email}
          />
          
          <FormField
            label="Mensaje"
            name="message"
            type="textarea"
            required
            rows={4}
            maxLength={1000}
            minLength={10}
            placeholder="Escribe tu mensaje aquí..."
            fieldProps={getFieldProps('message')}
            error={fieldErrors.message}
          />
          
          <ErrorMessage error={error} />
          
          <SubmitButton 
            isSubmitting={submitting}
            isFormValid={isFormValid}
            hasTouchedFields={hasTouchedFields}
            submittingText="Enviando..."
          >
            Enviar mensaje
          </SubmitButton>
        </form>
      )}
    </div>
  );
}