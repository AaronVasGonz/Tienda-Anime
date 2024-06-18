import React from 'react';
import { useCategoryForm } from './contexts/categoryContext';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from "@nextui-org/react";
import {Errors} from '@/components/patterns/Compound_Component_Pattern/Errors/ErrorsComponents'
export const CategoryForm = ({ children }) => {
    const { handleSubmit, handleSubmitUpdate, id, token, setValidationErrors, setErrors, handleServerErrors, router, formData } = useCategoryForm();
    return (
        <form onSubmit={(id ? (e) => handleSubmitUpdate  (e, formData, id, token, setValidationErrors, setErrors, router, handleServerErrors) 
                            : (e) =>  handleSubmit(e, formData, token, setValidationErrors, setErrors, router, handleServerErrors))} 
             className="animate-slide-left flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8 mb-5">
            {children}
        </form>
    );
};

export const CategoryName = () => {
    const {formData, setFormData,errors ,setErrors, setValidationErrors, handleChange} = useCategoryForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <Input
                type="text"
                label="Category Name"
                labelPlacement='outside'
                value={formData.Detalle || ''}
                onChange={(e)=> handleChange (e, formData ,setFormData , errors, setErrors, setValidationErrors)}
                name="Detalle"
                placeholder="Category Name"
            />
        </div>
    )
}

export const SelectStatusCategory = ({ item1, item2 }) => {
     const { handleStatusChange, selectedKeys, formData, setFormData, setErrors, setValidationErrors } = useCategoryForm();
    return (
        <div className="mb-5 sm:w-1/2 w-full ">
            <label htmlFor="status" className="mb-3 block text-base font-medium text-white">
                Status
            </label>
            <Dropdown
                backdrop="blur"
                className='w-full'
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
                    onSelectionChange={(key) => handleStatusChange(key, formData ,setFormData, setErrors, setValidationErrors) }
                >
                    <DropdownItem key= {item1} value={item1}>{item1}</DropdownItem>
                    <DropdownItem key={item2} value={item2}>{item2}</DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </div>
    )
}

export const CategoryFormErrors = () => {
    const { errors, validationErrors } = useCategoryForm();
    return(
        <Errors errors={errors} validationErrors={validationErrors}/>
    )
};







