import CancelButton from '../CancelButton/CancelButton.tsx';
import { FC } from 'react';
import { ConversionResultHeaderStyled } from './ConversionResultHeader.style.ts';

interface ConversionResultHeaderProps {
  onClose: () => void;
}

const ConversionResultHeader: FC<ConversionResultHeaderProps> = ({ onClose }) => {
  return (
    <ConversionResultHeaderStyled>
      <h2>Time Conversion:</h2>
      <CancelButton onClose={onClose} />
    </ConversionResultHeaderStyled>
  );
};

export default ConversionResultHeader;
