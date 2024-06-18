import NavBarProducts from "@/components/navigation/productsNavBar";
import React from "react";
import CardsProducts from "@/components/cards/cardProductContainer";
import SearchBar from "@/components/navigation/searchbar";
export default function Ropa() {
    return (
        <div>
            <div className="w-full font-bold text-7xl mt-4 mb-5">
                <h1 className=" w-full text-center mx-auto">
                    Explora nuestras prendas
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