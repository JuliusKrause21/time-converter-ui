import { ReactElement, useState } from 'react';
import Card from '@mui/material/Card';
import { Box, Button, CardContent, styled, TextField } from '@mui/material';
import { convertGnssToUnix, GnssTime, isValidGnssTime, MAX_TIME_OF_WEEK } from '../../utils/convertGnssToUnix.ts';

const CardContainerStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
});

const CardStyled = styled(Card)({
  minWidth: 500
});

const FormWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 25
});

const ButtonWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  marginTop: 35
});

interface FieldState<T> {
  value: T;
  error: boolean;
  message?: string;
}

enum GnssValidationError {
  Required = 'Value is required',
  NotNegative = 'Week must not be less than 0',
  TimeOfWeekRange = 'Time of week must be between 0 and 604800'
}

const initialFieldState = { value: '', error: false };

const GnssCard = (): ReactElement => {
  const [week, setWeek] = useState<FieldState<string>>(initialFieldState);
  const [timeOfWeek, setTimeOfWeek] = useState<FieldState<string>>(initialFieldState);

  const handleSubmit = () => {
    if (!isValidForm(week.value, timeOfWeek.value)) {
      return;
    }

    const gnssTime: GnssTime = { week: +week.value, timeOfWeek: +timeOfWeek.value };
    if (!isValidGnssTime(gnssTime)) {
      console.log('Validation failed');
      return;
    }
    try {
      const unix = convertGnssToUnix(gnssTime);
      console.log('Unix:', unix);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setWeek(initialFieldState);
    setTimeOfWeek(initialFieldState);
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
    <CardContainerStyled>
      <CardStyled>
        <CardContent>
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
              onChange={event =>
                setTimeOfWeek(prevState => ({ ...prevState, value: event.target.value, error: false }))
              }
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
        </CardContent>
      </CardStyled>
    </CardContainerStyled>
  );
};

export default GnssCard;
