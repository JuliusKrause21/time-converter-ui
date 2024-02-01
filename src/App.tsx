import GnssCard from './components/GnssCard/GnssCard.tsx';
import { CardContainerStyled } from './components/CardContainer.style.ts';
import UnixCard from './components/UnixCard/UnixCard.tsx';
import { convertGnssToUnix, GnssTime } from './utils/convertGnssToUnix.ts';
import { useState } from 'react';
import { FieldState, initialFieldState } from './models/FieldState.ts';

function App() {
  const [week, setWeek] = useState<FieldState<string>>(initialFieldState);
  const [timeOfWeek, setTimeOfWeek] = useState<FieldState<string>>(initialFieldState);
  const [unixTime, setUnixTime] = useState<FieldState<string>>(initialFieldState);

  const handleFormClear = () => {
    setUnixTime(initialFieldState);
    setWeek(initialFieldState);
    setTimeOfWeek(initialFieldState);
  };

  const handleConvertGnssTime = (gnssTime: GnssTime): void => {
    console.log('Week:', gnssTime.week);
    console.log('Time of week:', gnssTime.timeOfWeek);
    try {
      const unix = convertGnssToUnix(gnssTime);
      setUnixTime({ value: `${unix}`, error: false });
      console.log('Unix:', unix);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConvertUnixTime = (unixTime: number): void => {
    console.log('Unix time:', unixTime);
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
    </CardContainerStyled>
  );
}

export default App;
