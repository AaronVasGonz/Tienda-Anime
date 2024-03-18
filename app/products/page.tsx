import React from "react";
import SearchBar from "@/components/searchbar";
import CardsProducts from "@/components/cardProductContainer";
import NavBarProducts from "@/components/productsNavBar";
export default function products() {

    return (
        <section>
            <div className="w-full font-bold text-7xl mt-4 mb-5">

                <h1 className=" w-full text-center mx-auto">
                    Explora nuestros productos
                </h1>

            </div>

            <div className="mt-8">
                <SearchBar />
            </div>
            <div className=" flex  justify-center font-bold text-4xl w-full">
                <NavBarProducts />
            </div>
            <div>
                <CardsProducts />
            </div>
        </section>
    );
}