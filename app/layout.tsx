import "@/styles/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import Nav from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import ScrollToUpButton from "@/components/Scrollup";






export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export const date = new Date();

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout(

	{
		children,
	}: {
		children: React.ReactNode;
	}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Nav />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}

						</main>
						<ScrollToUpButton/>
						<footer className="w-full flex items-center justify-center py-3">

							<div className="w-full min-h-screen flex items-center justify-center bg-black">
								<div className="max-w-screen-xl w-full px-4 text-white flex flex-col">
									<div className="w-full text-7xl font-bold">
										<h1 className="w-full">How can we help you. get in touch</h1>
									</div>
									<div className="flex mt-8 flex-col md:flex-row md:justify-between">
										<p className="w-full md:w-2/3 text-gray-400">Nunc viverra, odio ut consectetur placerat, dui est efficitur libero, id pulvinar magna dolor vel diam. Praesent vel luctus odio, ac porta ante.</p>
										<div className="w-full md:w-auto pt-6 md:pt-0">
											<a href="#" className="bg-violet-600 hover:bg-violet-700 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center transition-transform duration-300 transform-gpu hover:scale-105">
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
					</div>
				</Providers>
			</body>
		</html>
	);
}
