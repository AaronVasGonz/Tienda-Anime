"use client";
import React, {  useState, useEffect } from 'react';
import { getTokenFromLocalStorage, getUserFromLocalStorage} from '@/utils/auth';
import {  fetchCollection} from '@/utils/functions/collections/collections';
import { useSearchParams } from 'next/navigation';

export const useCollectionFormData = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const token = getTokenFromLocalStorage();
    const user =  getUserFromLocalStorage();
    const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
    const [imagePreview, setImagePreview] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            fetchCollection(id, token, setFormData, setImagePreview);
        }
    }, [id, token]) // Add `id` and `token` as dependencies

    return {
        id,
        token,
        user,
        selectedKeys,
        setSelectedKeys,
        validationErrors,
        setValidationErrors,
        errors,
        setErrors,
        formData,
        setFormData,
        imagePreview,
        setImagePreview
    }
}

