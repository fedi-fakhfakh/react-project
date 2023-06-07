import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className='containerNav'>
      <nav>
        <ul className='firstUlInNav'>
          <li>
            <Link to="/Home" className='buttonInNav'>Home</Link>
          </li>
        </ul>
        <ul className='secondUlInNav'>
          <li>
            <Link to='/account' className='buttonInNav'><img data-src="//cdn.allbirds.com/image/upload/v1571355713/icons/user.svg" src="//cdn.allbirds.com/image/upload/v1571355713/icons/user.svg"/></Link>
          </li>
          <li>
            <Link to="/create" className='buttonInNav'>Create New Post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
