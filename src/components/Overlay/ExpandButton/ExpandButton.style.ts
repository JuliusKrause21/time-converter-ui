import { IconButtonProps, styled } from '@mui/material';

export interface ExpandButtonProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandButtonStyled = styled('div', { shouldForwardProp: prop => prop !== 'expand' })<ExpandButtonProps>(
  ({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  })
);
