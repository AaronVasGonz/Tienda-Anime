"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { UpdateProductForm } from '../../../components/updateForm/updateFormProduc';

export default  function UpdateProduct() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return (
    <div>
     <UpdateProductForm id={id}/>
    </div>
  );
};
