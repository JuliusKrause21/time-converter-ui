import { Button } from '@mui/material';
import { FC } from 'react';
import { TimeFormat } from '../../models/TimeFormat.ts';

interface ClearButtonProps {
  text?: string;
  timeFormat: TimeFormat;
  onClick: () => void;
}
const ClearButton: FC<ClearButtonProps> = ({ text = 'Clear', timeFormat, onClick }) => {
  return (
    <Button onClick={onClick} variant="text" color={timeFormat}>
      {text}
    </Button>
  );
};

export default ClearButton;
