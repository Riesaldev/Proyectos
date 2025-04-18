function generateErrorUtil ( message, httpStatus, metadata = {} ) {
    const error = new Error( message );
    error.httpStatus = httpStatus;
    error.metadata = metadata;
    return error;
}

export default generateErrorUtil;
