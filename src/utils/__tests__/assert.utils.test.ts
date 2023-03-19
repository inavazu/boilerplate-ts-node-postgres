import { assertDateRangeInStringDateFormatForMonth, assertStringDateFormatForMonth, assertZipCodeForMadrid } from '../assert.utils';

describe('assert.utils', () => {
  describe('assertStringDateFormatForMonth', () => {
    it('should not throw any error if format is correct', () => {
      expect(() => assertStringDateFormatForMonth('2015-04')).not.toThrowError();
    });
    it('should throw an error if no data is provided', () => {
      expect(() => assertStringDateFormatForMonth(null)).toThrowError('Asserting null has ISO format for month (YYYY-MM) failed. No value provided');
    });
    it('should throw an error if lentgh of value is not the same as YYYY-MM', () => {
      let value = '2552';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Expected length 7 but value has ${value.length}`);

      value = '22333435';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Expected length 7 but value has ${value.length}`);

      value = '2';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Expected length 7 but value has ${value.length}`);
    });
    it('should throw an error if no - is provided in the expected value', () => {
      let value = '2335442';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. A '-' is expecte to seperate year and month`);

      value = '2335/42';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. A '-' is expecte to seperate year and month`);
    });
    it('should throw an error if no decimal values are provided', () => {
      let value = 'YYYY-MM';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Year value expectes 4 decimal numbers, received ${value.split('-')[0]}`);

      value = '2335-O2';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Month value expectes 2 decimal numbers, received ${value.split('-')[1]}`);

      value = '2335-22';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Month value expectes 2 decimal numbers, received ${value.split('-')[1]}`);

      value = '2335-14';
      expect(() => assertStringDateFormatForMonth(value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Month value expectes 2 decimal numbers, received ${value.split('-')[1]}`);
    });
  });
  describe('assertDateRangeInStringDateFormatForMonth', () => {
    it('should not throw any error if format and range is correct', () => {
      expect(() => assertDateRangeInStringDateFormatForMonth('2015-04', '2015-04')).not.toThrowError();
      expect(() => assertDateRangeInStringDateFormatForMonth('2015-04', '2015-05')).not.toThrowError();
    });
    it('should throw an error if range is not correct', () => {
      expect(() => assertDateRangeInStringDateFormatForMonth('2015-05', '2015-04')).toThrowError('Asserting date range. Start date 2015-05 - 1430438400000 is bigger than end date 2015-04 - 1427846400000');
    });
    it('should throw an error if a value fo the range is not correctly formatted', () => {
      const value = '2552';
      expect(() => assertDateRangeInStringDateFormatForMonth(value, '2015-04')).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Expected length 7 but value has ${value.length}`);
      expect(() => assertDateRangeInStringDateFormatForMonth('2015-04', value)).toThrowError(`Asserting ${value} has ISO format for month (YYYY-MM) failed. Expected length 7 but value has ${value.length}`);
    });
  });
  describe('assertZipCodeForMadrid', () => {
    it('should not throw any error if zip code is correct', () => {
      expect(() => assertZipCodeForMadrid(28056)).not.toThrowError();
      expect(() => assertZipCodeForMadrid(28156)).not.toThrowError();
    });
    it('should throw an error if zip code is not correctly formatted', () => {
      let value = 54205;
      expect(() => assertZipCodeForMadrid(value)).toThrowError('Asserting 54205 has the expected format for a Madrid zip code, expected format 28XXX .Not matching the expected format 28XXX');

      value = 54205.34;
      expect(() => assertZipCodeForMadrid(value)).toThrowError('Asserting 54205.34 has the expected format for a Madrid zip code, expected format 28XXX .Not matching the expected format 28XXX');

      value = Number('r4ffr');
      expect(() => assertZipCodeForMadrid(value)).toThrowError('Asserting NaN has the expected format for a Madrid zip code, expected format 28XXX .Not recognized as decimal numbers');

      value = Number('28ffr');
      expect(() => assertZipCodeForMadrid(value)).toThrowError('Asserting NaN has the expected format for a Madrid zip code, expected format 28XXX .Not recognized as decimal numbers');
    });
  });
});
