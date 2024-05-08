import GnssCard from './components/GnssCard/GnssCard.tsx';
import {
  ButtonWrapperStyled,
  CardContainerStyled,
  CardStyled,
  FormWrapperStyled
} from './components/CardContainer.style.ts';
import UnixCard from './components/UnixCard/UnixCard.tsx';
import { GnssTime } from './utils/convertGnssToUnix.ts';
import { useState } from 'react';
import { FieldState, initialFieldState } from './models/FieldState.ts';
import { Button, TextField } from '@mui/material';
import { TimeConverter } from '@jk21/time-converter';

function App() {
  const [week, setWeek] = useState<FieldState<string>>(initialFieldState);
  const [timeOfWeek, setTimeOfWeek] = useState<FieldState<string>>(initialFieldState);
  const [unixTime, setUnixTime] = useState<FieldState<string>>(initialFieldState);
  const [utc, setUtc] = useState<Date | undefined>(new Date(Date.now()));

  const timeConverter = new TimeConverter();

  const handleFormClear = () => {
    setUnixTime(initialFieldState);
    setWeek(initialFieldState);
    setTimeOfWeek(initialFieldState);
    setUtc(undefined);
  };

  const handleConvertGnssTime = (gnssTime: GnssTime): void => {
    console.log('Week:', gnssTime.week);
    console.log('Time of week:', gnssTime.timeOfWeek);
    try {
      const unix = timeConverter.convertGnssTime(gnssTime).unixTime;
      setUnixTime({ value: `${unix}`, error: false });
      console.log('Unix:', unix);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConvertUnixTime = (unixTime: number): void => {
    console.log('Unix time:', unixTime);
    const gnssTime = timeConverter.convertUnixTime(unixTime).gnssTime;
    setWeek({ value: `${gnssTime?.week ?? ''}`, error: false });
    setTimeOfWeek({ value: `${gnssTime?.timeOfWeek ?? ''}`, error: false });
  };

  return (
    <CardContainerStyled>
      <GnssCard
        week={week}
        timeOfWeek={timeOfWeek}
        setWeek={setWeek}
        setTimeOfWeek={setTimeOfWeek}
        onSubmit={handleConvertGnssTime}
        onClear={handleFormClear}
      />
      <UnixCard
        unixTime={unixTime}
        setUnixTime={setUnixTime}
        onSubmit={handleConvertUnixTime}
        onClear={handleFormClear}
      />
      <CardStyled>
        <FormWrapperStyled>
          <h2>UTC</h2>
          <TextField type="number" label="Year" value={utc?.getFullYear() ?? ''} />
          <TextField type="number" label="Month" value={utc?.getMonth() ?? ''} />
          <TextField type="number" label="Hours" value={utc?.getUTCHours() ?? ''} />
          <TextField type="number" label="Minutes" value={utc?.getUTCMinutes() ?? ''} />
          <TextField type="number" label="Seconds" value={utc?.getUTCSeconds() ?? ''} />
          <ButtonWrapperStyled>
            <Button variant="contained" onClick={() => {}}>
              Submit
            </Button>
            <Button variant="outlined" onClick={() => handleFormClear()}>
              Clear
            </Button>
          </ButtonWrapperStyled>
        </FormWrapperStyled>
      </CardStyled>
    </CardContainerStyled>
  );
}

export default App;
