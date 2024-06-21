import { styled } from '@mui/material';
import { CardHeaderStyled } from '../CardContainer.style.ts';

export const UtcCardHeaderStyled = styled(CardHeaderStyled)(({ theme }) => ({
  background: `linear-gradient(to right top, ${theme.palette.utc.start}, ${theme.palette.utc.main})`
}));
