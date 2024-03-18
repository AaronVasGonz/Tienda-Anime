import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faShieldHalved, faTachometer, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AboutUs = () => {
    return (
        <div className="about-us py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-6xl font-bold text-center mb-8">Sobre Nosotros</h1>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8">
                        <img
                            src="https://wallpapersmug.com/download/3840x2400/01e1be/pirate-monkey-d-luffy-from-one-piece-anime.jpg"
                            alt="Sobre Nosotros"
                            width={500}
                            height={500}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <p className="mb-4 text-xl ">
                            En Anime Store, somos una tienda en línea apasionada por el mundo del anime y el manga. Nuestra misión es brindar a los fans de todo el mundo una experiencia de compra excepcional, ofreciendo una amplia selección de productos únicos y de alta calidad.
                        </p>
                        <p className="mb-4 text-xl ">
                            Fundada en 2015 por un equipo de entusiastas del anime, nuestra tienda ha crecido y evolucionado para convertirse en un destino favorito para los coleccionistas y amantes del anime. Nos enorgullece ofrecer una variedad de artículos oficiales, desde figuras de acción y merchandising hasta mangas y DVDs.
                        </p>
                        <p className="mb-4 text-xl ">
                            Nuestro equipo está formado por expertos en la cultura del anime, quienes se dedican a seleccionar cuidadosamente cada producto que ofrecemos. Nos esforzamos por brindar un servicio excepcional y una experiencia de compra sin complicaciones para nuestros clientes.
                        </p>
                        <p className="mb-4 text-xl ">
                            En Anime Store, estamos comprometidos con la comunidad de fans del anime y el manga. Nos apasiona compartir nuestra pasión y ayudar a los coleccionistas a encontrar los productos perfectos para sus colecciones. Únete a nosotros en esta emocionante aventura y descubre un mundo de emoción y diversión en nuestro mundo de anime.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-6xl font-bold text-center mb-8 mt-6">Qué te Ofrecemos?</h1>
                <div className="grid  gap-12 sm:grid-cols-3 mt-2">
                    <div className="sm:col-span-1">
                        <div className="block h-96 text-center text-white-600 hover:text-violet-600  transition duration-300 ease-in  flex flex-col justify-center items-center">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-8xl" />
                            <h4 className="mt-4 text-2xl text-white">Seguridad</h4>

                        </div>
                        <div>
                            <p className="text-center text-lg md:text-xl lg:text-2xl text-white mt-6 mb-8">
                                Te ofrecemos las mejores prácticas en seguridad para garantizar la compra de tus productos. En Anime Store, nos comprometemos a proteger tus datos personales y a garantizar transacciones seguras en nuestro sitio web.
                            </p>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <div className="block h-96 text-center text-white-600 hover:text-violet-600  transition duration-300 ease-in  flex flex-col justify-center items-center">
                            <FontAwesomeIcon icon={faTachometer} className="text-8xl" />
                            <h4 className="mt-4 text-2xl text-white">Velocidad</h4>

                        </div>
                        <div>
                            <p className="text-center text-lg md:text-xl lg:text-2xl text-white mt-6 mb-8">
                                Nuestra velocidad de atención y entrega de productos nos destaca al ser casi instantáneos. En menos de una semana tendrás tus productos en la puerta de tu casa. En Anime Store, nos esforzamos por proporcionar un servicio rápido y eficiente para nuestros cientes
                            </p>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <div className="block h-96 text-center text-white-600 hover:text-violet-600  transition duration-300 ease-in  flex flex-col justify-center items-center">
                            <FontAwesomeIcon icon={faStar} className="text-8xl" />
                            <h4 className="mt-4 text-2xl text-white">Calidad</h4>

                        </div>
                        <div>
                            <p className="text-center text-lg md:text-xl lg:text-2xl text-white mt-6 mb-8">
                                En Anime Store, nos aseguramos de ofrecer solo lo mejor. Trabajamos con marcas reconocidas y proveedores confiables para garantizar la excelencia en cada producto que ofrecemos. Desde figuras de acción y ropa hasta accesorios.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;