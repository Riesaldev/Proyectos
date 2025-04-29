import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import ProfilesPage from './pages/ProfilesPage.jsx'

function App () {
  return (
    <div className='text-white'>
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/validate/:regCode' element={<NotFoundPage />} />
        <Route path='/profile' element={<ProfilesPage />} />

      </Routes>
    </div>
  )
};

export default App