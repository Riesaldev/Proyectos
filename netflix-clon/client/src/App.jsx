import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage'

function App () {
  return (
    <div className='text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
};

export default App
