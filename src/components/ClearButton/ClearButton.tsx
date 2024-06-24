import { TimeFormat } from '../../App.tsx';
import { Button } from '@mui/material';
import { FC } from 'react';

interface ClearButtonProps {
  timeFormat: TimeFormat;
  onClick: () => void;
}
const ClearButton: FC<ClearButtonProps> = ({ timeFormat, onClick }) => {
  return (
    <Button onClick={onClick} variant="text" color={timeFormat}>
      Clear
    </Button>
  );
};

export default ClearButton;
