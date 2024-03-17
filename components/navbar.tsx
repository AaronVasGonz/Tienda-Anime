
"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    const menuItems = [

    ];

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (


        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <Link href="/"><p className="font-bold text-inherit text-slate-50 hover:text-violet-600 transition duration-300 ease-in cursor-pointer">Tienda Anime</p></Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="/collections">
                        Collections
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in">
                        Best Sales
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="#">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="#">
                        Contact
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                            >
                                Admin
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Categories</p></DropdownItem>
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Collections</p></DropdownItem>
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Products</p></DropdownItem>
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Reports</p></DropdownItem>
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Sub Categories</p></DropdownItem>
                            <DropdownItem key="Op"><p className="hover:text-violet-500">Users</p></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="default" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>

                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-violet-600" href="/">
                        Home
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-violet-600" href="/collections">
                        Collections
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" className="text-slate-50 hover:text-violet-600">
                        Products
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-violet-600" href="#">
                        About Us
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-violet-600" href="#">
                        Contact
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-violet-600" href="#">Login</Link>
                </NavbarMenuItem>

            </NavbarMenu>
        </Navbar>

    );
}

