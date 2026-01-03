import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const viewport = {
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

// This adds default SEO tags to all pages in our app.
export const metadata = getSEOTags({
	title: "bucketlist_inspo - Amazing Experiences Worldwide",
	description:
		"Discover incredible bucket list experiences and adventures from around the world. Your ultimate travel inspiration directory.",
});

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			data-theme={config.colors.theme}
			className={`${sourceSerif.variable} ${jetbrainsMono.variable} bg-background`}
		>
			<body className="font-serif antialiased">
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
