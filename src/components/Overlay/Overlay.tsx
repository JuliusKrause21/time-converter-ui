import { CardContainerStyled } from '../CardContainer.style.ts';
import { OverlayStyled } from './Overlay.style.ts';
import { FC, useEffect } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import ConversionResult, { ConversionResultTitle } from './ConversionResult/ConversionResult.tsx';
import { buildDateString, buildTimeString } from '../../utils/buildUtcStings.ts';
import ConversionResultHeader from './ConversionResultHeader/ConversionResultHeader.tsx';
import { useTheme } from '@mui/material';
import { TimeFormat } from '../../models/TimeFormat.ts';

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
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <OverlayStyled>
      <CardContainerStyled>
        <ConversionResultHeader onClose={onClose} />
        <ConversionResult
          title={ConversionResultTitle.Gnss}
          headerColor={theme.palette[TimeFormat.Gnss]}
          open={convertedFormat !== TimeFormat.Gnss}
          content={conversionResult?.gnssTime}
        />
        <ConversionResult
          title={ConversionResultTitle.Utc}
          headerColor={theme.palette[TimeFormat.Utc]}
          open={convertedFormat !== TimeFormat.Utc}
          content={{
            date: buildDateString(conversionResult.utc),
            time: buildTimeString(conversionResult.utc),
            month: conversionResult && months[conversionResult?.utc.getMonth()],
            weekday: conversionResult && weekdays[conversionResult?.utc.getDay()]
          }}
        />
        <ConversionResult
          title={ConversionResultTitle.Additional}
          headerColor={theme.palette[TimeFormat.Unix]}
          open={convertedFormat !== TimeFormat.Unix}
          content={{
            unix: conversionResult.unixTime,
            leapSeconds: conversionResult.leapSeconds,
            isLeapYear: conversionResult.leapYear,
            nextLeapYear: conversionResult.nextLeapYear
          }}
        />
      </CardContainerStyled>
    </OverlayStyled>
  );
};

export default Overlay;
