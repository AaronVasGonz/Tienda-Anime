
"use client"
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import styles from '../../styles/file-input.module.css';
import validator from 'validator';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { useSearchParams } from 'next/navigation';
import { handleServerErrors } from '@/utils/serverUtils';



export const UpdateCollectionForm = () => {

  //UseStates y UsesMemos
  let file = null;
  const [selectedKeys, setSelectedKeys] = useState('Seleccione una opcion');
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData,] = useState({
    Nombre_Coleccion: "",
    Descripcion: "",
    status: null,

  });
  //manejo de errores
  const [errors, setErrors] = useState({});
  const token = getTokenFromLocalStorage();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');


  useEffect(() => {
    fetch(`http://localhost:3001/api/collections/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => {
        const { Descripcion, Nombre_Coleccion, imagen, status } = data.collection;

        setFormData({
          Nombre_Coleccion,
          Descripcion,
          status,
          imagen
        })

        if(imagen){
          const imageUrl = `http://localhost:3001/images/collections/${imagen}`;
          setImagePreview(imageUrl);
        }
        
      })
      .catch(error => console.error('Error al traer la coleccion', error));
  }, [id, token]) // Agrega `id` y `token` como dependencias para evitar advertencias



  const selectedValue = React.useMemo(

    () => Array.from(selectedKeys),
    [selectedKeys]

  );

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

     const updatedErrors = { ...errors };
     delete updatedErrors[e.target.name];

     setErrors(updatedErrors);
  }


  const handleStatusChange = (key) => {
    const status = key// Acceder al primer elemento del array de selectedKeys
    setFormData({ ...formData, status });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Establecer la vista previa de la imagen
        setFormData({ ...formData, imagen: selectedFile });
        setErrors({ });
      };
      reader.readAsDataURL(selectedFile); // Leer el archivo como una URL de datos
    } else {
      
      setFormData({ ...formData, imagen: formData.imagen }); // Limpiar la imagen en el estado si no se selecciona ninguna
    }


  };

  const validateFormErrors = () => {

    const formErrors = {};

    if (!formData.Nombre_Coleccion) {
      formErrors.Nombre_Coleccion = 'Debe asignar un nombre a la colección';
    }
    if (!formData.Descripcion) {
      formErrors.Descripcion = 'Debe asignar una descripción a la colección';
    }
    if (!formData.status) {
      formErrors.status = 'Debe asignar un status a la colección';
    }
    if (!formData.imagen) {
      formErrors.imagen = 'Debe asignar una imagen a la colección';
    }

    return formErrors

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateFormErrors();

    if (Object.keys(formErrors).length === 0) {

      try {

        const user = getUserFromLocalStorage();
        const token = getTokenFromLocalStorage();
        //Sanitizacion del formulario

        const sanitizedName = validator.escape(formData.Nombre_Coleccion);
       
        const sanitizedDescription = validator.escape(formData.Descripcion);

        let sanitizedSatus;
        if(typeof formData.status === 'string'){
          sanitizedSatus = validator.escape(formData.status);
        } else {
          sanitizedSatus = validator.escape(formData.status.anchorKey);
        }
        /*==================================== */
        const formDataToSend = new FormData();
        formDataToSend.append('id', id);
        formDataToSend.append('Nombre_Coleccion', sanitizedName);
        formDataToSend.append('Descripcion', sanitizedDescription);
        formDataToSend.append('status', sanitizedSatus);
        formDataToSend.append('imagen', formData.imagen); // Añade la imagen al formData

        const response = await fetch(`http://localhost:3001/api/collections/${id}`, {
          headers: {

            'Authorization': token,
            'user': user
          },
          method: 'POST',
          body: formDataToSend,
        });

        const responseData = await response.json();
        if (response.ok) {

          window.location.href = '/collectionsAdmin';
        } else {
          handleServerErrors(responseData, setValidationErrors, setErrors);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      setErrors(formErrors);
    }



  };

  return (
    <div>

      <form onSubmit={handleSubmit} className='flex flex-col' >

        <div className="w-full text-3xl font-bold mb-10">
          <h3 className="w-full">Actualizar colección</h3>

        </div>

        <div className='mb-5'>
          <label
            htmlFor='Nombre_Coleccion'
            className='mb-3 block text-base font-medium text-white'
          >
            Nombre de la Coleccion
          </label>
          <input
            type='text'
            value={formData.Nombre_Coleccion}
            onChange={handleChange}
            name='Nombre_Coleccion'
            placeholder='Agrega un nombre a la colección'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='Descripcion'
            className='mb-3 block text-base font-medium text-white'
          >
            Agrega una Descripcion
          </label>
          <textarea
          value={formData.Descripcion}
            onChange={handleChange}
            name='Descripcion'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'

          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='status'
            className='mb-3 block text-base font-medium text-white'
          >
            Status
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

        <div className='mb-5'>
          <input type='file'
            name='imagen'
            className={`rounded-md cursor=pointer w-auto bg-black border  border-secondary  py-3 px-6 text-base font-medium text-white outline-none focus:border-purple-500 focus:shadow-md ${styles.fileInput}`}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Image src={imagePreview}
              name="imagen"
              alt="imagen" className="mt-4 h-40" />
          )}
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
            Actualizar Colección
          </button>
        </div>
      </form>

    </div>
  );
};

