export interface DateTime {
  date: string;
  time: string;
  month: string;
  dayOfWeek: string;
  dayOfYear: string;
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}
