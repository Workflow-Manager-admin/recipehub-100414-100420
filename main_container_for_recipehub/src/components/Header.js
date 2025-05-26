import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Header component with navigation for RecipeHub
 */
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-symbol">🍽️</span> RecipeHub
          </Link>
          
          <nav className="main-nav">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>
              Home
            </NavLink>
            <NavLink to="/saved" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Saved Recipes
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
