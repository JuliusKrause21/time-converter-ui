import { TimeFormat } from './models/TimeFormat.ts';

export const breakpointValues = { xs: 360, sm: 600, md: 900, lg: 1200, xl: 1920 };

export interface CustomColor {
  main: string;
  start: string;
  contrastText: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    [TimeFormat.Gnss]: CustomColor;
    [TimeFormat.Utc]: CustomColor;
    [TimeFormat.Unix]: CustomColor;
  }

  interface PaletteOptions {
    [TimeFormat.Gnss]: CustomColor;
    [TimeFormat.Utc]: CustomColor;
    [TimeFormat.Unix]: CustomColor;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    [TimeFormat.Gnss]: true;
    [TimeFormat.Utc]: true;
    [TimeFormat.Unix]: true;
  }
}
declare module '@mui/material/Fab' {
  export interface FabPropsColorOverrides {
    [TimeFormat.Gnss]: true;
    [TimeFormat.Utc]: true;
    [TimeFormat.Unix]: true;
  }
}
