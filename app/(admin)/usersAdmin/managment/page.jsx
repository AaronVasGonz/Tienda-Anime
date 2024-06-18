"use client"
import React from 'react';
import { UserFormProvider } from '@/components/patterns/Compound_Component_Pattern/users/contexts/userFormContext';
import { MainImage } from '@/components/images/images';
import { Title } from '@/components/patterns/Compound_Component_Pattern/titles/titles';
import {  PasswordStrong, SelectUserRoles, UserEmail, UserForm, UserFormErrors, UserLastName, UserName, UserPassword, UserPasswordRepeat, UserSecondLastName } from '@/components/patterns/Compound_Component_Pattern/users/users';
import { SubmitButton } from '@/components/buttons/formButton';
import { useSearchParams } from 'next/navigation'
export default function AddUser() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return (
        <UserFormProvider>
            <UserForm>
                <div className="flex flex-col animate-bounce-once text-3xl text-center items-center font-bold ">
                    <MainImage width={80} height={80} src="/tanjiro.webp" />
                </div>
                <Title id={id} titleOption1={'Here you can update an existing user'} titleOption2={'Here you can add a new user'} />
                <UserName />
                <UserLastName />
                <UserSecondLastName />
                <UserEmail />
                {id ? (
                    <></>
                ) : (
                    <>
                        <UserPassword />
                        <UserPasswordRepeat />
                        <PasswordStrong />
                    </>
                )}
                <SelectUserRoles />
                <div className="flex flex-col mb-10 mt-2   items-center justify-center">
                    <SubmitButton button_title_1={'Update User'} button_title_2={'Add User'} id={id} />
                </div>
            </UserForm>
            <UserFormErrors/>
        </UserFormProvider>
    );
};
