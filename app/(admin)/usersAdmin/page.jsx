"use client"
import React, { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { useAuthAdmin } from '@/utils/authPage';
import GeneralTable from '@/components/Tables/table';
import { sortResults, requestSort, searcher, getSortIcon } from '@/utils/functions/searchFunctions/tableSearching';
import { SearchBarTable } from '@/components/navigation/searchBarTable';
import { AddButton } from '@/components/buttons/addButton';
import { fetchUsers, fetchDeleteUser } from '@/utils/functions/users(admin)/users';

export default function UsersAdmin() {
    
    useAuthAdmin();
    const token = getTokenFromLocalStorage();
    const [users, setUser] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'id',
        direction: 'ascending'
    });
    const tableHeaders = [
        { label: "Id", key: "id" },
        { label: "Name", key: "Nombre" },
        { label: "Email", key: "correo" },
        { label: "Status", key: "status" },
        { label: "Role", key: "Rol" },
        { label: "Actions", key: "actions" }];

    useEffect(() => {
        fetchUsers(setUser, token);
    }, [token])

    async function handleDelete(id) {
        fetchDeleteUser(id, token);
    }

    let results = !search ? users : users.filter((user) =>
        (user.Nombre).toLowerCase().includes(search.toLowerCase()) ||
        (user.correo).toLowerCase().includes(search.toLowerCase()) ||
        (user.status).toLowerCase().includes(search.toLowerCase()) ||
        (user.Rol).toLowerCase().includes(search.toLowerCase())

    )

    const sortedResults = sortResults(results, sortConfig);

    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <AddButton title={"Add User"} href={"/usersAdmin/managment"} />
            <SearchBarTable searcher={searcher} setSearch={setSearch} />
            <GeneralTable
                tablesheads={tableHeaders}
                tabledata={sortedResults}
                requestSort={(key) => requestSort(key, sortConfig, setSortConfig)}
                getSortIcon={(key) => getSortIcon(key, sortConfig)}
                handleDelete={handleDelete}
                keyProp='id'
                filedName={"usersAdmin"}
                AddButton={'Add User'}
            />
        </div>
    );
};
