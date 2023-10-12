import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "../../src/App.css";
import QuestionComp from '../components/QuestionComp';

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [currentQues, setCurrentQues] = useState(0);
  const [options, setOptions] = useState();
  const navigate = useNavigate(); // Initialize navigate from useNavigate hook

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const message = "If you refresh the page, your quiz progress will be lost, and the score will reset to 0.";
  //     event.returnValue = message;
  //     localStorage.setItem('score', score);     
  //     return message;      
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
   
  //   // remove the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []); // Empty array means this effect runs once when the component is mounted

  useEffect(() => {
    console.log("Current Score: ", score);
  }, [score]);

  useEffect(() => {
    setOptions(questions && handleShuffle([questions[currentQues]?.correct_answer, ...questions[currentQues]?.incorrect_answers]));
  }, [questions, currentQues]);

  const handleShuffle = (shuffleOpt) => {
    return shuffleOpt.sort(() => Math.random() - 0.5);
  };
console.log("score=", score)

  return (
    <div className='quiz-page'>
      <h2 className="title">Welcome, {name}</h2>
      {
        questions ? (
          <>
            <div className="quizDetail">
              <span>Category : {questions[currentQues].category}</span>
              <span>Score : {score}</span>
            </div>
            <QuestionComp 
              currentQues={currentQues}
              setCurrentQues={setCurrentQues}
              questions={questions}
              options={options}
              correctAns={questions[currentQues]?.correct_answer}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}      
            />
          </>
        ) : (
          <CircularProgress
            color='inherit'
            size={100}
            thickness={1}
            style={{ margin: 100 }}
          />
        )
      }
    </div>
  );
};

export default Quiz;
