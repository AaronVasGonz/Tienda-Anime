"use client"
import {createContext, useContext } from 'react';
import {
    handleChange,
    handleFileChange,
    handleSubmit,
    handleDeleteAccount
} from '@/utils/functions/userFunctions/userDetails';
import { useUserFormSettingsData } from '../hooks/useUserFormSettings';

const UserSettingsContext = createContext();

export const useUserFormSettings = () => useContext(UserSettingsContext);

export const UserSettingsProvider = ({ children }) => {

    return (
        <UserSettingsContext.Provider
            value={{
                ...useUserFormSettingsData(),
                handleDeleteAccount,
                handleFileChange,
                handleChange,
                handleSubmit,
            }}>
            {children}
        </UserSettingsContext.Provider>
    );
}
