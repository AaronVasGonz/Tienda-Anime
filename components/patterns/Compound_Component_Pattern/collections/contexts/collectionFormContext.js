"use client";
import React, { createContext, useContext} from 'react';
import { handleServerErrors } from '@/utils/serverUtils';
import { handleChange,  handleSubmitUpdate, handleSubmit,handleImageChange, handleStatusChange  } from '@/utils/functions/collections/collections';
import { useCollectionFormData } from '../hooks/useCollectionForm';

//Create the context
const CollectionsFormContext = createContext();

//Hook to access the context
export const useCollectionForm = () => useContext(CollectionsFormContext);

export const CollectionFormProvider = ({ children }) => {

    return (
        <CollectionsFormContext.Provider
            value={{
                ... useCollectionFormData(),
                handleChange,
                handleImageChange,
                handleStatusChange,
                handleSubmit,
                handleSubmitUpdate,
                handleServerErrors
            }}
        >
            {children}
        </CollectionsFormContext.Provider>
    )

}