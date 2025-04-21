import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ValidateUserPage from './pages/ValidateUserPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <div className='text-white'>
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/validate/:regCode'
          element={<ValidateUserPage />} />
        <Route path='/profile/:userId'
          element={<ProfilePage />} />
      </Routes>
    </div>
  )
};

export default App