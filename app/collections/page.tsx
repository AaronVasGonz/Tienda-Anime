"use client"
import Cards from "@/components/cards/cardsCollections";
import React from "react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

import SearchBar from "@/components/navigation/searchbar";
export default function Collections() {


    return (

        <section className="flex flex-col">
            <div>
                <SearchBar />
            </div>
            <div className="  mb-2 ml-4 flex mt-5">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Seleccione el anime a buscar
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="Op"><p className="hover:text-violet-500">One Piece</p></DropdownItem>
                        <DropdownItem key="Op"><p className="hover:text-violet-500">Naruto</p></DropdownItem>
                        <DropdownItem key="Op"><p className="hover:text-violet-500">Jujutsu Kaisen</p></DropdownItem>
                        <DropdownItem key="Op"><p className="hover:text-violet-500">Chain Saw Man</p></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Cards />
            


        </section>
    );
}