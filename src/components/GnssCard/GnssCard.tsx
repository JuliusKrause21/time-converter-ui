import { FC, ReactElement } from 'react';
import { Button, TextField } from '@mui/material';
import { GnssTime, isValidGnssTime, MAX_TIME_OF_WEEK } from '../../utils/convertGnssToUnix.ts';
import { ButtonWrapperStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';

enum GnssValidationError {
  Required = 'Value is required',
  NotNegative = 'Week must not be less than 0',
  TimeOfWeekRange = 'Time of week must be between 0 and 604800'
}

interface GnssCardProps {
  week: FieldState<string>;
  timeOfWeek: FieldState<string>;
  setWeek: (value: ((prevState: FieldState<string>) => FieldState<string>) | FieldState<string>) => void;
  setTimeOfWeek: (value: ((prevState: FieldState<string>) => FieldState<string>) | FieldState<string>) => void;
  onSubmit: (value: GnssTime) => void;
  onClear: () => void;
}

const GnssCard: FC<GnssCardProps> = ({ week, timeOfWeek, setWeek, setTimeOfWeek, onSubmit, onClear }): ReactElement => {
  const handleSubmit = () => {
    if (!isValidForm(week.value, timeOfWeek.value)) {
      return;
    }

    const gnssTime: GnssTime = { week: +week.value, timeOfWeek: +timeOfWeek.value };
    if (!isValidGnssTime(gnssTime)) {
      console.log('Validation failed');
      return;
    }

    onSubmit(gnssTime);
  };

  const handleClear = () => {
    setWeek(initialFieldState);
    setTimeOfWeek(initialFieldState);
    onClear();
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

    if (mappedTimeOfWeek < 0 || mappedTimeOfWeek > MAX_TIME_OF_WEEK) {
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

  return (
    <CardStyled>
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
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <Button onClick={handleClear} variant="outlined">
          Clear
        </Button>
      </ButtonWrapperStyled>
    </CardStyled>
  );
};

export default GnssCard;
