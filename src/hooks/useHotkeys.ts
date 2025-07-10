import { useEffect, useCallback } from 'react';

export function useHotkeys(
  keys: string[],
  callback: () => void,
  deps: any[] = []
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const isMatch = keys.every(key => {
      switch (key.toLowerCase()) {
        case 'cmd':
        case 'meta':
          return event.metaKey;
        case 'ctrl':
          return event.ctrlKey;
        case 'shift':
          return event.shiftKey;
        case 'alt':
          return event.altKey;
        default:
          return event.key.toLowerCase() === key.toLowerCase();
      }
    });

    if (isMatch) {
      event.preventDefault();
      callback();
    }
  }, [...deps, callback]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}