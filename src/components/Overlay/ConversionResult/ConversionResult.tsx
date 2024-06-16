import { CardActionsStyled, CardStyled } from '../../CardContainer.style.ts';
import { Typography } from '@mui/material';
import ExpandButton from '../ExpandButton/ExpandButton.tsx';
import CollapseContent from '../CollapseContent/CollapseContent.tsx';
import { FC, useState } from 'react';
import { GnssTime } from '../../../models/GnssTime.ts';
import { DateTime } from '../../../models/DateTime.ts';
import { AdditionalInfo } from '../../../models/AdditionalInfo.ts';

export enum ConversionResultTitle {
  Gnss = 'Gnss Time',
  Utc = 'Utc',
  Additional = 'Additional Info'
}

interface ConversionResultProps {
  title: ConversionResultTitle;
  open: boolean;
  content: GnssTime | DateTime | AdditionalInfo | undefined;
}

const ConversionResult: FC<ConversionResultProps> = ({ title, open, content }) => {
  const [expanded, setExpanded] = useState(open);

  return (
    <CardStyled>
      <CardActionsStyled disableSpacing>
        <Typography variant="h6">{title}</Typography>
        <ExpandButton
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </CardActionsStyled>
      <CollapseContent expand={expanded} content={content} />
    </CardStyled>
  );
};

export default ConversionResult;
