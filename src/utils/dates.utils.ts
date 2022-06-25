/**
 * Get a date in a formatted string to be used in a SQL query
 * @param date Date to be formatted
 * @param useMonth Include the month of the current date in the returned string. If not '01' is set. Default value is true
 * @param useDate Include the day of the month in the returned string. If not '01' is set. Default value is false
 * @returns String formatted based on the provided date
 */
export const getDateFormatted = (date: Date, useMonth = true, useDate = false) => {
  if (!date) {
    throw Error('Could not format date. Date must be provided!!');
  }

  return `${date.getUTCFullYear()}-${useMonth ? date.getUTCMonth() + 1 : '01'}-${useDate ? date.getUTCDate() : '01'}`;
};
