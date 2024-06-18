"use client"

import React, { createContext, useContext} from 'react';
import {handleChange, handleStatusChange, handleSubmit, handleSubmitUpdate} from '@/utils/functions/categories/categories';
import { useCategoryFormData } from '../hooks/useCategoryFormData';

//Create the category form context
const CategoryFormContext = createContext();

export const useCategoryForm = () => useContext(CategoryFormContext);

export const CategoryFormProvider = ({ children }) => {

    return (
        <CategoryFormContext.Provider
            value={{
                ...useCategoryFormData(),
                handleChange,
                handleStatusChange,
                handleSubmit,
                handleSubmitUpdate
            }}
        >
            {children}
        </CategoryFormContext.Provider>
    )
}

