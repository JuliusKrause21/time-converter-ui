import CancelButton from '../CancelButton/CancelButton.tsx';
import { FC } from 'react';
import { ConversionResultHeaderStyled } from './ConversionResultHeader.style.ts';

interface ConversionResultHeaderProps {
  onClose: () => void;
}

const ConversionResultHeader: FC<ConversionResultHeaderProps> = ({ onClose }) => {
  return (
    <ConversionResultHeaderStyled>
      <CancelButton onClose={onClose} />
    </ConversionResultHeaderStyled>
  );
};

export default ConversionResultHeader;
