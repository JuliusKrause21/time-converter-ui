import { Box, styled } from '@mui/material';
import Card from '@mui/material/Card';

export const CardContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  columnGap: 45,
  rowGap: 45
});

export const CardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 15,
  width: '50%',
  borderRadius: '8px',
  border: '1px solid white',
  background: 'transparent',
  color: 'white'
});

export const FormWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 25,
  height: '100%',
  justifyContent: 'flex-start'
});

export const ButtonWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  marginTop: 35,
  height: '100%',
  justifyContent: 'flex-end'
});
