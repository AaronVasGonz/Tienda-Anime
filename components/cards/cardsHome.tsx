"use client"
import Link from "next/link";
import React from "react";
import ImageSlider2 from "../images/ImageSlider2";
export default function CardsContainerHome() {
    return (
        <div className="flex flex-col">
            <div className="grid   h-96 gap-1 sm:grid-cols-3">
                <div className="sm:col-span-2">
                    <Link href="/collections/collection">
                        <div className="block bg-white  h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div
                            className=" h-96 block bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">

                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid h-96 gap-1 sm:grid-cols-3 mt-1">
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-2">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid h-96 gap-1 sm:grid-cols-3 mt-1">
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>

            </div>
            <ImageSlider2 />
            <div className="grid h-96 gap-1 sm:grid-cols-3 mt-2">
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid  gap-1 sm:grid-cols-3 mt-1">
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-2">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="sm:grid h-96 gap-1 sm:grid-cols-3 mt-1">
                <div className="sm:col-span-2">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>
                <div className="sm:col-span-1">
                    <Link href="/collections/collection">
                        <div className="block bg-white h-96 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                            {/* Contenido de tu tarjeta */}
                        </div>
                    </Link>
                </div>

            </div>



        </div>
    )
}