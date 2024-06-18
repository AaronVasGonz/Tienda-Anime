

import validator from "validator";
import { handleServerErrors } from "@/utils/serverUtils";
import validatePassword from "@/app/functions/validatefunctions.js";

export const handleChange = (e, setFormData, formData, errors, setErrors, setValidationErrors) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let updatedErrors = { ...errors };
    delete updatedErrors[e.target.name];
    setValidationErrors({});
    setErrors(updatedErrors);
    console.log(formData);

};

export const handleSubmit = async (e, formData, token, setValidationErrors, setErrors, id, selectedRoles) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData, id);

    if (Object.keys(formErrors).length === 0) {
        const dataSanitized = sanitizeFormData(formData, selectedRoles);
        try {
            fetchCreateUser(token, dataSanitized, setValidationErrors, setErrors);
        } catch (error) {
            console.log('error en la solicitud:', error)
        }
    } else {
        setErrors(formErrors);
    }
};

export const handleSubmitUpdate = async (e, formData, token, setValidationErrors, setErrors, id, selectedRoles) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData, id);
    const dataSanitized = sanitizeFormData(formData, selectedRoles);

    if (Object.keys(formErrors).length === 0) {
        try {
            fetchUpdateUser(token, id, dataSanitized, setValidationErrors, setErrors);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    } else {
        setErrors(formErrors);
    }
};



/* fetch functions */

export const fetchUsers = async (setUser, token) => {
    fetch('http://localhost:3001/api/usersAdmin', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.users)) {
                setUser(data.users);
            } else {
                console.error('Users data is not an array');
            }
        })
        .catch(error => console.error("Error al traer colecciones:", error))
}

export const fetchUser = async (id, token, setFormData, selectedRoles) => {
    fetch(`http://localhost:3001/api/usersAdmin/${id}`, {
        method: 'GET',
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
                    nombre: Nombre,
                    apellido: Apellido,
                    apellido2: Apellido2,
                    email: correo
                }
                );
                selectedRoles(roles);
            } else {
                const { Nombre, Apellido, Apellido2, correo, Rol } = data.user[0];
                setFormData({
                    nombre: Nombre,
                    apellido: Apellido,
                    apellido2: Apellido2,
                    email: correo
                }
                );
            }
        })
        .catch(error => {
            console.error('Error al traer usuarios:', error);
        })
}

export const fetchDeleteUser = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:3001/api/usersAdmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete user');
        }
    } catch (error) {
        console.error(error);
    }
}

export const fetchCreateUser = async (token, dataSanitized, setValidationErrors, setErrors) => {
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
        window.location.href = '/usersAdmin'
    } else {

        handleServerErrors(responseData, setValidationErrors, setErrors);
    }

}

export const fetchUpdateUser = async (token, id, dataSanitized, setValidationErrors, setErrors) => {
    const response = await fetch(`http://localhost:3001/api/usersAdmin/${id}`, {
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
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

/*validation functions */

export const validateFormErrors = (formData, id) => {
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

    if (!id) {
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
    }

    return formErrors
}

export const sanitizeFormData = (formData, selectedRoles) => {
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






