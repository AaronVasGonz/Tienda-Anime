// utils/authUtils.js
import { getTokenFromLocalStorage } from './auth';

export const verifyToken = async () => {
    const token = getTokenFromLocalStorage();
    const user = localStorage.getItem('user');
    if (!token) {
        return false;
    }

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_JWT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'user': user
            },

        });
        const responseData = await response.json();
        //console.log(responseData.message);s
        if (response.ok) {
            return true;
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return false;
        }
    } catch (error) {
        console.error('Error al validar el token:', error);
        return false;
    }
};