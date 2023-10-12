import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import "../../src/App.css"
import QuestionComp from '../components/QuestionComp'

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {

  const [currentQues, setCurrentQues] = useState(0)
  const [options, setOptions] = useState();

  useEffect(() => {
    console.log("------", questions);
    setOptions(questions && handleShuffle([questions[currentQues]?.correct_answer,
    ...questions[currentQues]?.incorrect_answers]))

  }, [questions, currentQues]);

  //shuffling the options of the MCQ
  const handleShuffle = (shuffleOpt) => {
    return shuffleOpt.sort(() => Math.random() - 0.5);
  }

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
                correctAns= {questions[currentQues]?.correct_answer}
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
  )
}

export default Quiz

