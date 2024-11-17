import React from 'react';
import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  return (
    <Link to={`/${page.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
        <img 
          src={page.thumbnail} 
          alt={page.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-bold mb-2">{page.title}</h3>
        <p className="text-gray-600 mb-2">{page.description}</p>
      </div>
    </Link>
  );
};

export default PageCard;