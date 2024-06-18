"use client";
import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import {
    fetchProduct, fetchCollectionsToProduct,
    fetchCategoriesToProduct, fetchProvidersToProduct,

} from '@/utils/functions/products/products';
import { useSearchParams } from 'next/navigation';

//Create the context for the products form
export const useProductFormData = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const token = getTokenFromLocalStorage();
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [providers, setProviders] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [deletingImages, setDeletingImages] = useState({});

    useEffect(() => {
        try {
            fetchCollectionsToProduct(token, setCollections);
            fetchCategoriesToProduct(token, setCategories);
            fetchProvidersToProduct(token, setProviders);
            if(id){
                fetchProduct(id, token, setFormData, setSelectedCategory, setSelectedProvider, setSelectedCollection, setSelectedKeys, setImages, setImagePreview);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [token, id]);

    return {
        id,
        token,
        collections,
        setCollections,
        categories,
        setCategories,
        providers,
        setProviders,
        formData,
        setFormData,
        errors,
        setErrors,
        validationErrors,
        setValidationErrors,
        selectedCategory,
        setSelectedCategory,
        selectedCollection,
        setSelectedCollection,
        selectedProvider,
        setSelectedProvider,
        selectedKeys,
        setSelectedKeys,
        imagePreview,
        setImagePreview,
        images,
        setImages,
        deletingImages,
        setDeletingImages,
    }
}
