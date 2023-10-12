// Result.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ name, score }) => {
  const navigate = useNavigate();

  console.log("============name score", name, score)
  

 
  useEffect(() => {
   if(!name) {
    navigate("/");
   }   
  }, [name]);
  

  return (
    <div className="result-page">
      <h2>Your Score: {score}</h2>
      {/* <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button> */}
    </div>
  );
};

export default Result;
