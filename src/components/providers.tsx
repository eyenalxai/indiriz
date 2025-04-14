"use client"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			{children}
			<Toaster />
		</NextThemesProvider>
	)
}
