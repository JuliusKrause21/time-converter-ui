import { CardContent, Collapse, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { FC, ReactNode } from 'react';

import { GnssTime, isGnssTime } from '../../../models/GnssTime.ts';
import { DateTime, isDateTime } from '../../../models/DateTime.ts';
import { AdditionalInfo, isAdditionalInfo } from '../../../models/AdditionalInfo.ts';
import { TableCellStyled } from './CollapseContent.style.ts';

interface CollapseContentProps {
  expand: boolean;
  content: GnssTime | DateTime | AdditionalInfo | undefined;
}

const gnssTableRows: Record<keyof GnssTime, string> = { week: 'Week', timeOfWeek: 'Time of week' };
const dateTimeTableRows: Record<keyof DateTime, string> = {
  date: 'Date',
  time: 'Time',
  month: 'Month',
  weekday: 'Day of week'
};
const additionalInfoRows: Record<keyof AdditionalInfo, string> = {
  unix: 'Unix Time',
  leapSeconds: 'Leap Seconds',
  isLeapYear: 'Leap year',
  nextLeapYear: 'Next Leap year'
};

const CollapseContent: FC<CollapseContentProps> = ({ expand, content }) => {
  function renderTableRows(): ReactNode {
    if (isGnssTime(content)) {
      return Object.keys(gnssTableRows).map(key => (
        <TableRow key={key}>
          <TableCellStyled>{gnssTableRows[key as keyof GnssTime]}</TableCellStyled>
          <TableCellStyled>{content[key as keyof GnssTime]}</TableCellStyled>
        </TableRow>
      ));
    }
    if (isDateTime(content)) {
      return Object.keys(dateTimeTableRows).map(key => (
        <TableRow key={key}>
          <TableCellStyled>{dateTimeTableRows[key as keyof DateTime]}</TableCellStyled>
          <TableCellStyled>{content[key as keyof DateTime]}</TableCellStyled>
        </TableRow>
      ));
    }
    if (isAdditionalInfo(content)) {
      return Object.keys(additionalInfoRows).map(key => (
        <TableRow key={key}>
          <TableCellStyled>{additionalInfoRows[key as keyof AdditionalInfo]}</TableCellStyled>
          <TableCellStyled>{`${content[key as keyof AdditionalInfo]}`}</TableCellStyled>
        </TableRow>
      ));
    }
    return null;
  }
  return (
    <Collapse in={expand} timeout="auto" unmountOnExit>
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Collapse>
  );
};

export default CollapseContent;
