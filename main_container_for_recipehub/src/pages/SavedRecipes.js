import React from 'react';
import RecipeList from '../components/RecipeList';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
/**
 * SavedRecipes page component for displaying saved recipes
 */
const SavedRecipes = () => {
  const { savedRecipes } = useRecipes();
  
  return (
    <div className="saved-recipes-container">
      <div className="saved-recipes-header">
        <h1>Your Saved Recipes</h1>
        <p>All your favorite recipes in one place</p>
      </div>
      
      <div className="recipes-section">
        <RecipeList recipes={savedRecipes} savedView={true} />
      </div>
    </div>
  );
};

export default SavedRecipes;
