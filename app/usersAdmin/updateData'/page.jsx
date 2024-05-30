"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthAdmin } from '@/utils/authPage';
import{UpdateUserForm} from '../../../components/updateForms/updateUserForm';
export default function UpdateUser() {
    useAuthAdmin();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
  return (
    <div>
      <UpdateUserForm id={id}/>
    </div>
  );
};

