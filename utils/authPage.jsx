
"use client"
import { getTokenFromLocalStorage, saveTokenToLocalStorage, getUserFromLocalStorage } from './auth';
import { usePathname, useRouter } from 'next/navigation';
import { use, useState, useEffect } from "react";

export const authIfLogin = () => {
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (token) {
            // Si hay un token, redirigir a la página principal
            router.push('/');
        }
    }, [router]);

}
export const useAuthAdmin = () => {
    const router = useRouter();
    let userAdmin = false;
    let token = '';
    try {
        token = getTokenFromLocalStorage();
        const userAdminString = getUserFromLocalStorage();

        if (userAdminString) {
            const user = JSON.parse(userAdminString);
            userAdmin = user.roles.roleAdministrador === 'ADMIN';
        }
    } catch (error) {
        console.error('Error al parsear el objeto JSON:', error);
    }

    useEffect(() => {
        if (!token || !userAdmin) {
            router.push('/');
        }
        // Si token y userAdmin son válidos, no redirigir
    }, [router, token, userAdmin]);
};