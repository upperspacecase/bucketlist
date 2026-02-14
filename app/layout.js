import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const viewport = {
	themeColor: "#2b6b4f",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata = getSEOTags({
	title: "Bucket List - Dreams Worth Living",
	description: "A simple place to hold your dreams, check them off as you live them, and share the journey.",
});

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={`${inter.variable} bg-background`}
			>
				<body className="font-sans antialiased text-foreground">
					<div className="mobile-container flex flex-col">
						{children}
					</div>
					<Toaster
						toastOptions={{
							duration: 3000,
							style: {
								background: '#ffffff',
								color: '#1a1a1a',
								borderRadius: '12px',
								fontSize: '14px',
								boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
							},
							success: {
								iconTheme: {
									primary: '#2b6b4f',
									secondary: '#ffffff',
								},
							},
						}}
					/>
				</body>
			</html>
		</ClerkProvider>
	);
}
