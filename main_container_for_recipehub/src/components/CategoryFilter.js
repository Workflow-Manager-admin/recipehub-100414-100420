import React from 'react';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
/**
 * CategoryFilter component for filtering recipes by category
 */
const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useRecipes();
  
  return (
    <div className="category-filter">
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
