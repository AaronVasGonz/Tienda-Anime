
"use client"
import { useState, useEffect, React } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTokenFromLocalStorage } from '@/utils/auth';
export default function ProductsAdmin() {

    const [products, setProducts] = useState([]);
    const token = getTokenFromLocalStorage();
    useEffect(() => {
        fetch('http://localhost:3001/api/productsAdmin', {
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
                setProducts(data.products);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <div className='flex   self-end'>
                <h3 className='mr-3 mt-2'>Add Product</h3>
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
                                <p className="block antialiased font-sans text-sm  font-normal leading-none opacity-70">Nombre Producto</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Cantidad</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Coleccion</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Proveedor</p>
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
                        {products.length > 0 ? (
                                 products.map(product => (
                                    <tr  key={product.Id} >
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Id}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Nombre_Producto}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Cantidad}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Coleccion}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Proveedor}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-left">
                                            <p className="block antialiased font-sans leading-normal font-normal">{product.Status}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 text-2xl">
                                            <div className='flex justify-evenly '>
                                                <button>
                                                    <div className='bg-red-500 px-3 py-1 rounded hover:bg-red-700 cursor-pointer'>
                                                        <FontAwesomeIcon className='text-white-600 hover:text-white-700' icon={faTrash} />
                                                    </div>
                                                </button>
                                                <Link href={`/categoriesAdmin/updateCategory?id=`} >
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
                                    <td className='text-center'>No hay Productos</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};
