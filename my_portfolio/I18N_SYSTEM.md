# Sistema de Internacionalización (i18n) - Portfolio

## Descripción

Este proyecto implementa un sistema completo de internacionalización (i18n) que permite cambiar el idioma de la interfaz de usuario entre español e inglés. El sistema está implementado usando un contexto personalizado de React y archivos JSON de traducción.

## Características

- ✅ **Cambio de idioma en tiempo real**: El usuario puede cambiar el idioma sin recargar la página
- ✅ **Persistencia**: El idioma seleccionado se guarda en localStorage
- ✅ **Detección automática**: Si no hay idioma guardado, se detecta automáticamente del navegador
- ✅ **Cobertura completa**: Todos los textos de la interfaz están traducidos
- ✅ **Validación de formularios**: Los mensajes de error y validación están traducidos
- ✅ **Contenido dinámico**: Todo el contenido de scroll (about, portfolio, contact, farewell) está traducido

## Estructura del Sistema

### 1. Archivos de Traducción

Los archivos de traducción están ubicados en:
- `public/locales/es/common.json` - Traducciones en español
- `public/locales/en/common.json` - Traducciones en inglés

### 2. Componentes Principales

- **I18nProvider**: Contexto que maneja el estado global del idioma
- **useI18n**: Hook personalizado para acceder a las traducciones
- **LanguageSwitcher**: Componente para cambiar el idioma
- **validationMessages.js**: Helper para mensajes de validación traducidos
- **scrollContentTranslations.js**: Helper para contenido de scroll traducido

### 3. Componentes Actualizados

Todos los componentes han sido actualizados para usar el sistema de traducción:

- ✅ `WelcomeContent.jsx`
- ✅ `ContactForm.jsx`
- ✅ `PortalContent.jsx`
- ✅ `Ancient.jsx`
- ✅ `Header.jsx`
- ✅ `Menu.jsx`
- ✅ `PreloadPage.jsx`
- ✅ Todas las páginas (`about`, `contact`, `portfolio`, `farewell`)

## Uso

### Cambiar Idioma

```jsx
import { useI18n } from '@/components/I18nProvider';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  // Usar una traducción
  const text = t('welcome.title');
  
  // Cambiar idioma
  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
  };
  
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('es')}>Español</button>
    </div>
  );
}
```

### Estructura de Claves

Las claves están organizadas jerárquicamente:

```json
{
  "welcome": {
    "title": "Bienvenido a mi \"Mundo\"",
    "subtitle": "Este es mi portafolio personal"
  },
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de"
  },
  "contact": {
    "title": "Contacto",
    "send": "Enviar"
  },
  "validation": {
    "name": {
      "required": "El nombre es requerido",
      "invalid": "El nombre no es válido"
    }
  }
}
```

## Características Avanzadas

### Validación de Formularios

El sistema incluye validación de formularios completamente traducida:

```javascript
import { validateName, validateEmail, validateMessage } from '@/lib/formValidator';

// Los mensajes de error se generan automáticamente en el idioma actual
const nameValidation = validateName(userData.name);
if (!nameValidation.isValid) {
  console.log(nameValidation.error); // "El nombre es requerido" o "Name is required"
}
```

### Contenido Dinámico

El contenido de scroll se genera dinámicamente según el idioma:

```javascript
import { getAboutScrollContents } from '@/lib/scrollContentTranslations';

function AboutPage() {
  const { t } = useI18n();
  const scrollContents = getAboutScrollContents(t);
  
  return (
    <div>
      {scrollContents.map((content, index) => (
        <div key={index}>
          <h2>{content.title}</h2>
          <p>{content.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## Idiomas Soportados

- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma alternativo

## Agregar Nuevas Traducciones

Para agregar nuevas traducciones:

1. Agrega la clave en ambos archivos JSON (`es/common.json` y `en/common.json`)
2. Usa la clave en tu componente con `t('nueva.clave')`
3. El sistema detectará automáticamente el idioma actual

Ejemplo:
```json
// en es/common.json
{
  "buttons": {
    "save": "Guardar",
    "cancel": "Cancelar"
  }
}

// en en/common.json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

```jsx
// En tu componente
function MyForm() {
  const { t } = useI18n();
  
  return (
    <div>
      <button>{t('buttons.save')}</button>
      <button>{t('buttons.cancel')}</button>
    </div>
  );
}
```

## Beneficios del Sistema

1. **Mantenimiento**: Fácil de mantener con archivos JSON centralizados
2. **Escalabilidad**: Fácil agregar nuevos idiomas
3. **Reutilización**: Las traducciones se pueden reutilizar en múltiples componentes
4. **Tipado**: Compatible con TypeScript (opcional)
5. **Rendimiento**: Carga solo las traducciones necesarias
6. **UX**: Cambio de idioma instantáneo sin recargar la página

## Notas Técnicas

- El sistema usa React Context para evitar prop drilling
- Las traducciones se cargan de forma asíncrona
- El idioma se persiste en localStorage
- Compatible con Next.js App Router
- Funciona tanto en lado cliente como servidor (SSR friendly)

¡El sistema de traducción está completamente implementado y listo para usar!
