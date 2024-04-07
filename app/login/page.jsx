"use client"

import { use, useState, useEffect } from "react";
import validator from "validator";
import { usePathname, useRouter } from 'next/navigation';
import { authIfLogin} from '../../utils/authPage';
import { env } from "process";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { saveTokenToLocalStorage } from '../../utils/auth';
export default function Login() {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" })
        }
    }
    //funcion para zanitizar datos
    const sanitizeFormData = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};

        if (!formData.correo) {
            formErrors.correo = "El campo correo es obligatorio para iniciar sesion"
        }

        if (!formData.password) {
            formErrors.password = "El campo contraseña es obligatorio para iniciar sesion"
        }


        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await fetch(`${apiUrl}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sanitizeFormData()),
                });

                const responseData = await response.json();

                if (response.ok) {
                    //console.log(responseData);
                    localStorage.setItem('user', JSON.stringify(responseData.user));
                    saveTokenToLocalStorage(responseData.token);
                    setSignInSuccess(true);
                    setErrors(null);
                    window.location.href = "/";

                } else {
                    console.error("Error al enviar el formulario");
                    console.log(responseData)
                    if (responseData.errors) {
                        //entonces creamos un objeto de errores del servidor
                        const serverErrors = {};
                        responseData.errors.forEach(error => {

                            // El campo `param` contiene el nombre del campo asociado al error
                            serverErrors[error.param] = error.msg;
                        });
                        console.log("Errores del servidor:", serverErrors);
                        setValidationErrors(serverErrors);
                    }

                    if (responseData.error) {
                        const serverErrors = {};
                        serverErrors["email"] = responseData.error;
                        console.log("Errores del servidor:", serverErrors);
                        setValidationErrors(serverErrors);
                    }
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
        <form onSubmit={handleSubmit}>
            <div className="w-full text-6xl font-bold mb-10">
                <h1 className="w-full">Acceso</h1>
            </div>
            <div className="w-full text-3xl font-bold mb-10">
                <h3 className="w-full">Aquí puedes iniciar sesion</h3>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                    Email
                </label>
                <input
                    name="correo"
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5 flex flex-col">
                <label htmlFor="password" className="mb-3 block text-base font-medium text-white">
                    Contraseña
                </label>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        onChange={handleChange}
                    />
                    <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3  text-black  cursor-pointer"
                        onClick={tooglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
            </div>

            {errors && Object.keys(errors).map((field) => (
                <div key={field} className='mb-3'>
                    <div className="bg-red-700 p-2 rounded">
                        <p className="text-white text-base">{errors[field]}</p>
                    </div>
                </div>
            ))}
            {Object.keys(validationErrors).map((field) => (
                <div key={field} className="mb-3">
                    <div className="bg-red-700 p-2 rounded">
                        <p className="text-white text-base"> {validationErrors[field]}</p>
                    </div>

                </div>
            ))}

            {signInSuccsess && (
                <div className=" mb-3 bg-green-600 p-2 rounded">
                    <h2 className="text-white text-base">Inicio de Sesion Exitoso</h2>
                </div>
            )}


            <div>
                <button className="hover:shadow-form rounded-md bg-purple-500 hover:bg-purple-600 py-3 px-8 text-base font-semibold text-white outline-none">
                    Iniciar Sesion
                </button>
            </div>
        </form>
    );
};