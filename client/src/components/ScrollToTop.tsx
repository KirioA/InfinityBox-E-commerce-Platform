// components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутить страницу вверх при смене маршрута
    }, [location]);

    return null; // Этот компонент ничего не рендерит
};

export default ScrollToTop;
