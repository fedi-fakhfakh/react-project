import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const UpdateTitleOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract the page or route name from the location object
    const pageTitle = location.pathname.replace('/', '');

    // Update the document title
    document.title = pageTitle;
  }, [location]);

  return null;
};
