"use client"
import React, { useEffect, useState} from 'react';
import { Input,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordStrengthMeter from "../../../functions/passwordStrength";
import { getTokenFromLocalStorage } from '@/utils/auth';
import { handleServerErrors } from '@/utils/serverUtils';

import validator from "validator";
import { validatePasswordError, sanitizeUserData, getUserDataFromLocalStorage } from '@/utils/functions/userFunctions/userDetails.js';

function UpdatePassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const confirm = searchParams.get('confirm');

    const [id, setId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!token || !email || !confirm) {
            router.push('/');
        }
    }, [token, email, confirm, router]);

    if (!token || !email || !confirm) {
        return null; // Retorna null mientras se redirige
    }
    useEffect(() => {
        getUserDataFromLocalStorage(setId);
    }, [router]);



    const tooglePasswordVisibility = () => {
        //Cambia el valor de el show password dependiendo del evento click
        // cambiara a true o false
        setShowPassword(!showPassword);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData);
        const updateErrors = { ...errors };
        delete updateErrors[name];
        setErrors(updateErrors);
    }


    const handleSubmit = async(event) => {
        event.preventDefault();
        const passwordErrors = validatePasswordError(formData);
        if (Object.keys(passwordErrors).length === 0) {
            try {
                const sanitizeData = sanitizeUserData(formData);
                const token = getTokenFromLocalStorage();
                const response = await fetch(`http://localhost:3001/api/userDetails/passwotd/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(sanitizeData)
                });

                const responseData = await response.json();

                if (response.ok) {
                    router.push('/settings?successPassword=true');
                } else {
                    handleServerErrors(responseData, setValidationErrors, setErrors);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setErrors(passwordErrors);
        }

    }

    return (
        <div className="flex flex-col max-w-xl items-center mx-auto justify-center">
            <h1 className='mb-5 text-3xl font-bold capitalize'>Change your <span className='text-main-purple'>password</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center rounded-lg bg-neutral-950 p-5'>
                <h2 className='text-2xl'>Enter your new password</h2>
                <div className="mb-3 flex flex-col w-1/2 mt-5 items-center">
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        labelPlacement='outside'
                        onChange={handleChange}
                        endContent={
                            <span
                                className="  text-wite  cursor-pointer mb-1"
                                onClick={tooglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        }
                    />
                </div>
                <div className="mb-5 flex flex-col w-1/2 items-center">

                    <Input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        label="Confirm password"
                        className=" "
                        labelPlacement='outside'
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 flex flex-col w-1/2 text-center ml-auto mr-auto">
                    <PasswordStrengthMeter password={formData.password} />
                    <p className=" mt-1 ml-1 text-white">Strength meter</p>
                </div>
                <div className='flex flex-col w-1/2 items-center mb-5 mt-5'>
                    <button className='login-button'>Submit</button>
                </div>

            </form>
            {errors && Object.keys(errors).map((field) => (
                <div key={field} className='flex flex-col items-center'>
                    <div className="bg-red-700 p-2 text-center rounded mt-4">
                        <p className="text-white text-base">{errors[field]}</p>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default UpdatePassword;