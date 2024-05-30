"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { handleServerErrors } from "../../utils/serverUtils";
import { authIfLogin } from '../../utils/authPage';
import { encryptData, decryptData } from "../../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"; // Importa solo el icono faEye
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash"; // Importa solo el icono faEyeSlash
import { saveTokenToLocalStorage } from '../../utils/auth';
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/react";

export default function Login() {
    const searchParams = useSearchParams();
    const confirm = searchParams.get('confirm');
    const [showPassword, setShowPassword] = useState(false);
  


    authIfLogin();
    //funcion para alternar la visivilidad del password
    const tooglePasswordVisibility = () => {

        setShowPassword(!showPassword);
    };

    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        correo: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [signInSuccsess, setSignInSuccess] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL;
    const Router = useRouter();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Eliminar el error relacionado con el campo actual
        const updatedErrors = { ...errors };

        delete updatedErrors[e.target.name];
        setValidationErrors({});
        setErrors(updatedErrors);
    }
    //funcion para zanitizar datos
    const sanitizeFormData = async () => {
        const validator = await import("validator");
        const sanitizedData = {};
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                const value = formData[key];
                //Procedemos a sanitizar los datos
                const sanitizedValue = validator.escape(value);
                sanitizedData[key] = sanitizedValue;
            }
        }
        return sanitizedData; //se devuelve los datos sanitizados
    };

    const validateFormErrors = () => {
        const formErrors = {};
        if (!formData.correo) {
            formErrors.correo = "The field email is required to Sign in"
        }

        if (!formData.password) {
            formErrors.password = "The field password is required to Sign in"
        }

        return formErrors;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateFormErrors();

        if (Object.keys(formErrors).length === 0) {
            const formDataSanitized = await sanitizeFormData();
            try {
                const response = await fetch(`${apiUrl}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataSanitized),
                });

                const responseData = await response.json();

                if (response.ok) {
                    const userEncrypted = await encryptData(responseData.user);
                    //console.log(responseData);
                    const iv = userEncrypted.encryptedIV;
                    const user = userEncrypted.encryptedPayload;
                    localStorage.setItem("User", user);
                    localStorage.setItem('project', iv);
                    saveTokenToLocalStorage(responseData.token);
                    setSignInSuccess(true);
                    setErrors(null);
                    window.location.href = "/";
                } else {
                    console.error("Error al enviar el formulario");
                    console.log(responseData)
                    handleServerErrors(responseData, setValidationErrors, setErrors);
                }
            } catch (error) {
                console.log('error en la solicitud:', error)
                console.error('Error en la solicitud:', error);
            }
        } else {
            setErrors(formErrors);
        }

    };

    return (

        <form
            className="flex flex-col w-full sm:items-center"
            onSubmit={handleSubmit}>
            {!confirm ? (
                <div></div>
            ) : (
                <div className="w-full text-2xl text-white px-6 py-3 bg-green-700 rounded mb-10">
                    <h1 className="w-full">Cuenta confirmada con éxito!</h1>
                </div>
            )}
            <div className="flex flex-col animate-bounce-once text-3xl text-center items-center font-bold ">
                <img src="/gokuIcon.webp" className=""
                    width={150}
                    height={150}
                    loading="lazy"
                    alt="Goku Icon"
                     />
            </div>
            <div className="flex flex-col  text-5xl text-center font-bold mb-10 ">
                <h1 className="w-full  animate-slide-down ">Sign <span className="spanIn text-6xl">In</span></h1>
            </div>

            <div className=" sm:w-1/2 flex flex-col  animate-slide-left  bg-neutral-950 rounded-lg  pl-4 pr-4">
                <div className="w-full flex flex-col text-xl items-center justify-center text-center font-bold mb-10 mt-4">
                    <h3 className="w-full">Please, enter your credentials</h3>
                </div>
                <div className="mb-5 flex flex-col items-center">
                    <Input

                        name="correo"
                        type="email"
                        label="Email"
                        labelPlacement="inside"
                        placeholder="Your email"
                        className=" sm:w-1/2  "
                        onChange={handleChange}
                    />

                </div>
                <div className="mb-5 flex flex-col">
                    <div className="flex flex-col items-center">
                        <Input

                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="You password"
                            label="Password"
                            className="sm:w-1/2  "
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
                </div>
                <div className="flex flex-col   items-center justify-center">
                    <button aria-labelledby="signIn" id="signIn" className="login-button mt-4 mb-6">
                        Sign In
                    </button>
                </div>
            </div>

            {errors && Object.keys(errors).map((field) => (
                <div key={field} className='w-1/2'>
                    <div className="bg-red-700 p-2 text-center  rounded mt-4">
                        <p className="text-white text-base">{errors[field]}</p>
                    </div>
                </div>
            ))}


            {Object.keys(validationErrors).map((field) => (
                <div key={field}  className='w-1/2'>
                     <div className="bg-red-700 p-2 text-center  rounded mt-4">
                     <p className="text-white text-base"> {validationErrors[field]}</p>
                    </div>

                </div>
            ))}

            {signInSuccsess && (
                <div className=" mb-3  p-2 rounded">
                    <h2 className="text-green-600 text-base">Inicio de Sesion Exitoso</h2>
                </div>
            )}


        </form>
    );
};