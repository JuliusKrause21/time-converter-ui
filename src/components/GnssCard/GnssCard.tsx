import { FC, ReactElement, useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { GnssTime, isGnssTime } from '../../models/GnssTime.ts';
import { maxTimeOfWeek, TimeConverter } from '@jk21/time-converter';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import CardHeader from '../CardHeader/CardHeader.tsx';
import ClearButton from '../ClearButton/ClearButton.tsx';
import ConvertButton from '../ConvertButton/ConvertButton.tsx';
import { TimeFormat } from '../../models/TimeFormat.ts';
import { LeapSecondsContext } from '../../store/LeapSecondsContext.ts';

enum GnssValidationError {
  Required = 'Value is required',
  NotNegative = 'Week must not be less than 0',
  TimeOfWeekRange = 'Time of week must be between 0 and 604800'
}

interface GnssCardProps {
  onNext: () => void;
  onSubmit: (result: TimeConversionResult) => void;
}

const GnssCard: FC<GnssCardProps> = ({ onNext, onSubmit }): ReactElement => {
  const [week, setWeek] = useState<FieldState<string>>(initialFieldState<string>(''));
  const [timeOfWeek, setTimeOfWeek] = useState<FieldState<string>>(initialFieldState<string>(''));

  const { leapSecondsUsed } = useContext(LeapSecondsContext);

  const timeConverter = new TimeConverter(leapSecondsUsed);

  const convertGnssTime = (gnssTime: GnssTime): void => {
    const result = timeConverter.convertGnssTime(gnssTime);
    onSubmit(result);
    return;
  };
  const handleSubmit = () => {
    if (!isValidForm(week.value, timeOfWeek.value)) {
      return;
    }

    const gnssTime: GnssTime = { week: +week.value, timeOfWeek: +timeOfWeek.value };
    if (!isGnssTime(gnssTime)) {
      console.log('Validation failed');
      return;
    }

    convertGnssTime(gnssTime);
  };

  const handleClear = () => {
    setWeek(initialFieldState<string>(''));
    setTimeOfWeek(initialFieldState<string>(''));
  };

  function isValidWeek(week: string): boolean {
    const mappedWeek = week === '' ? undefined : +week;
    if (mappedWeek === undefined) {
      setWeek(prevState => ({ ...prevState, error: true, message: GnssValidationError.Required }));
      return false;
    }
    if (mappedWeek < 0) {
      setWeek(prevState => ({ ...prevState, error: true, message: GnssValidationError.NotNegative }));
      return false;
    }
    return true;
  }

  function isValidTimeOfWeek(timeOfWeek: string): boolean {
    const mappedTimeOfWeek = timeOfWeek === '' ? undefined : +timeOfWeek;
    if (mappedTimeOfWeek === undefined) {
      setTimeOfWeek(prevState => ({ ...prevState, error: true, message: GnssValidationError.Required }));
      return false;
    }

    if (mappedTimeOfWeek < 0 || mappedTimeOfWeek > maxTimeOfWeek) {
      setTimeOfWeek(prevState => ({ ...prevState, error: true, message: GnssValidationError.TimeOfWeekRange }));
      return false;
    }
    return true;
  }

  function isValidForm(week: string, timeOfWeek: string) {
    const validWeek = isValidWeek(week);
    const validTimeOfWeek = isValidTimeOfWeek(timeOfWeek);
    return validWeek && validTimeOfWeek;
  }

  const description =
    'The GNSS time is represented in weeks and seconds of the week since the launch of the initial operable GPS constellation on 06.01.1980 at midnight.';

  return (
    <CardStyled>
      <CardHeader title="GNSS Time" description={description} timeFormat={TimeFormat.Gnss} onClick={onNext} />
      <CardContentStyled>
        <FormWrapperStyled>
          <TextField
            type="number"
            label="Week"
            variant="outlined"
            required
            value={week.value}
            error={week.error}
            helperText={week.error && week.message}
            onChange={event => setWeek(prevState => ({ ...prevState, value: event.target.value, error: false }))}
            onBlur={event => isValidWeek(event.target.value)}
          />
          <TextField
            type="number"
            label="Time of week"
            variant="outlined"
            required
            value={timeOfWeek.value}
            error={timeOfWeek.error}
            helperText={timeOfWeek.error && timeOfWeek.message}
            onChange={event => setTimeOfWeek(prevState => ({ ...prevState, value: event.target.value, error: false }))}
            onBlur={event => isValidTimeOfWeek(event.target.value)}
          />
        </FormWrapperStyled>
        <ButtonWrapperStyled>
          <ConvertButton timeFormat={TimeFormat.Gnss} onClick={handleSubmit} />
          <ClearButton timeFormat={TimeFormat.Gnss} onClick={handleClear} />
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default GnssCard;
