
"use client"
import React, { createContext, useContext, } from 'react';
import { handleChange, handleSubmit, handleSubmitUpdate } from "@/utils/functions/users(admin)/users";
import { useUserFormData } from '../hooks/useUserForm';

const UserFormContext = createContext();

export const useUserForm = () => useContext(UserFormContext);

export const UserFormProvider = ({ children }) => {
    
    return (
        <UserFormContext.Provider
            value={{
                ...useUserFormData(),
                handleChange,
                handleSubmit,
                handleSubmitUpdate
            }}>
            {children}
        </UserFormContext.Provider>
    )
}


