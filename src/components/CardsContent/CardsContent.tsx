import CardsAnimation from '../CardsAnimation/CardsAnimation.tsx';
import GnssCard from '../GnssCard/GnssCard.tsx';
import UnixCard from '../UnixCard/UnixCard.tsx';
import { useAnimationControls } from 'framer-motion';
import { FC, useState } from 'react';
import { CardContainerStyled } from '../CardContainer.style.ts';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import UtcCard from '../UtcCard/UtcCard.tsx';
import { TimeFormat, timeFormatOrder } from '../../models/TimeFormat.ts';

interface CardsContentProps {
  showOverlay: boolean;
  onTimeConversion: (result: TimeConversionResult, format: TimeFormat) => void;
}

const CardsContent: FC<CardsContentProps> = ({ showOverlay, onTimeConversion }) => {
  const [activeTimeFormat, setActiveTimeFormat] = useState<TimeFormat>(timeFormatOrder[0].active);
  const controls = useAnimationControls();

  const handleCardShiftDown = async (): Promise<void> => {
    const nextTimeFormat = timeFormatOrder.find(timeFormat => timeFormat.active === activeTimeFormat)?.next;
    await startRemoveAnimation();
    setActiveTimeFormat(nextTimeFormat ?? activeTimeFormat);
    await startAppearAnimation();
    return;
  };

  const startRemoveAnimation = async (): Promise<void> => {
    await controls.start({
      scale: [1, 0]
    });
  };

  const startAppearAnimation = async (): Promise<void> => {
    await controls.start({
      scale: [0, 1]
    });
  };

  return (
    <CardContainerStyled style={{ opacity: showOverlay ? '0.33' : 1 }}>
      <CardsAnimation controls={controls}>
        {activeTimeFormat === TimeFormat.Utc && (
          <UtcCard onNext={handleCardShiftDown} onSubmit={result => onTimeConversion(result, TimeFormat.Utc)} />
        )}
        {activeTimeFormat === TimeFormat.Gnss && (
          <GnssCard onNext={handleCardShiftDown} onSubmit={result => onTimeConversion(result, TimeFormat.Gnss)} />
        )}
        {activeTimeFormat === TimeFormat.Unix && (
          <UnixCard onNext={handleCardShiftDown} onSubmit={result => onTimeConversion(result, TimeFormat.Unix)} />
        )}
      </CardsAnimation>
    </CardContainerStyled>
  );
};

export default CardsContent;
