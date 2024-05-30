"use client"

import React, { useEffect, useState } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { useAuthAdmin } from '@/utils/authPage';
import { LoadingComp } from "../../components/loading/loading";
import GeneralTable from '../../components/Tables/table';
export default function Categories() {
  const router = useRouter();
  const token = getTokenFromLocalStorage();
  const [categories, setCategories] = useState([]);
  const tableHeaders = ['ID', 'Category Name', 'Status', 'Actions'];
  const [idTipo, setIdTipo] = useState(0);


  useEffect(() => {
    fetch('http://localhost:3001/api/categoriesAdmin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(
        response => response.json()
      )
      .then(data => {
        setCategories(data.categories);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3001/api/categoriesAdmin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error('Failed to delete category');
    
  }
}

  return (
    <div className="flex flex-col  items-center justify-center bg-black">
      <GeneralTable tablesheads={['ID', 'Category Name', 'Status', 'Actions']}
             tabledata={categories}
             keyProp={'id_tipo'}
             handleDelete={handleDelete}
             AddButton={'Add Category'}
             filedName={"categoriesAdmin"}
             />
    </div>

  );
};
