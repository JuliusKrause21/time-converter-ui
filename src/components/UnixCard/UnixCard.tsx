import { FC, ReactElement, useState } from 'react';
import { ButtonWrapperStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button, TextField } from '@mui/material';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { TimeConverter } from '@jk21/time-converter';

interface UnixCardProps {
  onSubmit: (result: TimeConversionResult) => void;
}

enum UnixValidationError {
  Required = 'Value is required',
  NotNegative = 'Unix time must not be less than 0'
}

const UnixCard: FC<UnixCardProps> = ({ onSubmit }): ReactElement => {
  const [unixTime, setUnixTime] = useState<FieldState<string>>(initialFieldState<string>(''));

  const timeConverter = new TimeConverter();

  const convertUnixTime = (unixTime: number): void => {
    const result = timeConverter.convertUnixTime(unixTime);
    onSubmit(result);
    return;
  };

  const handleSubmit = () => {
    if (!isValidUnixTime(unixTime.value)) {
      return;
    }
    convertUnixTime(+unixTime.value);
  };

  function isValidUnixTime(value: string): boolean {
    const mappedUnixTime = value === '' ? undefined : +value;
    if (mappedUnixTime === undefined) {
      setUnixTime(prevState => ({ ...prevState, error: true, message: UnixValidationError.Required }));
      return false;
    }

    if (mappedUnixTime < 0) {
      setUnixTime(prevState => ({ ...prevState, error: true, message: UnixValidationError.NotNegative }));
      return false;
    }
    return true;
  }

  const handleClear = () => {
    setUnixTime(initialFieldState<string>(''));
  };

  return (
    <CardStyled>
      <h1>Unix</h1>
      <FormWrapperStyled>
        <TextField
          type="number"
          label="Unix time stamp"
          variant="outlined"
          required
          value={unixTime.value ?? ''}
          error={unixTime.error}
          helperText={unixTime.error && unixTime.message}
          onChange={event => setUnixTime(prevState => ({ ...prevState, value: event.target.value, error: false }))}
          onBlur={event => isValidUnixTime(event.target.value)}
        />
      </FormWrapperStyled>
      <ButtonWrapperStyled>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </ButtonWrapperStyled>
    </CardStyled>
  );
};

export default UnixCard;
