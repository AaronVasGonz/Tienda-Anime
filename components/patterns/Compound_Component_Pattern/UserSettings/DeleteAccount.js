
import { Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useUserFormSettings } from "../UserSettings/contexts/userSettingsContext";

export const DeleteMyAccount = () => {
    const {id, token , setValidationErrors, setErrors, handleDeleteAccount} = useUserFormSettings();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return(
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
                      <Button color="danger" onClick={(e) => handleDeleteAccount(e, id, token, setValidationErrors, setErrors)} onPress={onClose}>
                        Delete My Account
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

          </div>
        </div>
    )
}