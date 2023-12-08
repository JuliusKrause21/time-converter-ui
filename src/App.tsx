import GnssCard from './components/GnssCard/GnssCard.tsx';
import { CardContainerStyled } from './components/CardContainer.style.ts';
import UnixCard from './components/UnixCard/UnixCard.tsx';
import { convertGnssToUnix, GnssTime } from './utils/convertGnssToUnix.ts';
import { useState } from 'react';

function App() {
  const [unixTime, setUnixTime] = useState<number>();

  const handleFormClear = () => {
    setUnixTime(undefined);
  };

  const handleConvertGnssTime = (gnssTime: GnssTime) => {
    console.log('Week:', gnssTime.week);
    console.log('Time of week:', gnssTime.timeOfWeek);
    try {
      const unix = convertGnssToUnix(gnssTime);
      setUnixTime(unix);
      console.log('Unix:', unix);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainerStyled>
      <GnssCard onSubmit={handleConvertGnssTime} onClear={handleFormClear} />
      <UnixCard unixTime={unixTime} />
    </CardContainerStyled>
  );
}

export default App;
