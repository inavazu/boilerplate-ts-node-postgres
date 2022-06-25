import { getDateFormatted } from '../dates.utils';

describe('dates.utils', () => {
  describe('getDateFormatted', () => {
    it('should not throw any error if format is correct', () => {
      const dayInEpoch = 1656127489000;
      const date = new Date(dayInEpoch);

      expect(getDateFormatted(date)).toEqual('2022-6-01');
    });
    it('should throw an error if no data is provided', () => {
      expect(() => getDateFormatted(null)).toThrowError('Could not format date. Date must be provided!!');
    });
  });
});
