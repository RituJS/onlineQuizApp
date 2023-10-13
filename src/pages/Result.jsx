import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../api/QuizContext';

const Result = (() => {
  const { name, score } = useQuizContext()
  const navigate = useNavigate();

  //Store the score in localStorage
  useEffect(() => {
    if (name && score) {
      const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboardData.push({ name, score });
      localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }
  }, []);

  return (
    <div className="result-page">
      <h2>{name}'s Score: {score}</h2>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
    </div>
  );
});

export default Result;
