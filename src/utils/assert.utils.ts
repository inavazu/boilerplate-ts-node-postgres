const includeContextMessage = (message: string): string => {
  return message ? message + '\n' : '';
};

/**
 * Assert the string is in ISO 8601 format - YYYY-MM
 * @param value value identifying year and month. Expected to be in ISO 8601 format - YYYY-MM
 * @param message Optional message to be included in the error thrown to context where the assert is performed
 */
export const assertStringDateFormatForMonth = (value: string, message = ''): void => {
  const expectedFormat = 'YYYY-MM';
  const baseMessage = `${includeContextMessage(message)}Asserting ${value} has ISO format for month (${expectedFormat}) failed.`;

  if (!value) {
    throw Error(`${baseMessage} No value provided`);
  }
  if (value.length !== expectedFormat.length) {
    throw Error(`${baseMessage} Expected length ${expectedFormat.length} but value has ${value.length}`);
  }
  const splittedValues = value.split('-');
  if (splittedValues.length !== 2) {
    throw Error(`${baseMessage} A '-' is expecte to seperate year and month`);
  }
  const year = splittedValues[0];
  const regExpForYear: RegExp = /^\d{4}$/g;
  if (!regExpForYear.test(year)) {
    throw Error(`${baseMessage} Year value expectes 4 decimal numbers, received ${year}`);
  }
  const regExpForMonth: RegExp = /(^0[1-9]|^1[0-2])$/g;
  const month = splittedValues[1];
  if (!regExpForMonth.test(month)) {
    throw Error(`${baseMessage} Month value expectes 2 decimal numbers, received ${month}`);
  }
};

/**
 * Assert the value passed complies with a Madrid zip code - 28XXX
 * @param value Madrid zip code
 * @param message Optional message to be included in the error thrown to context where the assert is performed
 */
export const assertZipCodeForMadrid = (value: number, message = ''): void => {
  const expectedFormat = '28XXX';
  const baseMessage = `${includeContextMessage(message)}Asserting ${value} has the expected format for a Madrid zip code, expected format ${expectedFormat}`;
  if (isNaN(value)) {
    throw Error(`${baseMessage} .Not recognized as decimal numbers`);
  }
  const valueAsString = String(value);
  const regExpForMadridZipCode: RegExp = /^28\d{3}$/g;
  if (!regExpForMadridZipCode.test(valueAsString)) {
    throw Error(`${baseMessage} .Not matching the expected format ${expectedFormat}`);
  }
};

/**
 * Assert the dates provided in ISO 8601 format (YYYY-MM) are a valid date range. Beside of the range it also verifies the values comply with the ISFO format 8601
 * @param start Start date
 * @param end End date
 * @param message Optional message to be included in the error thrown to context where the assert is performed
 */
export const assertDateRangeInStringDateFormatForMonth = (start: string, end: string, message = ''): void => {
  assertStringDateFormatForMonth(start);
  assertStringDateFormatForMonth(end);
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate > endDate) {
    throw new Error(`${includeContextMessage(message)}Asserting date range. Start date ${start} - ${startDate.getTime()} is bigger than end date ${end} - ${endDate.getTime()}`);
  }
};
