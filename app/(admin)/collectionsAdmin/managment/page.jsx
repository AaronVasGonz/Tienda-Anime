"use client"
import React, { useEffect, } from 'react';
import styles from '../../../../styles/file-input.module.css';
import { useAuthAdmin } from '@/utils/authPage';
import { CollectionFormProvider } from '@/components/patterns/Compound_Component_Pattern/collections/contexts/collectionFormContext'
import { CollectionFormErrors, AddCollectionImage, CollectionDescription, CollectionForm, CollectionName, SelectStatusCollection } from '@/components/patterns/Compound_Component_Pattern/collections/collections';
import { MainContainer } from '@/components/patterns/Compound_Component_Pattern/Containers/containersComponents';
import { useSearchParams } from 'next/navigation';
import { MainImage } from '@/components/images/images';
import { SubmitButton } from '@/components/buttons/formButton';
import { Title } from '@/components/patterns/Compound_Component_Pattern/titles/titles';
function AddColeccion() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    useAuthAdmin();
    return (
        <CollectionFormProvider>
            <MainContainer>
                <CollectionForm>
                    <MainImage width={80} height={80} src={'/product.png'} />
                    <Title titleOption1={'Update Collection'} titleOption2={'Add Collection'} id={id} />
                    <CollectionName />
                    <CollectionDescription />
                    <SelectStatusCollection item1={'Activo'} item2={'Inactivo'} />
                    <AddCollectionImage styles={styles} />
                    <SubmitButton button_title_1={'Update Collection'} button_title_2={'Add Collection'} id={id} />
                </CollectionForm>
            </MainContainer>
            <CollectionFormErrors />
        </CollectionFormProvider>
    );
}

export default AddColeccion;