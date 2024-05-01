"use client"

import React, { useEffect, useState } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getUserFromLocalStorage, getTokenFromLocalStorage } from '@/utils/auth';
import { useAuthAdmin } from '@/utils/authPage';
import { LoadingComp } from "../../components/loading/loading";
export default function Categories() {

  const token = getTokenFromLocalStorage();
  const [categories, setCategories] = useState([]);
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
      window.location.reload();
    } else {
      console.error('Failed to delete category');
    
  }
}

  return (
    <div className="flex flex-col  items-center justify-center bg-black">
      <div className='flex   self-end'>
        <h3 className='mr-3 mt-2'>Add Category</h3>
        <Link href={'/categoriesAdmin/add'} >
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
                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Nombre Categoria</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Actions</p>
              </th>
            </tr>
          </thead>
          <tbody className='mt-4 text-sm'>

            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id_tipo}>
                  <td className="p-4 border-b border-blue-gray-50 text-left">
                    <p className="block antialiased font-sans leading-normal font-normal">{category.id_tipo}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-left">
                    <p className="block antialiased font-sans leading-normal font-normal">{category.Detalle}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-left">
                    <p className="block antialiased font-sans leading-normal font-normal">{category.status}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-2xl">
                    <div className='flex justify-evenly '>
                      <button>
                        <div className='bg-red-500 px-3 py-1 rounded hover:bg-red-700 cursor-pointer' onClick={() => handleDelete(category.id_tipo)}>
                          <FontAwesomeIcon className='text-white-600 hover:text-white-700' icon={faTrash} />
                        </div>
                      </button>
                      <Link href={`/categoriesAdmin/updateCategory?id=${category.id_tipo}`} >
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
                <td colSpan="6" className="p-4 border-b border-blue-gray-50 text-center">
                  <p>Loading collections...</p>
                  <LoadingComp className="mt-5" />
                </td>
              </tr>
            )}


          </tbody>
        </table>
      </div>
    </div>

  );
};
