

const generateErrorUtil = ( msg, code ) => {
    const err = new Error( msg );
    err.httpStatus = code;
    throw new err;
};

export default generateErrorUtil;
