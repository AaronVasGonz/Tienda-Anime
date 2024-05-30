import { getTokenFromLocalStorage } from '../../auth';
import { decryptData } from '../../auth';
import { verifyToken } from '@/utils/authUtils';
export const fetchUserData = async (id: number, setEmail: React.Dispatch<React.SetStateAction<string>>, setName: React.Dispatch<React.SetStateAction<string>>, setImage: React.Dispatch<React.SetStateAction<string>>, isMounted: boolean) => {
    try {
        const token = getTokenFromLocalStorage();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token ?? undefined,
        };

        const response = await fetch(`http://localhost:3001/api/userDetails/${id}`, {
            method: 'GET',
            headers: headers as HeadersInit, // Type assertion
        });

        const data = await response.json();

        if (isMounted) {
            if (data.userWithImage && data.userWithImage.length > 0) {
                setEmail(data.userWithImage[0].correo);
                setName(data.userWithImage[0].Nombre);
                setImage(data.userWithImage[0].imageUrl);
            } else {
                //console.log("No users found or 'userWithImage' is empty");
            }
        }
    } catch (error) {
        if (isMounted) {
            // Handle the error as needed, for example:
            console.error("Failed to fetch user data:", error);
        }
    }
}


export const GetUserData = async (setUserRole: React.Dispatch<React.SetStateAction<string>>, setUserAdmin: React.Dispatch<React.SetStateAction<string>>, setId: React.Dispatch<React.SetStateAction<number>>) => {
    if (typeof window !== 'undefined') {
        const userEncrypted = localStorage.getItem('User');
        const iv = localStorage.getItem('project');
        if (userEncrypted && iv) {
            try {
                const userDecrypted = await decryptData(userEncrypted, iv);
                if (userDecrypted) {
                    setUserRole(userDecrypted.roles.rolUsuario);
                    setUserAdmin(userDecrypted.roles.roleAdministrador);
                    setId(userDecrypted.id);
                }
            } catch (error) {
                console.error('Error decrypting data:', error);
            }
        }
    }
}


export const validateAuthToken = async (userAdmin: string, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, setIsRolAdmin: React.Dispatch<React.SetStateAction<boolean>>) => {
    const itsTokenValid = await verifyToken();
    setIsAuthenticated(itsTokenValid);
    if (userAdmin == 'ADMIN') {
        setIsRolAdmin(true);
    }
};
