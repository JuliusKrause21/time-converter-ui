import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { TimeConverter } from '@jk21/time-converter';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { FC, useState } from 'react';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import { UtcCardHeaderStyled } from './UtcCard.style.ts';
import { TimeFormat } from '../../App.tsx';
import CardTitle from '../CardTitle/CardTitle.tsx';
import CardDescription from '../CardDescritpion/CardDescription.tsx';
import ClearButton from '../ClearButton/ClearButton.tsx';
import ConvertButton from '../ConvertButton/ConvertButton.tsx';

interface UtcCardProps {
  onNext: () => void;
  onSubmit: (result: TimeConversionResult) => void;
}

dayjs.extend(utc);

const UtcCard: FC<UtcCardProps> = ({ onNext, onSubmit }) => {
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
        <CardTitle title="Utc" timeFormat={TimeFormat.Utc} onClick={onNext} />
        <CardDescription>
          The Coordinated Universal Time (UTC) is the primary time standard globally used to regulate clocks and time.
          It establishes a reference for the current time, forming the basis for civil time and time zones
        </CardDescription>
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
          <ConvertButton timeFormat={TimeFormat.Utc} onClick={handleSubmit} />
          <ClearButton timeFormat={TimeFormat.Utc} onClick={handleClear} />
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default UtcCard;
