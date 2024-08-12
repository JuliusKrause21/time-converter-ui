export enum TimeFormat {
  Gnss = 'gnss',
  Utc = 'utc',
  Unix = 'unix'
}

export const timeFormatOrder = [
  { active: TimeFormat.Utc, next: TimeFormat.Gnss },
  { active: TimeFormat.Gnss, next: TimeFormat.Unix },
  { active: TimeFormat.Unix, next: TimeFormat.Utc }
];
