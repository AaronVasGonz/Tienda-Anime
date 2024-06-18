"use client"

import { use, useState } from "react";
import validator from "validator";
import { env } from 'process';
import PasswordStrengthMeter from "../../functions/passwordStrength";
import validatePassword from "../../functions/validatefunctions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authIfLogin } from '@/utils/authPage';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import 'animate.css';

export default function Registro() {
    authIfLogin();
    //agregar un estado para controlar la visibilidad de la contrasena
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')



    //vamos a crear la funcion para alternar la visibilidad de la contrasena
    const tooglePasswordVisibility = () => {
        //Cambia el valor de el show password dependiendo del evento click
        // cambiara a true o false
        setShowPassword(!showPassword);
    }


    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        apellido2: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const [signupSuccsess, setSignUpSuccess] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_REGISTRO_URL;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const updatedErrors = { ...errors };

        delete updatedErrors[e.target.name];
        setValidationErrors({});
        setErrors(updatedErrors);
    };



    const sanitizeFormData = () => {
        const sanitizedData = {};
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                const value = formData[key];
                // Sanitizar el valor usando escape
                const sanitizedValue = validator.escape(value);
                sanitizedData[key] = sanitizedValue;
            }
        }
        return sanitizedData; //devolvemos los datos sanitizados
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!formData.nombre) {
            formErrors.nombre = 'El nombre para el registro es obligatorio';
        }


        if (!formData.apellido) {
            formErrors.apellido = 'El apellido para el registro es obligatorio';
        }


        if (!formData.email) {
            formErrors.email = "El correo para el registro es obligatorio";
        }

        if (!formData.password) {
            formErrors.password = "La contraseña para el registro es obligatoria";
        }

        if (!validatePassword(formData.password)) {
            formErrors.password = "La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula y no puede contener espacios. Ademas debe tener una longitud entre 8 a 16 caracteres";
        }


        if (!formData.password2) {
            formErrors.password2 = "Confirmar la contraseña es obligatorio para el registro"
        }

        if (formData.password !== formData.password2) {
            formErrors.difpassword = "Las contraseñas deben de ser iguales";
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
                    setSignUpSuccess(true);
                    setTimeout(() => {
                        setSignUpSuccess(false);
                        window.location.href = '/signUp/verify?email=' + formData.email + '&name=' + formData.nombre;
                    }, 2000)

                } else {
                    console.error("Error al enviar el formulario");
                    //si la respuesta Data trae errores
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

                }
                if (responseData.error) {
                    const serverErrors = {};
                    serverErrors["email"] = responseData.error;
                    console.log("Errores del servidor:", serverErrors);
                    setValidationErrors(serverErrors);
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
        <form onSubmit={handleSubmit}
            className="flex flex-col w-full sm:items-center"
        >


            <div className="flex flex-col animate-bounce-once text-3xl text-center items-center font-bold ">
                <img 
                loading="lazy"
                src="/tanjiro.webp" 
                width={150}
                height={150}
                className="" 
                alt="tanjiroIcon" />
            </div>
            <div className="flex flex-col  text-5xl text-center font-bold mb-10 ">
                <h1 className="w-full  animate-slide-down ">Sign <span className="text-main-purple">Up</span></h1>
            </div>
            <div className=" sm:w-1/2 flex flex-col  animate-slide-left  bg-neutral-950 rounded-lg  pl-4 pr-4">
                <div className="w-full flex flex-col items-center justify-center text-center font-bold mb-10 mt-4">
                    <h2 className="text-2xl mb-4">Create Your Account</h2>
                    <p className="text-xl">You can create your account here.</p>
                </div>

                <div className="mb-5 flex flex-col items-center">
                    <Input
                        name="nombre"
                        type="text"
                        label="Name"
                        labelPlacement="inside"
                        placeholder="Name"
                        className=" sm:w-1/2  "
                        onChange={handleChange}
                    />

                </div>
                <div className="mb-5 flex flex-col items-center">

                    <Input
                        name="apellido"
                        type="text"
                        label="First Last Name"
                        labelPlacement="inside"
                        placeholder="Last name"
                        className=" sm:w-1/2  "
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 flex flex-col items-center">
                    <Input
                        name="apellido2"
                        type="text"
                        label="Second Last Name (optional)"
                        labelPlacement="inside"
                        placeholder="Second last name "
                        className=" sm:w-1/2  "
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 flex flex-col items-center">
                    <Input
                        name="email"
                        type="email"
                        label="Your Email"
                        labelPlacement="inside"
                        placeholder="Email "
                        className=" sm:w-1/2  "
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 flex flex-col items-center">

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
                <div className="mb-5 flex flex-col items-center">

                    <Input
                        name="password2"
                        type={showPassword ? "text" : "password"}
                        placeholder="You password"
                        label="Password"
                        className="sm:w-1/2  "
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 flex flex-col w-1/2 text-center ml-auto mr-auto">
                    <PasswordStrengthMeter password={formData.password} />
                    <p className=" mt-1 ml-1 text-white">Strength meter</p>
                </div>
                <div className="flex flex-col   items-center justify-center">
                    <button type="submit" className="login-button mt-4 mb-6">
                        Registrarse
                    </button>
                </div>
            </div>
            {errors && Object.keys(errors).map((field) => (
                <div key={field} className='flex flex-col items-center sm:w-1/2'>
                    <div className="bg-red-700 p-2 text-center rounded mt-4">
                        <p className="text-white text-base">{errors[field]}</p>
                    </div>
                </div>
            ))}
            {Object.keys(validationErrors).map((field) => (
                <div key={field} className="mb-3 mt-4">
                    <div className="bg-red-700 p-2 rounded">
                        <p className="text-white text-base"> {validationErrors[field]}</p>
                    </div>

                </div>
            ))}

            {signupSuccsess && (
                <div className=" flex align-center justify-center bg-green-600 p-3 rounded max-w-md">
                    <h2 className="text-white mb-5 font-bold text-2xl mt-3">Registro exitoso</h2>
                </div>
            )}

        </form>
    );
};