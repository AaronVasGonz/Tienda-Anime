"use client"
import { useState, useEffect } from 'react';

import { getTokenFromLocalStorage } from '@/utils/auth';
import { fetchProviders, fetchDeleteProvider } from '@/utils/functions/providersFunctions/providers'
import Table from '@/components/Tables/table';
import {SearchBarTable} from '@/components/navigation/searchBarTable';
import {sortResults , requestSort, searcher, getSortIcon} from '@/utils/functions/searchFunctions/tableSearching';
import {AddButton} from '@/components/buttons/addButton';
export default function ProvidersAdmin() {
    const [providers, setProviders] = useState([]);
    const token = getTokenFromLocalStorage();
    const [search, setSearch] = useState('');
    const [deleteError, setDeleteError] = useState(false);    
    const tablesheads = [
        { label: 'Id', key: 'id' }, 
        { label: 'Nombre Proveedor', key: 'Nombre_Proovedor' },
        { label: 'Phone Number', key: 'Numero_Proovedor' },
        { label: 'Dirección', key: 'Direccion_Proovedor' },
        { label: 'Email', key: 'correo' },
        { label: 'Status', key: 'status' },
        { label: 'Actions', key: 'actions' }
    ];
    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: 'ascending'
    });

    const results = !search ? providers : providers.filter((provider) =>
        (provider.Nombre_Proovedor).toLowerCase().includes(search.toLowerCase()) ||
        (provider.Direccion_Proovedor).toLowerCase().includes(search.toLowerCase()) ||
        (provider.correo).toLowerCase().includes(search.toLowerCase()) ||
        (provider.Numero_Proovedor).toLowerCase().includes(search.toLowerCase())
    );

    const sortedResults = sortResults(results, sortConfig);

    useEffect(() => {
        fetchProviders(setProviders);
        
    }, []);

    const handleDelete = async (id) => {
        fetchDeleteProvider(id, token, setDeleteError);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-black">
            <AddButton title={"Add Provider"} href={`providersAdmin/managment`}  />
            <div className="w-full mb-2 text-center" > {deleteError? <p className="text-white bg-red-700 rounded p-2 w-full">Error deleting provider, provider is asociated with a product</p>: ""} </div>
            <SearchBarTable searcher={searcher} setSearch={setSearch}/>
            <Table
               tablesheads={tablesheads}
                tabledata={sortedResults}
                requestSort={(key) => requestSort(key, sortConfig, setSortConfig)}
                getSortIcon={(key)=> getSortIcon(key, sortConfig)}
                handleDelete={handleDelete}
                keyProp='id'
                filedName={"providersAdmin"}
            />
        </div>
    );
}
