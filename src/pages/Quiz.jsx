import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../../src/App.css";
import QuestionComp from '../components/QuestionComp';
import { useQuizContext } from '../api/QuizContext'

const Quiz = () => {
  const { name, questions, score, setScore, setQuestions,currentQues, setCurrentQues } = useQuizContext();
  
  const [options, setOptions] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset the score to 0 when the component is mounted
    setScore(0);

    // Show an alert when the user tries to refresh the page
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Refreshing the page will reset your score. Are you sure you want to proceed?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setScore]);

  // Navigate to home when refreshed the page and questions not received
  useEffect(() => {
    if (!questions) {
      navigate('/');
    }    
  }, [questions, navigate]);

  // Reset the score to 0 when the component is mounted
  useEffect(() => {
    setScore(0);
  }, []);


   // Shuffle options whenever questions or current question change
  useEffect(() => {
    setOptions(questions && handleShuffle([questions[currentQues]?.correct_answer, ...questions[currentQues]?.incorrect_answers]));
  }, [questions, currentQues]);

  const handleShuffle = (shuffleOpt) => {
    return shuffleOpt.sort(() => Math.random() - 0.5);
  };
  

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
