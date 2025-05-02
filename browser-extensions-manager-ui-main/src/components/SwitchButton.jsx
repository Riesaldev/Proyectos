import { useState } from 'react';

const SwitchButton = () => {
    const [ isOn, setIsOn ] = useState( false );

    const handleToggle = () => {
        setIsOn( !isOn );
    }
    return (
        <div className='h-8 w-10 flex items-center'>
            <button
                onClick={handleToggle}
                className={`w-10 h-[22px] rounded-full flex items-center p-1 transition-colors duration-300 ${ isOn ? 'bg-red-500' : 'bg-gray-300' }`}
            >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${ isOn ? 'translate-x-4' : 'translate-x-0' }`} />
            </button>
        </div>
    );
}

export default SwitchButton;
