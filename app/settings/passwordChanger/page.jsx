"use client"
import { Input } from '@nextui-org/input';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleServerErrors } from '@/utils/serverUtils';
import { fetchUserData, validateEmailData, sanitizeUserData } from '@/utils/functions/userFunctions/userDetails';
import { getTokenFromLocalStorage } from '@/utils/auth';
function PasswordChanger() {
    const [userData, setUserData] = useState({
        Apellido: "",
        Apellido2: "",
        Imagen: "",
        Nombre: "",
        Telefono: "",
        correo: "",
        direccion: "",
        id_Usuario: "",
        imageUrl: ""
    });
    const router = useRouter();
    const [image, setImage] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchUserData(id, setUserData, setImage);
    }, [id]);


    const onChange = (e) => {
        setUserData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailErrors = validateEmailData(userData);
        const sanitizedData = sanitizeUserData(userData);
        if (Object.keys(emailErrors).length === 0) {
            try {
                const token = getTokenFromLocalStorage();
                const sanitizedEmail = sanitizedData.correo;
                const response = await fetch(`http://localhost:3001/api/userDetails/password/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ email: sanitizedEmail })
                })
                const responseData = await response.json();
                if (response.ok) {
                    router.push('/settings/passwordChanger/message?name=' + sanitizedData.Nombre+'&email=' + sanitizedData.correo);
                } else {
                    handleServerErrors(responseData, setValidationErrors, setErrors);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setErrors(emailErrors);
        }
    }

    return (
        <div className="flex flex-col max-w-xl items-center mx-auto justify-center">

            <h1 className='mb-5 text-3xl font-bold capitalize'>Change your <span className='text-main-purple'>password</span></h1>
            {errors && Object.keys(errors).map((field) => (
                <div key={field} className='mb-3'>
                    <div className="bg-red-700 p-2 text-center rounded ">
                        <p className="text-white text-base">{errors[field]}</p>
                    </div>
                </div>
            ))}

            {Object.keys(validationErrors).map((field) => (
                <div key={field} className="mb-3">
                    <div className="bg-red-700 text-center p-2 rounded">
                        <p className="text-white text-base"> {validationErrors[field]}</p>
                    </div>
                </div>
            ))}
            <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center rounded-lg  bg-neutral-950 p-5 '>
                <div className='flex flex-col w-1/2 items-center mb-5'>
                    <h2 className='text-center' >If you want to change your password will send you an email to confirm your new password</h2>
                    <Input
                        name="correo"
                        type='email'
                        isRequired
                        label="Email"
                        value={userData?.correo}
                        labelPlacement="outside"
                        onChange={onChange}
                    />
                </div>
                <div className='flex flex-col w-1/2 items-center mb-5 mt-5'>
                    <button className='login-button'>Send</button>
                </div>
            </form>

        </div>
    );
};

export default PasswordChanger;