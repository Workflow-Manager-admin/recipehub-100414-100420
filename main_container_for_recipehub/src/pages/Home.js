import React from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeList from '../components/RecipeList';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
/**
 * Home page component for RecipeHub
 */
const Home = () => {
  const { searchRecipes } = useRecipes();
  const filteredRecipes = searchRecipes();
  
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Find Your Next Favorite Recipe</h1>
        <p>Browse our collection of delicious recipes or search for something specific</p>
        <SearchBar />
      </div>
      
      <CategoryFilter />
      
      <div className="recipes-section">
        <RecipeList recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default Home;
