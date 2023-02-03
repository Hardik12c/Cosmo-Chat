import React from 'react';
import '../assets/css/Error.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404 - Page Not Found</h1>
      <p className="not-found__text">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;