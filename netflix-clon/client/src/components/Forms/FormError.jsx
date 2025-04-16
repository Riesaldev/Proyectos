import { TriangleAlert } from "lucide-react";

const FormError = ( { message } ) => {
    if ( !message ) return null;

    return (
        <div className="bg-destructive/50 p-3 rounded-md flex items-center gap-x-2 text-sm text-white">
            <TriangleAlert />
            <p>{message}</p>
        </div>
    );
};

export default FormError;
