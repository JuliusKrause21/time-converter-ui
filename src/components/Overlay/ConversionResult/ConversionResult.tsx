import { Typography } from '@mui/material';
import ExpandButton from '../ExpandButton/ExpandButton.tsx';
import CollapseContent from '../CollapseContent/CollapseContent.tsx';
import { FC, useState } from 'react';
import { GnssTime } from '../../../models/GnssTime.ts';
import { DateTime } from '../../../models/DateTime.ts';
import { AdditionalInfo } from '../../../models/AdditionalInfo.ts';
import { CardActionsStyled, ResultCardStyled } from '../Overlay.style.ts';
import { CustomColor } from '../../../App.tsx';

export enum ConversionResultTitle {
  Gnss = 'Gnss Time',
  Utc = 'Utc',
  Additional = 'Additional Info'
}

interface ConversionResultProps {
  title: ConversionResultTitle;
  open: boolean;
  headerColor: CustomColor;
  content: GnssTime | DateTime | AdditionalInfo | undefined;
}

const ConversionResult: FC<ConversionResultProps> = ({ title, open, headerColor, content }) => {
  const [expanded, setExpanded] = useState(open);

  return (
    <ResultCardStyled>
      <CardActionsStyled disableSpacing headerColor={headerColor}>
        <Typography variant="h6">{title}</Typography>
        <ExpandButton
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
          color="secondary"
        />
      </CardActionsStyled>
      <CollapseContent expand={expanded} content={content} />
    </ResultCardStyled>
  );
};

export default ConversionResult;
