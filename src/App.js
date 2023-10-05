import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ReservePage from './pages/Reservacation/ReservePage';
import ConfirmPage from './pages/Confirm/ConfirmPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/reserve' element={<ReservePage></ReservePage>}></Route>
      <Route path='/confirm' element={<ConfirmPage></ConfirmPage>}></Route>
    </Routes>
  );
}

export default App;
