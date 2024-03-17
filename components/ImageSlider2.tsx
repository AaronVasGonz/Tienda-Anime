"use client"
import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

import Link from "next/link";

const slideImages = [
    {
        url: 'https://4kwallpapers.com/images/wallpapers/denji-chainsaw-man-manga-series-3840x1080-8869.jpg',
        caption: 'Descubre las nuevas ofertas de Lorem Ipsum'
    },
    {
        url: 'https://m.media-amazon.com/images/I/616bv-qiXbL.jpg',
        caption: 'Nuevos Mangas'
    }, {
        url: 'https://tamashiiweb.com/images/item/item_0000014202_1SxygSxj_04.jpg',
        caption: 'Nuestras Mejores Colecciones'
    }
];

function ImageSlider2() {
    return (
        <div className="w-full mt-1">

            <Fade>
                {slideImages.map((image, index) => (
                    <div key={index} className="h-96 flex items-center justify-center">


                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image.url})` }}
                        >

                        </div>

                    </div>
                ))}
            </Fade>
        </div>

        
    );
}

export default ImageSlider2;