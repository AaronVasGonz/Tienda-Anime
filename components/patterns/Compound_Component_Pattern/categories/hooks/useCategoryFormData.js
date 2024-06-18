
"use client"
import { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {fetchCategory } from '@/utils/functions/categories/categories';

export const useCategoryFormData = () => {
    const token = getTokenFromLocalStorage();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedKeys, setSelectedKeys] = useState('');
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const router = useRouter();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (id) {
            fetchCategory(id, token, setFormData);
        }
    }, [id, token]);
    
    return {
        id,
        token,
        selectedKeys,
        setSelectedKeys,
        validationErrors,
        setValidationErrors,
        errors,
        setErrors,
        formData,
        setFormData,
        router
    }
}