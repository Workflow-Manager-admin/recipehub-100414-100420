import { createContext, useState, useEffect, useContext } from 'react';

// Sample recipe data for development
const mockRecipes = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    description: 'A simple, delicious pizza with fresh tomatoes, mozzarella, and basil.',
    ingredients: [
      '1 pizza dough', 
      '3 tablespoons tomato sauce', 
      '4 oz fresh mozzarella', 
      'Fresh basil leaves', 
      '2 tablespoons olive oil', 
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 500°F (260°C) with a pizza stone if available.',
      'Roll out the pizza dough to your desired thickness.',
      'Spread tomato sauce evenly over the dough, leaving a small border for the crust.',
      'Tear mozzarella into pieces and distribute over the sauce.',
      'Bake for 10-12 minutes or until crust is golden and cheese is bubbly.',
      'Remove from oven, top with fresh basil leaves, drizzle with olive oil, and season with salt and pepper.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    category: 'Italian',
    prepTime: '15 mins',
    cookTime: '12 mins',
    ratings: [4, 5, 5, 4, 5],
    comments: [
      { user: 'PizzaLover', text: 'Simple and delicious!', date: '2023-04-10' },
      { user: 'ChefMario', text: 'I added garlic to the sauce - perfect!', date: '2023-04-12' }
    ]
  },
  {
    id: 2,
    title: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable stir fry with a savory sauce.',
    ingredients: [
      '2 cups mixed vegetables (bell peppers, broccoli, carrots, snap peas)',
      '2 tablespoons vegetable oil',
      '2 cloves garlic, minced',
      '1 tablespoon ginger, minced',
      '3 tablespoons soy sauce',
      '1 tablespoon honey or maple syrup',
      '1 teaspoon cornstarch mixed with 2 tablespoons water'
    ],
    instructions: [
      'Prepare all vegetables by washing and cutting into bite-sized pieces.',
      'Heat oil in a wok or large skillet over high heat.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add vegetables and stir fry for 3-4 minutes until crisp-tender.',
      'Mix soy sauce, honey, and cornstarch slurry in a small bowl.',
      'Pour sauce over vegetables and cook for another 1-2 minutes until sauce thickens.',
      'Serve immediately over rice or noodles.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: 'Asian',
    prepTime: '10 mins',
    cookTime: '7 mins',
    ratings: [5, 4, 4, 3, 5],
    comments: [
      { user: 'VeggieQueen', text: 'So quick and healthy!', date: '2023-04-05' },
      { user: 'AsianFoodFan', text: 'I added some tofu for protein - delicious!', date: '2023-04-08' }
    ]
  },
  {
    id: 3,
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies that are soft in the middle and crispy on the edges.',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 teaspoon baking soda',
      '1 teaspoon salt',
      '1 cup unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '1 teaspoon vanilla extract',
      '2 large eggs',
      '2 cups semi-sweet chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a small bowl, combine flour, baking soda, and salt.',
      'In a large mixing bowl, beat butter, granulated sugar, brown sugar, and vanilla until creamy.',
      'Add eggs one at a time, beating well after each addition.',
      'Gradually add flour mixture until just combined.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons of dough onto ungreased baking sheets.',
      'Bake for 9-11 minutes or until golden brown.',
      'Let stand for 2 minutes before removing to wire racks to cool completely.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    category: 'Desserts',
    prepTime: '15 mins',
    cookTime: '11 mins',
    ratings: [5, 5, 4, 5, 5],
    comments: [
      { user: 'SweetTooth', text: 'These are the BEST cookies ever!', date: '2023-04-15' },
      { user: 'BakingMama', text: 'I use dark chocolate chips and they turn out amazing.', date: '2023-04-18' }
    ]
  },
  {
    id: 4,
    title: 'Classic Caesar Salad',
    description: 'Traditional Caesar salad with crisp romaine, parmesan, croutons and a creamy dressing.',
    ingredients: [
      '1 large head romaine lettuce, cut into bite-sized pieces',
      '1/2 cup Caesar salad dressing',
      '1/2 cup croutons',
      '1/4 cup grated Parmesan cheese',
      'Fresh ground black pepper'
    ],
    instructions: [
      'Wash and dry lettuce leaves thoroughly, then tear into bite-sized pieces.',
      'In a large bowl, toss lettuce with dressing until evenly coated.',
      'Add croutons and toss lightly.',
      'Sprinkle with Parmesan cheese and fresh ground pepper.',
      'Serve immediately.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: 'Salads',
    prepTime: '10 mins',
    cookTime: '0 mins',
    ratings: [4, 3, 4, 5, 4],
    comments: [
      { user: 'SaladLover', text: 'Simple and classic!', date: '2023-04-02' },
      { user: 'HealthyEater', text: 'I added grilled chicken for protein.', date: '2023-04-05' }
    ]
  }
];

// Create context
const RecipeContext = createContext();

// PUBLIC_INTERFACE
export const useRecipes = () => {
  return useContext(RecipeContext);
};

// PUBLIC_INTERFACE
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  // Load mock recipes on component mount
  useEffect(() => {
    setRecipes(mockRecipes);
    
    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(mockRecipes.map(recipe => recipe.category))];
    setCategories(uniqueCategories);
  }, []);

  // Get recipe by id
  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === parseInt(id));
  };

  // Search recipes
  const searchRecipes = () => {
    let filteredRecipes = recipes;

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }

    return filteredRecipes;
  };

  // Save a recipe
  const saveRecipe = (recipeId) => {
    const recipe = getRecipeById(recipeId);
    if (recipe && !savedRecipes.find(r => r.id === recipeId)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  // Remove a saved recipe
  const removeSavedRecipe = (recipeId) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId));
  };

  // Add a rating to a recipe
  const addRating = (recipeId, rating) => {
    setRecipes(recipes.map(recipe => {
      if (recipe.id === recipeId) {
        return {
          ...recipe,
          ratings: [...recipe.ratings, rating]
        };
      }
      return recipe;
    }));
  };

  // Add a comment to a recipe
  const addComment = (recipeId, user, text) => {
    const date = new Date().toISOString().split('T')[0];
    
    setRecipes(recipes.map(recipe => {
      if (recipe.id === recipeId) {
        return {
          ...recipe,
          comments: [...recipe.comments, { user, text, date }]
        };
      }
      return recipe;
    }));
  };

  const value = {
    recipes,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    searchRecipes,
    getRecipeById,
    savedRecipes,
    saveRecipe,
    removeSavedRecipe,
    addRating,
    addComment
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
