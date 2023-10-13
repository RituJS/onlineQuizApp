

// const fetchQuiz = async (category = "", level = "") => {
//     try {
//       const response = await fetch(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${level && `&level=${level}`}&type=multiple`);
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       return data.results;
//     } catch (error) {
//       // Handle errors
//       console.error('Error fetching quiz:', error);
//       throw error;
//     }
//   };
  

//   export {fetchQuiz}

import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState('');
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState("")

   const fetchQuiz = async (category = "", level = "") => {
        try {
          const response = await fetch(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${level && `&level=${level}`}&type=multiple`);
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          return data.results;
        } catch (error) {
          // Handle errors
          console.error('Error fetching quiz:', error);
          throw error;
        }
      };

  return (
    <QuizContext.Provider value={{ name, setName, questions, setQuestions, score, setScore, category, setCategory, fetchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};


  