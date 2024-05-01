
"use client"

import { getTokenFromLocalStorage } from "@/utils/auth"
import validator from "validator";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
export const UpdateUserForm = () => {


    const token = getTokenFromLocalStorage();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const url = `http://localhost:3001/api/usersAdmin/${id}`;

    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        Nombre: "",
        Apellido: "",
        Apellido2: "",
        correo: ""
    });
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);
    const [roles, selectedRoles] = useState(["USER"]);


    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            // Si hay un error para este campo, elimínalo del estado de errores
            setErrors({ ...errors, [name]: "" });
        }
        console.log(formData);
    };

    useEffect(() => {

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.user.length > 1) {
                    const consolidateUser = {
                        ...data.user[0],
                        roles: data.user.map(u => u.Rol)
                    };
                    const { Nombre, Apellido, Apellido2, correo, roles } = consolidateUser;
                    setFormData({
                        Nombre,
                        Apellido,
                        Apellido2,
                        correo
                    }
                    );
                    selectedRoles(roles);
                } else {
                    console.log("Usuario normal", data.user[0]);
                    const { Nombre, Apellido, Apellido2, correo, Rol } = data.user[0];

                    setFormData({
                        Nombre,
                        Apellido,
                        Apellido2,
                        correo
                    }
                    );

                }
            })
            .catch(error => {
                console.error('Error al traer usuarios:', error);
            })
    }, [id]);

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
        return { ...sanitizedData, roles: roles };
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!formData.Nombre) {
            formErrors.nombre = 'El nombre para el registro es obligatorio';
        }


        if (!formData.Apellido) {
            formErrors.apellido = 'El apellido para el registro es obligatorio';
        }


        if (!formData.correo) {
            formErrors.email = "El correo para el registro es obligatorio";
        }
  
        const dataSanitized = sanitizeFormData();
        console.log(dataSanitized);
        if (Object.keys(formErrors).length === 0) {
            const token = getTokenFromLocalStorage();
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": token

                    },
                    body: JSON.stringify(dataSanitized),
                });

                const responseData = await response.json();

                if (response.ok) {
                        window.location.href = '/usersAdmin'
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-full text-6xl font-bold mb-10">
                    <h1 className="w-full">Únete a nuestra comunidad</h1>
                </div>
                <div className="w-full text-3xl font-bold mb-10">
                    <h3 className="w-full">Crea tu cuenta</h3>
                </div>

                <div className="mb-5">
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                        Nombre
                    </label>
                    <input
                        type="text"

                        name="Nombre"
                        placeholder="Nombre completo"
                        value={formData.Nombre}
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="apellido" className="mb-3 block text-base font-medium text-white">
                        Apellido
                    </label>
                    <input
                        name="Apellido"
                        type="text"
                        value={formData.Apellido}
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
                        name="Apellido2"
                        type="text"
                        value={formData.Apellido2}
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
                        name="correo"
                        type="email"
                        value={formData.correo}
                        placeholder="Tu correo electrónico"
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 mt-4">
                    {

                    }
                    <CheckboxGroup
                        label="Seleccione roles"
                        orientation="horizontal"
                        color="secondary"
                        defaultValue={["USER"]}
                        value={roles}
                        onChange={selectedRoles}
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
                        Actualizar Usuario
                    </button>
                </div>

            </form>
        </div>
    )
}