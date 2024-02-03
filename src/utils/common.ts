export function get12WeeksAgoExcludingWeekends(): Date {
  let date = new Date(); // 今日の日付
  date.setDate(date.getDate() - 12 * 7); // 12週間前

  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}

export function formatDateToYYYYMMDD(date: Date, separator: string = ''): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${separator}${month}${separator}${day}`;
}
