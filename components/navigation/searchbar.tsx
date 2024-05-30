import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function SearchBar() {
    return (
        <header className="flex">

            <div className="flex w-full mx-5 rounded bg-white">
                <input className=" w-full border-none bg-transparent px-4 py-4 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." />
                <button type="submit" className="m-2 rounded bg-violet-600 px-4 py-2 text-white">
                    <FontAwesomeIcon icon={faSearch} className="text-white" />
                </button>
            </div>
        </header>
    )
}