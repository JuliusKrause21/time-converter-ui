import { CardDescriptionStyled } from './CardDescription.style.ts';
import { FC } from 'react';

interface CardDescriptionProps {
  children: string;
}

const CardDescription: FC<CardDescriptionProps> = ({ children }) => {
  return <CardDescriptionStyled>{children}</CardDescriptionStyled>;
};

export default CardDescription;
