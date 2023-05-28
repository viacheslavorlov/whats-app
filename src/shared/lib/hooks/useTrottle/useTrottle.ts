import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const trottlingRef = useRef(false);

    return useCallback(
        (...args: any[]) => {
            if (!trottlingRef.current) {
                callback(...args);
                trottlingRef.current = true;
                setTimeout(() => {
                    trottlingRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}
