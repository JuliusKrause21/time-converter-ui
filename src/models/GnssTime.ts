import { maxTimeOfWeek } from '@jk21/time-converter';

export interface GnssTime {
  week: number;
  timeOfWeek: number;
}

export function isGnssTime(value: unknown): value is GnssTime {
  if (value === undefined || typeof value !== 'object') {
    return false;
  }
  const potentialGnssTime = value as GnssTime;
  return (
    potentialGnssTime.week >= 0 && potentialGnssTime.timeOfWeek >= 0 && potentialGnssTime.timeOfWeek <= maxTimeOfWeek
  );
}
