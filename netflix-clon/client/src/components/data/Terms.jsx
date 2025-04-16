
import { useState } from 'react';
import { Button } from '../ui/button';


const Terms = () => {
    const [ terms, setTerms ] = useState( false );
    return (
        <div className='text-xs mt-4 mb-10 text-gray-600 max-w-72'>
            <div className='mb-5'>
                <span>
                    Esta Página web utiliza Google reCAPTCHA para garantizar que no eres un robot.
                </span>
                <Button variant="ghost" className="opacity-100 text-[#0071eb] hover:bg-transparent p-0 ml-1 h-fit" onClick={() => setTerms( !terms )} >
                    Más información
                </Button>
            </div>

            <div className='h-28'>
                {terms &&
                    <p>
                        La información recopilada por Google reCAPTCHA se utilizará de acuerdo con la política de privacidad y los términos de servicio de Google, y para proporcionar, mantener y mejorar los servicios de reCAPTCHA. La información recopilada se utilizará para proteger el sitio web de spam y abuso, y no se utilizará para ningún otro propósito. Google puede compartir la información recopilada con terceros, pero solo en la medida necesaria para cumplir con sus obligaciones legales o para proteger sus derechos o los derechos de otros(Google no la utilizará para fines publicitarios).
                    </p>}

            </div>
        </div>
    );
}

export default Terms;
