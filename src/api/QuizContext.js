import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizValue, setQuizValue] = useState({
    name: '',
    questions: '',
    score: 0,
    category: '',
    currentQues: 0
  });

  const updateQuizValue = ( updatedState ) => {
    setQuizValue ( prevState => ({
      ...prevState,
      ...updatedState
    }))
  };


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
    <QuizContext.Provider value={{quizValue, updateQuizValue , fetchQuiz}}>
    {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};

