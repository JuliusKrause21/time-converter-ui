import { CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { FC, ReactNode } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import { GnssTime, isGnssTime } from '../../../models/GnssTime.ts';
import { DateTime, isDateTime } from '../../../models/DateTime.ts';
import { AdditionalInfo, isAdditionalInfo } from '../../../models/AdditionalInfo.ts';
import { ClearIcon } from '@mui/x-date-pickers';

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
  function mapAdditionalInfoContent(key: keyof AdditionalInfo): string | ReactNode {
    if (!isAdditionalInfo(content)) {
      return '';
    }
    const field = content[key];
    if (field === undefined) {
      return '';
    }

    if (typeof field === 'boolean') {
      return field ? <CheckIcon /> : <ClearIcon />;
    }
    return `${field}`;
  }

  function renderTableRows(): ReactNode {
    if (content === undefined) {
      return (
        <TableRow>
          <TableCell>Time was before initial epoch of the system</TableCell>
        </TableRow>
      );
    }
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
          <TableCell>{mapAdditionalInfoContent(key as keyof AdditionalInfo)}</TableCell>
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
