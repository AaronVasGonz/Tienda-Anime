"use client"

import { useState, useEffect, useMemo } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import validator from 'validator';
import { useSearchParams } from 'next/navigation';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import{UpdateProviderForm} from '../../../components/updateForm/updateProviderForm';

export default function UpdateProviders() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

 return (
 <UpdateProviderForm id={id}/>
 )
}

 