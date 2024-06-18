
import validator from "validator";
import { handleServerErrors } from "@/utils/serverUtils";

/* Handle Functions */

export const handleProductChange = (e, setFormData, formData, errors, setErrors, setValidationErrors) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let updatedErrors = { ...errors };
    delete updatedErrors[e.target.name];
    setValidationErrors({});
    setErrors(updatedErrors);
    console.log(formData);
}

export const handleDeleteImage = (id, images, setImages, imagePreview, setImagePreview) => {
    const updatedImages = { ...images };
    const updatedImagePreview = { ...imagePreview };
    delete updatedImages[id];
    delete updatedImagePreview[id];
    setImages(updatedImages);
    setImagePreview(updatedImagePreview);
};

export const handleProductStatusChange = (key, setFormData, formData) => {
    const status = key.values().next().value;
    setFormData({ ...formData, status });
    console.log(formData);
}

export const handleProductCollectionChange = (key, formData, collections, setFormData, setSelectedCollection) => {
    const selectedKey = Number(key.values().next().value);
    const selectedCollection = collections.find(collection => collection.id === selectedKey);
    const nombreCollection = selectedCollection ? selectedCollection.Nombre_Coleccion : '';
    setSelectedCollection(nombreCollection);
    setFormData({ ...formData, collection: selectedKey });
    console.log(formData);
}

export const handleProductCategoryChange = (key, formData, categories, setFormData, setSelectedCategory, setErrors) => {
    const selectedKey = Number(key.values().next().value);
    const selectedCategory = categories.find(category => category.id_tipo === selectedKey);
    const categoryName = selectedCategory ? selectedCategory.Detalle : '';
    setSelectedCategory(categoryName);
    setFormData({ ...formData, category: selectedKey });
    setErrors({});
}

export const handleProductProviderChange = (key, formData, providers, setFormData, setSelectedProvider, setErrors) => {
    const selectedKey = Number(key.values().next().value);
    const selectedProvider = providers.find(provider => provider.id === selectedKey);
    const nombreProvider = selectedProvider ? selectedProvider.Nombre_Proovedor : '';
    setSelectedProvider(nombreProvider);
    setFormData({ ...formData, provider: selectedKey });
    setErrors({});
}

export const handleProductImageChange = (e, images, setImages, setImagePreview, setErrors) => {
    // Obtener los archivos seleccionados
    const files = e.target.files;
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

export const handleSubmit = async (e, token, formData, images,  setValidationErrors, setErrors) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData);
    if (Object.keys(images).length === 0) {
        formErrors.images = 'Debe agregar al menos una imagen al producto';
    }
    const sanitizedData = sanitizeData(formData);
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(sanitizedData));
    Object.keys(images).forEach((key) => {
        formDataToSend.append('fileImages', images[key]);
    });
    if (Object.keys(formErrors).length === 0) {
        try {
            fetchCreateProduct(formDataToSend, token, setValidationErrors, setErrors, handleServerErrors);
        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
};

export const handleSubmitUpdate = async (e, id, token, formData, images, setValidationErrors, setErrors) => {
    e.preventDefault();
    const formErrors = validateFormErrors(formData);
    if (Object.keys(images).length === 0) {
        formErrors.images = 'Debe agregar al menos una imagen al producto';
    }
    if (Object.keys(formErrors).length === 0) {
        const sanitizedData = sanitizeData(formData);
        const formDataToSend = new FormData();
        const fileImages = [];
        const textImages = [];
        Object.keys(images).forEach((key) => {
            if (typeof images[key] === 'string') {
                textImages.push(images[key]);
            } else {
                fileImages.push(images[key]);
            }
        });
        formDataToSend.append('data', JSON.stringify(sanitizedData));
        textImages.forEach(textImage => {
            formDataToSend.append('textImages', textImage);
        });
        fileImages.forEach(fileImage => {
            formDataToSend.append('fileImages', fileImage);
        });

        try {

            fetchUpdateProduct(id, token, formDataToSend, setValidationErrors, setErrors, handleServerErrors);

        } catch (error) {
            console.log(error);
        }
    } else {
        setErrors(formErrors);
    }
};

/* Fetch Functions */

export const fetchProducts = async (setProducts, token) => {
    fetch('http://localhost:3001/api/productsAdmin', {
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
            setProducts(data.products);
        })
        .catch(error => console.error('Error:', error));
}

export const fetchDeteleProduct = async (id, token) => {
    fetch(`http://localhost:3001/api/productsAdmin/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        })
        .catch(error => console.log("Error:", error))
}


export const fetchClothes = async () => {

    try {

        const responde = await fetch('http://localhost:3001/api/clothesProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }

        })
    } catch (error) {

    }
}

export const fetchCreateProduct = async (formDataToSend, token, setValidationErrors, setErrors, handleServerErrors) => {
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
}


export const fetchCollectionsToProduct = async (token, setCollections) => {
    const response = await fetch('http://localhost:3001/api/collections', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const data = await response.json();

    setCollections(data.collections);
}

export const fetchCategoriesToProduct = async (token, setCategories) => {

    const response = await fetch('http://localhost:3001/api/categoriesAdmin', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const data = await response.json();
    setCategories(data.categories);

}

export const fetchProvidersToProduct = async (token, setProviders) => {
    const response = await fetch('http://localhost:3001/api/providersAdmin', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const data = await response.json();

    setProviders(data.providers);

}

export const fetchProduct = (id, token, setFormData, setSelectedCategory, setSelectedProvider, setSelectedCollection, setSelectedKeys, setImages, setImagePreview) => {
    fetch(`http://localhost:3001/api/productsAdmin/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.product && data.product.product.length > 0) {
                const product = data.product.product[0];
                const images = data.product.images;

                setFormData({
                    Nombre_Producto: product.Nombre_Producto || '',
                    Descripcion: product.Descripcion_Producto || '',
                    Precio: product.Precio_Producto || 0,
                    Cantidad: product.Cantidad || 0,
                    status: product.Status || '',
                    category: product.Categoria || '',
                    collection: product.Coleccion || '',
                    provider: product.Proveedor || '',
                });
                setSelectedCategory(product.Nombre_Categoria);
                setSelectedProvider(product.Nombre_Proveedor);
                setSelectedCollection(product.Nombre_Coleccion);
                setSelectedKeys(product.Status);
                if (images && images.length > 0) {
                    const imagePreviews = [];
                    const imagesName = [];
                    for (let i = 0; i < images.length; i++) {
                        const imageUrl = "http://localhost:3001/images/products/" + images[i]["imagen"];
                        imagesName.push(images[i]["imagen"]);
                        imagePreviews.push(imageUrl);
                    }
                    setImagePreview(imagePreviews);
                    setImages(imagesName);
                }

            } else {
                console.error('No se encontró el producto');
            }

        })
        .catch(error => console.error('Error:', error));
}

export const fetchUpdateProduct = async (id, token, formDataToSend, setValidationErrors, setErrors, handleServerErrors) => {

    const response = await fetch(`http://localhost:3001/api/productsAdmin/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': token
        },
        body: formDataToSend,
    });
    const responseData = await response.json();
    if (response.ok) {
        alert('The product has been updated successfully');
        window.location.href = '/productsAdmin';
    } else {
        handleServerErrors(responseData, setValidationErrors, setErrors);
    }
}

/*Validation Functions*/

export const validateFormErrors = (formData) => {
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

export const sanitizeData = (formData) => {
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