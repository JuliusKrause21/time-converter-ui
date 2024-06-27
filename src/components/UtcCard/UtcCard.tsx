import { ButtonWrapperStyled, CardContentStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { TimeConverter } from '@jk21/time-converter';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import { FC, useContext, useState } from 'react';
import { FieldState, initialFieldState } from '../../models/FieldState.ts';
import CardHeader from '../CardHeader/CardHeader.tsx';
import ClearButton from '../ClearButton/ClearButton.tsx';
import ConvertButton from '../ConvertButton/ConvertButton.tsx';
import { useTheme } from '@mui/material';
import { TimeFormat } from '../../models/TimeFormat.ts';
import { LeapSecondsContext } from '../../store/LeapSecondsContext.ts';

interface UtcCardProps {
  onNext: () => void;
  onSubmit: (result: TimeConversionResult) => void;
}

dayjs.extend(utc);

const UtcCard: FC<UtcCardProps> = ({ onNext, onSubmit }) => {
  const currentDate = new Date();

  const [date, setDate] = useState<FieldState<Dayjs>>(initialFieldState<Dayjs>(dayjs.utc(currentDate)));
  const { leapSecondsUsed } = useContext(LeapSecondsContext);
  const theme = useTheme();

  const timeConverter = new TimeConverter(leapSecondsUsed);

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

  const description =
    'The Coordinated Universal Time (UTC) is the primary time standard globally used to regulate clocks and time. It establishes a reference for the current time, forming the basis for civil time and time zones';

  return (
    <CardStyled>
      <CardHeader title="Utc" description={description} timeFormat={TimeFormat.Utc} onClick={onNext} />
      <CardContentStyled>
        <FormWrapperStyled>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'de'}>
            <MobileDatePicker
              label="Date"
              value={date.value}
              timezone={'UTC'}
              format="DD.MM.YYYY"
              onChange={value => handleDateChange(value)}
              slotProps={{
                dialog: {
                  sx: {
                    '& .MuiDialog-paper': {
                      backgroundColor: theme.palette.utc.main,
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
              format={'HH:mm:ss'}
              ampm={false}
              value={date.value}
              onChange={value => handleDateChange(value)}
              slotProps={{
                dialog: {
                  sx: {
                    '& .MuiDialog-paper': {
                      backgroundColor: theme.palette.utc.main,
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
          <ClearButton text="Reset" timeFormat={TimeFormat.Utc} onClick={handleClear} />
        </ButtonWrapperStyled>
      </CardContentStyled>
    </CardStyled>
  );
};

export default UtcCard;
