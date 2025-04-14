"use client"

import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/clipboard"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import type { ComponentProps } from "react"
import { toast } from "sonner"

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
				copyToClipboard(text).match(
					() => {
						setCopied(true)
						toast.success("Copied to clipboard")
						setTimeout(() => {
							setCopied(false)
						}, 1000)
					},
					(e) => toast.error(e)
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
