import { ButtonWrapperStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button } from '@mui/material';
import { TimeConverter } from '@jk21/time-converter';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { FC, useState } from 'react';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';

interface UtcCardProps {
  onSubmit: (result: TimeConversionResult) => void;
}

const UtcCard: FC<UtcCardProps> = ({ onSubmit }) => {
  const now = new Date();
  const currentDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const [date, setDate] = useState<FieldState<Dayjs>>(initialFieldState<Dayjs>(dayjs(currentDate)));

  const timeConverter = new TimeConverter();

  const handleSubmit = () => {
    const result = timeConverter.convertUtc(date.value.toDate());
    console.log(result);
    onSubmit(result);
    return;
  };

  const handleClear = () => {
    setDate(initialFieldState<Dayjs>(dayjs(currentDate)));
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value === null) {
      return;
    }
    setDate(prevState => ({ ...prevState, value, error: false }));
  };

  return (
    <CardStyled>
      <h1>Utc</h1>
      <FormWrapperStyled>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker label="Date" value={date.value} onChange={value => handleDateChange(value)} />
          <MobileTimePicker
            label="Time"
            views={['hours', 'minutes', 'seconds']}
            format={'hh:mm:ss'}
            value={date.value}
            onChange={value => handleDateChange(value)}
          />
        </LocalizationProvider>
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

export default UtcCard;
