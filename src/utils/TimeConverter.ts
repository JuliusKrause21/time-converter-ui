export interface GnssTime {
  week: number;
  timeOfWeek: number;
}

export interface TimeConversionResult {
  utc: Date;
  leapYear: boolean;
  gnssTime: GnssTime | undefined;
  unixTime: number | undefined;
  leapSeconds: number | undefined;
  nextLeapYear: number | undefined;
}

export const unixAtGpsZero = 315964800;
export const maxTimeOfWeek = 604800;
export const addedLeapSeconds = [
  {
    unixTime: 315534800,
    leapSeconds: 0,
    utc: '1980-01-06T00:00:00.000Z'
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

// TODO: Test without the use of leap seconds
export class TimeConverter {
  private useLeapSeconds: boolean;

  constructor(useLeapSeconds = true) {
    this.useLeapSeconds = useLeapSeconds;
  }

  public setUseLeapSeconds(useLeapSeconds: boolean) {
    this.useLeapSeconds = useLeapSeconds;
  }

  public convertUnixTime(unixTime: number): TimeConversionResult {
    const utc = this.convertUnixToUtc(unixTime * 1000);
    const year = utc.getFullYear();
    const leapYear = this.isLeapYear(year);

    return {
      utc,
      unixTime,
      leapYear,
      gnssTime: this.convertUnixToGnssTime(unixTime),
      leapSeconds: this.useLeapSeconds ? this.getLeapSecondsToAdd(unixTime) : undefined,
      nextLeapYear: leapYear ? undefined : this.nextLeapYear(year)
    };
  }

  public convertGnssTime(gnssTime: GnssTime): TimeConversionResult {
    const utc = this.convertGnssToUtc(gnssTime);
    const unixTime = this.convertGnssToUnixTime(gnssTime);
    const year = utc.getFullYear();
    const leapYear = this.isLeapYear(year);

    return {
      utc,
      leapYear,
      gnssTime,
      unixTime,
      leapSeconds: this.useLeapSeconds ? this.getLeapSecondsToSubtract(unixTime) : undefined,
      nextLeapYear: leapYear ? undefined : this.nextLeapYear(year)
    };
  }

  public convertUtc(utc: Date): TimeConversionResult {
    const unixTime = this.convertUtcToUnixTime(utc);
    const year = utc.getFullYear();
    const leapYear = this.isLeapYear(year);
    const leapSeconds = this.useLeapSeconds
      ? unixTime !== undefined
        ? this.getLeapSecondsToSubtract(unixTime)
        : 0
      : undefined;

    return {
      utc,
      leapYear,
      unixTime,
      gnssTime: this.convertUtcToGnssTime(utc),
      leapSeconds,
      nextLeapYear: leapYear ? undefined : this.nextLeapYear(year)
    };
  }

  public convertUnixToGnssTime(unixTime: number): GnssTime | undefined {
    if (unixTime < 0) {
      throw new Error('Invalid unix timestamp');
    }
    if (unixTime < unixAtGpsZero) {
      return undefined;
    }

    const unixTimeWithLeapSeconds = this.useLeapSeconds ? unixTime + this.getLeapSecondsToAdd(unixTime) : unixTime;

    const week = Math.floor((unixTimeWithLeapSeconds - unixAtGpsZero) / maxTimeOfWeek);
    const timeOfWeek = unixTimeWithLeapSeconds - unixAtGpsZero - this.weekToSeconds(week);

    return { week, timeOfWeek };
  }

  public convertUtcToGnssTime(utc: Date): GnssTime | undefined {
    const unixTime = utc.getTime() / 1000;
    return unixTime < 0 ? undefined : this.convertUnixToGnssTime(unixTime);
  }

  public convertGnssToUnixTime(gnssTime: GnssTime): number {
    if (gnssTime.week < 0 || gnssTime.timeOfWeek < 0 || gnssTime.timeOfWeek > maxTimeOfWeek) {
      throw new Error('Week and time of week need to be positive numbers including 0');
    }

    const totalSeconds = this.weekToSeconds(gnssTime.week) + gnssTime.timeOfWeek;
    const unixTimeWithLeapSeconds = unixAtGpsZero + totalSeconds;

    return this.useLeapSeconds
      ? unixTimeWithLeapSeconds - this.getLeapSecondsToSubtract(unixTimeWithLeapSeconds)
      : unixTimeWithLeapSeconds;
  }

  public convertUtcToUnixTime(utc: Date): number | undefined {
    const unixTime = utc.getTime() / 1000;
    return unixTime < 0 ? undefined : unixTime;
  }

  public convertUnixToUtc(unixTime: number): Date {
    if (unixTime < 0) {
      throw new Error('Invalid unix timestamp');
    }

    return new Date(unixTime);
  }

  public convertGnssToUtc(gnssTime: GnssTime): Date {
    return new Date(this.convertGnssToUnixTime(gnssTime) * 1000);
  }

  // TODO: this logic can be generalized
  private getLeapSecondsToSubtract(unixTime: number): number {
    return addedLeapSeconds
      .filter(addedLeapSecond => addedLeapSecond.unixTime + addedLeapSecond.leapSeconds <= unixTime)
      .reverse()[0].leapSeconds;
  }

  private getLeapSecondsToAdd(unixTime: number): number {
    return (
      addedLeapSeconds
        .filter(addedLeapSecond => addedLeapSecond.unixTime <= unixTime + addedLeapSecond.leapSeconds)
        .reverse()[0]?.leapSeconds ?? 0
    );
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 400 == 0) || year % 100 !== 0;
  }

  private nextLeapYear(year: number): number {
    while (!this.isLeapYear(year)) {
      year++;
    }
    return year;
  }

  private weekToSeconds(week: number): number {
    return week * maxTimeOfWeek;
  }
}
