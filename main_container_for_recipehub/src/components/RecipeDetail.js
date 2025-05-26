import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { shareRecipe } from '../services/recipeService';

// PUBLIC_INTERFACE
/**
 * RecipeDetail component displays detailed information about a recipe
 */
const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getRecipeById, 
    saveRecipe, 
    removeSavedRecipe, 
    savedRecipes,
    addRating,
    addComment
  } = useRecipes();
  
  const recipe = getRecipeById(parseInt(id));
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [shareLink, setShareLink] = useState('');
  const [showShareLink, setShowShareLink] = useState(false);
  
  const isSaved = savedRecipes.some(savedRecipe => savedRecipe.id === recipe?.id);
  
  // Calculate average rating
  const averageRating = recipe?.ratings.length 
    ? (recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length).toFixed(1)
    : 'No ratings';

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <div className="not-found">
          <h2>Recipe not found</h2>
          <button className="btn" onClick={() => navigate('/')}>Go back to recipes</button>
        </div>
      </div>
    );
  }

  const handleSaveClick = () => {
    if (isSaved) {
      removeSavedRecipe(recipe.id);
    } else {
      saveRecipe(recipe.id);
    }
  };

  const handleShareClick = async () => {
    const result = await shareRecipe(recipe);
    if (result.success) {
      setShareLink(result.shareableLink);
      setShowShareLink(true);
      // Hide after 10 seconds
      setTimeout(() => setShowShareLink(false), 10000);
    }
  };

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    setUserRating(value);
  };

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      addRating(recipe.id, userRating);
      setUserRating(0);
      // Show confirmation
      alert('Thank you for rating this recipe!');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && userName.trim()) {
      addComment(recipe.id, userName, comment);
      setComment('');
      setUserName('');
    }
  };

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <div className="recipe-detail-header">
          <h1 className="recipe-title">{recipe.title}</h1>
          <div className="recipe-meta">
            <span className="recipe-category">{recipe.category}</span>
            <span className="recipe-rating">
              <span className="star-icon">★</span> {averageRating}
            </span>
            <span className="recipe-time">
              Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
            </span>
          </div>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        <div className="recipe-image-container">
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
        </div>

        <div className="recipe-actions">
          <button 
            className={`save-button ${isSaved ? 'saved' : ''}`} 
            onClick={handleSaveClick}
          >
            {isSaved ? 'Saved' : 'Save Recipe'}
          </button>
          <button className="share-button" onClick={handleShareClick}>
            Share Recipe
          </button>
        </div>

        {showShareLink && (
          <div className="share-link-container">
            <p>Share this link:</p>
            <input 
              type="text" 
              value={shareLink} 
              readOnly 
              className="share-link-input"
              onClick={(e) => e.target.select()}
            />
          </div>
        )}

        <div className="recipe-content">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="recipe-rating-section">
          <h2>Rate this Recipe</h2>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className={userRating >= star ? 'active' : ''}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={userRating === star}
                  onChange={handleRatingChange}
                />
                <span className="star">★</span>
              </label>
            ))}
          </div>
          <button 
            className="btn"
            onClick={handleRatingSubmit}
            disabled={userRating === 0}
          >
            Submit Rating
          </button>
        </div>

        <div className="recipe-comments">
          <h2>Comments</h2>
          <div className="comments-list">
            {recipe.comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-header">
                  <span className="comment-user">{comment.user}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <div className="comment-body">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>

          <div className="comment-form-container">
            <h3>Add a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Your Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your thoughts on this recipe"
                  rows={4}
                />
              </div>
              <button type="submit" className="btn">Submit Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
