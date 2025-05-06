const SwitchButton = ( { isActive, onToggle } ) => {
    return (
        <div className='h-8 w-10 flex items-center'>
            <button
                onClick={onToggle}
                className={`w-10 h-[22px] rounded-full flex items-center p-1 transition-colors duration-300 ${ isActive ? 'bg-red-500' : 'bg-gray-300 hover:bg-red-500' }`}
            >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${ isActive ? 'translate-x-4' : 'translate-x-0 hover:translate-x-4' }`} />
            </button>
        </div>
    );
};

export default SwitchButton;