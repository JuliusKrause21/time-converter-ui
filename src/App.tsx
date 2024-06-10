import { Button, createTheme, styled, ThemeProvider } from '@mui/material';
import background from './assets/watch_background.jpg';
import { useState } from 'react';
import { TimeConverter } from '@jk21/time-converter';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import GnssCard from './components/GnssCard/GnssCard.tsx';
import { GnssTime } from './utils/convertGnssToUnix.ts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#000000'
    },
    secondary: {
      main: '#ffffff',
      light: '#F5EBFF',
      contrastText: '#000'
    }
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white' // Change 'blue' to your desired focus color
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'white' // Change to your desired text color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: ' 1px solid white',
              color: 'white'
            },
            '&:hover fieldset': {
              border: ' 1px solid white'
            },
            '&.Mui-focused fieldset': {
              border: ' 1px solid white'
            }
          }
        }
      }
    }
  }
});

function App() {
  const [conversionResult, setConversionResult] = useState<TimeConversionResult>();
  const [showOverlay, setShowOverlay] = useState(false);

  const timeConverter = new TimeConverter();

  const convertGnssTime = (gnssTime: GnssTime) => {
    const result = timeConverter.convertGnssTime(gnssTime);
    setConversionResult(result);
    setShowOverlay(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        {showOverlay ? (
          <OverlayStyled>
            <ul>
              <li>Week: {conversionResult?.gnssTime?.week}</li>
              <li>Time of week: {conversionResult?.gnssTime?.timeOfWeek}</li>
              <li>Year: {conversionResult?.utc.getFullYear()}</li>
              <li>Month: {conversionResult?.utc.getMonth()}</li>
              <li>Day: {conversionResult?.utc.getDate()}</li>
              <li>Unix: {conversionResult?.unixTime}</li>
            </ul>

            <Button variant="contained" onClick={() => setShowOverlay(false)}>
              Go back
            </Button>
          </OverlayStyled>
        ) : (
          <GnssCard onSubmit={gnssTime => convertGnssTime(gnssTime)} />
        )}
      </PageContainer>
    </ThemeProvider>
  );
}

const OverlayStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)'
}));

const PageContainer = styled('div')(() => ({
  margin: 0,
  padding: 0,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: 'white'
}));

export default App;
