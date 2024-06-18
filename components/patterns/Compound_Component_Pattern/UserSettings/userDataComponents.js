import { Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useUserFormSettings } from "./contexts/userSettingsContext";
import {VerifySearchParamsModal} from "@/components/modals/VerifySearchParamsModal";

export const UserFormSettings = (props) => {
    const {handleSubmit, id, token, userData ,selectedFile, image, setValidationErrors, setErrors} = useUserFormSettings();
  return (
      <form onSubmit={(e)=>handleSubmit(e, id, token, userData , selectedFile, image, setValidationErrors, setErrors)}
      className=" animate-slide-left  flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8  mb-5 ">
        {props.children}
      </form>
  )
}

export const UserNameUser = () => {
  
    const{ setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <div className="mb-5 sm:w-1/2 w-full ">
      <label htmlFor="Nombre" className='ml-2'>Name</label>
      <Input
        id="Nombre"
        type="text"
        name="Nombre"
        placeholder="Name"
        value={userData.Nombre || ''}
        variant="faded"
        onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
        contentRightStyling={{ textAlign: 'center' }}
        className="mt-2"
      />
    </div>
  );
};

export const UserFirstLastName = () => {
  const{ setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
      <div>
        <label
          htmlFor="Apellido"
          className='text-xl ml-2'
        >First Last Name</label>
        <Input
          id="Apellido"
          type="text"
          name="Apellido"
          value={userData.Apellido || ''}
          placeholder="LastName"
          variant="faded"
          onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
          className="mt-2 " />
      </div>
    </div>
  )
}

export const UserSecondLastName = () => {
  const{ setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
      <label
        htmlFor="Apellido2"
        className='text-xl ml-2'
      >Second Last Name (optional)</label>
      <Input
        id="Apellido2" type="text"
        name='Apellido2'
        value={userData.Apellido2 || ''}
        placeholder="LastName" variant="faded"
        onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
        className="mt-2" />
    </div>
  )
}



export const UserEmail = () => {
  const{ setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
      <label
        htmlFor="correo"
        className='text-xl ml-2'
      >Email</label>
      <Input
        id="correo" type="text"
        name='correo'
        isDisabled
        value={userData.correo || ''}
        placeholder="Email" variant="faded"
        onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
        className="mt-2 sm:text-xl sm:text-center sm:w-full " />
      <p className="text-red-500 text-sm mt-2 ml-1">You cant change your email for security reasons</p>
      <p className='text-blue-500 text-sm  ml-1'>For email changing please <span className='underline cursor-pointer'><Link href='/contact'>contact us</Link></span>  </p>
    </div>
  )
}

export const UserAddress = () => {

  const{ id ,setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <>
      {
        userData.direccion ? (
          <div className="mb-5 sm:w-1/2 w-full flex flex-col " >
            <label htmlFor="Address">Address</label>
            <div className="flex ">
              <Textarea
                id="Address"
                isDisabled
                type="text"
                name="direccion"
                placeholder="You don't have an Address"
                variant="faded"
                onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
                className="mt-2"
                value={userData.direccion || ''}
              />
              <Link href={`/settings/updateAddress?id=${id}`} >
                <FontAwesomeIcon icon={faEdit} className="text-2xl ml-2 mt-2 hover:text-hover-purple transition duration-300 ease-in  cursor-pointer" />
              </Link>

            </div>
          </div >
        ) : (
          <div className="mb-5 flex flex-col  sm:w-1/2 justify-center   rounded-lg   py-1">
            <h4 className="text-lg">You dont have an address?</h4>
            <p className="mt-2 text-lg">Add a new address here</p>
            <Link href='/settings/addAddress' className="bg-main-purple text-center mt-2 hover:bg-hover-purple rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">
              Add Address
            </Link>
          </div>
        )}
    </>
  )

}

export const UserPhone = () => {
  const{ id ,setUserData, userData, setErrors, setValidationErrors, handleChange}= useUserFormSettings();
  return (
    <>
      {userData.Telefono ? (
        <div className="mb-5 flex sm:w-1/2 w-full flex-col ">
          <label htmlFor="Email">Phone</label>
          <div className='flex'>
            <Input
              isDisabled
              id="Phone"
              name='Telefono'
              type="text"
              placeholder="You don't have an Phone Number"
              variant="faded"
              onChange={(e)=> handleChange(e, setUserData, userData, setErrors, setValidationErrors)}
              value={userData.Telefono || ''}
              className="mt-2 "
            />
            <Link href={`/settings/updatePhone?id=${id}`}>
              <FontAwesomeIcon icon={faEdit} className="text-2xl ml-2 mt-2 hover:text-hover-purple transition duration-300 ease-in  cursor-pointer" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-5 flex flex-col  sm:w-1/2 justify-center rounded-lg   py-1">
          <h4 className="text-lg">You dont have an Number?</h4>
          <p className="mt-2 text-lg">Add a new Phone Number here</p>
          <Link href='/settings/addPhone' className="bg-main-purple text-center button-login mt-2 hover:bg-hover-purple rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">
            Add Phone Number
          </Link>
        </div>
      )
      }
    </>
  )
}

export const UserAvatar = () => {
  const {avatarUrl, userData , selectedFile, handleFileChange,setSelectedFile ,setAvatarUrl }= useUserFormSettings();
  return (
    <div className=' flex flex-col  mt-10'>{selectedFile ? (
      <Image
        width={120}
        height={120}
        alt='avatar'
        aria-label='avatar'
        loading='lazy'
        className=" avatar "
        src={avatarUrl}
      />
    ) : (
      <Image
        width={120}
        height={120}
        alt='avatar'
        loading='lazy'
        aria-label='avatar'
        className="avatar  "
        src={userData.imageUrl|| "/no-avatar-image.jpg"}
      />
    )}
      <label

        htmlFor="fileInput"
        className="flex  justify-center  hover:text-hover-purple transition duration-300 ease-in mt-4 cursor-pointer"
      >
        <FontAwesomeIcon icon={faEdit} className="text-2xl " />
        <input
          type="file"
          id="fileInput"
          hidden
          onChange={(e) => handleFileChange(e, setSelectedFile, setAvatarUrl) }
        />
      </label>
    </div>
  )
}


export const VerifySearchParams = () => {
  const { success, successAddress, successPhone, successPassword } = useUserFormSettings();

  return (
    <div>
      {success && (
        <VerifySearchParamsModal veriFyProp={success} verifyTitle={"Your data has been updated successfully!"}/>
      )}
      {successAddress && (
        <VerifySearchParamsModal veriFyProp={successAddress} verifyTitle={"Your address has been updated successfully!"}/>
      )}
      {successPhone && (
        <VerifySearchParamsModal veriFyProp={successPhone} verifyTitle={"Your phone number has been updated successfully!"}/>
      )}
      {successPassword && (
        <VerifySearchParamsModal veriFyProp={successPassword} verifyTitle={"Your password has been updated successfully!"}/>
      )}
    </div>
  );
};


















