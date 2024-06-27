export interface AdditionalInfo {
  unix: number | undefined;
  leapSeconds: number | undefined;
  isLeapYear: boolean;
  nextLeapYear: number;
}

export function isAdditionalInfo(value: unknown): value is AdditionalInfo {
  if (value === undefined || typeof value !== 'object') {
    return false;
  }
  const potentialAdditionalInfo = value as AdditionalInfo;
  return potentialAdditionalInfo.isLeapYear !== undefined && potentialAdditionalInfo.nextLeapYear !== undefined;
}
