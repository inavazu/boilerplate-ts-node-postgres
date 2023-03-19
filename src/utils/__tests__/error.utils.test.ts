import { getErrorMessage, getErrorStack, logError } from '../error.utils';

describe('error.utils', () => {
  const message = 'fake message';
  describe('getErrorMessage', () => {
    it('should return the Error message property value', () => {
      const error = new Error(message);

      expect(getErrorMessage(error)).toEqual(message);
    });
    it('should return the value provided as a string value if privded value is not an Error instance', () => {
      const error = 2354235;

      expect(getErrorMessage(error)).toEqual(String(error));
    });
  });

  describe('getErrorStack', () => {
    it('should return the Error stack property value', () => {
      const error = new Error(message);

      expect(getErrorStack(error).startsWith('Error: fake message\n    at Object.')).toBeTruthy();
    });
    it('should return the value provided as a string value if privded value is not an Error instance', () => {
      const error = 2354235;
      expect(getErrorStack(error)).toEqual('No stack available');
    });
  });

  // TODO: Pending to find why the functions are not being mocked
  describe.skip('logError', () => {
    it('should return the Error stack property value', () => {
      jest.mock('../error.utils', () => ({ getErrorMessage: () => jest.fn().mockImplementation(() => console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')), getErrorStack: () => jest.fn() }));
      console.error = jest.fn();
      const error = new Error(message);

      logError('', error);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(getErrorMessage).toHaveBeenCalledTimes(1);
      expect(getErrorStack).toHaveBeenCalledTimes(1);
    });
    it('should return the value provided as a string value if privded value is not an Error instance', () => {
      jest.resetAllMocks();
      jest.mock('../error.utils', () => ({ getErrorMessage: () => jest.fn().mockImplementation(() => console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')), getErrorStack: () => jest.fn() }));
      console.error = jest.fn();
      const error = 2354235;

      logError('', error);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(getErrorMessage).toHaveBeenCalledTimes(0);
      expect(getErrorStack).toHaveBeenCalledTimes(0);
    });
  });
});
