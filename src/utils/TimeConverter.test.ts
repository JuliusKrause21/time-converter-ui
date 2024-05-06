import { describe, expect, test } from 'vitest';
import { TimeConverter } from './TimeConverter.ts';
import { maxTimeOfWeek, unixAtGpsZero } from './convertGnssToUnix.ts';
import { convertUnixToGnss } from './convertUnixToGnss.ts';

describe('TimeConverter', () => {
  const timeConverter = new TimeConverter();
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

  describe('convertUnixToGnssTime', () => {
    test('to throw an error if unix timestamp is invalid', () => {
      const invalidUnixTimestamp = -1;
      expect(() => timeConverter.convertUnixToGnssTime(invalidUnixTimestamp)).toThrowError();
    });

    test('to throw an error if unix timestamp is older than GPS', () => {
      const unixTimestampOlderThanGnss = unixAtGpsZero - 1;
      expect(() => timeConverter.convertUnixToGnssTime(unixTimestampOlderThanGnss)).toThrowError();
    });

    test('convert initial gnss time correctly', () => {
      const unixTime = unixAtGpsZero;
      const expectedGnssTime = { week: 0, timeOfWeek: 0 };

      const gnssTime = timeConverter.convertUnixToGnssTime(unixTime);
      expect(gnssTime).toEqual(expectedGnssTime);
    });

    test.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
      const convertedGnssTime = convertUnixToGnss(unixTime);
      expect(convertedGnssTime).toStrictEqual(gnssTime);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'that leap seconds where not applied before $utc',
      ({ gnssTime, unixTime }) => {
        const convertedGnssTimeBeforeChange = convertUnixToGnss(unixTime - 1);
        expect(convertedGnssTimeBeforeChange).toStrictEqual({ ...gnssTime, timeOfWeek: gnssTime.timeOfWeek - 1 });
      }
    );
  });

  describe('convertGnssToUnixTime', () => {
    test('to convert initial GNSS time correctly', () => {
      const initialGnssTime = { week: 0, timeOfWeek: 0 };
      const expectedUnixTime = unixAtGpsZero;

      const unixTime = timeConverter.convertGnssToUnixTime(initialGnssTime);

      expect(unixTime).toBe(expectedUnixTime);
    });

    test('to throw an error for weeks smaller than 0', () => {
      const initialGnssTime = { week: -1, timeOfWeek: 0 };

      expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
    });

    test('to throw an error for timeOfWeek smaller than 0', () => {
      const initialGnssTime = { week: 0, timeOfWeek: -1 };

      expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
    });

    test('to throw an error for timeOfWeek greater than maximum number', () => {
      const initialGnssTime = { week: 0, timeOfWeek: maxTimeOfWeek + 1 };

      expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
    });

    test.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
      const convertedUnixTimeAtChange = timeConverter.convertGnssToUnixTime(gnssTime);
      expect(convertedUnixTimeAtChange).toBe(unixTime);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'that leap seconds were not applied before $utc',
      ({ gnssTime, unixTime }) => {
        const convertedUnixTimeBeforeChange = timeConverter.convertGnssToUnixTime({
          ...gnssTime,
          timeOfWeek: gnssTime.timeOfWeek - 1
        });
        expect(convertedUnixTimeBeforeChange).toBe(unixTime);
      }
    );
  });
});
