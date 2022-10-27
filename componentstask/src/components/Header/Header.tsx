import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'utils/constants';
import './Header.scss';

export function Header() {
  const [active, setActive] = React.useState('false');

  return (
    <header className="header__container">
      <nav className="header__navigation ">
        <ul className="header__navigation-list">
          <li>
            <Link
              className={`${active === 'main' ? 'active' : ''}`}
              to={PATH.MAIN}
              onClick={() => setActive('main')}
              data-testid="main-link"
            >
              Main
            </Link>
          </li>
          <li>
            <Link
              className={`${active === 'about' ? 'active' : ''}`}
              to={PATH.ABOUT_US}
              onClick={() => setActive('about')}
              data-testid="about-link"
            >
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
