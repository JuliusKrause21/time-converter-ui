import { styled } from '@mui/material';

export const OverlayStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  minHeight: '100vh',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  overflowY: 'scroll'
}));
