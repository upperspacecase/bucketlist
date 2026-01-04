import { Inter, Archivo_Black } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

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

// This adds default SEO tags to all pages in our app.
export const metadata = getSEOTags({
	title: "Bucket List - Life Goals & Adventures",
	description: "Track and share your life's greatest adventures.",
});

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${archivoBlack.variable} bg-background`}
		>
			<body className="font-sans antialiased text-foreground">
				<div className="mobile-container flex flex-col">
					<ClientLayout>{children}</ClientLayout>
				</div>
			</body>
		</html>
	);
}
