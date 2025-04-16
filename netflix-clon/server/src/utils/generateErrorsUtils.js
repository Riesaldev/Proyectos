

const generateErrorUtil = ( message, statusCode ) => {
    const error = new Error( message );
    error.httpStatus = statusCode;
    throw error;
};


export default generateErrorUtil;
