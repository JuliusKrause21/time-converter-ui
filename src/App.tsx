import {
  createTheme,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ThemeProvider
} from '@mui/material';
import background from './assets/watch_background.jpg';
import { useState } from 'react';
import { TimeConverter } from '@jk21/time-converter';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import GnssCard from './components/GnssCard/GnssCard.tsx';
import { GnssTime } from './utils/convertGnssToUnix.ts';
import { CardContainerStyled, CardStyled } from './components/CardContainer.style.ts';

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

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'Mai',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

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
            <CardContainerStyled>
              <CardStyled>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Week:</TableCell>
                        <TableCell>{conversionResult?.gnssTime?.week}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Time of week:</TableCell>
                        <TableCell>{conversionResult?.gnssTime?.timeOfWeek}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardStyled>
              <CardStyled>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Date:</TableCell>
                        <TableCell>{`${conversionResult?.utc.getUTCDate()}.${
                          (conversionResult?.utc.getUTCMonth() ?? 0) + 1
                        }.${conversionResult?.utc.getUTCFullYear()}`}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Time:</TableCell>
                        <TableCell>{`${conversionResult?.utc.getUTCHours()}:${conversionResult?.utc.getUTCMinutes()}:${conversionResult?.utc.getUTCSeconds()}`}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Month:</TableCell>
                        <TableCell>{conversionResult && months[conversionResult?.utc.getMonth()]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weekday:</TableCell>
                        <TableCell>{conversionResult && weekdays[conversionResult?.utc.getDay()]}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardStyled>
              <CardStyled>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Seconds:</TableCell>
                        <TableCell>{conversionResult?.unixTime}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Leap year:</TableCell>
                        <TableCell>{conversionResult?.leapYear}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Next leap year:</TableCell>
                        <TableCell>{conversionResult?.nextLeapYear}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Leap seconds:</TableCell>
                        <TableCell>{conversionResult?.leapSeconds}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardStyled>
            </CardContainerStyled>
          </OverlayStyled>
        ) : (
          <CardContainerStyled>
            <GnssCard onSubmit={gnssTime => convertGnssTime(gnssTime)} />
          </CardContainerStyled>
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
