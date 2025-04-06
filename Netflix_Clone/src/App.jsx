import './App.css';
import Movie from './pages/Movie';
import Home from './pages/Home';
import Login from './pages/Login';
import MyList from './pages/MyList';
import Series from './pages/Series';
import Register from './pages/Register';
import MoreViews from './pages/MoreViews';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

function App () {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/series" element={<Series />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/more-views" element={<MoreViews />} />
      </Routes>
    </>
  );
}

export default App;