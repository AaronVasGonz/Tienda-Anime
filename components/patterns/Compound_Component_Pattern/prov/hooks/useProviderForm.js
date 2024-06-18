
"use client"
import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { useSearchParams } from 'next/navigation';
import { fetchProvider } from '@/utils/functions/providersFunctions/providers';
export const useProviderFormData = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const token = getTokenFromLocalStorage();
    const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
    const [validationErrors, setValidationErrors] = useState({});
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (id) {
            fetchProvider(id, setFormData, token);
        }
    }, [id, token]);

    return{
        id,
        token,
        selectedKeys,
        setSelectedKeys,
        validationErrors,
        setValidationErrors,
        errors,setErrors,
        formData, setFormData
    }
}
