"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <div className="mt-4 p-4 bg-amber-50/30 rounded-lg border border-amber-800/20">
      {submitted ? (
        <div className="text-center py-4">
          <p className="text-green-700 font-medium">¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-amber-900 mb-1 font-medium">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-amber-50/70 border border-amber-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-amber-900 mb-1 font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-amber-50/70 border border-amber-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-amber-900 mb-1 font-medium">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-amber-50/70 border border-amber-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <div>
            <button 
              type="submit" 
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}