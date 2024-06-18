"use client"
import React from 'react';
import { ProvFormProvider } from '@/components/patterns/Compound_Component_Pattern/prov/contexts/providerFormContext';
import { useSearchParams } from 'next/navigation';
import { MainImage } from '@/components/images/images';
import { Title } from '@/components/patterns/Compound_Component_Pattern/titles/titles';
import { ProviderAddress, ProviderDescription, ProviderEmail, ProviderForm, ProviderName, ProviderPhone, SelectProviderStatus, ProvidersFormErrors} from '@/components/patterns/Compound_Component_Pattern/prov/providers';
import { SubmitButton } from '@/components/buttons/formButton';
export default function Addprovider() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <>
      <ProvFormProvider>
        <ProviderForm>
          <MainImage width={80} height={80} src={'/provider.png'} />
          <Title titleOption1={'Here you can update an existing provider'} titleOption2={'Here you can add a new provider'} id={id} />
          <ProviderName/>
          <ProviderPhone/>
          <ProviderEmail/>
          <ProviderAddress/>
          <ProviderDescription/>
          <SelectProviderStatus item1={'Activo'} item2={'Inactivo'}/>
          <SubmitButton button_title_1={'Update Provider'} button_title_2={'Add Provider'} id={id}/>
        </ProviderForm>
        <ProvidersFormErrors/>
      </ProvFormProvider>
    </>
  );
};

