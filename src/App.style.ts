import { styled } from '@mui/material';
import { breakpointValues } from './theme.ts';

export const PageContainerStyled = styled('div')(({ theme }) => ({
  margin: 0,
  padding: 0,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  minWidth: '100vw',
  [theme.breakpoints.up(breakpointValues.sm)]: {
    alignItems: 'center'
  }
}));
