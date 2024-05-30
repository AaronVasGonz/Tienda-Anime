"use client"
import { useEffect,useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ImageSlider from "@/components/images/caousel";
import { getTokenFromLocalStorage } from "@/utils/auth";
import CardsContainerHome from "@/components/cards/cardsHome";
export default function Home() {
	const router = useRouter();
	const token = getTokenFromLocalStorage();
	const [hasRefreshed, setHasRefreshed] = useState(false);

	useEffect(() => {
		// Check if the page has been refreshed
		if (!hasRefreshed) {
			// Set the refreshed state to true
			setHasRefreshed(true);
			// Refresh the page
			router.refresh();
		}
	}, [hasRefreshed, router]);
	return (

		<section className="flex  animate-slide-left  flex-col justify-center align-center">
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