import { describe, expect, test } from 'vitest';
import { maxTimeOfWeek, TimeConverter, unixAtGpsZero } from './TimeConverter.ts';

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

  describe('convertUnixTime', () => {
    test('to throw an error if unix timestamp is invalid', () => {
      const invalidUnixTime = -1;
      expect(() => timeConverter.convertUnixTime(invalidUnixTime)).toThrowError();
    });

    test('to convert initial unix timestamp correctly to utc and keep gnss time undefined', () => {
      const initialUnixTime = 0;
      const expectedTimeConversionResult = {
        gnssTime: undefined,
        utc: new Date('1970-01-01T00:00:00.000Z'),
        unixTime: initialUnixTime,
        leapSeconds: 0,
        leapYear: true,
        nextLeapYear: undefined
      };

      const timeConversionResult = timeConverter.convertUnixTime(initialUnixTime);

      expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
    });

    test('to convert initial gnss timestamp correctly', () => {
      const unixTime = unixAtGpsZero;
      const expectedTimeConversionResult = {
        gnssTime: { week: 0, timeOfWeek: 0 },
        utc: new Date('1980-01-06T00:00:00.000Z'),
        unixTime,
        leapSeconds: 0,
        leapYear: true,
        nextLeapYear: undefined
      };

      const timeConversionResult = timeConverter.convertUnixTime(unixTime);

      expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
    });
  });

  describe('convertGnssTime', () => {
    test('to throw an error if week is invalid', () => {
      const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
      expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
    });

    test('to throw an error if timeOfWeek is invalid', () => {
      const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
      expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
    });

    test('convert initial gnss timestamp correctly', () => {
      const initialGnssTime = { week: 0, timeOfWeek: 0 };
      const expectedTimeConversionResult = {
        gnssTime: initialGnssTime,
        utc: new Date('1980-01-06T00:00:00.000Z'),
        unixTime: unixAtGpsZero,
        leapSeconds: 0,
        leapYear: true,
        nextLeapYear: undefined
      };

      const timeConversionResult = timeConverter.convertGnssTime(initialGnssTime);

      expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
    });
  });

  describe('convertUtc', () => {
    test('to convert utc without throwing an error although timestamp is older than initial unix time', () => {
      const utc = new Date('1960-01-01T00:00:00.000Z');
      const expectedTimeConversionResult = {
        gnssTime: undefined,
        utc,
        unixTime: undefined,
        leapSeconds: 0,
        leapYear: true,
        nextLeapYear: undefined
      };

      const timeConversionResult = timeConverter.convertUtc(utc);

      expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
    });
  });

  describe('convertUnixToGnssTime', () => {
    test('to throw an error if unix timestamp is invalid', () => {
      const invalidUnixTimestamp = -1;
      expect(() => timeConverter.convertUnixToGnssTime(invalidUnixTimestamp)).toThrowError();
    });

    test('to return undefined if unix timestamp is older than GPS', () => {
      const unixTimestampOlderThanGnss = unixAtGpsZero - 1;

      const gnssTime = timeConverter.convertUnixToGnssTime(unixTimestampOlderThanGnss);

      expect(gnssTime).toBe(undefined);
    });

    test('convert initial gnss time correctly', () => {
      const unixTime = unixAtGpsZero;
      const expectedGnssTime = { week: 0, timeOfWeek: 0 };

      const gnssTime = timeConverter.convertUnixToGnssTime(unixTime);
      expect(gnssTime).toEqual(expectedGnssTime);
    });

    test.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
      const convertedGnssTime = timeConverter.convertUnixToGnssTime(unixTime);
      expect(convertedGnssTime).toStrictEqual(gnssTime);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'that leap seconds where not applied before $utc',
      ({ gnssTime, unixTime }) => {
        const convertedGnssTimeBeforeChange = timeConverter.convertUnixToGnssTime(unixTime - 1);
        expect(convertedGnssTimeBeforeChange).toStrictEqual({ ...gnssTime, timeOfWeek: gnssTime.timeOfWeek - 1 });
      }
    );
  });

  describe('convertGnssToUnixTime', () => {
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

    test('to convert initial GNSS time correctly', () => {
      const initialGnssTime = { week: 0, timeOfWeek: 0 };
      const expectedUnixTime = unixAtGpsZero;

      const unixTime = timeConverter.convertGnssToUnixTime(initialGnssTime);

      expect(unixTime).toBe(expectedUnixTime);
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

  describe('convertUtcToGnssTime', () => {
    test('to return undefined if utc time is older than unix initial time', () => {
      const utc = new Date('1960-01-05T00:00:00.000Z');
      const gnssTime = timeConverter.convertUtcToGnssTime(utc);
      expect(gnssTime).toBe(undefined);
    });

    test('to return undefined if utc time is older than gnss initial time', () => {
      const utc = new Date('1980-01-05T00:00:00.000Z');
      const gnssTime = timeConverter.convertUtcToGnssTime(utc);
      expect(gnssTime).toBe(undefined);
    });

    test('to convert correctly to gnss initial time', () => {
      const utc = new Date('1980-01-06T00:00:00.000Z');
      const expectedGnssTime = { week: 0, timeOfWeek: 0 };

      const gnssTime = timeConverter.convertUtcToGnssTime(utc);

      expect(gnssTime).toStrictEqual(expectedGnssTime);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'utc is correctly converted to gnss time for all leap seconds',
      ({ utc, gnssTime }) => {
        const convertedGnssTime = timeConverter.convertUtcToGnssTime(new Date(utc));
        expect(convertedGnssTime).toStrictEqual(gnssTime);
      }
    );
  });

  describe('convertUtcToUnixTime', () => {
    test('to return undefined if utc timestamp is older than initial unix time', () => {
      const utc = new Date('1960-01-01T00:00:00.000Z');
      const unixTime = timeConverter.convertUtcToGnssTime(utc);
      expect(unixTime).toBe(undefined);
    });

    test('to convert utc of initial unix time correctly', () => {
      const utc = new Date('1970-01-01T00:00:00.000Z');
      const expectedUnixTime = 0;

      const unixTime = timeConverter.convertUtcToUnixTime(utc);

      expect(unixTime).toEqual(expectedUnixTime);
    });

    test('to convert utc of initial gnss time correctly', () => {
      const utc = new Date('1980-01-06T00:00:00.000Z');
      const expectedUnixTime = unixAtGpsZero;

      const unixTime = timeConverter.convertUtcToUnixTime(utc);

      expect(unixTime).toEqual(expectedUnixTime);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'utc is correctly converted to unix time for all leap seconds',
      ({ utc, unixTime }) => {
        const convertedGnssTime = timeConverter.convertUtcToUnixTime(new Date(utc));
        expect(convertedGnssTime).toStrictEqual(unixTime);
      }
    );
  });

  describe('convertUnixToUtc', () => {
    test('to throw an error if unix time stamp is smaller than zero', () => {
      expect(() => timeConverter.convertUnixToUtc(-1)).toThrowError();
    });

    test('to convert initial unix timestamp correctly to utc', () => {
      const unixTime = 0;
      const expectedUtc = new Date('1970-01-01T00:00:00.000Z');

      const utc = timeConverter.convertUnixToUtc(unixTime);

      expect(utc).toStrictEqual(expectedUtc);
    });

    test('to convert initial gnss timestamp correctly to utc', () => {
      const unixTime = unixAtGpsZero * 1000;
      const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

      const utc = timeConverter.convertUnixToUtc(unixTime);

      expect(utc).toStrictEqual(expectedUtc);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'unix time is correctly converted to utc for all leap seconds',
      ({ utc, unixTime }) => {
        const convertedGnssTime = timeConverter.convertUnixToUtc(unixTime * 1000);
        expect(convertedGnssTime).toStrictEqual(new Date(utc));
      }
    );
  });

  describe('convertGnssToUtc', () => {
    test('to throw an error if week is invalid', () => {
      const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
      expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
    });

    test('to throw an error if timeOfWeek is invalid', () => {
      const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
      expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
    });

    test('to convert initial gnss time correctly to utc', () => {
      const gnssTime = { week: 0, timeOfWeek: 0 };
      const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

      const utc = timeConverter.convertGnssToUtc(gnssTime);

      expect(utc).toStrictEqual(expectedUtc);
    });

    test.each(timeStampsAtLeapSecondsChange)(
      'gnss time is correctly converted to utc for all leap seconds',
      ({ gnssTime, utc }) => {
        const convertedGnssTime = timeConverter.convertGnssToUtc(gnssTime);
        expect(convertedGnssTime).toStrictEqual(new Date(utc));
      }
    );
  });
});
