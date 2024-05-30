
"use client" 
import React from 'react';
import { useSearchParams } from 'next/navigation';
import {UpdateCollectionForm} from '../../../components/updateForm/updateForm';
import { authIfLogin, useAuthAdmin } from '@/utils/authPage';
export default function UpdateCollectionPage() {

  useAuthAdmin();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  return (
    <div>
      <UpdateCollectionForm id={id}/>
    </div>
  );
};

