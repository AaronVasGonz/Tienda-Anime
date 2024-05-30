import { getTokenFromLocalStorage } from '../../auth';
import { decryptData } from '../../auth';
import validator from 'validator';
import validatePassword from '@/app/functions/validatefunctions';





/*=========================================================================*/
/*=====================PAGE PHONE FUNCTIONS=============================*/
/*=========================================================================*/
export const validatePhoneError = (phone, selectedCountry) => {
    const phoneInt = parseInt(phone.phone);
    console.log(phoneInt);
    const phonePattern = /^[0-9]*$/;
    const phoneErrors = {};

    if (!phone) {
        phoneErrors.phone = "Phone is required";
    } else if (phone.length < 8 || phone.length > 10) {
        phoneErrors.phone = "Phone must be between 8 and 10 digits";
    } else if (!phonePattern.test(phoneInt)) {
        phoneErrors.phone = "Phone must contain only digits";
    }

    if (!selectedCountry) {
        phoneErrors.country = "Country is required";
    }

    return phoneErrors;
}

export const fetchPhone = async (id, setPhone, setSelectedCountry) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await fetch(`http://localhost:3001/api/userDetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const data = await response.json();
        if (data.userWithImage && data.userWithImage.length > 0) {
            const fullPhone = data.userWithImage[0].Telefono;
            if (fullPhone) {
                console.log(fullPhone);
                const [countryCode, phone] = fullPhone.split('-');
                setPhone({ phone });
                setSelectedCountry(countryCode);
            }
        }
    } catch (error) {
        console.error(error);
    }

}

export const fetchCountries = async () => {
    const token = getTokenFromLocalStorage();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    try {
        const response = await fetch('http://localhost:3001/api/countries', {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        return data.phoneCodes.countries;
    } catch (error) {
        console.log(error);

    }
}

/*=========================================================================*/
/*=====================PAGE SETTINGS FUNCTIONS=============================*/
/*=========================================================================*/
export const fetchUserData = async (id, setUserData, setImage) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await fetch(`http://localhost:3001/api/userDetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const data = await response.json();
        if (data.userWithImage && data.userWithImage.length > 0) {
            setUserData(data.userWithImage[0]);
            setImage(data.userWithImage[0].Imagen);
        }
    } catch (error) {
        console.error(error);
    }
}

export const fetchAddress = async (id, setAddress) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await fetch(`http://localhost:3001/api/userDetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        const data = await response.json();
        if (data.userWithImage && data.userWithImage.length > 0) {
            setAddress(data.userWithImage[0].direccion);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUserDataFromLocalStorage = async (setId) => {
    const userEncrypted = localStorage.getItem('User');
    const iv = localStorage.getItem('project');
    if (userEncrypted && iv) {
        try {
            const userDecrypted = await decryptData(userEncrypted, iv);
            if (userDecrypted) {
                setId(userDecrypted.id);
            }
        } catch (error) {
            console.error('Error decrypting data:', error);
        }
    }
}

export const validateUserFormData = (userData) => {
    console.log(userData.Telefono);

    const errors = {};

    if (!userData.Nombre) {
        errors.Nombre = 'Field Name is required to update your data';
    }

    if (!userData.Apellido) {
        errors.Apellido = 'Field Last Name is required to update your data';
    }

    if (!userData.correo) {
        errors.correo = "Field Email is required to update your data";
    }

    return errors;
};

export const sanitizeUserData = (userData) => {
    const sanitizedData = {};
    for (const key in userData) {
        const value = userData[key];
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

};

/*=========================================================================*/
/*=====================PAGE Change Password FUNCTIONS=============================*/
/*=========================================================================*/
export const validateEmailData = (userData) => {
    const emailErrors = {};

    if (!userData.correo) {
        emailErrors.correo = "Field Email is required to update your data";
    }
    if (!validator.isEmail(userData.correo)) {
        emailErrors.correo = "Field Email is not valid";
    }

    return emailErrors;
}




/*=========================================================================*/
/*=====================Update Password Page FUNCTIONS=============================*/
/*=========================================================================*/


export const validatePasswordError = (formData) => {
    const passwordErrors = {};
    if (!formData.password) {
        passwordErrors.password = "Field Password is required to update your data";
    }
    if (!validatePassword(formData.password)) {
        passwordErrors.password = "Password must contain a digit from 1 to 9, a lowercase letter, an uppercase letter and can not contain spaces. Additionally, it must have a length between 8 and 16 characters";
    }
    if (!formData.confirmPassword) {
        passwordErrors.confirmPassword = "Field Confirm Password is required to update your data";
    }
    if (formData.password !== formData.confirmPassword) {
        passwordErrors.confirmPassword = "Field Password and Confirm Password do not match";
    }
    return passwordErrors
}


