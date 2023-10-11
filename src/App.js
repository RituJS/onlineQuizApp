import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  return (
   <BrowserRouter>
    <div className="app">
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
      
    </div>
    <Footer />
   
   </BrowserRouter>
  );
}

export default App;
