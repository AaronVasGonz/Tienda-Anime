
import { useState, useEffect, useMemo } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import validator from 'validator';
import { useSearchParams } from 'next/navigation';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';


export const UpdateProviderForm = () => {
    const token = getTokenFromLocalStorage();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
    const [validationErrors, setValidationErrors] = useState({});
    const [errors, setErrors] = useState({});
    const [formData, setFormData,] = useState({
        Nombre_Proovedor: "",
        Descripcion: "",
        Numero_Proovedor: "",
        correo: "",
        Direccion_Proovedor: "",
        status_Proovedor: null,
    });

    useEffect(() => {

        fetch(`http://localhost:3001/api/providersAdmin/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                setFormData(data.provider);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" })

        }
    }

    const handleStatusChange = (key) => {
        const status_Proovedor = key// Acceder al primer elemento del array de selectedKeys
        setFormData({ ...formData, status_Proovedor });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};

        if (!formData.Nombre_Proovedor) {
            formErrors.nombre = 'Debe asignar un nombre a la colección';

        }

        if (!formData.Descripcion) {
            formErrors.Descripcion = 'Debe asignar una descripción a la colección';
        }

        if (!formData.Numero_Proovedor) {
            formErrors.Numero_Proovedor = 'Debe asignar un numero de proveedor';
        }

        if (!formData.correo) {
            formErrors.correo = 'Debe asignar un correo';
        }

        if (!formData.Direccion_Proovedor) {
            formErrors.Direccion_Proveedor = 'Debe asignar una Direccion';
        }

        if (!formData.status_Proovedor) {
            formErrors.status_Proovedor = 'Debe asignar un status';
        }


        if (Object.keys(formErrors).length === 0) {
            try {

                const token = getTokenFromLocalStorage();
                const sanitizedName = validator.escape(formData.Nombre_Proovedor);
                const sanitizedDescription = validator.escape(formData.Descripcion);
                const sanitizedNumber = validator.escape(formData.Numero_Proovedor);
                const sanitizedEmail = validator.escape(formData.correo);
                const sanitizedAddress = validator.escape(formData.Direccion_Proovedor);
                let sanitizedStatus;
                if (typeof formData.status_Proovedor === 'string') {
                    sanitizedStatus = validator.escape(formData.status_Proovedor);
                } else {
                    sanitizedStatus = validator.escape(formData.status_Proovedor.anchorKey);
                }

                console.log(sanitizedStatus);

              
                const sanitizedData = {
                    sanitizedName,
                    sanitizedDescription,
                    sanitizedNumber,
                    sanitizedEmail,
                    sanitizedAddress,
                    sanitizedStatus
                };
                const sanitizedDataJSON = JSON.stringify(sanitizedData);


                const response = await fetch(`http://localhost:3001/api/providersAdmin/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'

                    },
                    body: sanitizedDataJSON
                });

                const responseData = await response.json();
               
                if (response.ok) {
                    window.location.href = '/providersAdmin';
                } else {
                    console.error('Failed to add provider');
                    if (responseData.errors) {
                        const serverErrors = {};
                        responseData.errors.forEach(error => {
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
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    }

    return (


        <form className='w-full h-full' onSubmit={handleSubmit}>
            <div className='w-full text-3xl font-bold mb-10'>
                <h3 className='w-full'>Agrega un nuevo proveedor</h3>
            </div>
            <div className='w-full mb-5'>
                <label
                    htmlFor='Nombre'
                    className='mb-3 block text-base font-medium text-white'
                >
                    Nombre
                </label>
                <input
                    name='Nombre_Proovedor'
                    type='text'
                    value={formData.Nombre_Proovedor}
                    onChange={handleChange}
                    placeholder='Nombre'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='Descripcion'
                    className='mb-3 block text-base font-medium text-white'
                >
                    Descripcion
                </label>
                <textarea
                    value={formData.Descripcion}
                    onChange={handleChange}
                    name='Descripcion'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                >
                </textarea>
            </div>
            <div className='mb-5'>
                <label
                    className='mb-3 block text-base font-medium text-white'
                    htmlFor='Numero_Proovedor'
                >
                    Numero de Telefono
                </label>
                <input
                    value={formData.Numero_Proovedor}
                    onChange={handleChange}
                    placeholder='Numero de Telefono'
                    type='text'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    name='Numero_Proovedor'
                >
                </input>
            </div>
            <div className='mb-5'>
                <label
                    className='mb-3 block text-base font-medium text-white'
                    htmlFor='correo'
                >
                    Correo electronico
                </label>
                <input
                    value={formData.correo}
                    onChange={handleChange}
                    name='correo'
                    placeholder='Correo electronico'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    type="email" />
            </div>
            <div className='mb-5'>
                <label
                    className='mb-3 block text-base font-medium text-white'
                    htmlFor='Direccion_Proovedor'

                >
                    Direccion del Proveedor
                </label>
                <input
                    value={formData.Direccion_Proovedor}
                    onChange={handleChange}
                    type='text'
                    placeholder='Dirección'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    name='Direccion_Proveedor'
                >
                </input>

            </div>
            <div className='mb-5'>
                <label
                    className='mb-3 block text-base font-medium text-white'
                >
                    Status
                </label>
                <Dropdown
                    backdrop="blur"
                    value={formData.status_Proovedor}
                >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            color='secondary'
                            className="capitalize"
                        >
                            {formData.status_Proovedor || 'Seleccione una opción'}
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
            <div className='justify-items-end'>
                <button className='hover:bg-violet-700  rounded-md bg-violet-600 py-3 px-8 text-base font-semibold text-white outline-none'>
                    Agregar Proveedor
                </button>
            </div>
        </form>
    )
}