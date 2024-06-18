
"use client"
import { useState, useEffect, React } from 'react';
import { getTokenFromLocalStorage } from '@/utils/auth';
import Table from '@/components/Tables/table';
import {SearchBarTable} from '@/components/navigation/searchBarTable';
import {sortResults , requestSort, searcher, getSortIcon} from '@/utils/functions/searchFunctions/tableSearching';
import {AddButton} from '@/components/buttons/addButton';
import {fetchProducts, fetchDeteleProduct} from '@/utils/functions/products/products'
export default function ProductsAdmin() {

    const token = getTokenFromLocalStorage();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: "Id",
        direction: 'ascending'
    });
    const tablesHeads = [{ label: "Id", key: "Id" },
    { label: "Product Name", key: "Nombre_Producto" },
    { label: "Price", key: "Precio" },
    { label: "Stock", key: "Cantidad" },
    { label: "Collection", key: "Coleccion" },
    { label: "Provider", key: "Proveedor" },
    { label: "Status", key: "Status" },
    { label: "Actions", key: "actions" }];
    useEffect(() => {
        fetchProducts(setProducts, token);
    }, []);
    const deleteProduct = async (id) => {
        fetchDeteleProduct(id, token);
    }

    const results = !search ? products : products.filter((product) =>
        (product.Nombre_Producto).toLowerCase().includes(search.toLowerCase())
    )

    const sortedResults = sortResults(results, sortConfig);

    return (
        <div className="flex flex-col  items-center justify-center bg-black">
          <AddButton title={"Add Product"} href={"/productsAdmin/managment"}/>
          <SearchBarTable searcher={searcher} setSearch={setSearch}/>
            <Table
                tablesheads={tablesHeads}
                tabledata={sortedResults}
                requestSort={(key) => requestSort(key, sortConfig, setSortConfig)}
                getSortIcon={(key)=> getSortIcon(key, sortConfig)}
                handleDelete={deleteProduct}
                AddButton={"Product"}
                keyProp={"Id"}
                filedName={"productsAdmin"}
            />
        </div>
    );
};
