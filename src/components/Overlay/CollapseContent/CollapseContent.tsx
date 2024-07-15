import { CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { FC, ReactNode } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import { GnssTime, isGnssTime } from '../../../models/GnssTime.ts';
import { DateTime, isDate } from '../../../models/DateTime.ts';
import { AdditionalInfo, isAdditionalInfo } from '../../../models/AdditionalInfo.ts';
import { ClearIcon } from '@mui/x-date-pickers';
import { buildDateString, buildDayOfYearString, buildTimeString } from '../../../utils/buildUtcStings.ts';

interface CollapseContentProps {
  expand: boolean;
  content: GnssTime | Date | AdditionalInfo | undefined;
}

type DateTimeRowContent = { title: string; mapContent: (content: Date) => string };
type AdditionalRowContent = { title: string; mapContent: (content: AdditionalInfo) => string | ReactNode };

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'Mai',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const gnssTableRows: Record<keyof GnssTime, string> = { week: 'Week', timeOfWeek: 'Time of week' };
const dateTimeTableRows: Record<keyof DateTime, DateTimeRowContent> = {
  date: { title: 'Date', mapContent: content => buildDateString(content) },
  time: { title: 'Time', mapContent: content => buildTimeString(content) },
  month: { title: 'Month', mapContent: content => content && months[content?.getMonth()] },
  dayOfWeek: { title: 'Day of week', mapContent: content => content && weekdays[content?.getDay()] },
  dayOfYear: {
    title: 'Day of year',
    mapContent: content => buildDayOfYearString(content)
  }
};

const additionalInfoRows: Record<keyof AdditionalInfo, AdditionalRowContent> = {
  unix: {
    title: 'Unix Time',
    mapContent: content =>
      content.unix !== undefined ? `${content.unix}` : 'Time was before initial epoch of the system'
  },
  leapSeconds: {
    title: 'Leap Seconds',
    mapContent: content => (content.leapSeconds !== undefined ? `${content.leapSeconds}` : 'Not used')
  },
  isLeapYear: { title: 'Leap year', mapContent: content => (content.isLeapYear ? <CheckIcon /> : <ClearIcon />) },
  nextLeapYear: { title: 'Next Leap year', mapContent: content => `${content.nextLeapYear}` }
};

const CollapseContent: FC<CollapseContentProps> = ({ expand, content }) => {
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
    if (isDate(content)) {
      return Object.keys(dateTimeTableRows).map(key => (
        <TableRow key={key}>
          <TableCell>{dateTimeTableRows[key as keyof DateTime].title}</TableCell>
          <TableCell>{dateTimeTableRows[key as keyof DateTime].mapContent(content)}</TableCell>
        </TableRow>
      ));
    }
    if (isAdditionalInfo(content)) {
      return Object.keys(additionalInfoRows).map(key => (
        <TableRow key={key}>
          <TableCell>{additionalInfoRows[key as keyof AdditionalInfo].title}</TableCell>
          <TableCell>{additionalInfoRows[key as keyof AdditionalInfo].mapContent(content)}</TableCell>
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
