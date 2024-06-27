import CardTitle, { CardTitleProps } from '../CardTitle/CardTitle.tsx';
import { FC } from 'react';
import LeapSecondsCheckBox from '../LeapSecondsCheckBox/LeapSecondsCheckBox.tsx';
import { CardHeaderStyled } from './CardHeader.style.ts';

interface CardHeaderProps extends CardTitleProps {
  description: string;
}

const CardHeader: FC<CardHeaderProps> = ({ description, ...props }) => {
  return (
    <CardHeaderStyled timeFormat={props.timeFormat}>
      <CardTitle {...props} />
      <div>{description}</div>
      <LeapSecondsCheckBox />
    </CardHeaderStyled>
  );
};

export default CardHeader;
