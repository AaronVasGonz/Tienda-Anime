
import { getTokenFromLocalStorage } from "../../auth";// src/utils/functions/providersFunctions/providers.ts
import { handleServerErrors } from "@/utils/serverUtils";
import validator from "validator";


/*HANDLE FUNCTIONS */

export const handleChange = (e, setFormData, formData, errors, setErrors, setValidationErrors) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let updatedErrors = { ...errors };
    delete updatedErrors[e.target.name];
    setValidationErrors({});
    setErrors(updatedErrors);
    console.log(formData);
}

export const handleStatusChange = (key, setFormData, formData, setErrors) => {
    const status_Proovedor= key// Acceder al primer elemento del array de selectedKeys
    setFormData({ ...formData, status_Proovedor: status_Proovedor });
    setErrors({});
};

export const handleSubmit = async (e,token ,formData, setErrors, setValidationErrors ) => {
    e.preventDefault();

    const formErrors = validateFormErrors(formData);;

    if (Object.keys(formErrors).length === 0) {
        const sanitizedName = validator.escape(formData.Nombre_Proovedor);
        const sanitizedDescription = validator.escape(formData.Descripcion);
        const sanitizedNumber = validator.escape(formData.Numero_Proovedor);
        const sanitizedEmail = validator.escape(formData.correo);
        const sanitizedAddress = validator.escape(formData.Direccion_Proovedor);
        const sanitizedSatus = validator.escape(formData.status_Proovedor.anchorKey);
        const sanitizedData = {
            sanitizedName,
            sanitizedDescription,
            sanitizedNumber,
            sanitizedEmail,
            sanitizedAddress,
            sanitizedSatus
        };
        const sanitizedDataJSON = JSON.stringify(sanitizedData);

        try {
            fetchCreateProvider(token, sanitizedDataJSON, setErrors, setValidationErrors);
        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
}

export const handleSubmitUpdate = async (e, id, token, formData, setErrors, setValidationErrors ) => {
    e.preventDefault();

    let formErrors = validateFormErrors(formData);

    if (Object.keys(formErrors).length === 0) {

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

        const sanitizedData = {
            sanitizedName,
            sanitizedDescription,
            sanitizedNumber,
            sanitizedEmail,
            sanitizedAddress,
            sanitizedStatus
        };
        const sanitizedDataJSON = JSON.stringify(sanitizedData);
        try {

            fetchUpdateProvider(token, id, sanitizedDataJSON, setErrors, setValidationErrors);

        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
}



/*FETCH FUNCTIONS*/


export const fetchCreateProvider = async (token, sanitizedDataJSON, setErrors, setValidationErrors) => {
    const response = await fetch('http://localhost:3001/api/providersAdmin', {
        method: 'POST',
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
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

export const fetchProviders = async (setProviders) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch('http://localhost:3001/api/providersAdmin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProviders(data.providers);
    } catch (error) {

        console.error('Error:', error);
        return null;
    }
};

export const fetchUpdateProvider = async (token, id ,sanitizedDataJSON , setErrors, setValidationErrors) => {

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
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

export const fetchProvider = async (id, setFormData, token) => {

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
}

export const fetchDeleteProvider = async (id, token, setDeleteError) => {
    try {
        const response = await fetch(`http://localhost:3001/api/providersAdmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (response.ok) {

            window.location.reload();
        } else {
            setDeleteError(true);
            console.error('Failed to delete provider');
        }
    } catch (error) {
        console.error(error);
    }
}



/*VALIDATION FUNCTIONS*/

export const validateFormErrors = (formData) => {
    let formErrors = {};
    if (!formData.Nombre_Proovedor) {
        formErrors.Nombre_Proovedor = 'Debe asignar un nombre a la colección';

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
        formErrors.Direccion_Proovedor = 'Debe asignar una Direccion';
    }

    if (!formData.status_Proovedor) {
        formErrors.status_Proovedor = 'Debe asignar un status';
    }

    return formErrors;

}

