"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { useAuthAdmin } from '@/utils/authPage';
import GeneralTable from '../../components/Tables/table';


export default function UsersAdmin() {


    useAuthAdmin();
    const token = getTokenFromLocalStorage();
    const [users, setUser] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/usersAdmin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.users)) {
                    setUser(data.users);
                } else {
                    console.error('Users data is not an array');
                }
            })
            .catch(error => console.error("Error al traer colecciones:", error))
    }, [])

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:3001/api/usersAdmin/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const tableHeaders = ['Id', 'Name', 'Email', 'Role', 'Status', 'Actions'];
    console.log(users);
    return (
        <div className="flex flex-col  items-center justify-center bg-black">
    
            <GeneralTable
                tablesheads={tableHeaders}
                tabledata={users}
                handleDelete={handleDelete}
                keyProp='id'
                filedName={"usersAdmin"}
                AddButton={'Add User'}
            />


        </div>

    );
};
