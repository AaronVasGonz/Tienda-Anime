
"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import validator from 'validator';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { handleServerErrors } from '@/utils/serverUtils';

export const AddProductForm = () => {

    const token = getTokenFromLocalStorage();
    const [colecciones, setColecciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedKeys, setSelectedKeys] = useState([]);


    useEffect(() => {

        async function fetchCollections() {

            try {
                const response = await fetch('http://localhost:3001/api/collections', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });
                const data = await response.json();

                setColecciones(data.collections);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function fetchCategories() {
            try {
                const response = await fetch('http://localhost:3001/api/categoriesAdmin', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });
                const data = await response.json();
                setCategorias(data.categories);

            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function fetchProviders() {
            try {
                const response = await fetch('http://localhost:3001/api/providersAdmin', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });
                const data = await response.json();

                setProveedores(data.providers);

            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchCollections();
        fetchCategories();
        fetchProviders();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const updatedErrors = { ...errors };
        delete updatedErrors[e.target.name];
        setErrors(updatedErrors);
    }

    const handleStatusChange = (key) => {
        const status = key.values().next().value;
        setFormData({ ...formData, status });
        setErrors({});
    };
    const handleCategoryChange = (key) => {
        // Extraer el primer valor del objeto Set
        const selectedKey = Number(key.values().next().value);
        // Buscar la categoría correspondiente a la clave seleccionada
        const selectedCategoria = categorias.find(categoria => categoria.id_tipo === selectedKey);
        // Obtener el nombre de la categoría
        const nombreCategoria = selectedCategoria ? selectedCategoria.Detalle : '';
        setSelectedCategory(nombreCategoria);
        setFormData({ ...formData, category: selectedKey });
        setErrors({});
    };
    const handleCollectionChange = (key) => {
        const selectedKey = Number(key.values().next().value);
        const selectedCollection = colecciones.find(collection => collection.id === selectedKey);
        const nombreCollection = selectedCollection ? selectedCollection.Nombre_Coleccion : '';
        setSelectedCollection(nombreCollection);
        setFormData({ ...formData, collection: selectedKey });
        setErrors({});
    };

    const handleProviderChange = (key) => {
        const selectedKey = Number(key.values().next().value);
        const selectedProvider = proveedores.find(provider => provider.id === selectedKey);
        const nombreProvider = selectedProvider ? selectedProvider.Nombre_Proovedor : '';
        setSelectedProvider(nombreProvider);
        setFormData({ ...formData, provider: selectedKey });
        setErrors({});
    };
    const handleImageChange = (event) => {
        // Obtener los archivos seleccionados
        const files = event.target.files;
        // Definir el máximo de imágenes permitidas
        const maxImages = 4;
        // Verificar si el número de imágenes seleccionadas más el número actual de imágenes es menor o igual al máximo permitido
        if (Object.keys(images).length + files.length <= maxImages) {
            // Crear objetos para almacenar las nuevas imágenes y sus vistas previas
            const newImages = {};
            const newImagePreview = {};
            // Recorrer cada archivo seleccionado
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Generar un identificador único para cada imagen utilizando la marca de tiempo actual y el índice
                const id = Date.now() + i;
                // Crear un lector de archivos para leer la imagen como una URL de datos
                const reader = new FileReader();
                // Definir qué hacer cuando se carga la imagen
                reader.onload = () => {
                    // Almacenar la imagen en el objeto newImages con su id como clave
                    newImages[id] = file;
                    // Almacenar la vista previa de la imagen en el objeto newImagePreview con su id como clave
                    newImagePreview[id] = reader.result;
                    // Si todas las imágenes han sido procesadas
                    if (Object.keys(newImages).length === files.length) {
                        // Actualizar el estado de las imágenes con las nuevas imágenes agregadas
                        setImages((prevImages) => ({ ...prevImages, ...newImages }));
                        // Actualizar el estado de las vistas previas de las imágenes con las nuevas vistas previas agregadas
                        setImagePreview((prevImagePreview) => ({ ...prevImagePreview, ...newImagePreview }));
                        setErrors({})
                    }
                };
                // Leer el archivo como una URL de datos
                reader.readAsDataURL(file);
            }
        } else {
            // Si se excede el número máximo de imágenes permitidas, mostrar una alerta
            alert(`Solo se pueden seleccionar un máximo de ${maxImages} imágenes`);
        }
    }


    const handleDeleteImage = (id) => {
        const updatedImages = { ...images };
        const updatedImagePreview = { ...imagePreview };
        delete updatedImages[id];
        delete updatedImagePreview[id];
        setImages(updatedImages);
        setImagePreview(updatedImagePreview);
    };

    const sanitizeData = (formData) => {
        const sanitizedData = {};

        for (const key in formData) {
            const value = formData[key];

            if (typeof value === 'string') {
                sanitizedData[key] = validator.escape(value);
            } else if (typeof value === 'number') {
                sanitizedData[key] = validator.escape(value.toString());
            } else if (Array.isArray(value)) {
                sanitizedData[key] = value.map(item =>
                    typeof item === 'string' ? validator.escape(item) : validator.escape(item.toString())
                );
            } else {
                sanitizedData[key] = value;
            }
        }
        return sanitizedData;
    }

    const validateFromErrors  = () => {
        const formErrors = {};
        if (!formData.Nombre_Producto) {
            formErrors.Nombre_Producto = 'Debe asignar un nombre al producto';
        }
        if (!formData.Descripcion) {
            formErrors.Descripcion = 'Debe asignar una Descripcion';
        }
        if (!formData.Precio) {
            formErrors.Precio = 'Debe asignar un precio al producto';
        }
        if (!formData.Cantidad) {
            formErrors.Cantidad = 'Debe asignar una cantidad al producto';
        }
        if (!formData.status) {
            formErrors.status = 'Debe asignar un status';
        }
        if (!formData.category) {
            formErrors.category = 'Debe asignar una categoria';
        }
        if (!formData.collection) {
            formErrors.collection = 'Debe asignar una colección';
        }
        if (!formData.provider) {
            formErrors.provider = 'Debe asignar un proveedor';
        }

        return formErrors;

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
       const formErrors = validateFromErrors();

        if (Object.keys(images).length === 0) {
            formErrors.images = 'Debe agregar al menos una imagen al producto';
        }

        if (Object.keys(formErrors).length === 0) {
            try {
                const sanitizedData = sanitizeData(formData);
                const formDataToSend = new FormData();
                formDataToSend.append('data', JSON.stringify(sanitizedData));
                Object.keys(images).forEach((key) => {
                    formDataToSend.append('fileImages', images[key]);
                });
          
                const response = await fetch('http://localhost:3001/api/productsAdmin', {
                    method: 'POST',
                    headers: {
                        'Authorization': token
                    },
                    body: formDataToSend,
                });
                const responseData = await response.json();
                if (response.ok) {
                    alert('El producto se ha agregado exitosamente');
                    window.location.href = '/productsAdmin';
                } else {
                   handleServerErrors(responseData, setValidationErrors, setErrors);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="w-full text-3xl font-bold mb-10">
                    <h3 className="w-full">Agrega un nuevo producto al sistema</h3>
                </div>
                <div className='mb-5'>
                    <label htmlFor='Nombre_Producto' className='mb-3 block text-base font-medium text-white'>
                        Nombre del Producto
                    </label>
                    <input
                        type='text'
                        name='Nombre_Producto'
                        placeholder='Agrega un nombre a la producto'
                        className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor='Descripcion' className='mb-3 block text-base font-medium text-white'>
                        Agrega una Descripcion
                    </label>
                    <textarea
                        name='Descripcion'
                        className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-5 flex'>
                    <div>
                        <label htmlFor='Precio' className='mb-3 block text-base font-medium text-white'>
                            Precio
                        </label>
                        <input
                            name='Precio'
                            type='number'
                            placeholder='$0.00'
                            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='ml-4'>
                        <label htmlFor='Cantidad' className='mb-3 block text-base font-medium text-white'>
                            Cantidad de Existencias
                        </label>
                        <input
                            placeholder='0'
                            type='number'
                            name='Cantidad'
                            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                            onChange={handleChange}
                        />
                    </div>


                </div>
                <div className='mb-5'>
                    <input
                        type='file'
                        name='imagen'
                        multiple={false} // Cambiar a false
                        accept='image/*'
                        className={`rounded-md cursor=pointer w-auto bg-black border border-secondary py-3 px-6 text-base font-medium text-white outline-none focus:border-purple-500 focus:shadow-md`}
                        onChange={handleImageChange}
                    />
                    <div className="flex flex-wrap">
                        {Object.keys(imagePreview).map((id) => (
                            <div key={id} className="relative m-2">
                                <Image
                                    src={imagePreview[id]}
                                    alt={`imagen ${id}`}
                                    className="h-40"
                                />
                                <button
                                    className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded z-10"
                                    onClick={() => handleDeleteImage(id)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className='mb-5  flex'>
                    <div  >
                        <label
                            htmlFor='status'
                            className='mb-3 block text-base font-medium text-white'
                        >
                            Escoge una Categoria para el producto
                        </label>
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <Button variant="bordered" color='secondary' className="capitalize">
                                    {selectedCategory || 'Seleccione una opción'}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selección de categoría"
                                disallowEmptySelection
                                variant='faded'
                                color='secondary'
                                selectionMode="single"
                                selectedKeys={selectedCategory}
                                onSelectionChange={handleCategoryChange}
                            >
                                {categorias.map((categoria) => (
                                    <DropdownItem key={categoria.id_tipo} value={categoria.Detalle}>
                                        {categoria.Detalle}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='ml-5' >
                        <label
                            htmlFor='status'
                            className='mb-3 block text-base font-medium text-white'
                        >
                            Escoge una Coleccion para el producto
                        </label>

                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <Button variant="bordered" color='secondary' className="capitalize">
                                    {selectedCollection || 'Seleccione una opción'}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selección de colección"
                                disallowEmptySelection
                                variant='faded'
                                color='secondary'
                                selectionMode="single"
                                selectedKeys={selectedCollection}
                                onSelectionChange={handleCollectionChange}
                            >
                                {colecciones.map((coleccion) => (
                                    <DropdownItem key={coleccion.id} value={coleccion.id}>
                                        {coleccion.Nombre_Coleccion}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>


                </div>

                <div className='mb-10 flex'>
                    <div className='sm:mr-11'>
                        <label
                            htmlFor='status'
                            className='mb-3 block text-base font-medium text-white'
                        >
                            Escoge el Status del Producto
                        </label>
                        <Dropdown
                            backdrop="blur"

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
                    <div className='sm:ml-19 ml-10'>
                        <label
                            htmlFor='status'
                            className='mb-3 block text-base font-medium text-white'
                        >
                            Escoge un  proveedor para el producto
                        </label>
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <Button variant="bordered" color='secondary' className="capitalize">
                                    {selectedProvider || 'Seleccione una opción'}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selección de proveedor"
                                disallowEmptySelection
                                variant='faded'
                                color='secondary'
                                selectionMode="single"
                                selectedKeys={selectedProvider}
                                onSelectionChange={handleProviderChange}
                            >
                                {proveedores.map((proveedor) => (
                                    <DropdownItem key={proveedor.id} value={proveedor.id}>
                                        {proveedor.Nombre_Proovedor}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                    </div>

                </div>

                <div>
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

                </div>

                <div className='justify-items-end'>

                    <button className='hover:bg-violet-700 rounded-md bg-violet-600 py-3 px-8 text-base font-semibold text-white outline-none'>
                        Agregar producto
                    </button>
                </div>
            </form>
        </div>
    )
}