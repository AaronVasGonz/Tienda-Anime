import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Input, Textarea } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faPhone, faLocationDot, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useProviderForm } from "./contexts/providerFormContext";
import { Errors } from "../Errors/ErrorsComponents";
export const ProviderForm = (props) => {
        const { handleSubmit, handleSubmitUpdate, id, token, formData, setErrors, setValidationErrors} = useProviderForm();
    return(
        <div className="flex flex-col max-w-2xl mx-auto justify-center">
            <form onSubmit={id ? (e) => handleSubmitUpdate(e, id, token, formData, setErrors, setValidationErrors )  
                               : (e) => handleSubmit(e,token ,formData, setErrors, setValidationErrors )} 
                className=" animate-slide-left  flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8  mb-5 ">
                {props.children}
            </form>
        </div>
    ) 
}
export const ProviderName = () => {
        const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                startContent={
                    <FontAwesomeIcon icon={faBuilding} />
                }
                label='Provider Name'
                labelPlacement='outside'
                name='Nombre_Proovedor'
                type='text'
                value={formData.Nombre_Proovedor || ''}
                onChange={(e)=> handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                placeholder='Provider Name'
                className="mt-2 "
            />
        </div>
    )
}

export const ProviderPhone = () => {
        const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                startContent={
                    <FontAwesomeIcon icon={faPhone} />
                }
                label='Provider Phone'
                value={formData.Numero_Proovedor || ''}
                labelPlacement='outside'
                onChange={(e)=> handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                placeholder='Provider Phone'
                type='text'
                className="mt-2 "
                name='Numero_Proovedor'
            />
        </div>
    )
}

export const ProviderEmail = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                startContent={
                    <FontAwesomeIcon icon={faEnvelope} />
                }
                label='Provider Email'
                labelPlacement='outside'
                value={formData.correo || ''}
                onChange={(e)=> handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                name='correo'
                placeholder='Provider Email'
                className="mt-2 "
                type="email" />
        </div>
    )
}


export const ProviderAddress = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                startContent={
                    <FontAwesomeIcon icon={faLocationDot} />
                }
                onChange={(e)=> handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                label='Provider Address'
                labelPlacement='outside'
                type='text'
                value={formData.Direccion_Proovedor || ''}
                placeholder='Dirección'
                className="mt-2 "
                name='Direccion_Proovedor'
            />
        </div>
    )
}

export const ProviderDescription = () => {
        const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Textarea
                label='Description'
                labelPlacement='outside'
                value={formData.Descripcion || ''}
                onChange={(e)=> handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                name='Descripcion'
                className="mt-2 "
            >
            </Textarea>
        </div>
    )
}

export const SelectProviderStatus = (props) => {
    const { handleStatusChange, selectedKeys ,formData, setFormData, errors, setErrors, setValidationErrors } = useProviderForm();
    return (
        <div className="mb-5 flex flex-col w-full sm:w-1/2 w-full ">
            <label
                className='mb-3 block text-base font-medium text-white'
            >
                Status
            </label>
            <Dropdown

                backdrop="blur"
                value={formData.status_Proovedor}
            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        color='default'
                        className="capitalize"
                    >
                        {formData.status_Proovedor || 'Select Status'}
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
                    onSelectionChange={(key)=>handleStatusChange(key, setFormData, formData, setErrors)}
                >
                    <DropdownItem key= {props.item1} value={props.item1}>{props.item1}</DropdownItem>
                    <DropdownItem key= {props.item2} value={props.item2}>{props.item2}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}


export const ProvidersFormErrors = () => {
    const { errors, validationErrors } = useProviderForm();
    return (
        <Errors errors={errors} validationErrors={validationErrors}/>
    );
};


