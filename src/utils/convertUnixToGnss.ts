import { addedLeapSeconds, GnssTime, unixAtGpsZero, weekToSeconds } from './convertGnssToUnix.ts';

const secondsPerWeek = 7 * 24 * 60 * 60;

export function convertUnixToGnss(unixTime: number): GnssTime {
  if (unixTime < 0) {
    throw new Error('Invalid unix timestamp');
  }
  if (unixTime < unixAtGpsZero) {
    throw new Error('Unix timestamp older than GNSS');
  }

  const leapSeconds = addedLeapSeconds
    .filter(addedLeapSecond => addedLeapSecond.unixTime <= unixTime + addedLeapSecond.leapSeconds)
    .reverse()[0].leapSeconds;

  const unixTimeWithLeapSeconds = unixTime + leapSeconds;

  const week = Math.floor((unixTimeWithLeapSeconds - unixAtGpsZero) / secondsPerWeek);
  const timeOfWeek = unixTimeWithLeapSeconds - unixAtGpsZero - weekToSeconds(week);

  return { week, timeOfWeek };
}
