"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthAdmin } from '@/utils/authPage';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { LoadingComp } from "@/components/loading/loading";
import { searcher, sortResults, requestSort, getSortIcon } from '@/utils/functions/searchFunctions/tableSearching';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import { fetchCollections, fetchDeleteCollection} from '@/utils/functions/collections/collections';
import {  Pagination } from '@nextui-org/react';
import {AddButton} from '@/components/buttons/addButton';
import {SearchBarTable} from '@/components/navigation/searchBarTable';

export default function CollectionAdmin() {
    useAuthAdmin();
    const token = getTokenFromLocalStorage();
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: 'ascending'
    }
    )

    const results = !search ? collections : collections.filter((collection) => 
        (collection.status && collection.status.toLowerCase().includes(search.toLowerCase())) ||
        (collection.Nombre_Coleccion && collection.Nombre_Coleccion.toLowerCase().includes(search.toLowerCase())) ||
        (collection.Descripcion && collection.Descripcion.toLowerCase().includes(search.toLowerCase()))
    );

    const sortedResults = sortResults(results, sortConfig);
    const totalItems = sortedResults.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getCurrentPageItems = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedResults.slice(startIndex, endIndex);
    };

    const currentPageItems = getCurrentPageItems();

    useEffect(() => {
       fetchCollections(setCollections, token);
    }, [token]);


    function deleteCollection(id) {
        fetchDeleteCollection(id, token);
    }

    return (
        <div className="flex flex-col items-center animate-slide-left justify-center bg-black">
            <AddButton title={"Add Collection"} href={"/collectionsAdmin/managment"} />
            <SearchBarTable searcher={searcher} setSearch={setSearch} />
            <Table
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            variant='light'
                            isCompact
                            classNames={{
                                wrapper: "gap-1 overflow-visible h-8 rounded-lg border border-divider",
                                item: "w-8 h-8 text-small rounded-none bg-transparent",
                                cursor: "bg-main-purple shadow-lg text-white font-bold",
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
                    <TableColumn aria-label="Id" onClick={() => requestSort("id", sortConfig, setSortConfig)}>
                        <p>Id <FontAwesomeIcon icon={getSortIcon('id', sortConfig)} /></p>
                    </TableColumn>
                    <TableColumn aria-label="Collection Name" onClick={() => requestSort('Nombre_Coleccion', sortConfig, setSortConfig)}>
                        <p>Collection Name <FontAwesomeIcon icon={getSortIcon('Nombre_Coleccion', sortConfig)} /></p>
                    </TableColumn>
                    <TableColumn aria-label="Image">
                        <p>Image</p>
                    </TableColumn>
                    <TableColumn aria-label="Description" onClick={() => requestSort('Descripcion', sortConfig, setSortConfig)}>
                        <p>Description <FontAwesomeIcon icon={getSortIcon('Descripcion', sortConfig)} /></p>
                    </TableColumn>
                    <TableColumn aria-label="Status" onClick={() => requestSort('status', sortConfig, setSortConfig)}>
                        <p>Status <FontAwesomeIcon icon={getSortIcon('status', sortConfig)} /></p>
                    </TableColumn>
                    <TableColumn aria-label="Actions">
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
                    {currentPageItems.map((collection) => (
                        <TableRow key={collection.id}>
                            <TableCell><p>{collection.id}</p></TableCell>
                            <TableCell><p>{collection.Nombre_Coleccion}</p></TableCell>
                            <TableCell>
                                <Image width={100} height={100} src={collection.imageUrl} loading='lazy' className="animate-fade-in block h-24 w-24 object-contain" alt="collection" />
                            </TableCell>
                            <TableCell><p>{collection.Descripcion}</p></TableCell>
                            <TableCell><p>{collection.status}</p></TableCell>
                            <TableCell>
                                <div className='flex'>
                                    <button
                                        onClick={() => deleteCollection(collection.id)}
                                        aria-label='Delete Collection'
                                        aria-labelledby='Delete Collection'
                                        className='mr-2'
                                    >
                                        <div className='bg-red-700 px-3 py-1 rounded hover:bg-red-600 transition duration-300 ease-in cursor-pointer'>
                                            <FontAwesomeIcon className='text-white-600 hover:tex-white-700' icon={faTrash} />
                                        </div>
                                    </button>
                                    <Link href={`/collectionsAdmin/managment?id=${collection.id}`}>
                                        <div
                                            aria-label='Edit Collection'
                                            aria-labelledby='Edit Collection'
                                            className='bg-main-purple px-3 rounded py-1 hover:bg-hover-purple transition duration-300 ease-in cursor-pointer'
                                        >
                                            <FontAwesomeIcon icon={faPen} className='text-white' />
                                        </div>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
