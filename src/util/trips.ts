const treatAsUTC = (date: Date): number => {
  const newDate = new Date(date);
  const value = newDate.setMinutes(
    newDate.getMinutes() - newDate.getTimezoneOffset()
  );
  return value;
};

export const getStartsIn = (startDate: Date): number => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const time = Math.ceil(
    (treatAsUTC(startDate) - Date.now()) / millisecondsPerDay
  );
  return time;
};
