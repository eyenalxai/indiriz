"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import type { ComponentProps } from "react"

type CopyButtonProps = {
	text: string
} & Omit<ComponentProps<typeof Button>, "onClick">

export const CopyButton = ({
	text,
	variant = "outline",
	size = "icon",
	className,
	...props
}: CopyButtonProps) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		if (copied) return

		await navigator.clipboard.writeText(text)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1000)
	}

	return (
		<Button
			variant={variant}
			size={size}
			onClick={handleCopy}
			className={cn(className, "cursor-pointer")}
			aria-label={copied ? "Copied" : "Copy to clipboard"}
			{...props}
		>
			<AnimatePresence mode="wait" initial={false}>
				{copied ? (
					<motion.div
						key="check"
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Check />
					</motion.div>
				) : (
					<motion.div
						key="copy"
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Copy />
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	)
}
