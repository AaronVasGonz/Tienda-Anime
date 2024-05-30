"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTokenFromLocalStorage, removeIvFromLocalStorage, removeTokenFromLocalStorage, removeUserFromLocalStorage } from '@/utils/auth';
import { fetchUserData, getUserDataFromLocalStorage, sanitizeUserData, validateUserFormData } from '@/utils/functions/userFunctions/userDetails';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { handleServerErrors } from '@/utils/serverUtils';
import Image from 'next/image';
import Link from 'next/link';


const Settings = () => {
  const useSearch = useSearchParams();
  const success = useSearch.get('success');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const successAddress = useSearch.get('successAddress');
  const successPhone = useSearch.get('successPhone');
  const successPassword = useSearch.get('successPassword');
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('/verifylogo.jpg');
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({ id: '', Nombre: '', Apellido: '', Apellido2: '', correo: '', Telefono: '', direccion: '' });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    getUserDataFromLocalStorage(setId);
  }, []);

  useEffect(() => {
    fetchUserData(id, setUserData, setImage);
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[e.target.name];
      return updatedErrors;
    });
  };

  const handleDeleteAccount = async (e, id) => {
    e.preventDefault();
    try {
      const token = getTokenFromLocalStorage();
      const response = await fetch(`http://localhost:3001/api/usersAdmin/deleteAccount/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const responseData = await response.json();
      if (response.ok) {
          removeIvFromLocalStorage();
          removeTokenFromLocalStorage();
          removeUserFromLocalStorage();
          window.location.href = '/login';
      } else {
        handleServerErrors(responseData, setValidationErrors, setErrors);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateUserFormData(userData);
    if (Object.keys(formErrors).length === 0) {
      try {
        const token = getTokenFromLocalStorage();
        const sanitizedData = sanitizeUserData(userData);
        const formDataToSend = new FormData();
        formDataToSend.append('data', JSON.stringify(sanitizedData));
        formDataToSend.append('avatar', selectedFile);
        formDataToSend.append('avatarText', image);

        const response = await fetch(`http://localhost:3001/api/userDetails/update/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': token
          },
          body: formDataToSend,
        });
        const responseData = await response.json();
        if (response.ok) {
          window.location.href = '/settings?success=true';
        } else {
          handleServerErrors(responseData, setValidationErrors, setErrors);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setErrors(formErrors);
    }
  };



  return (
    <div className="flex flex-col max-w-2xl mx-auto justify-center">
      <h1 className=" flex  items-center animate-slide-down justify-center text-3xl  font-bold text-center ">Settings<span><Image src="/settings2.png" loading='lazy' width={50} height={50} className="animate-bounce-once " alt="" /></span></h1>
      <h3 className="text-2xl mt-4 mb-3  animate-slide-down text-center">This is the Setting page where you can update your information.</h3>
      <div>
        {success && <div className=" p-2 bg-green-600 rounded-lg mb-3 text-white text-center  !"><p className="text-base">Your data has been successfully updated</p></div>}
        {successAddress && <div className=" p-2 bg-green-600 rounded-lg mb-3 text-white text-center  !"><p className="text-base">Your address has been successfully updated</p></div>}
        {successPhone && <div className=" p-2 bg-green-600 rounded-lg mb-3 text-white text-center  !"><p className="text-base">Your phone number has been successfully updated</p></div>}
        {successPassword && <div className=" p-2 bg-green-600 rounded-lg mb-3 text-white text-center  !"><p className="text-base">Your password has been successfully updated</p></div>}
        {errors && Object.keys(errors).map((field) => (
          <div key={field} className='mb-3'>
            <div className="bg-red-700 p-2 text-center rounded ">
              <p className="text-white text-base">{errors[field]}</p>
            </div>
          </div>
        ))}

        {Object.keys(validationErrors).map((field) => (
          <div key={field} className="mb-3">
            <div className="bg-red-700 text-center p-2 rounded">
              <p className="text-white text-base"> {validationErrors[field]}</p>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className=" animate-slide-left  flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8  mb-5 ">
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
              src={userData.imageUrl || "/no-avatar-image.jpg"}
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
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mb-5 sm:w-1/2 w-full ">
            <label
              htmlFor="Name"
              className='  ml-2'
            >Name</label>
            <Input
              id="Name"
              type="text"
              name="Nombre"
              placeholder="Name"
              value={userData?.Nombre}
              variant="faded"
              onChange={handleChange}
              contentRightStyling={{ textAlign: 'center' }}
              className="mt-2  "
            />
          </div>
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
                value={userData?.Apellido}
                placeholder="LastName"
                variant="faded"
                onChange={handleChange}
                className="mt-2 " />
            </div>
          </div>
          <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
            <label
              htmlFor="Apellido2"
              className='text-xl ml-2'
            >Second Last Name (optional)</label>
            <Input
              id="Apellido2" type="text"
              name='Apellido2'
              value={userData?.Apellido2}
              placeholder="LastName" variant="faded"
              onChange={handleChange}
              className="mt-2" />
          </div>
          <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
            <label
              htmlFor="correo"
              className='text-xl ml-2'
            >Email</label>
            <Input
              id="correo" type="text"
              name='correo'
              isDisabled
              value={userData?.correo}
              placeholder="Email" variant="faded"
              onChange={handleChange}
              className="mt-2 sm:text-xl sm:text-center sm:w-full " />
            <p className="text-red-500 text-sm mt-2 ml-1">You can't change your email for security reasons</p>
            <p className='text-blue-500 text-sm  ml-1'>For email changing please <span className='underline cursor-pointer'><Link href='/contact'>contact us</Link></span>  </p>
          </div>
          {userData.direccion ? (
            <div className="mb-5 sm:w-1/2 w-full flex flex-col ">
              <label htmlFor="Address">Address</label>
              <div className="flex ">
                <Textarea
                  id="Address"
                  isDisabled
                  type="text"
                  name="direccion"
                  placeholder="You don't have an Address"
                  variant="faded"
                  onChange={handleChange}
                  className="mt-2"
                  value={userData.direccion}
                />
                <Link href={`/settings/updateAddress?id=${userData.id_Usuario}`} >
                  <FontAwesomeIcon icon={faEdit} className="text-2xl ml-2 mt-2 hover:text-hover-purple transition duration-300 ease-in  cursor-pointer" />
                </Link>

              </div>
            </div>
          ) : (
            <div className="mb-5 flex flex-col  sm:w-1/2 justify-center   rounded-lg   py-1">
              <h4 className="text-lg">You don't have an address?</h4>
              <p className="mt-2 text-lg">Add a new address here</p>
              <Link href='/settings/addAddress' className="bg-main-purple text-center mt-2 hover:bg-hover-purple rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">
                Add Address
              </Link>
            </div>
          )}
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
                  onChange={handleChange}
                  value={userData.Telefono}
                  className="mt-2 "
                />
                <Link href={`/settings/updatePhone?id=${userData.id_Usuario}`}>
                  <FontAwesomeIcon icon={faEdit} className="text-2xl ml-2 mt-2 hover:text-hover-purple transition duration-300 ease-in  cursor-pointer" />
                </Link>

              </div>
            </div>
          ) : (
            <div className="mb-5 flex flex-col  sm:w-1/2 justify-center rounded-lg   py-1">
              <h4 className="text-lg">You don't have an Number?</h4>
              <p className="mt-2 text-lg">Add a new Phone Number here</p>
              <Link href='/settings/addPhone' className="bg-main-purple text-center button-login mt-2 hover:bg-hover-purple rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">
                Add Phone Number
              </Link>
            </div>
          )
          }
          <div className="flex flex-col mt-6 sm:w-1/2 w-full justify-center  mb-10">
            <button className="update-button text-2xl hover:bg-blue-600 rounded-lg  px-6 py-2 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">Update my Info</button>
          </div>
        </form>
        <div className='flex flex-col animate-slide-left'>
          <h2 className='text-2xl  font-bold text-center mb-6'>I want to change my <span className='text-main-purple font-bold capitalize -md'>password</span></h2>
          <div className="mb-5 flex flex-col  bg-neutral-950  justify-center items-center  rounded-lg  px-6 py-1  ">
            <p className="mt-2 text-center text-lg mb-2">If you want to change your password, click here</p>
            <Link href={`/settings/passwordChanger?id=${userData.id_Usuario}`} className=" mt-2 mb-4 border-1 bg-neutral-850 border-blue-500  ring-0  rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer text-center ">Change my Password</Link>
          </div>
        </div>
        <div className="mt-2 flex animate-slide-left flex-col justify-end ">
          <h2 className='text-xl font-bold text-danger text-center mt-8'>Danger Zone</h2>
          <h2 className='text-2xl font-bold text-center mb-6'>I want to delete my <span className='text-main-purple font-bold capitalize'>account</span></h2>
          <div className=" flex flex-col bg-neutral-950 justify-center items-center border-hideen border-danger rounded-lg  px-6 py-1 ">
            <p className="mt-2 text-center text-lg mb-2">Sure? You can delete your account here</p>


            <Button className="bg-neutral-850 mt-2 mb-4 border-1 border-danger rounded-lg w-1/3 text-md  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer text-center capitalize " onPress={onOpen}>Delete my Account</Button>
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                }
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex  justify-center Items-center text-center text-danger gap-1 text-xl bg-neutral-950">Account Deletion</ModalHeader>
                    <ModalBody className='bg-neutral-950'>
                      <h2 className="text-center">
                        Do you really want to delete your account?
                      </h2>
                    </ModalBody>
                    <ModalFooter className='flex bg-neutral-950 justify-center'>
                      <Button color="primary" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button color="danger" onClick={(e) => handleDeleteAccount(e, userData.id_Usuario)} onPress={onClose}>
                        Delete My Account
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;