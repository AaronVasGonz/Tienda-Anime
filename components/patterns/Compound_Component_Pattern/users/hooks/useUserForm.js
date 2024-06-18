


"use client"
import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { fetchUser } from "@/utils/functions/users(admin)/users";
import { useSearchParams } from 'next/navigation';

export const useUserFormData = () => {

    const token = getTokenFromLocalStorage();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const tooglePasswordVisibility = () => {
        //Cambia el valor de el show password dependiendo del evento click
        // cambiara a true o false
        setShowPassword(!showPassword);
    }
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedRoles, setSelectedRoles] = useState(["USER"]);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        apellido2: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});

    useEffect( ()=>{
        if (id) {

            fetchUser(id, token, setFormData, selectedRoles);
        }
    }, [id, token, selectedRoles]);

    return {
        id,
        token,
        showPassword,
        setShowPassword,
        password,
        setPassword,
        tooglePasswordVisibility,
        validationErrors,
        setValidationErrors,
        selectedRoles,
        setSelectedRoles,
        formData,
        setFormData,
        errors,
        setErrors
    }
}

