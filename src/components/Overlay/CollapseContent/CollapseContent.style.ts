import { styled, TableCell } from '@mui/material';

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main
}));
