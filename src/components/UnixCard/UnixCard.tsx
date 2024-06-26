import { FC, ReactElement, useContext, useState } from 'react';
import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { TextField } from '@mui/material';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { TimeConverter } from '@jk21/time-converter';
import CardHeader from '../CardHeader/CardHeader.tsx';
import ClearButton from '../ClearButton/ClearButton.tsx';
import ConvertButton from '../ConvertButton/ConvertButton.tsx';
import { TimeFormat } from '../../models/TimeFormat.ts';
import { LeapSecondsContext } from '../../store/LeapSecondsContext.ts';

interface UnixCardProps {
  onNext: () => void;
  onSubmit: (result: TimeConversionResult) => void;
}

enum UnixValidationError {
  Required = 'Value is required',
  NotNegative = 'Unix time must not be less than 0'
}

const UnixCard: FC<UnixCardProps> = ({ onNext, onSubmit }): ReactElement => {
  const [unixTime, setUnixTime] = useState<FieldState<string>>(initialFieldState<string>(''));
  const { leapSecondsUsed } = useContext(LeapSecondsContext);

  const timeConverter = new TimeConverter(leapSecondsUsed);

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

  const description =
    'The Unix time is represented by the number of non-leap seconds that have elapsed since 00:00:00 UTC on January 1st 1970, the Unix epoch. The Unix time of the GNSS initial epoch is therefore 315964800.';

  return (
    <CardStyled>
      <CardHeader title="Unix" description={description} timeFormat={TimeFormat.Unix} onClick={onNext} />
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
          <ConvertButton timeFormat={TimeFormat.Unix} onClick={handleSubmit} />
          <ClearButton timeFormat={TimeFormat.Unix} onClick={handleClear} />
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default UnixCard;
