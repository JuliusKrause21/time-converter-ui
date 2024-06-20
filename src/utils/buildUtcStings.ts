function addLeadingZeros(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function buildDateString(utc: Date | undefined): string {
  return utc === undefined
    ? ''
    : `${addLeadingZeros(utc.getUTCDate())}.${addLeadingZeros((utc.getUTCMonth() ?? 0) + 1)}.${utc.getUTCFullYear()}`;
}

export function buildTimeString(utc: Date | undefined): string {
  return utc === undefined
    ? ''
    : `${addLeadingZeros(utc.getUTCHours())}:${addLeadingZeros(utc.getUTCMinutes())}:${addLeadingZeros(
        utc.getUTCSeconds()
      )}`;
}
