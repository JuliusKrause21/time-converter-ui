import { createTheme, styled, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import Overlay from './components/Overlay/Overlay.tsx';
import CardsContent from './components/CardsContent/CardsContent.tsx';

export enum TimeFormat {
  Gnss = 'gnss',
  Utc = 'utc',
  Unix = 'unix'
}

export const breakpointValues = { xs: 360, sm: 600, md: 900, lg: 1200, xl: 1920 };

export interface CustomColor {
  main: string;
  start: string;
  contrastText: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    [TimeFormat.Gnss]: CustomColor;
    [TimeFormat.Utc]: CustomColor;
    [TimeFormat.Unix]: CustomColor;
  }
  interface PaletteOptions {
    [TimeFormat.Gnss]: CustomColor;
    [TimeFormat.Utc]: CustomColor;
    [TimeFormat.Unix]: CustomColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    [TimeFormat.Gnss]: true;
    [TimeFormat.Utc]: true;
    [TimeFormat.Unix]: true;
  }
}

declare module '@mui/material/Fab' {
  export interface FabPropsColorOverrides {
    [TimeFormat.Gnss]: true;
    [TimeFormat.Utc]: true;
    [TimeFormat.Unix]: true;
  }
}

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

  const handleTimeConversionResult = (result: TimeConversionResult, format: TimeFormat): void => {
    setConversionResult(result);
    setConvertedFormat(format);
    setShowOverlay(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        {showOverlay && conversionResult !== undefined && (
          <Overlay
            conversionResult={conversionResult}
            convertedFormat={convertedFormat}
            onClose={() => setShowOverlay(false)}
          />
        )}
        <CardsContent showOverlay={showOverlay} onTimeConversion={handleTimeConversionResult} />
      </PageContainer>
    </ThemeProvider>
  );
}

const PageContainer = styled('div')(() => ({
  margin: 0,
  padding: 0,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  minWidth: '100vw'
  // color: 'white'
}));

export default App;
