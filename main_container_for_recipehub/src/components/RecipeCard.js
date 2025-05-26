import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
/**
 * RecipeCard component displays a summary of a recipe
 * @param {Object} recipe - The recipe to display
 * @param {boolean} savedView - Whether this card is being displayed in the saved recipes view
 */
const RecipeCard = ({ recipe, savedView = false }) => {
  const navigate = useNavigate();
  const { saveRecipe, removeSavedRecipe, savedRecipes } = useRecipes();
  
  const isSaved = savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);
  
  // Calculate average rating
  const averageRating = recipe.ratings.length 
    ? (recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length).toFixed(1)
    : 'No ratings';
  
  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleSaveClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (isSaved) {
      removeSavedRecipe(recipe.id);
    } else {
      saveRecipe(recipe.id);
    }
  };
  
  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-card-img-container">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card-img" />
        <div className="recipe-card-category">{recipe.category}</div>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
        <div className="recipe-card-meta">
          <div className="recipe-card-rating">
            <span className="star-icon">★</span> {averageRating}
          </div>
          <div className="recipe-card-time">
            {recipe.prepTime} + {recipe.cookTime}
          </div>
        </div>
        <div className="recipe-card-actions">
          <button 
            className={`save-button ${isSaved ? 'saved' : ''}`} 
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
