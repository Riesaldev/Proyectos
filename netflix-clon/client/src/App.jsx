import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage.jsx'
import MoviePage from './pages/MoviePage'
import NotFoundPage from './pages/NotFoundPage'

function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie/:id' element={<MoviePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <h1>Riflix</h1>
    </>
  )
};

export default App
