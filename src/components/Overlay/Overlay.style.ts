import { CardActions, CardActionsProps, styled } from '@mui/material';
import Card from '@mui/material/Card';
import { CustomColor } from '../../App.tsx';

export const OverlayStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100vw',
  minHeight: '100vh',
  overflowY: 'scroll',
  position: 'absolute',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  zIndex: 2
}));

export const ResultCardStyled = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100%',
  borderRadius: '15px'
});

interface CardActionStyledProps extends CardActionsProps {
  headerColor?: CustomColor;
}

export const CardActionsStyled = styled(CardActions, {
  shouldForwardProp: prop => prop !== 'timeFormat'
})<CardActionStyledProps>(({ theme, headerColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background:
    headerColor !== undefined
      ? `linear-gradient(to right bottom, ${headerColor.start}, ${headerColor.main})`
      : theme.palette.primary.main,
  color: 'white',
  padding: 15
}));
