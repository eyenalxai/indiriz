import "./globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

const TITLE = "Indiriz"
const DESCRIPTION = "Shows your IP address"

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		type: "website"
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "0 0% 100%" },
		{ media: "(prefers-color-scheme: dark)", color: "222.2 84% 4.9%" }
	]
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"font-sans",
					"antialiased",
					GeistSans.variable,
					GeistMono.variable
				)}
			>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					<main
						className={cn(
							"container",
							"mx-auto",
							"max-w-screen-sm",
							"mt-24",
							"px-4"
						)}
					>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
