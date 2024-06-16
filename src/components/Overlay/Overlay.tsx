import { CardContainerStyled } from '../CardContainer.style.ts';
import { OverlayStyled } from './Overlay.style.ts';
import { FC } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import ConversionResult from './ConversionResult/ConversionResult.tsx';
import { buildDateString, buildTimeString } from '../../utils/buildUtcStings.ts';
import { TimeFormat } from '../../App.tsx';
import CancelButton from './CancelButton/CancelButton.tsx';

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
  convertedFormat: TimeFormat | undefined;
  conversionResult: TimeConversionResult;
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ conversionResult, convertedFormat, onClose }) => {
  return (
    <OverlayStyled>
      <CardContainerStyled>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px'
          }}
        >
          <h2>Time Conversion:</h2>
          <CancelButton onClose={onClose} />
        </div>
        <ConversionResult
          title="Gnss Time"
          open={convertedFormat !== TimeFormat.Gnss}
          content={conversionResult?.gnssTime}
        />
        <ConversionResult
          title="UTC"
          open={convertedFormat !== TimeFormat.Utc}
          content={{
            date: buildDateString(conversionResult.utc),
            time: buildTimeString(conversionResult.utc),
            month: conversionResult && months[conversionResult?.utc.getMonth()],
            weekday: conversionResult && weekdays[conversionResult?.utc.getDay()]
          }}
        />
        <ConversionResult
          title={'Additional Info'}
          open={convertedFormat !== TimeFormat.Unix}
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
