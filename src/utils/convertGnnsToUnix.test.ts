import { describe, expect, test } from 'vitest';
import { convertGnssToUnix } from './convertGnssToUnix.ts';

describe('Convert GNSS time to Unix time', () => {
  describe('Throws an error for negative values', () => {
    test('to convert initial GNSS time correctly', () => {
      const initialGnssTime = { week: 0, timeOfWeek: 0 };
      const expectedUnixTime = 315964800;

      const unixTime = convertGnssToUnix(initialGnssTime);

      expect(unixTime).toBe(expectedUnixTime);
    });

    test('to throw an error for weeks smaller than 0', () => {
      const initialGnssTime = { week: -1, timeOfWeek: 0 };

      expect(() => convertGnssToUnix(initialGnssTime)).toThrowError();
    });

    test('to throw an error for timeOfWeek smaller than 0', () => {
      const initialGnssTime = { week: 0, timeOfWeek: -1 };

      expect(() => convertGnssToUnix(initialGnssTime)).toThrowError();
    });
  });

  describe('Apply leap seconds correctly', () => {
    const timeStampsAtLeapSecondsChange = [
      {
        utc: '1981-07-01T00:00:00.000Z',
        unixTime: 362793600,
        gnssTime: { week: 77, timeOfWeek: 259201 }
      },
      {
        utc: '1982-07-01T00:00:00.000Z',
        unixTime: 394329600,
        gnssTime: { week: 129, timeOfWeek: 345602 }
      },
      {
        utc: '1983-07-01T00:00:00.000Z',
        unixTime: 425865600,
        gnssTime: { week: 181, timeOfWeek: 432003 }
      },
      {
        utc: '1985-07-01T00:00:00.000Z',
        unixTime: 489024000,
        gnssTime: { week: 286, timeOfWeek: 86404 }
      },
      {
        utc: '1988-01-01T00:00:00.000Z',
        unixTime: 567993600,
        gnssTime: { week: 416, timeOfWeek: 432005 }
      },
      {
        utc: '1990-01-01T00:00:00.000Z',
        unixTime: 631152000,
        gnssTime: { week: 521, timeOfWeek: 86406 }
      },
      {
        utc: '1991-01-01T00:00:00.000Z',
        unixTime: 662688000,
        gnssTime: { week: 573, timeOfWeek: 172807 }
      },
      {
        utc: '1992-07-01T00:00:00.000Z',
        unixTime: 709948800,
        gnssTime: { week: 651, timeOfWeek: 259208 }
      },
      {
        utc: '1993-07-01T00:00:00.000Z',
        unixTime: 741484800,
        gnssTime: { week: 703, timeOfWeek: 345609 }
      },
      {
        utc: '1994-07-01T00:00:00.000Z',
        unixTime: 773020800,
        gnssTime: { week: 755, timeOfWeek: 432010 }
      },
      {
        utc: '1996-01-01T00:00:00.000Z',
        unixTime: 820454400,
        gnssTime: { week: 834, timeOfWeek: 86411 }
      },
      {
        utc: '1997-07-01T00:00:00.000Z',
        unixTime: 867715200,
        gnssTime: { week: 912, timeOfWeek: 172812 }
      },
      {
        utc: '1999-01-01T00:00:00.000Z',
        unixTime: 915148800,
        gnssTime: { week: 990, timeOfWeek: 432013 }
      },
      {
        utc: '2006-01-01T00:00:00.000Z',
        unixTime: 1136073600,
        gnssTime: { week: 1356, timeOfWeek: 14 }
      },
      {
        utc: '2009-01-01T00:00:00.000Z',
        unixTime: 1230768000,
        gnssTime: { week: 1512, timeOfWeek: 345615 }
      },
      {
        utc: '2012-07-01T00:00:00.000Z',
        unixTime: 1341100800,
        gnssTime: { week: 1695, timeOfWeek: 16 }
      },
      {
        utc: '2015-07-01T00:00:00.000Z',
        unixTime: 1435708800,
        gnssTime: { week: 1851, timeOfWeek: 259217 }
      },
      {
        utc: '2016-12-31T00:00:00.000Z',
        unixTime: 1483142400,
        gnssTime: { week: 1929, timeOfWeek: 518418 }
      }
    ];

    test.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
      const convertedUnixTimeAtChange = convertGnssToUnix(gnssTime);
      expect(convertedUnixTimeAtChange).toBe(unixTime);

      const convertedUnixTimeBeforeChange = convertGnssToUnix({
        ...gnssTime,
        timeOfWeek: gnssTime.timeOfWeek - 1
      });
      expect(convertedUnixTimeBeforeChange).toBe(unixTime);
    });
  });
});
