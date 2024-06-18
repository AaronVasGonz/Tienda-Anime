

import validator from "validator";

/*handle functions*/

export const handleChange = (e, formData, setFormData, errors, setErrors, setValidationErrors) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const updatedErrors = { ...errors };
    delete updatedErrors[e.target.name];
    setValidationErrors({});
    setErrors(updatedErrors);
    console.log(formData);
};

export const handleStatusChange = (key, formData, setFormData, setErrors, setValidationErrors) => {
    const status = key;
    setFormData({ ...formData, status });
    setErrors({});
    setValidationErrors({});
};


export const handleSubmit = async (e, formData, token, setValidationErrors, setErrors, router, handleServerErrors) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData);
    if (Object.keys(formErrors).length === 0) {
        const sanitizeDetalle = validator.escape(formData.Detalle);
        const sanitizedStatus = validator.escape(formData.status.anchorKey);
        const formDataToSend = {
            Detalle: sanitizeDetalle,
            status: sanitizedStatus
        };
        const formDataJSON = JSON.stringify(formDataToSend);
        try {
            await fetchAddCategory(formDataJSON, token, setValidationErrors, setErrors, router, handleServerErrors);
        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
};

export const handleSubmitUpdate = async (e, formData, id, token, setValidationErrors, setErrors, router, handleServerErrors) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData);
    if (Object.keys(formErrors).length === 0) {

        const sanitizedDetalle = validator.escape(formData.Detalle);
        let sanitizedStatus;

        if (typeof formData.status === 'string') {
            sanitizedStatus = validator.escape(formData.status);
        } else {
            sanitizedStatus = validator.escape(formData.status.anchorKey);
        }

        const sanitizedData = { Detalle: sanitizedDetalle, status: sanitizedStatus, };

        try {
            await fetchUpdateCategory(id, token, sanitizedData, setValidationErrors, setErrors, router, handleServerErrors);
        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
}

/*fetch functions*/
export const fetchCategories = async (setCategories, token) => {
    fetch('http://localhost:3001/api/categoriesAdmin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(
            response => response.json()
        )
        .then(data => {
            setCategories(data.categories);
        })
        .catch(error => console.error('Error:', error));
}

export const fetchDeleteCategory = async (id, token, router) => {

    const response = await fetch(`http://localhost:3001/api/categoriesAdmin/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        window.location.reload();
    } else {
        console.error('Failed to delete category');

    }
}


export const fetchAddCategory = async (formDataJSON, token, setValidationErrors, setErrors, router, handleServerErrors) => {
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
        router.push('/categoriesAdmin');
    } else {
        console.log("Error al crear la categoria");
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

export const fetchCategory = async (id, token, setFormData) => {
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
}

export const fetchUpdateCategory = async (id, token, santizedData, setValidationErrors, setErrors, router, handleServerErrors) => {
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
        router.push('/categoriesAdmin');
    } else {
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

/*validate functions*/

export const validateFormErrors = (formData) => {
    const formErrors = {};

    if (!formData.Detalle) {
        formErrors.Detalle = 'Debe asignar un nombre a la categoria';
    }
    if (!formData.status) {
        formErrors.status = 'Debe asignar un status a la categoria';

    }

    return formErrors;
}
