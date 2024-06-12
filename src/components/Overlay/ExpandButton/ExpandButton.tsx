import { IconButton } from '@mui/material';
import { FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandButtonProps, ExpandButtonStyled } from './ExpandButton.style.ts';

const ExpandButton: FC<ExpandButtonProps> = ({ expand, ...rest }) => {
  return (
    <ExpandButtonStyled expand={expand}>
      <IconButton color="primary" {...rest}>
        <ExpandMoreIcon />
      </IconButton>
    </ExpandButtonStyled>
  );
};

export default ExpandButton;
