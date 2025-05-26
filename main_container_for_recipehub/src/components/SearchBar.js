import React from 'react';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
/**
 * SearchBar component for searching recipes
 */
const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipes();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // The context already handles the search
  };
  
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search recipes, ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
