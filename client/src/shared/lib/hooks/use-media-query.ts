/* eslint-disable */
import { useCallback, useEffect, useState } from 'react';

type TypeSizes = '375' | '425' | '475' | '600' | '768' | '1024' | '1280' | '1400' | '1600' | '1920' | '2560';
type TypeWidth = 'max-width' | 'min-width';

export const useMediaQuery = (query: `(${TypeWidth}: ${TypeSizes}px)` | string): boolean => {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    const handleChange = useCallback(() => {
        setMatches(getMatches(query));
    }, [query]);

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if query changes
        handleChange();

        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener('change', handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener('change', handleChange);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, handleChange]);

    return matches;
};

/* eslint-enable */
