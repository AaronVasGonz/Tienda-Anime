import React, { lazy, Suspense } from 'react'
import { Card, Skeleton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Textarea } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useProductForm } from "@/components/patterns/Compound_Component_Pattern/products/contexts/productFormContext"
import { Errors } from '../Errors/ErrorsComponents';
const ImageComponent = lazy(() => import('@/components/images/images'));

export const ProductForm = ({ children }) => {
    const { handleSubmit, handleSubmitUpdate, id, token, formData, images, setValidationErrors, setErrors } = useProductForm();
    return (
        <form onSubmit={ id ? (e) => handleSubmitUpdate(e, id, token, formData, images, setValidationErrors, setErrors)
                            : (e) => handleSubmit(e, token, formData, images,  setValidationErrors, setErrors)} 
            className="sm:w-auto sm:mx-40 px-5 animate-slide-left flex flex-col items-center bg-neutral-950 rounded-lg text-xl mb-5">
            {children}
        </form>
    )
}

export const ProductName = () => {
    const { formData, handleProductChange, setFormData, errors, setErrors, setValidationErrors } = useProductForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full">
            <Input
                label='Product Name'
                labelPlacement='outside'
                type='text'
                name="Nombre_Producto"
                value={formData.Nombre_Producto || ''}
                placeholder='Add a product name'
                className='sm:w-full'
                onChange={(e) => handleProductChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const ProductPrice = () => {
    const { formData, handleProductChange, setFormData, errors, setErrors, setValidationErrors } = useProductForm();
    return (
        <div className="mb-5">
            <Input
                label='Price'
                labelPlacement='outside'
                name='Precio'
                value={formData.Precio || ''}
                type='number'
                className='sm:w-full sm:text-center'
                placeholder='$0.00'
                onChange={(e) => handleProductChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const ProductStock = () => {
    const { formData, handleProductChange, setFormData, errors, setErrors, setValidationErrors } = useProductForm();
    return (
        <div className="mb-5 sm:ml-2 sm:w-full">
            <Input
                label='Stock'
                labelPlacement='outside'
                placeholder='0'
                value={formData.Cantidad || ''}
                type='number'
                name='Cantidad'
                onChange={(e) => handleProductChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const AddImagesToProduct = () => {
    const { handleProductImageChange, handleDeleteImage, images, setImages, setImagePreview, imagePreview, setErrors, deletingImages } = useProductForm();
    return (
        <div className="flex flex-col items-center w-full mt-5 w-auto">
            <label className='mb-3 block text-base font-medium text-white'>
                Load a image for the product (you can only load 4 images)
            </label>
            <label
                htmlFor="fileInput"
                className="mt-6 w-20 h-20 flex flex-col items-center justify-center mb-10 bg-main-purple text-white outline-none rounded-full focus:shadow-md cursor-pointer hover:bg-hover-purple transition-all duration-300 ease-in-out hover:scale-105"
            >
                <FontAwesomeIcon className="text-3xl shadow-xl font-bold" icon={faImages} />
                <input
                    type='file'
                    name='imagen'
                    hidden
                    id='fileInput'
                    multiple={false}
                    accept='image/*'
                    className={`rounded-md cursor=pointer bg-neutral-800 border border-main-purple py-3 px-6 text-base font-medium text-white outline-none focus:border-purple-500 focus:shadow-md`}
                    onChange={(e) => handleProductImageChange(e, images, setImages, setImagePreview, setErrors)}
                />
            </label>
            <div id='preview' className="sm:grid smgrid-cols-1 content-center rounded-lg px-6 py-4 sm:grid-cols-2">
                <Suspense fallback={
                   <div className='sm:flex sm:w-full sm:ml-56' >
                        <Skeleton className="w-[200px] h-[200px] rounded-lg sm:mr-1 sm:mb-0 sm:mb-0 mb-2">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-[200px] h-[200px] rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                </div>}>
                    {Object.keys(imagePreview).map((id) => (
                        <div key={id} className={`flex flex-col items-center relative m-2 ${deletingImages[id] ? 'animate-backout-up' : ''}`}>
                            <ImageComponent id={id} src={imagePreview[id]} alt={`imagen ${id}`} />
                            <button
                                name='delete'
                                
                                aria-label='delete'
                                className="absolute sm:top-0 top-0 animate-slide-up right-0 mr-2 sm:mr-1 sm:right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded z-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteImage(id, images, setImages, imagePreview, setImagePreview);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
export const ProductDescription = () => {
    const { formData, handleProductChange, setFormData, errors, setErrors, setValidationErrors } = useProductForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <label htmlFor='Descripcion' className='mb-3 text-center block text-base font-medium text-white'>
                Add a description
            </label>
            <Textarea
                label='Description'
                labelPlacement='outside'
                value={formData.Descripcion || ''}
                name='Descripcion'
                className=''
                onChange={(e) => handleProductChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>

    )
}

export const SelectProductCategory = () => {

    const { handleProductCategoryChange, formData, categories, setFormData, setSelectedCategory, setErrors, selectedCategory } = useProductForm();
    return (

        <div className="mb-5 flex w-full flex-col items-center  ">
            <label
                htmlFor='status'
                className='mb-3 block text-base font-medium text-white'
            >
                Choose a category
            </label>
            <Dropdown

                backdrop="blur">
                <DropdownTrigger>
                    <Button
                        variant="bordered" color='default' className=" capitalize">
                        {selectedCategory || 'Select a category'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single category selection"
                    disallowEmptySelection
                    variant='faded'
                    itemClasses={{
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-main-purple",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",


                        ],
                    }}
                    selectionMode="single"
                    selectedKeys={selectedCategory}
                    onSelectionChange={(key) => handleProductCategoryChange(key, formData, categories, setFormData, setSelectedCategory, setErrors)}
                >
                    {categories.map((category) => (
                        <DropdownItem key={category.id_tipo} value={category.Detalle}>
                            {category.Detalle}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

        </div>
    )
}



export const SelectProductCollection = () => {
    const { handleProductCollectionChange, formData, collections, setFormData, setSelectedCollection, setErrors, selectedCollection } = useProductForm();
    return (
        <div className="mb-5 flex flex-col items-center  ">
            <label
                htmlFor='status'
                className='mb-3 block text-base font-medium text-white'
            >
                Choose a collection
            </label>

            <Dropdown backdrop="blur">
                <DropdownTrigger>
                    <Button variant="bordered" color='default' className="capitalize">
                        {selectedCollection || 'Select a collection'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single collection selection"
                    disallowEmptySelection
                    variant='faded'
                    itemClasses={{
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-main-purple",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",


                        ],
                    }}
                    selectionMode="single"
                    selectedKeys={selectedCollection}
                    onSelectionChange={(key) => handleProductCollectionChange(key, formData, collections, setFormData, setSelectedCollection, setErrors)}
                >
                    {collections.map((collection) => (
                        <DropdownItem key={collection.id} value={collection.id}>
                            {collection.Nombre_Coleccion}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>

    )
}

export const SelectProductStatus = ({ item1, item2 }) => {
    const { formData, setFormData, handleProductStatusChange, selectedKeys } = useProductForm();
    return (
        <div className="mb-5 flex flex-col items-center  ">
            <label
                htmlFor='status'
                className='mb-3 block text-base font-medium text-white'
            >
                Product Status
            </label>
            <Dropdown
                backdrop="blur"

            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        color='default'
                        className="capitalize"
                    >
                        {formData.status || 'select status'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    disallowEmptySelection
                    variant='faded'
                    itemClasses={{
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-main-purple",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",


                        ],
                    }}
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(key) => handleProductStatusChange(key, setFormData, formData)}
                >
                    <DropdownItem key={item1} value={item1}>{item1}</DropdownItem>
                    <DropdownItem key={item2} value={item2}>{item2}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

    )
}

export const SelectProductProvider = () => {
    const { handleProductProviderChange, formData, providers, setFormData, setSelectedProvider, setErrors, selectedProvider } = useProductForm();
    return (
        <div className="mb-5 flex flex-col items-center  ">
            <label
                htmlFor='provider'
                className='mb-3 block text-base font-medium text-white'
            >
                Provider
            </label>
            <Dropdown backdrop="blur">
                <DropdownTrigger>
                    <Button variant="bordered" color='default' className="capitalize">
                        {selectedProvider || 'Select a provider'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single provider selection"
                    disallowEmptySelection
                    variant='faded'
                    itemClasses={{
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-main-purple",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",


                        ],
                    }}
                    selectionMode="single"
                    selectedKeys={selectedProvider}
                    onSelectionChange={(key) => handleProductProviderChange(key, formData, providers, setFormData, setSelectedProvider, setErrors)}
                >
                    {providers.map((provider) => (
                        <DropdownItem key={provider.id} value={provider.id}>
                            {provider.Nombre_Proovedor}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

        </div>
    )
}

export const ProductFormErrors = () => {
    const { errors, validationErrors } = useProductForm();
    return (
       <Errors errors={errors} validationErrors={validationErrors}/>
    );
};