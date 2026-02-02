import { useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  isRunning: boolean;
  onTick: () => void;
  interval?: number;
}

export function useTimer({ isRunning, onTick, interval = 1000 }: UseTimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTickRef = useRef(onTick);

  // onTick 콜백 최신 상태 유지
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  // 타이머 시작/정지
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      onTickRef.current();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, interval]);

  // 수동 정지
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { stop };
}
