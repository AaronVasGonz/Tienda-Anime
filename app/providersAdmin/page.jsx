"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTokenFromLocalStorage } from '@/utils/auth';
export default function ProvidersAdmin() {

    const [providers, setProviders] = useState([]);
    const token = getTokenFromLocalStorage();
    useEffect(() => {
        fetch('http://localhost:3001/api/providersAdmin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                setProviders(data.providers)
            }
            )
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = async (id) => {
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

    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <div className='flex   self-end'>
                <h3 className='mr-3 mt-2'>Add Provider</h3>
                <Link href={"/providersAdmin/addProvider"}>
                    <div className=' bg-violet-500 px-10 py-3 rounded mb-2 hover:bg-violet-600 cursor-pointer'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </Link>
            </div>
            <div className=" ">
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Id</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Proovedor</p>
                            </th>

                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Telefono</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Correo</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Action</p>
                            </th>

                        </tr>
                    </thead>
                    <tbody className='mt-4'>

                        {providers.length > 0 ? (
                            providers.map((provider) => (
                                <tr key={provider.id} >
                                    <td className="p-4 border-b border-blue-gray-50 text-left">
                                        <div className="flex text-left">
                                            <p className="block antialiased font-sans text-sm  leading-normal font-normal">{provider.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-left">
                                        <p className="block antialiased font-sans text-sm  leading-normal font-normal">{provider.Nombre_Proovedor}</p>
                                    </td>

                                    <td className="p-4 border-b border-blue-gray-50 text-left">
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal">{provider.Numero_Proovedor}</p>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-left">
                                        <p className="block antialiased font-sans text-sm  leading-normal font-normal">
                                            {provider.status_Proovedor}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-left">
                                        <p className="block antialiased font-sans text-sm  leading-normal font-normal">
                                            {provider.correo}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b  border-blue-gray-50 text-left text-2xl">
                                        <div className='flex justify-evenly'>

                                            <button  onClick={() => handleDelete(provider.id)}>
                                                <div className='bg-red-500 px-3 py-1  rounded hover:bg-red-700 cursor-pointer '>
                                                    <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                                </div>
                                            </button>
                                            <Link href={`/providersAdmin/updateProvider?id=${provider.id}`}>
                                                <div className='bg-violet-500  px-3  rounded  py-1  hover:bg-violet-600 cursor-pointer'>
                                                    <FontAwesomeIcon icon={faPen} className='text-white' />
                                                </div>
                                            </Link>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>
                                    <p>No providers</p>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>

            </div>
        </div>
    );
};

