import { useState, useEffect } from 'react';

const useDeviceWidth = () => {
    const [deviceWidth, setDeviceWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setDeviceWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        document.documentElement.style.setProperty('--device-width', `${window.innerWidth}px`);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            document.documentElement.style.setProperty('--device-width', `${window.innerWidth}px`)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return [deviceWidth, windowWidth];
};

export default useDeviceWidth;
