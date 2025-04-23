import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ValidateAccountPage from './pages/ValidateAccountPage'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <div className='text-white'>
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/validate/:regCode' element={<ValidateAccountPage />} />
        <Route path='*' element={<NotFoundPage />} />


      </Routes>
    </div>
  )
};

export default App