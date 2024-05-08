import { FC, ReactElement } from 'react';
import { ButtonWrapperStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button, TextField } from '@mui/material';
import { FieldState } from '../../models/FieldState.ts';

interface UnixCardProps {
  unixTime: FieldState<string>;
  setUnixTime: (value: ((prevState: FieldState<string>) => FieldState<string>) | FieldState<string>) => void;
  onSubmit: (value: number) => void;
  onClear: () => void;
}

enum UnixValidationError {
  Required = 'Value is required',
  NotNegative = 'Unix time must not be less than 0'
}

const UnixCard: FC<UnixCardProps> = ({ unixTime, setUnixTime, onSubmit, onClear }): ReactElement => {
  const handleSubmit = () => {
    if (!isValidUnixTime(unixTime.value)) {
      return;
    }
    onSubmit(+unixTime.value);
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
      <h2>UNIX</h2>
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
        <Button variant="outlined" onClick={onClear}>
          Clear
        </Button>
      </ButtonWrapperStyled>
    </CardStyled>
  );
};

export default UnixCard;
