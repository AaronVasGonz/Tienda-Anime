
"use client"
import { SubmitButton } from "@/components/buttons/formButton";
import { MainContainer } from "@/components/patterns/Compound_Component_Pattern/Containers/containersComponents";
import { UserSettingsProvider } from "@/components/patterns/Compound_Component_Pattern/UserSettings/contexts/userSettingsContext"
import { MainTitle, SubTitle } from "@/components/patterns/Compound_Component_Pattern/UserSettings/titles";
import { UserAvatar, UserFirstLastName, UserSecondLastName, UserFormSettings, UserEmail, UserNameUser, UserAddress, UserPhone, VerifySearchParams } from "@/components/patterns/Compound_Component_Pattern/UserSettings/userDataComponents";
import {ChangeMyPassword} from '@/components/patterns/Compound_Component_Pattern/UserSettings/ChangePassword';  
import {DeleteMyAccount} from "@/components/patterns/Compound_Component_Pattern/UserSettings/DeleteAccount"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function Settings() {

  const useSearch = useSearchParams();
  const id = useSearch.get('id');

  useEffect(() => {
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);
  })

  return (
    <UserSettingsProvider>
      <MainContainer>
        <MainTitle title={"Settings"} />
        <SubTitle />
        <VerifySearchParams />
        <UserFormSettings>
          <UserAvatar />
          <UserNameUser />
          <UserFirstLastName />
          <UserSecondLastName />
          <UserEmail />
          <UserAddress />
          <UserPhone />
          <SubmitButton button_title_1={"Update User"} button_title_2={"Add User"} id={!id} />
        </UserFormSettings>
        <ChangeMyPassword/>
        <DeleteMyAccount/>
      </MainContainer>
    </UserSettingsProvider>
  )
}

