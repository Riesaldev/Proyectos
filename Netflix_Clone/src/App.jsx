import './App.css';
import Movie from './pages/Movie';
import Home from './pages/Home';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

function App () {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;