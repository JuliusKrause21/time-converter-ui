import { CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { FC, ReactNode } from 'react';

import { GnssTime, isGnssTime } from '../../../models/GnssTime.ts';
import { DateTime, isDateTime } from '../../../models/DateTime.ts';
import { AdditionalInfo, isAdditionalInfo } from '../../../models/AdditionalInfo.ts';

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
          <TableCell>{gnssTableRows[key as keyof GnssTime]}</TableCell>
          <TableCell>{content[key as keyof GnssTime]}</TableCell>
        </TableRow>
      ));
    }
    if (isDateTime(content)) {
      return Object.keys(dateTimeTableRows).map(key => (
        <TableRow key={key}>
          <TableCell>{dateTimeTableRows[key as keyof DateTime]}</TableCell>
          <TableCell>{content[key as keyof DateTime]}</TableCell>
        </TableRow>
      ));
    }
    if (isAdditionalInfo(content)) {
      return Object.keys(additionalInfoRows).map(key => (
        <TableRow key={key}>
          <TableCell>{additionalInfoRows[key as keyof AdditionalInfo]}</TableCell>
          <TableCell>{`${content[key as keyof AdditionalInfo]}`}</TableCell>
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
