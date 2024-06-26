"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { LoadingComp } from "@/components/loading/loading";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import {  Pagination } from '@nextui-org/react';

function GeneralTable({ tablesheads, tabledata, handleDelete, keyProp, filedName, getSortIcon, requestSort }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = tabledata.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tabledata.slice(startIndex, endIndex);
  }

  const currentPageItems = getCurrentPageItems();

  const renderTableRowNextUi = (data) => {
    return (
      <TableRow key={data[keyProp]}>
        {
          Object.entries(data).map(([key, value]) => (
            <TableCell key={key}>
              <p>{value}</p>
            </TableCell>
          ))
        }
        <TableCell>
          <div className='flex justify-start'>
            <button
              aria-label='Delete'
            >
              <div
                className='bg-red-700 px-3 py-1 rounded hover:bg-red-600 mr-2 transition duration-300 ease-in cursor-pointer'
                onClick={() => handleDelete(data[keyProp])}
              >
                <FontAwesomeIcon className="text-white-600 hover:text-white-700 " icon={faTrash} />
              </div>
            </button>
            <Link
              aria-label='Edit'
              href={`/${filedName}/managment?id=${data[keyProp]}`}>
              <div className='bg-main-purple px-3 py-1 rounded hover:bg-hover-purple transition duration-300 ease-in cursor-pointer'>
                <FontAwesomeIcon icon={faPen} className="text-white" />
              </div>
            </Link>
          </div>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className="flex flex-col w-full items-center justify-center animate-slide-left bg-black">
      <div className="flex flex-col w-full">
        <Table className="table-fixed w-full" aria-label="Example static collection table"
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
        >
          <TableHeader>
            {
              tablesheads.map((tablehead) => (
                <TableColumn key={tablehead.key} onClick={() => requestSort(tablehead.key)}>
                  {tablehead.label}
                  {tablehead.key !== 'actions' && (
                      <FontAwesomeIcon className='ml-2' icon={getSortIcon(tablehead.key)} />
                  )}
                </TableColumn>
              ))
            }
          </TableHeader>
          <TableBody
            emptyContent={
              <>
                <p className='text-center'>Loading...</p>
                <LoadingComp className="flex justify-center mt-5 text-start" />
              </>
            }
          >
            {
              currentPageItems.map((data) => renderTableRowNextUi(data))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default GeneralTable;
