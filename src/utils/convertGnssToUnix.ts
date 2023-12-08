export interface GnssTime {
  week: number;
  timeOfWeek: number;
}

const UNIX_AT_GPS_ZERO = 315964800;
export const MAX_TIME_OF_WEEK = 604800;

function weekToSeconds(week: number): number {
  return week * 7 * 24 * 3600;
}

export function convertGnssToUnix(gnssTime: GnssTime): number | Error {
  console.log('Week:', gnssTime.week);
  console.log('Time of week:', gnssTime.timeOfWeek);

  if (gnssTime.week < 0 || gnssTime.timeOfWeek < 0) {
    throw new Error('Week and time of week need to be positive numbers including 0');
  }

  const totalSeconds = weekToSeconds(gnssTime.week) + gnssTime.timeOfWeek;

  return UNIX_AT_GPS_ZERO + totalSeconds;
}

// This validation should be done in the backend
export function isValidGnssTime(time: unknown): time is GnssTime {
  if (time === undefined) {
    return false;
  }
  if (typeof time !== 'object') {
    return false;
  }
  const probablyGnnssTime = time as GnssTime;
  if (probablyGnnssTime.week === undefined || probablyGnnssTime.week < 0) {
    return false;
  }

  return !(probablyGnnssTime.timeOfWeek === undefined || probablyGnnssTime.timeOfWeek < 0);
}
