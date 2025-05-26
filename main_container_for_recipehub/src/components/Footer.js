import React from 'react';

// PUBLIC_INTERFACE
/**
 * Footer component for RecipeHub
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-symbol">🍽️</span> RecipeHub
            <p className="footer-tagline">Discover, save, and share delicious recipes</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Explore</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/saved">Saved Recipes</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                <li><a href="/?category=Italian">Italian</a></li>
                <li><a href="/?category=Asian">Asian</a></li>
                <li><a href="/?category=Desserts">Desserts</a></li>
                <li><a href="/?category=Salads">Salads</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>About</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
