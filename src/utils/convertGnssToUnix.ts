export interface GnssTime {
  week: number;
  timeOfWeek: number;
}

const UNIX_AT_GPS_ZERO = 315964800;
export const MAX_TIME_OF_WEEK = 604800;

const addedLeapSeconds = [
  {
    unixTime: 315532800,
    leapSeconds: 0,
    utc: '1980-01-01T00:00:00.000Z'
  },
  {
    unixTime: 362793600,
    leapSeconds: 1,
    utc: '1981-07-01T00:00:00.000Z'
  },
  {
    unixTime: 394329600,
    leapSeconds: 2,
    utc: '1982-07-01T00:00:00.000Z'
  },
  {
    unixTime: 425865600,
    leapSeconds: 3,
    utc: '1983-07-01T00:00:00.000Z'
  },
  {
    unixTime: 489024000,
    leapSeconds: 4,
    utc: '1985-07-01T00:00:00.000Z'
  },
  {
    unixTime: 567993600,
    leapSeconds: 5,
    utc: '1988-01-01T00:00:00.000Z'
  },
  {
    unixTime: 631152000,
    leapSeconds: 6,
    utc: '1990-01-01T00:00:00.000Z'
  },
  {
    unixTime: 662688000,
    leapSeconds: 7,
    utc: '1991-01-01T00:00:00.000Z'
  },
  {
    unixTime: 709948800,
    leapSeconds: 8,
    utc: '1992-07-01T00:00:00.000Z'
  },
  {
    unixTime: 741484800,
    leapSeconds: 9,
    utc: '1993-07-01T00:00:00.000Z'
  },
  {
    unixTime: 773020800,
    leapSeconds: 10,
    utc: '1994-07-01T00:00:00.000Z'
  },
  {
    unixTime: 820454400,
    leapSeconds: 11,
    utc: '1996-01-01T00:00:00.000Z'
  },
  {
    unixTime: 867715200,
    leapSeconds: 12,
    utc: '1997-07-01T00:00:00.000Z'
  },
  {
    unixTime: 915148800,
    leapSeconds: 13,
    utc: '1999-01-01T00:00:00.000Z'
  },
  {
    unixTime: 1136073600,
    leapSeconds: 14,
    utc: '2006-01-01T00:00:00.000Z'
  },
  {
    unixTime: 1230768000,
    leapSeconds: 15,
    utc: '2009-01-01T00:00:00.000Z'
  },
  {
    unixTime: 1341100800,
    leapSeconds: 16,
    utc: '2012-07-01T00:00:00.000Z'
  },
  {
    unixTime: 1435708800,
    leapSeconds: 17,
    utc: '2015-07-01T00:00:00.000Z'
  },
  {
    unixTime: 1483142400,
    leapSeconds: 18,
    utc: '2016-12-31T00:00:00.000Z'
  }
];

function weekToSeconds(week: number): number {
  return week * 7 * 24 * 3600;
}

export function convertGnssToUnix(gnssTime: GnssTime): number {
  console.log('Week:', gnssTime.week);
  console.log('Time of week:', gnssTime.timeOfWeek);

  if (gnssTime.week < 0 || gnssTime.timeOfWeek < 0 || gnssTime.timeOfWeek > MAX_TIME_OF_WEEK) {
    throw new Error('Week and time of week need to be positive numbers including 0');
  }

  const totalSeconds = weekToSeconds(gnssTime.week) + gnssTime.timeOfWeek;
  console.log('Total seconds:', totalSeconds);
  const unixTimeWithLeapSeconds = UNIX_AT_GPS_ZERO + totalSeconds;

  const leapSeconds = addedLeapSeconds
    .filter(addedLeapSecond => addedLeapSecond.unixTime + addedLeapSecond.leapSeconds <= unixTimeWithLeapSeconds)
    .reverse()[0].leapSeconds;

  console.log(leapSeconds);
  const unixTimeWithoutLeapSeconds = unixTimeWithLeapSeconds - leapSeconds;
  console.log('Unix:', unixTimeWithoutLeapSeconds);
  console.log(new Date(unixTimeWithoutLeapSeconds * 1000).toISOString());

  return unixTimeWithoutLeapSeconds;
}

// This validation should be done in the backend
export function isValidGnssTime(time: unknown): time is GnssTime {
  if (time === undefined) {
    return false;
  }
  if (typeof time !== 'object') {
    return false;
  }
  const probablyGnssTime = time as GnssTime;
  return !(
    probablyGnssTime.timeOfWeek === undefined ||
    probablyGnssTime.timeOfWeek < 0 ||
    probablyGnssTime.timeOfWeek > MAX_TIME_OF_WEEK
  );
}
