
"use client"
import { useState, useEffect, } from "react";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "../images/WebSiteLogo";
import LogoutButton from "./logout";
import { fetchUserData, GetUserData, validateAuthToken } from "@/utils/functions/userFunctions/navbarFunctions";
import Image from 'next/image';
import React from "react";
import 'animate.css';

export default function Nav() {
    const [userRole, setUserRole] = useState('');
    const [userAdmin, setUserAdmin] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRolAdmin, setIsRolAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        GetUserData(setUserRole, setUserAdmin, setId);
        validateAuthToken(userAdmin, setIsAuthenticated, setIsRolAdmin);
        let isMounted = true;
        if (id) {
            fetchUserData(id, setEmail, setName, setImage, isMounted);
        } else {
            //console.log("No user id found");
        }
        return () => {
            isMounted = false;
        };
    }, [userAdmin, id]);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}
            shouldHideOnScroll
            className=""
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <Link href="/" className="font-bold text-lg text-slate-50 hover:text-hover-purple transition duration-300 ease-in cursor-pointer mr-2">Anime WebShop</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in" href="/collections">
                        Collections
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/products" className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/bestSellers" className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in">
                        Best Sellers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in" href="/about">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 text-lg  hover:text-lg hover:scale-110 hover:text-hover-purple  transition duration-300 ease-in" href="/contact">
                        Contact
                    </Link>
                </NavbarItem>
                {isRolAdmin ? (
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
                                <DropdownItem key="Categories" textValue="Categories">
                                    <Link href="/categoriesAdmin">
                                        <p className="hover:text-purple-600">Categories</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="Collections" textValue="Collections">
                                    <Link href="/collectionsAdmin">
                                        <p className="hover:text-purple-600">Collections</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="InventoryProducts" textValue="Products">
                                    <Link href="/productsAdmin">
                                        <p className="hover:text-purple-600">Products Inventory</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="InventoryClothes" textValue="Clothes">
                                    <Link href="/clothesAdmin">
                                        <p className="hover:text-purple-600">Clothes Inventory</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="Providers" textValue="Providers">
                                    <Link href="/providersAdmin">
                                        <p className="hover:text-purple-600">Providers</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="Reports" textValue="Reports">
                                    <Link href="/reportsAdmin">
                                        <p className="hover:text-purple-600">Reports</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="SubCategories" textValue="Sub Categories">
                                    <Link href="/subcategoriesAdmin">
                                        <p className="hover:text-purple-600">Sub Categories</p>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="Users" textValue="Users">
                                    <Link href="/usersAdmin">
                                        <p className="hover:text-purple-600">Users</p>
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <NavbarItem>

                    </NavbarItem>
                )
                }
            </NavbarContent><NavbarContent
                justify="end"
                className="text-slate-50 text-sm hidden sm:flex justify-end"
            >
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center"> {/* Alinea el contenido horizontalmente */}
                            <p className="mr-1">Welcome {name}</p> {/* Agrega un margen a la derecha para separar el texto de la imagen */}
                            <NavbarItem>
                                <Dropdown placement="bottom-end" backdrop="blur">
                                    <DropdownTrigger>
                                        <Image
                                            loading="lazy"
                                            alt="avatar"
                                            width={50}
                                            height={50}
                                            className=" avatar-navbar transition-transform hover:scale-105 duration-300 ease-in"
                                            src={image ? image : "/no-avatar-image.jpg"}
                                        />

                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2 hover:text-purple-600  transition duration-300 ease-in">
                                            <div className="hover:main-purple-pastel  transition duration-300 ease-in">
                                                <p className="font-semibold">Signed in as</p>
                                                <p className="font-semibold">{email}</p>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem className="">
                                            <Link
                                                href="/settings"
                                            >
                                                <p className="hover:text-purple-600 transition duration-300 ease-in">Settings</p>
                                            </Link>

                                        </DropdownItem>
                                        <DropdownItem key="help_and_feedback">
                                            <p className="hover:text-purple-600  transition duration-300 ease-in">Help & Feedback</p>
                                        </DropdownItem>
                                        <DropdownItem key="logout" color="danger">
                                            <LogoutButton>
                                                <div className="w-full">
                                                    <p className="">Logout</p>
                                                </div>
                                            </LogoutButton>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavbarItem>
                        </div>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link className="text-slate-50 hover:text-main-purple transition duration-300 ease-in" href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="default" href="/signUp" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-main-purple" href="/">
                        Home
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-main-purple" href="/collections">
                        Collections
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" className="text-slate-50 hover:text-main-purple">
                        Products
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-main-purple" href="#">
                        About Us
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="text-slate-50 hover:text-main-purple" href="#">
                        Contact
                    </Link>
                </NavbarMenuItem>

                {isAuthenticated ? (
                    <NavbarMenuItem>
                        <Dropdown placement="bottom-end"
                            backdrop="blur"
                            className="mb-2"
                        >
                            <DropdownTrigger>
                                <Image
                                    loading="lazy"
                                    alt="avatar"
                                    width={42}
                                    height={42}
                                    className=" avatar-navbar transition-transform hover:scale-105 duration-300 ease-in"
                                    src={image ? image : "/no-avatar-image.jpg"}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2 hover:text-main-purple transition duration-300 ease-in">
                                    <div className=" hover:text-main-purple transition duration-300 ease-in">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold ">{email}</p>
                                    </div>
                                </DropdownItem>
                                <DropdownItem href="/settings" className="" key="settings">
                                    <p className="hover:text-main-purple transition duration-300 ease-in">Settings</p>
                                </DropdownItem>
                                <DropdownItem key="help_and_feedback">
                                    <p className="hover:text-main-purple transition duration-300 ease-in">Help & Feedback</p>
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    <LogoutButton>
                                        <div className="w-full">
                                            <p className="">Logout</p>
                                        </div>
                                    </LogoutButton>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <p className="mt-2">Welcome {name}</p>
                    </NavbarMenuItem>

                ) : (
                    <>
                        <NavbarMenuItem>
                            <Link className="text-slate-50 hover:text-main-purple" href="/login">Login</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="">
                            <Link className="text-slate-50 hover:text-main-purple" href="/signUp">Sign Up</Link>
                        </NavbarMenuItem>
                    </>

                )
                }

            </NavbarMenu>
        </Navbar >

    );
}

