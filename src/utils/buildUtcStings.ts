export function buildDateString(utc: Date | undefined): string {
  return utc === undefined ? '' : `${utc.getUTCDate()}.${(utc.getUTCMonth() ?? 0) + 1}.${utc.getUTCFullYear()}`;
}

export function buildTimeString(utc: Date | undefined): string {
  return utc === undefined ? '' : `${utc.getUTCHours()}:${utc.getUTCMinutes()}:${utc.getUTCSeconds()}`;
}
