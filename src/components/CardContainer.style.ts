import { Box, styled } from '@mui/material';
import Card from '@mui/material/Card';

export const CardContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '750px',
  minWidth: '250px',
  margin: '0 25px',
  rowGap: '20px',
  marginTop: '40px',
  zIndex: 1
});

export const CardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100%',
  borderRadius: '15px',
  height: '500px',
  color: 'white'
});

export const CardHeaderStyled = styled('div')({
  height: '100%',
  padding: '15px'
});

export const CardContentStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  justifyContent: 'flex-end',
  marginTop: '20px',
  padding: '15px'
});

export const FormWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 25,
  justifyContent: 'flex-end'
});

export const ButtonWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  justifyContent: 'flex-end',
  marginTop: '20px'
});
