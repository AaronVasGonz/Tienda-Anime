"use client"

import React, { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import {fetchCategories, fetchDeleteCategory} from '@/utils/functions/categories/categories'
import { searcher, sortResults, requestSort, getSortIcon } from '@/utils/functions/searchFunctions/tableSearching';
import GeneralTable from '../../../components/Tables/table';
import {AddButton} from '@/components/buttons/addButton';
import {SearchBarTable} from '@/components/navigation/searchBarTable';
export default function Categories() {

  const token = getTokenFromLocalStorage();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const tableHeaders = [
      {label: "Id", key: "id_tipo"}, 
      {label: "Category Name", key: "Detalle"},
      {label : "Status", key: "status"},
      {label : "Actions", key: "actions"}
    ];
  const [sortConfig, setSortConfig] = useState({
    key: "id_tipo",
    direction: 'ascending'
});

const results = !search ? categories : categories.filter((category) => 
    (category.Detalle && category.Detalle.toLowerCase().includes(search.toLowerCase())) ||
    (category.status && category.status.toLowerCase().includes(search.toLowerCase()))
);

const sortedResults = sortResults(results, sortConfig);

  useEffect(() => {
    fetchCategories(setCategories, token);
  }, []);

  const handleDelete = async (id) => {
    fetchDeleteCategory(id, token);
  }

  return (
    <div className="flex flex-col  items-center justify-center bg-black">
      <AddButton title={"Add Category"} href={"categoriesAdmin/managment"}/>
      <SearchBarTable searcher={searcher} setSearch={setSearch}/>
      <GeneralTable tablesheads={tableHeaders}
        tabledata={sortedResults}
        keyProp={'id_tipo'}
        getSortIcon={(key)=> getSortIcon(key, sortConfig)}
        requestSort={(key)=> requestSort(key, sortConfig, setSortConfig)}
        handleDelete={handleDelete}
        AddButton={'Add Category'}
        filedName={"categoriesAdmin"}
      />
    </div>

  );
};
