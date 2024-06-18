import CardsAnimation from '../CardsAnimation/CardsAnimation.tsx';
import GnssCard from '../GnssCard/GnssCard.tsx';
import UnixCard from '../UnixCard/UnixCard.tsx';
import { TimeFormat } from '../../App.tsx';
import { IconButton } from '@mui/material';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import { useAnimationControls } from 'framer-motion';
import { FC, useState } from 'react';
import { CardContainerStyled } from '../CardContainer.style.ts';
import { TimeConversionResult } from '@jk21/time-converter/dist/TimeConverter';
import UtcCard from '../UtcCard/UtcCard.tsx';

interface CardsContentProps {
  onTimeConversion: (result: TimeConversionResult, format: TimeFormat) => void;
}

const CardsContent: FC<CardsContentProps> = ({ onTimeConversion }) => {
  const [activeTimeFormat, setActiveTimeFormat] = useState<TimeFormat>(TimeFormat.Gnss);
  const controls = useAnimationControls();

  const handleCardShiftUp = async (): Promise<void> => {
    switch (activeTimeFormat) {
      case TimeFormat.Gnss:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Unix);
        await startAppearAnimation();
        break;
      case TimeFormat.Utc:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Gnss);
        await startAppearAnimation();
        break;
      case TimeFormat.Unix:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Utc);
        await startAppearAnimation();
        break;
    }
    return;
  };

  const handleCardShiftDown = async (): Promise<void> => {
    switch (activeTimeFormat) {
      case TimeFormat.Gnss:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Utc);
        await startAppearAnimation();
        break;
      case TimeFormat.Utc:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Unix);
        await startAppearAnimation();
        break;
      case TimeFormat.Unix:
        await startRemoveAnimation();
        setActiveTimeFormat(TimeFormat.Gnss);
        await startAppearAnimation();
        break;
    }
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
    <CardContainerStyled>
      {activeTimeFormat !== TimeFormat.Gnss && (
        <IconButton size="large" onClick={handleCardShiftUp}>
          <KeyboardArrowUpOutlined color="primary" />
        </IconButton>
      )}
      <CardsAnimation controls={controls}>
        {activeTimeFormat === TimeFormat.Gnss && (
          <GnssCard onSubmit={result => onTimeConversion(result, TimeFormat.Gnss)} />
        )}
        {activeTimeFormat === TimeFormat.Utc && (
          <UtcCard onSubmit={result => onTimeConversion(result, TimeFormat.Utc)} />
        )}
        {activeTimeFormat === TimeFormat.Unix && (
          <UnixCard onSubmit={result => onTimeConversion(result, TimeFormat.Unix)} />
        )}
      </CardsAnimation>
      {activeTimeFormat !== TimeFormat.Unix && (
        <IconButton size="large" onClick={handleCardShiftDown}>
          <KeyboardArrowDownOutlined color="primary" />
        </IconButton>
      )}
    </CardContainerStyled>
  );
};

export default CardsContent;
