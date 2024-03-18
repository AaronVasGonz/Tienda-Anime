import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import React from "react";

export default function FooterPagina() {

    const date = new Date();
    return (
        <footer className="w-full flex items-center justify-center py-3">

            <div className="w-full min-h-screen flex items-center justify-center bg-black">
                <div className="max-w-screen-xl w-full px-4 text-white flex flex-col">
                    <div className="w-full text-7xl font-bold">
                        <h1 className="w-full">How can we help you. get in touch</h1>
                    </div>
                    <div className="flex mt-8 flex-col md:flex-row md:justify-between">
                        <p className="w-full md:w-2/3 text-gray-400">Nunc viverra, odio ut consectetur placerat, dui est efficitur libero, id pulvinar magna dolor vel diam. Praesent vel luctus odio, ac porta ante.</p>
                        <div className="w-full md:w-auto pt-6 md:pt-0">
                            <a href="/contact" className="bg-violet-600 hover:bg-violet-700 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center transition-transform duration-300 transform-gpu hover:scale-105">
                                Contact US
                            </a>

                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex mt-24 mb-12 flex-row justify-between">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 hover:text-violet-600 transition duration-300 ease-in mr-2 cursor-pointer fa-3x" />
                            <FontAwesomeIcon icon={faPhone} className="text-gray-400 hover:text-violet-600 transition duration-300 ease-inmr-2 cursor-pointer fa-3x" />
                            <FontAwesomeIcon icon={faLinkedin} className="text-gray-400 hover:text-violet-600 transition duration-300 ease-in mr-2 cursor-pointer fa-3x" />
                            <FontAwesomeIcon icon={faGithub} className="text-gray-400 hover:text-violet-600 transition duration-300 ease-in mr-2 cursor-pointer fa-3x" />
                            <FontAwesomeIcon icon={faInstagram} className="text-gray-400 hover:text-violet-600 transition duration-300 ease-in mr-2 cursor-pointer fa-3x" />
                        </div>

                        <hr className="border-gray-600" />
                        <p className="w-full text-center my-12 text-gray-600">Copyright © {date.getFullYear()} Tienda Anime</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}