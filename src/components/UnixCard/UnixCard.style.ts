import { styled } from '@mui/material';
import { CardHeaderStyled } from '../CardContainer.style.ts';

export const UnixCardHeaderStyled = styled(CardHeaderStyled)(({ theme }) => ({
  background: `linear-gradient(to right top, ${theme.palette.unix.start}, ${theme.palette.unix.main})`
}));
