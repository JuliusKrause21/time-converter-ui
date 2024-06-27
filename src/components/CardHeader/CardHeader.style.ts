import { styled } from '@mui/material';
import { TimeFormat } from '../../models/TimeFormat.ts';

interface CardHeaderStyledProps {
  timeFormat: TimeFormat;
}

export const CardHeaderStyled = styled('div', {
  shouldForwardProp: prop => prop !== 'timeFormat'
})<CardHeaderStyledProps>(({ timeFormat, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '15px',
  background: `linear-gradient(to right top, ${theme.palette[timeFormat].start}, ${theme.palette[timeFormat].main})`
}));
