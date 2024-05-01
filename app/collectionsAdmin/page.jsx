"use client"
import React, { use, useEffect, useState } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuthAdmin } from '@/utils/authPage';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { LoadingComp } from "../../components/loading/loading";


export default function CollectionAdmin() {
    useAuthAdmin();

    const token = getTokenFromLocalStorage();


    const [collections, setCollections] = useState([]);
    //RECORDAR USAR ESTE FETCH
    useEffect(() => {

        //console.log(user);
        fetch('http://localhost:3001/api/collections', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (Array.isArray(data.collections)) {
                    setCollections(data.collections);

                } else {
                    //console.error('Collections data is not an array');
                }
            })
            .catch(error => console.error('Error al traer colecciones:', error));
    }, []);

    function deleteCollection(id) {
        fetch(`http://localhost:3001/api/collections/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,

            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Collection deleted successfully') {
                    //console.log('Collection deleted successfully');
                    window.location.reload();
                } else {
                    //console.error('Failed to delete collection');
                }
            })
    }
    //console.log(collections);



    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <div className='flex   self-end'>
                <h3 className='mr-3 mt-2'>Add Collection</h3>
                <Link href={"/collectionsAdmin/addCollection"}>
                    <div className=' bg-violet-500 px-10 py-3 rounded mb-2 hover:bg-violet-600 cursor-pointer'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </Link>
            </div>
            <div className=" ">
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Id</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Collection Name</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Image</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Description</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-right">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Action</p>
                            </th>

                        </tr>
                    </thead>
                    <tbody className='mt-4'>


                        {collections.length > 0 ? (
                            collections.map(collection => (
                                <tr key={collection.id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-3">
                                            <p>{collection.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-sm leading-normal text-violet-700 font-normal">{collection.Nombre_Coleccion}</p>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <img src={collection.imageUrl} className="animate-fade-in block h-24 w-24 object-contain" alt="" />
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="max-w-xs overflow-hidden">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                {collection.Descripcion}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-right">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{collection.status}</p>
                                    </td>

                                    <td className="p-4 border-b  border-blue-gray-50 text-2xl">
                                        <div className='flex justify-evenly'>

                                            <button onClick={() => deleteCollection(collection.id)} >
                                                <div className='bg-red-500 px-3 py-1  rounded hover:bg-red-700 cursor-pointer '>
                                                    <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                                </div>
                                            </button>
                                            <Link href={`/collectionsAdmin/updateCollection?id=${collection.id}`}>
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
                                <td colSpan="6" className="p-4 border-b border-blue-gray-50 text-center">
                                    <p>Loading collections...</p>
                                    <LoadingComp className="mt-5" />
                                </td>
                            </tr>
                        )

                        }

                    </tbody>
                </table>

            </div>
        </div>
    );

}

