

const FormLayout = ( { children } ) => {
    return (
        <div className="h-full w-full max-w-md mx-auto">
            <div className="bg-black/70 px-14 py-16" >
                {children}
            </div>
        </div>
    );
}

export default FormLayout;
