"use client"
import React, { createContext, useContext} from 'react';
import {  handleSubmit, handleSubmitUpdate ,handleChange, handleStatusChange } from '@/utils/functions/providersFunctions/providers';
import { useProviderFormData } from '../hooks/useProviderForm';

const ProviderFormContext = createContext();

export const useProviderForm = () => useContext(ProviderFormContext);

export const ProvFormProvider = ({ children }) => {

    return (
        <ProviderFormContext.Provider
            value={{
                ...useProviderFormData(),
                handleSubmit,
                handleSubmitUpdate,
                handleChange,
                handleStatusChange,
            }}
        >
            {children}
        </ProviderFormContext.Provider>
    )



}