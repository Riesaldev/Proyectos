

const FormDesc = ( { children } ) => {
    return (
        <div className="h-auto w-5/6 flex -top-20 pt-50 relative flex-col items-center justify-center ">
            <h1 className="text-2xl text-white font-bold">Your Journey to Codig Cont 2025 Starts Here!</h1>

            <p className=" text-center text-lg"> Secure your spot at next year's biggest coding conference.</p>
            {children}
        </div >
    );
}

export default FormDesc;
