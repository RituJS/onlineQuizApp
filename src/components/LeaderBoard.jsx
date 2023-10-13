import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // get the leaderboard data from local storage
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // update scores if the name already exists
    const updatedLeaderboard = [];
    savedLeaderboard.forEach(ele => {
      const existingPerson = updatedLeaderboard.findIndex(item => item.name === ele.name);
      if (existingPerson !== -1) {
        // If name exists, update the score only if the new score is higher
        if (ele.score > updatedLeaderboard[existingPerson].score) {
          updatedLeaderboard[existingPerson].score = ele.score;
        }
      } else {
        // If name doesn't exist, add the name
        updatedLeaderboard.push(ele);
      }
    });

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
            {ele.name} - {ele.score}
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
      >GO TO HOME</Button></div>
    </div>
    </div>
  );
};

export default LeaderBoard;
