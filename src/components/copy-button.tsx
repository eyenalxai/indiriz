"use client"

import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type { ComponentProps } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/clipboard"
import { cn } from "@/lib/utils"
import { toastManager } from "./ui/toast"

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

	return (
		<Button
			variant={variant}
			size={size}
			onClick={() =>
				void copyToClipboard(text).match(
					() => {
						setCopied(true)
						toastManager.add({
							description: "copied to clipboard",
							type: "success"
						})
						setTimeout(() => {
							setCopied(false)
						}, 1000)
					},
					(e) => {
						return toastManager.add({
							description: `failed to copy to clipboard: ${e}`,
							type: "error"
						})
					}
				)
			}
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
