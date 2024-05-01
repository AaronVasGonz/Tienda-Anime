"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { useAuthAdmin } from '@/utils/authPage';


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

    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <div className='flex   self-end'>
                <h3 className='mr-3 mt-2'>Add User</h3>
                <Link href={"/usersAdmin/addUser"}>
                    <div className=' bg-violet-500 px-10 py-3 rounded mb-2 hover:bg-violet-600 cursor-pointer'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </Link>
            </div>
            <div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Id</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Nombre</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Correo</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Rol</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Action</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='mt-4 text-sm'>
                        {users.length > 0 ? (
                            users
                                .filter((user, index, self) =>
                                    self.findIndex((t) => t.id === user.id && t.Rol === 'ADMIN') === index ||
                                    (self.findIndex((t) => t.id === user.id && t.Rol === 'ADMIN') === -1 &&
                                        self.findIndex((t) => t.id === user.id) === index)
                                )
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{user.id}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{user.Nombre}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{user.correo}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{user.Rol}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{user.status}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-2xl">
                                            <div className='flex justify-evenly'>
                                                <button>
                                                    <div className='bg-red-500 px-3 py-1 rounded hover:bg-red-700 cursor-pointer'>
                                                        <FontAwesomeIcon className='text-white-600 hover:text-white-700' onClick={() => handleDelete(user.id)} icon={faTrash} />
                                                    </div>
                                                </button>
                                                <Link href={`/usersAdmin/updateUser?id=${user.id}`}>
                                                    <div className='bg-violet-500 px-3 py-1 rounded hover:bg-violet-600 cursor-pointer'>
                                                        <FontAwesomeIcon icon={faPen} className='text-white' />
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td> No hay users </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>


        </div>

    );
};
