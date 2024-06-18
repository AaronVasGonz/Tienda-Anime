import validator from "validator";

export const handleChange = (e, formData, setFormData, errors, setErrors) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const updatedErrors = { ...errors };
    delete updatedErrors[e.target.name];
    setErrors(updatedErrors);
    console.log(formData);
}

export const handleStatusChange = (key, formData, setFormData, setErrors) => {
    const status = key// Acceder al primer elemento del array de selectedKeys
    setFormData({ ...formData, status });
    setErrors({});
};

export const handleSubmit = async (e, formData, token, user ,setValidationErrors, setErrors, handleServerErrors) => {
    e.preventDefault();
    
    const formErrors = validationForm(formData);

    if (Object.keys(formErrors).length === 0) {
        //Sanitized formData
        const sanitizedName = validator.escape(formData.Nombre_Coleccion);
        const sanitizedDescription = validator.escape(formData.Descripcion);
        const sanitizedSatus = validator.escape(formData.status.anchorKey);
        /*==================================== */
        const formDataToSend = new FormData();
        formDataToSend.append('Nombre_Coleccion', sanitizedName);
        formDataToSend.append('Descripcion', sanitizedDescription);
        formDataToSend.append('status', sanitizedSatus);
        formDataToSend.append('imagen', formData.imagen); // Add the file to the form data
        try {

            fetchCreateCollection(formDataToSend, token, user, setValidationErrors, setErrors, handleServerErrors);

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    } else {
        setErrors(formErrors);
    }

};

export const handleSubmitUpdate = async (e, formData, id, token, user ,setValidationErrors, setErrors, handleServerErrors) => {
    
    e.preventDefault();

    const formErrors = validationForm(formData);

    if (Object.keys(formErrors).length === 0) {

        //Sanitized formData

        const sanitizedName = validator.escape(formData.Nombre_Coleccion);

        const sanitizedDescription = validator.escape(formData.Descripcion);

        let sanitizedSatus;
        if (typeof formData.status === 'string') {
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
        formDataToSend.append('imagen', formData.imagen); // Add the file to the form data
        try {
            fetchUpdateCollection(id, formDataToSend, token, user, setValidationErrors, setErrors, handleServerErrors)
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    } else {
        setErrors(formErrors);
    }
};


export const handleImageChange = (e, formData, setFormData, setErrors, setImagePreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result); // Establecer la vista previa de la imagen
            setFormData({ ...formData, imagen: selectedFile });
            setErrors({});
        };
        reader.readAsDataURL(selectedFile); // Leer el archivo como una URL de datos
    } else {

        setFormData({ ...formData, imagen: formData.imagen }); // Limpiar la imagen en el estado si no se selecciona ninguna
    }
};




export const fetchCollections = async (setCollections, token) => {
    fetch('http://localhost:3001/api/collections', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.collections)) {
                setCollections(data.collections);
            } else {
                console.error('Collections data is not an array');
            }
        })
        .catch(error => console.error('Error fetching collections:', error));
}

export const fetchCreateCollection = async (formDataToSend, token, user, setValidationErrors, setErrors, handleServerErrors) => {
    const response = await fetch('http://localhost:3001/api/collections', {
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
        console.log('Error al enviar formulario');
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}


export const fetchDeleteCollection = async (id, token) => {
    fetch(`http://localhost:3001/api/collections/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Collection deleted successfully') {
                console.log('Collection deleted successfully');
                window.location.reload();
            } else {
                console.error('Failed to delete collection');
            }
        })
        .catch(error => console.error('Error deleting collection:', error));
}

export const fetchCollection = async (id, token, setFormData, setImagePreview) => {
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

            if (imagen) {
                const imageUrl = `http://localhost:3001/images/collections/${imagen}`;
                setImagePreview(imageUrl);
            }

        })
        .catch(error => console.error('Error al traer la coleccion', error));
}

export const fetchUpdateCollection = async (id, formDataToSend, token, user, setValidationErrors, setErrors, handleServerErrors) => {
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
}

export const validationForm = (formData) => {
    let formErrors = {};
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



