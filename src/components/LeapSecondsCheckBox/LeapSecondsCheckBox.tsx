import { Checkbox, FormControlLabel } from '@mui/material';
import { useContext } from 'react';
import { LeapSecondsContext } from '../../store/LeapSecondsContext.ts';

const LeapSecondsCheckBox = () => {
  const { leapSecondsUsed, setLeapSecondsUsed } = useContext(LeapSecondsContext);

  return (
    <FormControlLabel
      control={
        <Checkbox checked={leapSecondsUsed} onChange={() => setLeapSecondsUsed(!leapSecondsUsed)} color="secondary" />
      }
      label="Convert with leap seconds"
    />
  );
};

export default LeapSecondsCheckBox;
