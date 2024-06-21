import { FC, ReactElement, useState } from 'react';
import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button, TextField } from '@mui/material';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { TimeConverter } from '@jk21/time-converter';
import { UnixCardHeaderStyled } from './UnixCard.style.ts';
import { TimeFormat } from '../../App.tsx';

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

  const handleClear = () => {
    setUnixTime(initialFieldState<string>(''));
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

  return (
    <CardStyled>
      <UnixCardHeaderStyled>
        <h1>Unix</h1>
      </UnixCardHeaderStyled>
      <CardContentStyled>
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
          <Button variant="contained" onClick={handleSubmit} color={TimeFormat.Unix}>
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClear} color={TimeFormat.Unix}>
            Clear
          </Button>
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default UnixCard;
