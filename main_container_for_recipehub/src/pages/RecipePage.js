import React from 'react';
import RecipeDetail from '../components/RecipeDetail';

// PUBLIC_INTERFACE
/**
 * RecipePage component for displaying a single recipe
 */
const RecipePage = () => {
  return (
    <div className="recipe-page">
      <RecipeDetail />
    </div>
  );
};

export default RecipePage;
