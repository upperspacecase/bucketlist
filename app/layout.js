import { Inter, Archivo_Black } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

const archivoBlack = Archivo_Black({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-display",
});

export const viewport = {
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata = getSEOTags({
	title: "Bucket List - Life Goals & Adventures",
	description: "Track and share your life's greatest adventures.",
});

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={`${inter.variable} ${archivoBlack.variable} bg-background`}
			>
				<body className="font-sans antialiased text-foreground">
					<div className="mobile-container flex flex-col">
						{children}
					</div>
					<Toaster toastOptions={{ duration: 3000 }} />
				</body>
			</html>
		</ClerkProvider>
	);
}
