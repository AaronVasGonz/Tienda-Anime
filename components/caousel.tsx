"use client"
import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const slideImages = [
    {
        url: 'https://t4.ftcdn.net/jpg/04/46/93/93/360_F_446939375_83iP0UYTg5F9vHl6icZwgrEBHXeXMVaU.jpg',
        caption: 'Descubre las nuevas ofertas de Lorem Ipsum'
    },
    {
        url: 'https://w0.peakpx.com/wallpaper/611/287/HD-wallpaper-14-anime-for-youtube-channel-art-anime-top-goku-channel-art.jpg',
        caption: 'Nuevos Mangas'
    }, {
        url: 'https://img.freepik.com/free-vector/detailed-anime-banner-template_52683-66691.jpg',
        caption: 'Nuestras Mejores Colecciones'
    }
];

function ImageSlider() {
    return (
        <div className="w-full mt-1">
            <Fade>
                {slideImages.map((image, index) => (
                    <div key={index} className="h-96 flex items-center justify-center">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image.url})` }}
                        >
                            <div className="bg-black bg-opacity-50 p-4 text-white">
                                <h2 className="text-2xl font-bold mb-2">{image.caption}</h2>
                                <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    );
}

export default ImageSlider;