import { FC, ReactElement } from 'react';
import { ButtonWrapperStyled, CardStyled, FormWrapperStyled } from '../CardContainer.style.ts';
import { Button, TextField } from '@mui/material';

interface UnixCardProps {
  unixTime: number | undefined;
}

const UnixCard: FC<UnixCardProps> = ({ unixTime }): ReactElement => {
  return (
    <CardStyled>
      <FormWrapperStyled>
        <TextField type="number" label="Unix time stamp" variant="outlined" required value={unixTime ?? ''} />
      </FormWrapperStyled>
      <ButtonWrapperStyled>
        <Button variant="contained">Submit</Button>
        <Button variant="outlined">Clear</Button>
      </ButtonWrapperStyled>
    </CardStyled>
  );
};

export default UnixCard;
