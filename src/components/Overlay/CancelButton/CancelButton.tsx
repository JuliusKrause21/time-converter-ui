import { FC } from 'react';
import { CancelButtonStyled } from './CancelButton.style.ts';

interface CancelButtonProps {
  onClose: () => void;
}

const CancelButton: FC<CancelButtonProps> = ({ onClose }) => {
  return (
    <CancelButtonStyled onClick={onClose}>
      <svg viewBox="0 0 100 100" width="50px" height="50px" stroke="white" strokeWidth="8" strokeLinecap="round">
        <line x1="20" x2="80" y1="20" y2="80" />
        <line x1="20" x2="80" y1="80" y2="20" />
      </svg>
    </CancelButtonStyled>
  );
};

export default CancelButton;
