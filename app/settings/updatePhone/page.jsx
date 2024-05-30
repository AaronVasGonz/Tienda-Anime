"use client";
import { useEffect, useState, useRef } from 'react';
import { Input } from '@nextui-org/input';
import { validatePhoneError, fetchCountries } from '../../../utils/functions/userFunctions/userDetails';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { handleServerErrors } from '@/utils/serverUtils';
import { fetchPhone } from '../../../utils/functions/userFunctions/userDetails';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PhoneForm() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [phone, setPhone] = useState("");
    const [countries, setCountries] = useState([]);
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const selectRef = useRef(null);

    useEffect(() => {
        if (id) {
            fetchPhone(id, setPhone, setSelectedCountry);
        }
    }, [id]);

    const handleChangePhone = (event) => {
        const { name, value } = event.target;
        setPhone((prevState) => ({ ...prevState, [name]: value }));
        console.log(phone);
        console.log(selectedCountry);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const phoneErrors = validatePhoneError(phone, selectedCountry);

        if (Object.keys(phoneErrors).length === 0) {
            const completedPhone = `${selectedCountry}-${phone.phone}`;
            const token = getTokenFromLocalStorage();
            const response = await fetch(`http://localhost:3001/api/userDetails/phone/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ phone: completedPhone })
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData);
                router.push('/settings?successPhone=true');
            } else {
                handleServerErrors(responseData, setValidationErrors, setErrors);
            }
        } else {
            setErrors(phoneErrors);
        }
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase()) ||
        country.code.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const fetchCountriesData = async () => {
            const codeCountries = await fetchCountries();
            setCountries(codeCountries);
        };
        fetchCountriesData();
    }, []);


    return (
        <div className='flex flex-col animate-slide-left items-center'>
            <h1 className="text-3xl font-bold mb-3">Phone <span className="text-main-purple">Form</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:w-1/2 animate-slide-left items-center bg-neutral-900 rounded-lg sm:p-10 p-5 ml-10 mr-10'>
                <h2 className="flex flex-col text-lg mb-3 capitalize">Add your Phone Number here</h2>
                <div className='flex flex-col w-full mb-2'>
                    <label className='mb-2' htmlFor="country">Please select your country</label>
                    <select
                        className='flex flex-col dropdown mt-2 p-2 border border-gray-300 rounded'
                        onChange={handleCountryChange}
                        value={selectedCountry}
                        ref={selectRef}
                    >
                        <option className='dropdown-item' value="">Select Country</option>
                        {filteredCountries.map((country, index) => (
                            <option key={`${country.code}-${index}`} value={country.code}>
                                {country.name + " (" + country.code + ")"}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full items-center mb-5'>
                    <Input
                        name="phone"
                        type="number"
                        isRequired
                        label="Phone Number"
                        labelPlacement="outside"
                        value={phone.phone}
                        onChange={(e) => handleChangePhone(e)}
                    />
                </div>
                <button className='flex flex-col items-center justify-center mt-4 w-1/2 update-button'>
                    Update
                </button>
            </form>
            {Object.keys(errors).length > 0 && (
                <div className="text-red-500">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
}