import React from "react";
import CardsBestSellers from "@/components/bestSellersCardContainer";
import SearchBar from "@/components/searchbar";
export default function bestSellers() {
    return (
        <div>
            <div className="w-full font-bold text-5xl mt-4 mb-5">
                <h1 className=" w-full text-center mx-auto">
                    Explora nuestros productos más vendidos
                </h1>
                
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
                <CardsBestSellers/>
            </div>
        </div>
    );
}