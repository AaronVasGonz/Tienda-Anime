
import { getTokenFromLocalStorage } from "../../auth";// src/utils/functions/providersFunctions/providers.ts


export const fetchProviders = async (setProviders) => {
    const token = getTokenFromLocalStorage();
    console.log(token);
    try {
        const response = await fetch('http://localhost:3001/api/providersAdmin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProviders(data.providers);
    } catch (error) {
        console.error('Error:', error);
        return null; // Or handle the error as needed
    }
};

export const fetchDeleteProvider = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:3001/api/providersAdmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete provider');
        }
    } catch (error) {
        console.error(error);
    }
}