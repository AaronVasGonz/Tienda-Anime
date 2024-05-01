
"use client"
import {
    useState,
    useEffect
} from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import { getTokenFromLocalStorage } from '@/utils/auth';
import validator from 'validator';

function UpdateCategory() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData,] = useState({
        Detalle: "",
        status: null,
    });
    const token = getTokenFromLocalStorage();




    useEffect(() => {

        fetch(`http://localhost:3001/api/categoriesAdmin/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                const { Detalle, status } = data.category;
                setFormData({
                    Detalle,
                    status
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

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
            formErrors.Detalle = 'Debe asignar un nombre a la categoria';
        }
        if (!formData.status) {
            formErrors.status = 'Debe asignar un status a la categoria';
        }

        if (Object.keys(formErrors).length === 0) {
            try {
                const token = getTokenFromLocalStorage();

                const sanitizedDetalle = validator.escape(formData.Detalle);
                let sanitizedStatus;
                if (typeof formData.status === 'string') {
                    sanitizedStatus = validator.escape(formData.status);
                } else {
                    sanitizedStatus = validator.escape(formData.status.anchorKey);
                }

                const santizedData = { sanitizedStatus, sanitizedDetalle };
                const response = await fetch(`http://localhost:3001/api/categoriesAdmin/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(santizedData)
                });

                const responseData = await response.json();
                if (response.ok) {
                    window.location.href = '/categoriesAdmin';
                } else {
                    if (responseData.errors) {
                        const serverErrors = {};
                        responseData.errors.forEach(error => {
                            // El campo `param` contiene el nombre del campo asociado al error
                            serverErrors[error.param] = error.msg;
                        });
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
        <form className="w-full" onSubmit={handleSubmit}>

            <div className="w-full text-3xl font-bold mb-10">
                <h3 className="w-full">Actualizacion de Categoria</h3>
            </div>
            <div className="mb-5">
                <label htmlFor="Detalle" className="mb-3 block text-base font-medium text-white">
                    Nombre de la categoria
                </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="Detalle"
                    value={formData.Detalle}
                    placeholder="Detalle de la categoria"
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
                    Actualizar Categoria
                </button>
            </div>
        </form>
    );
};

export default UpdateCategory;