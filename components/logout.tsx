import React from "react";


interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {

    const handleLogout = () => {
        // Eliminar indicador de sesión activa del localStorage o sessionStorage
        localStorage.removeItem('token'); // O sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        // Redirigir a la página de inicio de sesión u otra página deseada
         
        window.location.href = '/login';
        // Redirige a la página de inicio de sesión
    };

    return (
        <button className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" onClick={handleLogout}>
            {children || 'Logout'}
        </button>
    );
}

export default LogoutButton;