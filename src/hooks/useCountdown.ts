import {useEffect, useState} from 'react';

/** Seconds remaining until `expiresAt` (epoch ms), ticking every second. */
export const useCountdown = (expiresAt: number | null): number => {
  const compute = () =>
    expiresAt ? Math.max(0, Math.round((expiresAt - Date.now()) / 1000)) : 0;
  const [seconds, setSeconds] = useState(compute);

  useEffect(() => {
    setSeconds(compute());
    if (!expiresAt) {
      return;
    }
    const id = setInterval(() => setSeconds(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  return seconds;
};
