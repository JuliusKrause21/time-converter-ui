export interface GnssTime {
  week: number;
  timeOfWeek: number;
}

export function isGnssTime(value: unknown): value is GnssTime {
  if (value === undefined || typeof value !== 'object') {
    return false;
  }
  const potentialGnssTime = value as GnssTime;
  return potentialGnssTime.week !== undefined && potentialGnssTime.timeOfWeek !== undefined;
}
