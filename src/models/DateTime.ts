export interface DateTime {
  date: string;
  time: string;
  month: string;
  weekday: string;
}

export function isDateTime(value: unknown): value is DateTime {
  if (value === undefined || typeof value !== 'object') {
    return false;
  }
  const potentialDateTime = value as DateTime;
  return (
    potentialDateTime.date !== undefined &&
    potentialDateTime.time !== undefined &&
    potentialDateTime.month !== undefined &&
    potentialDateTime.weekday !== undefined
  );
}
