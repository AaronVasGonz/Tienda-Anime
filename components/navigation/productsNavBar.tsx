import React from "react";
import Link from "next/link";
export default function NavBarProducts() {
    return (
        <nav className="bg-black-900 text-white py-4">
            <ul className="sm:flex font-regular sm:space-x-4">
                <li><Link className="hover:text-violet-600 transition duration-300 ease-in" href="/products/Ropa">Ropa</Link></li>
                <li><Link className="hover:text-violet-600 transition duration-300 ease-in" href="/products/Figuras">Figuras</Link></li>
                <li><Link className="hover:text-violet-600 transition duration-300 ease-in" href="/products/Accesorios">Accesorios</Link></li>
                <li><Link className="hover:text-violet-600 transition duration-300 ease-in" href="/products/Manga">Manga</Link></li>
            </ul>
        </nav>
    );
}