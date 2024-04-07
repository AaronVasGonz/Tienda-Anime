"use client"

import { Button, ButtonGroup } from "@nextui-org/react";

import ImageSlider from "@/components/caousel";
import CardsContainerHome from "@/components/cardsHome";
export default function Home() {
	return (

		  <section className="flex flex-col justify-center align-center">
			<ImageSlider />
			<div className="w-full font-bold text-7xl mt-4 mb-5">
			  <h1 className=" w-full text-center mx-auto">
				Descubre los mejores productos y colecciones
			  </h1>
			</div>
			<CardsContainerHome />
		  </section>

	);
}