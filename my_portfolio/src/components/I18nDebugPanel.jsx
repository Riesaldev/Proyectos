'use client';

import { useI18n } from '@/components/I18nProvider';

export default function I18nDebugPanel() {
  const { locale, t, switchLanguage, isLoading } = useI18n();

  const handleClearStorage = () => {
    localStorage.removeItem('preferred-language');
    location.reload();
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-sm z-50">
      <div className="mb-2">
        <strong>i18n Debug Panel</strong>
      </div>
      <div>Current locale: {locale}</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Stored locale: {typeof window !== 'undefined' ? localStorage.getItem('preferred-language') : 'N/A'}</div>
      <div className="mt-2">
        <button 
          onClick={() => switchLanguage('es')} 
          className="mr-2 px-2 py-1 bg-blue-600 rounded text-xs"
        >
          ES
        </button>
        <button 
          onClick={() => switchLanguage('en')} 
          className="mr-2 px-2 py-1 bg-blue-600 rounded text-xs"
        >
          EN
        </button>
        <button 
          onClick={handleClearStorage} 
          className="px-2 py-1 bg-red-600 rounded text-xs"
        >
          Clear
        </button>
      </div>
      <div className="mt-2 text-xs">
        Test: {t('welcome.title')}
      </div>
    </div>
  );
}
