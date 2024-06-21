import { CardActions, styled } from '@mui/material';
import Card from '@mui/material/Card';

export const OverlayStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100vw',
  minHeight: '100vh',
  overflowY: 'scroll'
}));

export const ResultCardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100%',
  borderRadius: '15px'
});

export const CardActionsStyled = styled(CardActions)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'red',
  color: 'white',
  padding: 15
});
