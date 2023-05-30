import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const userId = useSelector(state => state.user.id);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">Home</Link>
      <div>
        <Link to='/account'><img data-src="//cdn.allbirds.com/image/upload/v1571355713/icons/user.svg" src="//cdn.allbirds.com/image/upload/v1571355713/icons/user.svg"/></Link>
        {userId && <Link to="/create">Create New Post</Link>}
      </div>
    </nav>
  );
};
