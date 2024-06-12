import { createTheme, styled, ThemeProvider } from '@mui/material';
import background from './assets/watch_background.jpg';
import { useState } from 'react';
import { TimeConverter } from '@jk21/time-converter';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import GnssCard from './components/GnssCard/GnssCard.tsx';
import { CardContainerStyled } from './components/CardContainer.style.ts';
import Overlay from './components/Overlay/Overlay.tsx';
import { GnssTime } from './models/GnssTime.ts';

export const breakpointValues = { xs: 360, sm: 600, md: 900, lg: 1200, xl: 1920 };

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
    },
    error: {
      main: '#FF4B4BFF'
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
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: '0'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  },
  breakpoints: {
    values: breakpointValues
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
        {showOverlay && conversionResult ? (
          <Overlay conversionResult={conversionResult} />
        ) : (
          <CardContainerStyled>
            <GnssCard onSubmit={gnssTime => convertGnssTime(gnssTime)} />
          </CardContainerStyled>
        )}
      </PageContainer>
    </ThemeProvider>
  );
}

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
