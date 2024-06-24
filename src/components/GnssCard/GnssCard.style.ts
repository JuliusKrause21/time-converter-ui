import { styled } from '@mui/material';
import { CardHeaderStyled } from '../CardContainer.style.ts';

export const GnssCardHeaderStyled = styled(CardHeaderStyled)(({ theme }) => ({
  background: `linear-gradient(to right top, ${theme.palette.gnss.start}, ${theme.palette.gnss.main})`
}));
