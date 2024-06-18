import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import { useEffect } from "react";
export const VerifySearchParamsModal = ({ veriFyProp, verifyTitle }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (veriFyProp) {
            window.scrollTo(0, 0);
            onOpen();
        }
    }, [veriFyProp, onOpen]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader
                className="flex flex-col items-center"
                >
                    Success
                </ModalHeader>
                <ModalBody className="flex flex-col items-center">
                    <Image src="/sucess-emoji.png" alt="success" width={64} height={64} />
                    <p className=" bg-green-700 text-white text-center text-lg text-base p-2 rounded border-0">{verifyTitle}</p>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="error" className="bg-blue-800 " onClick={onOpenChange}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}