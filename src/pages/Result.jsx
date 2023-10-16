import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuizContext } from '../api/QuizContext';
import Categories from '../Database/Category'

const getCategoryNameById = (categoryId) => {
  const category = Categories.find((cat) => cat.value === categoryId);
  return category ? category.category : 'Unknown Category';
};

const Result = () => {
  const { name, score, category } = useQuizContext()
  const navigate = useNavigate();
  const categoryName = getCategoryNameById(category);

  //Store the score in localStorage
  useEffect(() => {
    if (name && score && category) {
      const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboardData.push({ name, score, category:categoryName });
      localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }
  }, [name, score, category, categoryName]);

  return (
    <div className="result-page">
      <h2>{name}'s Score: {score} Categories: {categoryName}</h2>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
    </div>
  );
};

export default Result;
