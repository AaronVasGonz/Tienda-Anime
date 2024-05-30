
"use client"
import { useState, useEffect, React } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { LoadingComp } from "../../components/loading/loading";
import Table from '@/components/Tables/table';
export default function ProductsAdmin() {

    const [products, setProducts] = useState([]);
    const token = getTokenFromLocalStorage();
    const tablesHeads = ["Id","Nombre Producto", "Precio", "Cantidad", "Coleccion", "Proveedor", "Status", "Actions"];
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

    const deleteProduct = async (id) => {
        fetch(`http://localhost:3001/api/productsAdmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        })
        .catch(error => console.log("Error:", error))
    }
    return (
        <div className="flex flex-col  items-center justify-center bg-black">
              <Table
                 tablesheads={tablesHeads}
                 tabledata={products}
                 handleDelete={deleteProduct}
                 keyProp={"Id"}
                 AddButton={"Product"}
                 filedName={"productsAdmin"}
              />
        </div>
    );
};
