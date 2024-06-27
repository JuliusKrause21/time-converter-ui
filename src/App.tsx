import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import Overlay from './components/Overlay/Overlay.tsx';
import CardsContent from './components/CardsContent/CardsContent.tsx';
import { TimeFormat } from './models/TimeFormat.ts';
import { breakpointValues } from './theme.ts';
import { PageContainerStyled } from './App.style.ts';
import { LeapSecondsContext } from './store/LeapSecondsContext.ts';

function App() {
  const preferenceDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferenceDarkMode ? 'dark' : 'light',
          primary: {
            main: '#a3a1a1',
            contrastText: '#000000'
          },
          secondary: {
            main: '#ffffff',
            light: '#F5EBFF',
            contrastText: '#000'
          },
          [TimeFormat.Gnss]: {
            main: '#9C009B',
            start: '#47019C',
            contrastText: '#ffffff'
          },
          [TimeFormat.Utc]: {
            main: '#008A9C',
            start: '#08329c',
            contrastText: '#ffffff'
          },
          [TimeFormat.Unix]: {
            main: '#429C00',
            start: '#0b5000',
            contrastText: '#ffffff'
          }
        },

        components: {
          MuiFab: {
            styleOverrides: {
              root: {
                '&:hover': {
                  backgroundColor: 'transparent',
                  opacity: '0.75'
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
                color: preferenceDarkMode ? 'white' : 'black'
              }
            }
          }
        },
        breakpoints: {
          values: breakpointValues
        }
      }),
    [preferenceDarkMode]
  );

  const [conversionResult, setConversionResult] = useState<TimeConversionResult>();
  const [showOverlay, setShowOverlay] = useState(false);
  const [convertedFormat, setConvertedFormat] = useState<TimeFormat | undefined>();
  const [leapSecondsUsed, setLeapSecondsUsed] = useState(true);

  const handleTimeConversionResult = (result: TimeConversionResult, format: TimeFormat): void => {
    setConversionResult(result);
    setConvertedFormat(format);
    setShowOverlay(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <LeapSecondsContext.Provider value={{ leapSecondsUsed, setLeapSecondsUsed }}>
        <PageContainerStyled>
          {showOverlay && conversionResult !== undefined && (
            <Overlay
              conversionResult={conversionResult}
              convertedFormat={convertedFormat}
              onClose={() => setShowOverlay(false)}
            />
          )}
          <CardsContent showOverlay={showOverlay} onTimeConversion={handleTimeConversionResult} />
        </PageContainerStyled>
      </LeapSecondsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
