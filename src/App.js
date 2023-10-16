// import React from 'react';
// import { useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Quiz from './pages/Quiz';
// import Result from './pages/Result';
// import LeaderBoard from './components/LeaderBoard';
// import {fetchQuiz} from "../src/api/api"

// function App() {
//   const [name, setName] = useState("");
//   const [questions, setQuestions] = useState("");
//   const [score, setScore] = useState(0);

//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Header />

//         <Routes>

//           <Route path="/" element={<Home 
//           name={name} 
//           setName={setName} 
//           fetchQuiz={fetchQuiz}
//           setQuestions ={setQuestions}/>} />

//           <Route path="/quiz" element={<Quiz 
//           name={name} 
//           questions={questions}
//           score={score}
//           setScore={setScore}
//           setQuestions={setQuestions}          
//           />} />

// <Route path="/result" element={<Result name={name} score={score} />} />

//           <Route path="/leaderboard" element={<LeaderBoard />} />
//         </Routes>

//       </div>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import LeaderBoard from './components/LeaderBoard';
import { QuizProvider } from './api/QuizContext';

function App() {
  return (
  <div className='container'>
    <QuizProvider> 
      <BrowserRouter>
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </QuizProvider>
    </div>

  );
}

export default App;
