
"use client"
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from './auth';
import { usePathname, useRouter } from 'next/navigation';
import { use, useState, useEffect } from "react";

export const  authIfLogin = () => {
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