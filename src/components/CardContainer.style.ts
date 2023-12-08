import { Box, styled } from '@mui/material';
import Card from '@mui/material/Card';

export const CardContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 45,
  rowGap: 45
});

export const CardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 15,
  minWidth: 350,
  height: 300
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
