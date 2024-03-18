import React from "react";

export default function Registro() {
    return (
        <form>
            <div className="w-full text-6xl font-bold mb-10">
                <h1 className="w-full">Únete a nuestra comunidad</h1>
            </div>
            <div className="w-full text-3xl font-bold mb-10">
                <h3 className="w-full">Crea tu cuenta</h3>
            </div>

            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                    Nombre completo
                </label>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="mb-3 block text-base font-medium text-white">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="Tu contraseña"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="mb-3 block text-base font-medium text-white">
                    Confirmar contraseña
                </label>
                <input
                    type="password"
                    placeholder="Confirma tu contraseña"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                />
            </div>
            <div>
                <button className="hover:shadow-form rounded-md bg-purple-500 hover:bg-purple-600 py-3 px-8 text-base font-semibold text-white outline-none">
                    Registrarse
                </button>
            </div>
        </form>
    );
};