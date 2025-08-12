
const generateErrorUtil = (message: string, statusCode: number) => {
  const error = new Error(message);
  (error as any).httpStatusCode = statusCode;
  throw error;
};

export default generateErrorUtil;