import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ReservePage from './pages/Reservacation/ReservePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/reserve' element={<ReservePage></ReservePage>}></Route>
    </Routes>
  );
}

export default App;
