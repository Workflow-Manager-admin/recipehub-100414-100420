import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
/**
 * RecipeList component displays a list of recipe cards
 * @param {Array} recipes - Array of recipes to display
 * @param {boolean} savedView - Whether this list is being displayed in the saved recipes view
 */
const RecipeList = ({ recipes, savedView = false }) => {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No recipes found</h3>
        <p>{savedView 
          ? "You haven't saved any recipes yet." 
          : "Try adjusting your search or filters to find recipes."
        }</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          savedView={savedView}
        />
      ))}
    </div>
  );
};

export default RecipeList;
