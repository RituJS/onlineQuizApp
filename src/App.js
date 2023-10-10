import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
   <BrowserRouter>
    <div className="app"  >
      <Header/>
      
    </div>
    <Footer />
   
   </BrowserRouter>
  );
}

export default App;
