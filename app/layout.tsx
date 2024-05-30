import "@/styles/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import dynamic from 'next/dynamic';
import clsx from "clsx";
const Nav = dynamic(() => import('@/components/navigation/navbar'), { ssr: false });
import FooterPagina from "@/components/navigation/footer";
import ScrollToUpButton from "@/components/navigation/Scrollup";


export const viewport: Viewport = {
	themeColor: [
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
		icon: "/gokuIcon.webp",
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
						<FooterPagina/>
						<ScrollToUpButton/>
						
					</div>
					
				</Providers>
				
               
			</body>
		</html>
	);
}
