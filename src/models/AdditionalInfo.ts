export interface AdditionalInfo {
  unix: number;
  leapSeconds: number;
  isLeapYear: boolean | undefined;
  nextLeapYear: number | undefined;
}

export function isAdditionalInfo(value: unknown): value is AdditionalInfo {
  if (value === undefined || typeof value !== 'object') {
    return false;
  }
  const potentialAdditionalInfo = value as AdditionalInfo;
  return potentialAdditionalInfo.unix !== undefined && potentialAdditionalInfo.leapSeconds !== undefined;
}
