
"use client"
import { getTokenFromLocalStorage, saveTokenToLocalStorage, getUserFromLocalStorage, getIvFromLocalStorage } from './auth';
import { usePathname, useRouter } from 'next/navigation';
import { use, useState, useEffect } from "react";
import { decryptData } from './auth';
import { user } from '@nextui-org/react';


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
    useEffect(() => {
        try {
            const token = getTokenFromLocalStorage();
            const userAdminEncrypt = getUserFromLocalStorage();
            const iv = getIvFromLocalStorage();
            if (token && userAdminEncrypt && iv) {
                decryptData(userAdminEncrypt, iv)
                    .then(userAdminString => {
                        if (userAdminString) {
                            const isAdmin = userAdminString.roles.roleAdministrador === 'ADMIN';
                            if (!token || !isAdmin) {
                                router.push('/');
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error al parsear el objeto JSON:', error);
                    });
            }else{
                router.push('/');}
        } catch (error) {
            console.error('Error al parsear el objeto JSON:', error);
        }
    }, [router]);
}