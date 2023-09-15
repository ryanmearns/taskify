export const dateToIsoString = (date: Date): string => {
  // Create a new Date subtracting the local timezone offset, thus when converted to JSON i.e. an
  // ISO string, the date in UTC will be correct. This is required because the Date constructor
  // creates a Date object in the local timezone.
  //
  // Detailed explanation:
  // When a person in France selects 7/7/2023 in a date picker, the date object is created like:
  // new Date('2023-07-07 00:00:00'), which is a local datetime with the local timezone offset,
  // with a toString() representation of 'Fri Jul 07 2023 00:00:00 GMT+0200'.
  //
  // When converted to a JSON string with toJSON(), same as calling toISOString(), it becomes
  // '2023-07-06T22:00:00Z' (GMT), which the API reads and saves as 6 July 2023 in the database,
  // a day earlier than what was selected in the date picker.
  //
  // To correct for this, one must create a Date that adjusts for the local timezone offset, again
  // using France as an example, one must create a local Date of 7/7/2023 02:00:00, which when
  // converted toJSON() it becomes '2023-07-07T00:00:00Z', saving correctly as 7 July 2023.
  //
  // The timezone offset in France is -120. This is calculated as UTC time - local time, so
  // 2am UTC - 4am Paris time = -2 hours = -120 minutes, returned by getTimezoneOffset() as -120.

  // Luxon solution (untested)
  // import library: import { DateTime } from 'luxon'
  // const isoDate = DateTime.fromJSDate(date).toISODate();
  // if (!isoDate) throw Error('dateToIsoDate() failed');
  // return isoDate;

  // Native JS solution
  // Get the local Date (date + time) in milliseconds from epoch (1 January 1970 00:00:00 UTC)
  //
  // YES, if one runs new Date('2023-07-07 00:00:00').getTime() in different timezones,
  // the number will differ by the timezone offset.
  const utcTimeInMilliseconds = date.getTime();

  // Get the local timezone offset from UTC in milliseconds
  const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * 60 * 1000;

  // Create a new date subtracting the timezone offset from the local time (subtracting -120
  // for Paris adds 2 hours to the local time, so 00:00:00 becomes 02:00:00).
  const dateMinusTimezoneOffset = new Date(
    utcTimeInMilliseconds - timezoneOffsetInMilliseconds
  );

  // Convert the adjusted date to an ISO string, which is the format the API expects
  const isoString = dateMinusTimezoneOffset.toJSON();

  return isoString;
};
