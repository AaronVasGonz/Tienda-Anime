import NavBarProducts from "@/components/productsNavBar";
import React from "react";
import CardsProducts from "@/components/cardProductContainer";
import SearchBar from "@/components/searchbar";
export default function Manga() {
    return (
        <div>
            <div className="w-full font-bold text-7xl mt-4 mb-5">
                <h1 className=" w-full text-center mx-auto">
                    Explora nuestros mangas
                </h1>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div className=" flex  justify-center font-bold text-4xl w-full">
                <NavBarProducts />
            </div>
            <div>
                <CardsProducts/>
            </div>
        </div>
    );
}