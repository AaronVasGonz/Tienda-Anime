"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTokenFromLocalStorage } from '@/utils/auth';
import {
    fetchUserData, 
    getUserDataFromLocalStorage,
} from '@/utils/functions/userFunctions/userDetails';

export const useUserFormSettingsData = () => {
    const useSearch = useSearchParams();
    const success = useSearch.get('success');
    const successAddress = useSearch.get('successAddress');
    const successPhone = useSearch.get('successPhone');
    const successPassword = useSearch.get('successPassword');
    const [selectedFile, setSelectedFile] = useState(null);
    const token = getTokenFromLocalStorage();
    const [avatarUrl, setAvatarUrl] = useState('/verifylogo.jpg');
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({ id: '', Nombre: '', Apellido: '', Apellido2: '', correo: '', Telefono: '', direccion: '' });
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [id, setId] = useState(null);

    useEffect(() => {
        getUserDataFromLocalStorage(setId);
      }, []);

      useEffect(() => {
        fetchUserData(id, setUserData, setImage);
      }, [id]);

      return{
        id,
        token,
        success,
        successAddress,
        successPhone,
        successPassword,
        selectedFile,
        setSelectedFile,
        avatarUrl,
        setAvatarUrl,
        image,
        setImage,
        userData,
        setUserData,
        errors,
        setErrors,
        validationErrors,
        setValidationErrors,
        setId,
      }
}



