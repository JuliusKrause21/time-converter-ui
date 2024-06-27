import { createContext } from 'react';

export const LeapSecondsContext = createContext({
  leapSecondsUsed: true,
  setLeapSecondsUsed: (_leapSecondsUsed: boolean) => {
    return;
  }
});
