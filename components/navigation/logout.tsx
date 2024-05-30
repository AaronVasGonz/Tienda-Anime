import React from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
    const router = useRouter();
    
    const handleLogout = () => {
        // Eliminar indicador de sesión activa del localStorage o sessionStorage
        localStorage.removeItem('token'); // O sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('User');
        localStorage.removeItem('project');

        // Redirigir a la página de inicio de sesión u otra página deseada
        window.location.href = '/login';
    };

    return (
        <button
            className="w-full text-left text-slate-50 flex flex-row items-center"
            onClick={handleLogout}
        >
            {children || 'Logout'}
        </button>
    );
}

export default LogoutButton;