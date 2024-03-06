import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string, handleFunction?: () => void, dep?: any[]) => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const downHandler = ({ key }: { key: any }) => {
        if (key === targetKey) {
            setKeyPressed(true);
            if (handleFunction) {
                handleFunction();
            }
        }
    };

    const upHandler = ({ key }: { key: any }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
        // eslint-disable-next-line
    }, [dep]);
    return keyPressed;
};
