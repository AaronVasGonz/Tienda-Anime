import Image from "next/image"
import { lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {Skeleton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Textarea } from "@nextui-org/react";
import { useCollectionForm } from "./contexts/collectionFormContext";
import { Errors } from "../Errors/ErrorsComponents";
const ImageComponent = lazy(() => import('@/components/images/images'));


export const CollectionForm = ({ children }) => {
    const {  handleSubmit, handleSubmitUpdate, formData,id, token, user, setValidationErrors, setErrors, handleServerErrors } = useCollectionForm();
    return (
        <form onSubmit={id ? (e) => handleSubmitUpdate(e, formData, id, token, user ,setValidationErrors, setErrors, handleServerErrors) 
                            :(e) => handleSubmit(e, formData, token, user ,setValidationErrors, setErrors, handleServerErrors)} 
                className=" animate-slide-left  flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8  mb-5 ">
            {children}
        </form>
    )
}

export const CollectionName = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useCollectionForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                type='text'
                label="Collection Name"
                labelPlacement='outside'
                onChange={(e) => handleChange(e, formData, setFormData, errors, setErrors)}
                value={formData.Nombre_Coleccion || ''}
                name='Nombre_Coleccion'
                placeholder='Add a name to your collection'
                className="mt-2 "
            />
        </div>
    )
}

export const CollectionDescription = () => {
    const { handleChange, formData, setFormData, errors, setErrors } = useCollectionForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <label
                htmlFor='Descripcion'
                className='mb-3 block text-base font-medium text-white'
            >
                Add a Description
            </label>
            <Textarea
                onChange={(e) => handleChange(e, formData, setFormData, errors, setErrors)}
                id="Descripcion"
                name='Descripcion'
                value={formData.Descripcion || ''}
                className="mt-2 "
            />
        </div>
    )
}

export const AddCollectionImage = ({ styles }) => {
    const { handleImageChange, formData, setFormData, setErrors, setImagePreview, imagePreview, id } = useCollectionForm();
    return (
        <div className="flex flex-col items-center w-full  mt-5 mb-10 w-auto ">
            <label>Add an image</label>
            <label
                htmlFor='imagen'
                className="mt-6 w-16 h-16 flex flex-col items-center justify-center mb-10 bg-main-purple  text-white outline-none  rounded-full focus:shadow-md cursor-pointer hover:bg-hover-purple transition-all duration-300  ease-in-out hover:scale-105"
            >
                <FontAwesomeIcon className="text-3xl shadow-xl font-bold " icon={faImage} />
                <input type='file'
                    name='imagen'
                    id="imagen"
                    hidden
                    className={`rounded-md cursor=pointer w-auto bg-black border  border-secondary  py-3 px-6 text-base font-medium text-white outline-none focus:border-purple-500 focus:shadow-md ${styles.fileInput}`}
                    onChange={(e) => handleImageChange(e, formData, setFormData, setErrors, setImagePreview)}
                />
            </label>
            {imagePreview && (
                    <Suspense
                     fallback={<Skeleton className="w-[200px] h-[200px] rounded-lg sm:mr-1 sm:mb-0 sm:mb-0 mb-2"><div className="h-24 rounded-lg bg-default-300"></div></Skeleton>}>
                        <ImageComponent src={imagePreview} alt={"imagen"} />
                    </Suspense>

            )}
        </div>
    )
}

export const SelectStatusCollection = ({ item1, item2 }) => {
    const { formData, selectedKeys, setFormData, setErrors, handleStatusChange } = useCollectionForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
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
                        color='default'
                        className="capitalize"
                    >
                        {formData.status || 'Select Status'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    disallowEmptySelection
                    variant='faded'
                    color='default'
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(key) => handleStatusChange(key, formData, setFormData, setErrors)}
                >
                    <DropdownItem key={item1} value={item1}>{item1}</DropdownItem>
                    <DropdownItem key={item2} value={item2}>{item2}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export const CollectionFormErrors = () => {
    const { errors, validationErrors } = useCollectionForm();
    return (
        <Errors errors={errors} validationErrors={validationErrors} />
    )
};