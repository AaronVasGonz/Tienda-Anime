
"use client"
import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import LogoutButton from "./logout";
import { verifyToken } from '../utils/authUtils';



export default function Nav() {
    let user_Roles = '';
    let user_Admin = '';
    if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                // Intentar convertir la cadena en un objeto JSON
                const user = JSON.parse(userString);
                user_Roles = user.roles;
                user_Admin = user.roles.roleAdministrador

                //console.log(user_Admin); // Aquí tienes tu objeto JSON
            } catch (error) {
                console.error('Error al parsear el objeto JSON:', error);
            }
        }
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRolAdmin, setIsRolAdmin] = useState(false);

    useEffect(() => {
        const validateAuthToken = async () => {
            const itsTokenValid = await verifyToken();
            setIsAuthenticated(itsTokenValid);
            if (user_Admin
                == 'ADMIN') {
                setIsRolAdmin(true);
            }

            //console.log(isRolAdmin)
        };

        validateAuthToken();
    }, []);

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
                    <Link href="/products" className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/bestSellers" className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in">
                        Best Sellers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="/about">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="/contact">
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
                                    <p className="hover:text-violet-500">Categories</p>
                                </DropdownItem>
                                <DropdownItem key="Collections" textValue="Collections">
                                    <Link href="/collectionsAdmin" className="text-white">
                                    <p className="hover:text-violet-500">Collections</p>
                                    </Link>
                                  
                                </DropdownItem>
                                <DropdownItem key="Products" textValue="Products">
                                    <p className="hover:text-violet-500">Products</p>
                                </DropdownItem>
                                <DropdownItem key="Reports" textValue="Reports">
                                    <p className="hover:text-violet-500">Reports</p>
                                </DropdownItem>
                                <DropdownItem key="SubCategories" textValue="Sub Categories">
                                    <p className="hover:text-violet-500">Sub Categories</p>
                                </DropdownItem>
                                <DropdownItem key="Users" textValue="Users">
                                    <p className="hover:text-violet-500">Users</p>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <NavbarItem>

                    </NavbarItem>
                )
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {isAuthenticated ? (
                    <NavbarItem>
                        <LogoutButton />
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link className="text-slate-50 hover:text-violet-600 transition duration-300 ease-in" href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="default" href="/signUp" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>

                )
                }


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

                {isAuthenticated ? (
                    <NavbarMenuItem>

                    </NavbarMenuItem>
                ) : (
                    <NavbarMenuItem>
                        <Link className="text-slate-50 hover:text-violet-600" href="/login">Login</Link>
                    </NavbarMenuItem>
                )
                }

            </NavbarMenu>
        </Navbar >

    );
}

