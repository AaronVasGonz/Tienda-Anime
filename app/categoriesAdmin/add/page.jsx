
"use client"
import { useState, useEffect, useMemo } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import validator from 'validator';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';

export default function AddCategory() {
    const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});


    const [formData, setFormData,] = useState({
        Detalle: "",
        status: null,
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        console.log(formData);
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" })

        }
    }
    const handleStatusChange = (key) => {
        const status = key// Acceder al primer elemento del array de selectedKeys
        setFormData({ ...formData, status });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!formData.Detalle) {
            formErrors.detalle = 'Debe asignar un nombre a la categoria';
        }
        if (!formData.status) {
            formErrors.status = 'Debe asignar un status a la categoria';

        }
        if (Object.keys(formErrors).length === 0) {
            try {
                const token = getTokenFromLocalStorage();

                const sanitizeDetalle = validator.escape(formData.Detalle);
                const sanitizedSatus = validator.escape(formData.status.anchorKey);

                const formDataToSend = {
                    Detalle: sanitizeDetalle,
                    status: sanitizedSatus
                };
                const formDataJSON = JSON.stringify(formDataToSend);


                const response = await fetch('http://localhost:3001/api/categoriesAdmin', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'content-type': 'application/json'
                    },
                    body: formDataJSON

                });

                const responseData = await response.json();

                if (response.ok) {

                    console.log("La categoria se ha creado correctamente");
                    window.location.href = '/categoriesAdmin';
                } else {
                    console.log("Error al crear la categoria");
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
                        serverErrors["error"] = responseData.error;
                        console.log("Errores del servidor:", serverErrors);
                        setValidationErrors(serverErrors);
                    }
                }
            } catch (error) {

            }
        } else {
            setErrors(formErrors);
        }
    }
    return (
        <form className="w-full" onSubmit={handleSubmit}>

            <div className="w-full text-3xl font-bold mb-10">
                <h3 className="w-full">Creacion de categoria</h3>
            </div>
            <div className="mb-5">
                <label htmlFor="Detalle" className="mb-3 block text-base font-medium text-white">
                    Nombre de la categoria
                </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="Detalle"
                    placeholder="Nombre completo"
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"

                />
            </div>
            <div className="mb-5">
                <label htmlFor="status" className="mb-3 block text-base font-medium text-white">
                    Seleccione un status
                </label>
                <Dropdown
                    backdrop="blur"
                    value={formData.status}
                >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            color='secondary'
                            className="capitalize"
                        >
                            {formData.status || 'Seleccione una opción'}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        disallowEmptySelection
                        variant='faded'
                        color='secondary'
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleStatusChange}
                    >
                        <DropdownItem key="Activo" value={"Activo"}>Activo</DropdownItem>
                        <DropdownItem key="Inactivo" value={"Inactivo"}>Inactivo</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

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
            <div>
                <button type="submit" className="hover:shadow-form rounded-md bg-purple-500 hover:bg-purple-600 py-3 px-8 text-base font-semibold text-white outline-none mt-5">
                    Crear Categoria
                </button>
            </div>
        </form>
    );
};

