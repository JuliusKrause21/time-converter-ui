import { createTheme, styled, ThemeProvider } from '@mui/material';
import { ReactNode, useState } from 'react';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import Overlay from './components/Overlay/Overlay.tsx';
import CardsContent from './components/CardsContent/CardsContent.tsx';

export const breakpointValues = { xs: 360, sm: 600, md: 900, lg: 1200, xl: 1920 };

declare module '@mui/material/styles' {
  interface Palette {
    gnss: {
      main: string;
      start: string;
      contrastText: string;
    };
    utc: {
      main: string;
      start: string;
      contrastText: string;
    };
    unix: {
      main: string;
      start: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    gnss: {
      main: string;
      start: string;
      contrastText: string;
    };
    utc: {
      main: string;
      start: string;
      contrastText: string;
    };
    unix: {
      main: string;
      start: string;
      contrastText: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gnss: true;
    utc: true;
    unix: true;
  }
}

declare module '@mui/material/Fab' {
  export interface FabPropsColorOverrides {
    gnss: true;
    utc: true;
    unix: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#a3a1a1',
      contrastText: '#000000'
    },
    secondary: {
      main: '#ffffff',
      light: '#F5EBFF',
      contrastText: '#000'
    },
    gnss: {
      main: '#9C009B',
      start: '#47019C',
      contrastText: '#ffffff'
    },
    utc: {
      main: '#008A9C',
      start: '#08329c',
      contrastText: '#ffffff'
    },
    unix: {
      main: '#429C00',
      start: '#0b5000',
      contrastText: '#ffffff'
    }

    // error: {
    //   main: '#FF4B4BFF'
    // }
  },

  components: {
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: 'white',
    //       '&.Mui-focused': {
    //         color: 'white' // Change 'blue' to your desired focus color
    //       }
    //     }
    //   }
    // },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiInputBase-input': {
    //         color: 'white' // Change to your desired text color
    //       },
    //       '& .MuiOutlinedInput-root': {
    //         '& fieldset': {
    //           border: ' 1px solid white',
    //           color: 'white'
    //         },
    //         '&:hover fieldset': {
    //           border: ' 1px solid white'
    //         },
    //         '&.Mui-focused fieldset': {
    //           border: ' 1px solid white'
    //         }
    //       }
    //     }
    //   }
    // },
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

export enum TimeFormat {
  Gnss,
  Utc,
  Unix
}

function App() {
  const [conversionResult, setConversionResult] = useState<TimeConversionResult>();
  const [showOverlay, setShowOverlay] = useState(false);
  const [convertedFormat, setConvertedFormat] = useState<TimeFormat | undefined>();

  const handleTimeConversionResult = (result: TimeConversionResult, format: TimeFormat): void => {
    setConversionResult(result);
    setConvertedFormat(format);
    setShowOverlay(true);
  };

  function renderContent(): ReactNode {
    if (showOverlay && conversionResult !== undefined) {
      return (
        <Overlay
          conversionResult={conversionResult}
          convertedFormat={convertedFormat}
          onClose={() => setShowOverlay(false)}
        />
      );
    } else {
      return <CardsContent onTimeConversion={handleTimeConversionResult} />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>{renderContent()}</PageContainer>
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
