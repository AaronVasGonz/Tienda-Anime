"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTokenFromLocalStorage } from '@/utils/auth';
import {fetchProviders, fetchDeleteProvider} from '../../utils/functions/providersFunctions/providers'
import Table from '../../components/Tables/table';
export default function ProvidersAdmin() {
    const [providers, setProviders] = useState([]);
    const token = getTokenFromLocalStorage();
    const tablesheads = ['ID', 'Nombre Proveedor', 'Phone Number',  'Dirección', 'Email','Status','Acciones'];
    const tableData = providers;
    useEffect(() => {
       fetchProviders(setProviders)
    }, []);
    
    const handleDelete = async (id) => {
       fetchDeleteProvider(id, token);
    }
    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <Table
                tablesheads={tablesheads}
                tabledata={tableData}
                handleDelete={handleDelete}
                keyProp='id'
                filedName={"providersAdmin"}
            />
        </div>
    );
};

