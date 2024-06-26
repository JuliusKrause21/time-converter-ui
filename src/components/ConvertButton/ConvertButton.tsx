import { Button } from '@mui/material';
import { FC } from 'react';
import { TimeFormat } from '../../models/TimeFormat.ts';

interface ConvertButtonProps {
  timeFormat: TimeFormat;
  onClick: () => void;
}

const ConvertButton: FC<ConvertButtonProps> = ({ timeFormat, onClick }) => {
  return (
    <Button onClick={onClick} variant="contained" color={timeFormat}>
      Convert
    </Button>
  );
};

export default ConvertButton;
