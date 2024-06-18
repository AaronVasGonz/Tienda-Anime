"use client"
import React from 'react';
import { ProductFormProvider } from '@/components/patterns/Compound_Component_Pattern/products/contexts/productFormContext';
import { MainImage } from '@/components/images/images';
import { Title } from '@/components/patterns/Compound_Component_Pattern/titles/titles';
import { ProductFormErrors, AddImagesToProduct, ProductDescription, ProductForm, ProductName, ProductPrice, ProductStock, SelectProductCategory, SelectProductCollection, SelectProductProvider, SelectProductStatus } from '@/components/patterns/Compound_Component_Pattern/products/products'
import { SubmitButton } from '@/components/buttons/formButton';
import { useSearchParams } from 'next/navigation'
export default function AddProduct() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <>
      <ProductFormProvider>
        <div className="flex flex-col w-auto mx-auto">
          <ProductForm>
            <MainImage width={80} height={80} src={'/product1.png'} />
            <Title id={id} titleOption1={"Here you can update an existing product"} titleOption2={'Here you can add a new product'} />
            <ProductName nameInput={'Nombre_Producto'} />
            <div className='grid sm:w-1/2 w-full justify-center items-center sm:grid-cols-2 grid-cols-1'>
              <ProductPrice />
              <ProductStock />
            </div>
            <AddImagesToProduct />
            <ProductDescription />
            <div className="sm:grid  sm:w-1/2 gap-x-20   content-center  sm:grid-cols-2 ">
              <SelectProductCategory />
              <SelectProductCollection />
              <SelectProductStatus item1={'Activo'} item2={'Inactivo'} />
              <SelectProductProvider />
            </div>
            <SubmitButton button_title_1={'Update Product'} button_title_2={'Add Product'} id={id} />
          </ProductForm>
          <ProductFormErrors />
        </div>
      </ProductFormProvider>
    </>
  );
};
