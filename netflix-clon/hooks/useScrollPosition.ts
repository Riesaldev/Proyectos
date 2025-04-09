import { useState, useEffect } from 'react';

export const UseScrollPosition = () => {
    const [ScrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return ScrollPosition;
};

