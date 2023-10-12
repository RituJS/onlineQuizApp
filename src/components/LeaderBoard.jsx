// Leaderboard.js
import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Retrieve leaderboard data from local storage
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.name} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
