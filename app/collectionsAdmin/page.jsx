"use client"
import React, { use, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuthAdmin } from '@/utils/authPage';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { LoadingComp } from "../../components/loading/loading";
import { useRouter } from 'next/navigation';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

import { Pagination } from '@nextui-org/react';



export default function CollectionAdmin() {

    useAuthAdmin();
    const router = useRouter();
    const token = getTokenFromLocalStorage();
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const totalItems = collections.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getCurrentPageItems = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return collections.slice(startIndex, endIndex);
    };

    const currentPageItems = getCurrentPageItems();

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
                if (Array.isArray(data.collections)) {
                    setCollections(data.collections);

                } else {
                    //console.error('Collections data is not an array');
                }
            })
            .catch(error => console.error('Error al traer colecciones:', error));
    }, [token]);

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
                    router.refresh();
                } else {
                    //console.error('Failed to delete collection');
                }
            })
    }
    return (
        <div className="flex flex-col  items-center animate-slide-left justify-center bg-black">
            <div className='flex   self-end'>
                <h3 className='mr-3 mt-2'>Add Collection</h3>
                <Link
                    aria-label='Add Collection'

                    href={"/collectionsAdmin/addCollection"}>
                    <div className=' bg-main-purple px-10 py-3 rounded mb-2 hover:bg-hover-purple transition duration-300 ease-in cursor-pointer'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </Link>
            </div>
            <Table
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            variant='light'
                            isCompact

                            classNames={{
                                wrapper: " gap-1 overflow-visible h-8 rounded-lg border border-divider",
                                item: "w-8 h-8 text-small rounded-none bg-transparent",
                                cursor:
                                    "bg-main-purple shadow-lg  text-white font-bold",
                            }}

                            page={page}

                            total={totalPages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn>
                        <p>Id</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Collection Name</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Image</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Description</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Status</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Actions</p>
                    </TableColumn>
                </TableHeader>
                <TableBody

                    emptyContent={
                        <>
                            <p>Loading Collections</p>
                            <LoadingComp />
                        </>

                    }
                >
                    {
                        currentPageItems.map((collection) => (
                            <TableRow key={collection.id}>
                                <TableCell>
                                    <p>{collection.id}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{collection.Nombre_Coleccion}</p>
                                </TableCell>
                                <TableCell>
                                    <img src={collection.imageUrl} className="animate-fade-in block h-24 w-24 object-contain" alt="" />
                                </TableCell>
                                <TableCell>
                                    <p>{collection.Descripcion}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{collection.status}</p>
                                </TableCell>
                                <TableCell>
                                    <div className='flex '>
                                        <button
                                            onClick={() => deleteCollection(collection.id)}
                                            aria-label='Delete Collection'
                                            className='mr-2'
                                        >
                                            <div className='bg-red-700 px-3 py-1 rounded hover:bg-red-600 transition duration-300 ease-in cursor-pointer '>
                                                <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                            </div>
                                        </button>
                                        <Link href={`/collectionsAdmin/updateCollection?id=${collection.id}`}>
                                            <div
                                                aria-label='Edit Collection'
                                                className='bg-main-purple px-3 rounded py-1 hover:bg-hover-purple transition duration-300 ease-in cursor-pointer'
                                            >
                                                <FontAwesomeIcon icon={faPen} className='text-white' />
                                            </div>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))

                    }
                </TableBody>
            </Table>
        </div>
    );

}

