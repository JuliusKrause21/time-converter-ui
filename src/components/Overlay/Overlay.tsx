import { CardContainerStyled } from '../CardContainer.style.ts';
import { OverlayStyled } from './Overlay.style.ts';
import { FC } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import ConversionResult from './ConversionResult.tsx';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'Mai',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

interface OverlayProps {
  conversionResult: TimeConversionResult;
}

const Overlay: FC<OverlayProps> = ({ conversionResult }) => {
  function buildDateString(utc: Date | undefined): string {
    return utc === undefined ? '' : `${utc.getUTCDate()}.${(utc.getUTCMonth() ?? 0) + 1}.${utc.getUTCFullYear()}`;
  }

  function buildTimeString(utc: Date | undefined): string {
    return utc === undefined ? '' : `${utc.getUTCHours()}:${utc.getUTCMinutes()}:${utc.getUTCSeconds()}`;
  }

  return (
    <OverlayStyled>
      <CardContainerStyled>
        <ConversionResult title="Gnss Time" content={conversionResult?.gnssTime} />
        <ConversionResult
          title="UTC"
          content={{
            date: buildDateString(conversionResult.utc),
            time: buildTimeString(conversionResult.utc),
            month: conversionResult && months[conversionResult?.utc.getMonth()],
            weekday: conversionResult && weekdays[conversionResult?.utc.getDay()]
          }}
        />
        <ConversionResult
          title={'Additional Info'}
          content={{
            unix: conversionResult.unixTime ?? 0,
            leapSeconds: conversionResult.leapSeconds ?? 0,
            isLeapYear: conversionResult.leapYear,
            nextLeapYear: conversionResult.nextLeapYear
          }}
        />
      </CardContainerStyled>
    </OverlayStyled>
  );
};

export default Overlay;
