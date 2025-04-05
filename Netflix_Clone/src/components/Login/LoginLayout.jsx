import React from 'react';

function LoginLayout () {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
            <p className="text-gray-300 mb-6">Bienvenido de nuevo. Inicia sesión para continuar.</p>
            {/* Aquí iría el formulario de inicio de sesión */}
            <form className="space-y-4">
                <input type="email" placeholder="Correo electrónico" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500" required />
                <input type="password" placeholder="Contraseña" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500" required />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Iniciar sesión</button>
            </form>
            <div className="mt-4">
                <a href="#" className="text-blue-400 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    );
}

export default LoginLayout;

