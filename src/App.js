import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import LeaderBoard from './components/LeaderBoard';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuiz = async (category = "", level = "") => {
    const { data } = await axios.get
    // (
    //   `https://opentdb.com/api.php?amount=10${
    //     category && `&category=${category}`
    //   }${level && `&level=${level}`}&type=multiple`
    // );
    // (`https://opentdb.com/api.php?amount=10&type=multiple`)
    
    (`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${level && `&level=${level}`}&type=multiple`
    );
  
    // console.log("=====", data);
    setQuestions(data.results)
  };
  

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>

          <Route path="/" element={<Home 
          name={name} 
          setName={setName} 
          fetchQuiz={fetchQuiz}/>} />

          <Route path="/quiz" element={<Quiz 
          name={name} 
          questions={questions}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}          
          />} />

<Route path="/result" element={<Result name={name} score={score} />} />

          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
