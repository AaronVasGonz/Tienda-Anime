"use client";
import React, { createContext, useContext } from 'react';
import {
    handleProductChange, handleProductStatusChange,
    handleProductImageChange,
    handleProductCategoryChange, handleProductProviderChange,
    handleProductCollectionChange, handleSubmit,
    handleSubmitUpdate
} from '@/utils/functions/products/products';
import { useProductFormData } from '../hooks/useFormProduct';

const ProductFormContext = createContext();

export const useProductForm = () => useContext(ProductFormContext);

export const ProductFormProvider = ({ children }) => {
    return (
        <ProductFormContext.Provider
            value={
                {
                    ...useProductFormData(),
                    handleSubmit,
                    handleSubmitUpdate,
                    handleProductChange,
                    handleProductStatusChange,
                    handleProductImageChange,
                    handleProductCategoryChange,
                    handleProductProviderChange,
                    handleProductCollectionChange
                }
            }
        >
            {children}
        </ProductFormContext.Provider>
    )
}
