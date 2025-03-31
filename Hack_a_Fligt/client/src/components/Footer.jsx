import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [ openSection, setOpenSection ] = useState( null );

    const toggleSection = ( section ) => {
        setOpenSection( openSection === section ? null : section );
    };

    return (
        <>
            <footer className='bg-[#083059] text-xs text-accent-blue py-12 px-4 border-t-2 border-accent-blue mt-auto'>
                <div className='container mx-auto'>
                    <section className='grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center'>
                        {/* Sección de contacto */}
                        <section className='contact'>
                            <h3
                                className='title1 font-bold text-sm mb-1 cursor-pointer uppercase'
                                onClick={() => toggleSection( 'contact' )}
                            >
                                Contactar
                            </h3>
                            {openSection === 'contact' && (
                                <div className='space-y-4'>
                                    <p className='hover:text-[#179DD9] transition-colors'>
                                        Email: contacto@hackafly.com
                                    </p>
                                    <p>Teléfono: +35 123 456 789</p>
                                </div>
                            )}
                        </section>

                        {/* Sección de ayuda al cliente */}
                        <section className='help'>
                            <h3
                                className='title2 font-bold text-sm mb-1 cursor-pointer uppercase'
                                onClick={() => toggleSection( 'about' )}
                            >
                                Sobre nosotros
                            </h3>
                            {openSection === 'about' && (
                                <ul className='space-y-2'>
                                    <li>
                                        <Link
                                            to='/about'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            Acerca de HackaFlight
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/team'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            Nuestro Equipo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/faq'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </section>

                        {/* Sección de información legal */}
                        <section className='legal'>
                            <h3
                                className='title3 font-bold text-sm mb-1 cursor-pointer uppercase '
                                onClick={() => toggleSection( 'legal' )}
                            >
                                Legal
                            </h3>
                            {openSection === 'legal' && (
                                <div className='space-y-4'>
                                    <ul className='space-y-2'>
                                        <li>
                                            <Link
                                                to='/cookies'
                                                className='hover:text-[#179DD9] transition-colors'
                                            >
                                                Configuración de las cookies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to='/privacidad'
                                                className='hover:text-[#179DD9] transition-colors'
                                            >
                                                Política de privacidad
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to='/términos'
                                                className='hover:text-[#179DD9] transition-colors'
                                            >
                                                Términos y Condiciones
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </section>
                    </section>
                    <section>
                        <div className='favicons flex flex-col items-center my-8'>
                            <ul className='flex justify-between w-full max-w-xs'>
                                <li className='flex-1 flex justify-center'>
                                    <Link
                                        to='https://facebook.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <img
                                            src='/public/facebook.png'
                                            alt='Facebook'
                                            className='w-8 h-8 hover:opacity-80 transition-opacity rounded-2xl bg-accent-blue'
                                        />
                                    </Link>
                                </li>
                                <li className='flex-1 flex justify-center'>
                                    <Link
                                        to='https://instagram.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <img
                                            src='/public/instagram.png'
                                            alt='Instagram'
                                            className='w-8 h-8 bg-accent-blue hover:opacity-80 transition-opacity rounded-lg'
                                        />
                                    </Link>
                                </li>
                                <li className='flex-1 flex justify-center'>
                                    <Link
                                        to='https://x.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <img
                                            src='/public/xlogo.png'
                                            alt='X'
                                            className='w-8 h-8 hover:opacity-80 transition-opacity bg-accent-blue'
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Copyright section */}
                <div className='border-t border-accent-blue pt-8 '>
                    <p className='text-sm text-accent-blue text-center mt-4'>
                        Copyright © 2025 HackaFligth Company S.L. Todos los
                        derechos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
