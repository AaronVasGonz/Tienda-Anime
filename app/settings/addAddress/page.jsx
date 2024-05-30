'use client'
import { useState } from 'react';
import { Textarea } from "@nextui-org/react";
import { getTokenFromLocalStorage } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { handleServerErrors } from '@/utils/serverUtils';
import validator from 'validator';

export default function AddressForm() {

    const [address, setAddress] = useState({ address: "" });
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});



    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address.address) {
            newErrors.address = "Please enter your address";
        }
        return newErrors;
    };

    const sanitizeData = (data) => {
        const sanitizedData = {};
        for (const [key, value] of Object.entries(data)) {
            sanitizedData[key] = validator.trim(value);
            sanitizeData[key] = validator.escape(value);
        }
        return sanitizedData;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        const sanitizeFormData = sanitizeData(address);
        if (Object.keys(formErrors).length === 0) {
            const token = getTokenFromLocalStorage();
            const response = await fetch('http://localhost:3001/api//userDetails/address', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ address: sanitizeFormData.address })
            })
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData);
                Router.push('/settings');
            } else {
                handleServerErrors(responseData, setValidationErrors, setErrors);
            }
        } else {
            setErrors(phoneErrors);
        }
    };




    return (
        <div className='flex flex-col  animate-slide-left items-center'>
            <h1 className="text-3xl font-bold mb-3">Address <span className="text-main-purple">Form</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-1/2 items-center bg-neutral-900 rounded-lg p-10'>
                <h2 className="flex flex-col  text-lg mb-3 capitalize">Add your Address here</h2>
                <div className='flex flex-col sm:w-1/2 items-center mb-5'>
                    <Textarea
                        isRequired
                        label="Address"
                        name="address"
                        labelPlacement="outside"
                        placeholder="Please enter your address here"
                        className="max-w-xs"
                        onChange={handleChange}
                    />

                </div>
                <button className='flex flex-col items-center justify-center mt-4 w-1/2  login-button '>
                    Save
                </button>
            </form>
            {Object.keys(errors).length > 0 && (
                <div className="text-red-500 mt-4">
                    {Object.values(errors).map((error) => (
                        <p key={error}>{error}</p>
                    ))}
                    {Object.keys(validationErrors).length > 0 && (
                        <div className="text-red-500 mt-4">
                            {Object.values(validationErrors).map((error) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
};

