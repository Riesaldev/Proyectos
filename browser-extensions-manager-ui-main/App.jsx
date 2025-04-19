// Importamos los componentes.
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';

// Importamos las páginas.
import HomePage from './pages/HomePage';


const App = () => {
    return (
        <>
            <Toaster position='top-center' />
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />

            </Routes>
            <Footer />
        </>
    );
};

export default App;
