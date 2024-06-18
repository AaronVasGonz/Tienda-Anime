
"use client"
import { CategoryFormProvider } from '@/components/patterns/Compound_Component_Pattern/categories/contexts/categoryContext';
import { MainImage } from '@/components/images/images';
import { Title } from '@/components/patterns/Compound_Component_Pattern/titles/titles'
import { CategoryName, SelectStatusCategory, CategoryForm, Errors, CategoryFormErrors } from '@/components/patterns/Compound_Component_Pattern/categories/categoriesComponents'
import { SubmitButton } from '@/components/buttons/formButton';
import { useSearchParams } from 'next/navigation'
export default function AddCategory() {

    const searchParams = useSearchParams();
    
    const id = searchParams.get('id');
    
    return (
        <div className="flex flex-col max-w-2xl mx-auto justify-center">
            <CategoryFormProvider>
                <CategoryForm >
                    <MainImage width={80} height={80} src={"/product.png"} />
                    <Title titleOption1={'Here you can update an existing category'} titleOption2={"Here you can add a new category"}  id={id} />
                    <CategoryName />
                    <SelectStatusCategory item1={"Activo"} item2={"Inactivo"}/>
                    <SubmitButton  button_title_1={"Update Category"} button_title_2={"Add Category"} id={id} />
                </CategoryForm>
              <CategoryFormErrors/>
            </CategoryFormProvider>
        </div>
    );
};

