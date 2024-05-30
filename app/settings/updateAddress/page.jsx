'use client'
import { useEffect, useState } from 'react';
import { Textarea } from "@nextui-org/react";
import { getTokenFromLocalStorage } from '@/utils/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleServerErrors } from '@/utils/serverUtils';
import { fetchAddress } from '@/utils/functions/userFunctions/userDetails';
import validator from 'validator';

export default function UpdateAddressForm() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchAddress(id, setAddress);
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddress(value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address) {
            newErrors.address = "Please enter your address";
        }
        return newErrors;
    };

    const sanitizeData = (data) => {
        return {
            address: validator.escape(validator.trim(data))
        };
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        const sanitizedFormData = sanitizeData(address);
        if (Object.keys(formErrors).length === 0) {
            const token = getTokenFromLocalStorage();
            const response = await fetch(`http://localhost:3001/api/userDetails/address/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(sanitizedFormData)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData);
                router.push('/settings?successAddress=true');
            } else {
                handleServerErrors(responseData, setValidationErrors, setErrors);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className='flex flex-col  animate-slide-left items-center'>
            <h1 className="text-3xl font-bold mb-3">Address <span className="text-main-purple">Form</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-1/2 items-center bg-neutral-900 rounded-lg p-10'>
                <h2 className="flex flex-col  text-lg mb-3 capitalize">Update your Address here</h2>
                <div className='flex flex-col sm:w-1/2 items-center mb-5'>
                    <Textarea
                        isRequired
                        label="Address"
                        id='address'
                        name="address"
                        labelPlacement="outside"
                        placeholder="Please enter your address here"
                        className="max-w-xs"
                        value={address} // Corrected the value to address
                        onChange={handleChange}
                    />
                </div>
                {errors.address && (
                    <div className="text-red-500">{errors.address}</div>
                )}
                <button type="submit" className="update-button text-2xl hover:bg-blue-600 rounded-lg px-6 py-2 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">
                    Update Address
                </button>
            </form>
        </div>
    );
}