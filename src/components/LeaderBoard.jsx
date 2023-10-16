import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // get the leaderboard data from local storage
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Create an object to store the highest scores for each category
    const highestScoresByCategory = {};

    // Iterate through the savedLeaderboard to find the highest score for each category
    savedLeaderboard.forEach(({ name, score, category }) => {
      if (!highestScoresByCategory[category] || score > highestScoresByCategory[category].score) {
        highestScoresByCategory[category] = { name, score, category };
      }
    });

    // Convert the highestScoresByCategory object back to an array
    const updatedLeaderboard = Object.values(highestScoresByCategory);

    // Sort the leaderboard in descending order based on scores
    updatedLeaderboard.sort((a, b) => b.score - a.score);

    // Save the updated leaderboard state
    setLeaderboard(updatedLeaderboard);
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((ele, index) => (
            <li key={index}>
              {ele.name} - {ele.score} - {ele.category}
            </li>
          ))}
        </ul>
        <div className="sticky-button">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            href="/"
          >
            GO TO HOME
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
