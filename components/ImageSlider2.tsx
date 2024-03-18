"use client"
import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import Link from "next/link";

const slideImages = [
    {
        url: 'https://4kwallpapers.com/images/wallpapers/denji-chainsaw-man-manga-series-3840x1080-8869.jpg',
        caption: 'Nuevos Productos de Chainsaw Man',
        link: '/#' // Agrega la ruta de destino aquí
    },
    {
        url: 'https://m.media-amazon.com/images/I/616bv-qiXbL.jpg',
        caption: 'Nuevos Productos de Chainsaw Mans',
        link: '/#' // Agrega la ruta de destino aquí
    }, {
        url: 'https://tamashiiweb.com/images/item/item_0000014202_1SxygSxj_04.jpg',
        caption: 'Nuevos Productos de Chainsaw Man',
        link: '/#' // Agrega la ruta de destino aquí
    }
];

function ImageSlider2() {
    return (
        <div className="w-full mt-1">

            <Fade>
                {slideImages.map((image, index) => (
                    <Link key={index} href={image.link} legacyBehavior>
                        <a>
                            <div className="h-96 flex items-center justify-center">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${image.url})` }}
                                >
                                    <div className="bg-black bg-opacity-50 p-4 text-white">
                                        <h2 className="text-2xl font-bold mb-2">{image.caption}</h2>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))
                }
            </Fade>
        </div>
    );
}

export default ImageSlider2;