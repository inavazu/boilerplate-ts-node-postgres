export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export const getErrorStack = (error: unknown): string => {
  if (error instanceof Error) {
    return error.stack;
  }

  return 'No stack available';
};

/**
 * Wrapper for loggin an Error
 * @param msg Message for putting in context where the error has happened
 * @param error Error to be logged
 * @param includeStack Decide whether to include the stack or not. Is included by default
 */
export const logError = (msg: string, error: unknown, includeStack = true): void => {
  if (error instanceof Error) {
    console.error(`${msg}. ${getErrorMessage(error)}`, includeStack ? getErrorStack(error) : '');
  } else {
    console.error(`${msg}. ${String(error)}`);
  }
};
