import { CardHeading, CardTitleStyled } from './CardTitle.style.ts';
import { Fab } from '@mui/material';
import { TimeFormat } from '../../App.tsx';
import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import { FC } from 'react';

interface CardTitleProps {
  title: string;
  timeFormat: TimeFormat;
  onClick: () => void;
}

const CardTitle: FC<CardTitleProps> = ({ title, timeFormat, onClick }) => {
  return (
    <CardTitleStyled>
      <CardHeading>{title}</CardHeading>
      <Fab size="large" onClick={onClick} color={timeFormat}>
        <KeyboardArrowRightOutlined />
      </Fab>
    </CardTitleStyled>
  );
};

export default CardTitle;
