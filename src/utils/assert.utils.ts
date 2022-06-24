export const assertStringDateFormatForMonth = (value: string): void => {
  const expectedFormat = 'YYYY-MM';
  const baseMessage = `Asserting ${value} has ISO format for month (${expectedFormat}) failed.`;

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
  const regExpForMonth: RegExp = /^\d{2}$/g;
  const month = splittedValues[1];
  if (!regExpForMonth.test(month)) {
    throw Error(`${baseMessage} Month value expectes 2 decimal numbers, received ${month}`);
  }
};

export const assertZipCodeForMadrid = (value: number): void => {
  const expectedFormat = '28XXX';
  const baseMessage = `Asserting ${value} has the expected format for a Madrid zip code, expected format ${expectedFormat}`;
  if (isNaN(value)) {
    throw Error(`${baseMessage} . Not recognized as decimal numbers`);
  }
  const valueAsString = String(value);
  const regExpForMadridZipCode: RegExp = /^28\d{3}$/g;
  if (!regExpForMadridZipCode.test(valueAsString)) {
    throw Error(`${baseMessage} .Not matching the expected format ${expectedFormat}`);
  }
};
