import { Box, CardActions, styled } from '@mui/material';
import Card from '@mui/material/Card';

export const CardContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '0 25px',
  rowGap: '20px'
});

export const CardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 15,
  width: '100%',
  maxWidth: '750px',
  minWidth: '250px',
  borderRadius: '8px',
  border: '1px solid white',
  background: 'transparent',
  color: 'white'
});

export const CardActionsStyled = styled(CardActions)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
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
