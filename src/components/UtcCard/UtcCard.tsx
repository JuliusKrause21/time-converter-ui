import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button } from '@mui/material';
import { TimeConverter } from '@jk21/time-converter';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { FC, useState } from 'react';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { UtcCardHeaderStyled } from './UtcCard.style.ts';

interface UtcCardProps {
  onSubmit: (result: TimeConversionResult) => void;
}

dayjs.extend(utc);

const UtcCard: FC<UtcCardProps> = ({ onSubmit }) => {
  const currentDate = new Date();

  const [date, setDate] = useState<FieldState<Dayjs>>(initialFieldState<Dayjs>(dayjs.utc(currentDate)));

  const timeConverter = new TimeConverter();

  const handleSubmit = () => {
    const utc = date.value.toDate();
    utc.setMilliseconds(0);
    const result = timeConverter.convertUtc(utc);
    onSubmit(result);
    return;
  };

  const handleClear = () => {
    setDate(initialFieldState<Dayjs>(dayjs.utc(currentDate)));
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value === null) {
      return;
    }
    setDate(prevState => ({ ...prevState, value, error: false }));
  };

  return (
    <CardStyled>
      <UtcCardHeaderStyled>
        <h1>Utc</h1>
      </UtcCardHeaderStyled>
      <CardContentStyled>
        <FormWrapperStyled>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Date"
              value={date.value}
              timezone={'UTC'}
              onChange={value => handleDateChange(value)}
              slotProps={{
                dialog: {
                  sx: {
                    '& .MuiDialog-paper': {
                      backgroundColor: '#98865e',
                      borderRadius: '10px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)'
                    }
                  }
                }
              }}
            />
            <MobileTimePicker
              label="Time"
              views={['hours', 'minutes', 'seconds']}
              format={'hh:mm:ss'}
              value={date.value}
              onChange={value => handleDateChange(value)}
              slotProps={{
                dialog: {
                  sx: {
                    '& .MuiDialog-paper': {
                      backgroundColor: '#98865e',
                      borderRadius: '10px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)'
                    }
                  }
                }
              }}
            />
          </LocalizationProvider>
        </FormWrapperStyled>
        <ButtonWrapperStyled>
          <Button variant="contained" onClick={handleSubmit} color="utc">
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClear} color="utc">
            Clear
          </Button>
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default UtcCard;
