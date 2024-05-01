"use client"

import { use, useState } from "react";
import validator from "validator";
import { env, kill } from 'process';
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import PasswordStrengthMeter from "@/app/functions/passwordStrength.jsx";
import validatePassword from "@/app/functions/validatefunctions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTokenFromLocalStorage } from "@/utils/auth";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function AddUser() {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')



    //vamos a crear la funcion para alternar la visibilidad de la contrasena
    const tooglePasswordVisibility = () => {
        //Cambia el valor de el show password dependiendo del evento click
        // cambiara a true o false
        setShowPassword(!showPassword);
    }


    const [validationErrors, setValidationErrors] = useState({});
    const [selectedRoles, setSelectedRoles] = useState(["USER"]);
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
   

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
        if (errors[name]) {
            // Si hay un error para este campo, elimínalo del estado de errores
            setErrors({ ...errors, [name]: "" });
        }
    };



    const sanitizeFormData = () => {
        
        const sanitizedData = {};
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                const value = formData[key];
                // Sanitize the value using escape
                const sanitizedValue = validator.escape(value);
                sanitizedData[key] = sanitizedValue;
            }
        }
        return { ...sanitizedData, roles: selectedRoles };
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
        const dataSanitized = sanitizeFormData();
        
        if (Object.keys(formErrors).length === 0) {
            const token = getTokenFromLocalStorage();
            try {
                const response = await fetch('http://localhost:3001/api/usersAdmin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": token
                        
                    },
                    body: JSON.stringify(dataSanitized),
                });

                const responseData = await response.json();

                if (response.ok) {
                    setSignUpSuccess(true);
                    setTimeout(() => {
                        setSignUpSuccess(false);
                        window.location.href = '/usersAdmin'
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
        <form onSubmit={handleSubmit}>

            <div className="w-full text-3xl font-bold mb-10">
                <h3 className="w-full">Creacion de cuenta</h3>
            </div>

            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                    Nombre
                </label>
                <input
                    type="text"

                    name="nombre"
                    placeholder="Nombre completo"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="apellido" className="mb-3 block text-base font-medium text-white">
                    Apellido
                </label>
                <input
                    name="apellido"
                    type="text"
                    placeholder="Primer Apellido"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                    Apellido
                </label>
                <input
                    name="apellido2"
                    type="text"
                    placeholder="Segundo Apellido si tienes uno"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                    Email
                </label>
                <input
                    name="email"
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
                {/* Se asigna el tipo de dato que se pasa en este caso si 
           si el icono esta faEye pasa a text y si esta faEyeSlash pasa a password

          **/}
                <div className="relative">


                    <input
                        name="password"

                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        onChange={handleChange}
                    />
                    {/* Este es el icono que estara cambiando entre 
        faEyeSlash y faEye segun como se quiera ver la contrasena
        entonces en un evento on click se genera el mantener la visibilidad 

        */}
                    <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3  text-black  cursor-pointer"
                        onClick={tooglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <div>

                    <PasswordStrengthMeter password={formData.password} />
                    <p className=" mt-1 ml-1 text-white">Fuerza de la contraseña</p>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="mb-3 block text-base font-medium text-white">
                    Confirmar contraseña
                </label>
                <input
                    name="password2"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"

                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    onChange={handleChange}
                />

            </div>
            <div className="mb-5 mt-4">
                <CheckboxGroup
                    label="Seleccione roles"
                    orientation="horizontal"
                    color="secondary"
                    defaultValue={["USER"]}
                    value={selectedRoles}
                    onChange={(value) => setSelectedRoles(value)}
                    name="roles"
                >
                    <Checkbox isIndeterminate value="USER" name="rol">USER</Checkbox>
                    <Checkbox value="ADMIN" name="rol">ADMIN</Checkbox>
                </CheckboxGroup>

            </div>
            {Object.keys(errors).map((field) => (
                <div key={field} className="mb-3">
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

            <div>
                <button type="submit" className="hover:shadow-form rounded-md bg-purple-500 hover:bg-purple-600 py-3 px-8 text-base font-semibold text-white outline-none mt-5">
                    Crear
                </button>
            </div>
        </form>
    );
};

