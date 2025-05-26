import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-container">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/saved" element={<SavedRecipes />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
