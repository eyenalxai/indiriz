import { headers } from "next/headers"
import { CopyButton } from "@/components/copy-button"
import { getUserCountryName, getUserIp } from "@/lib/data"
import { cn } from "@/lib/utils"

export default async function Index() {
	const headersList = await headers()
	const userIp = getUserIp(headersList)
	const userCountry = getUserCountryName(headersList)

	return (
		<div
			className={cn(
				"flex",
				"flex-col",
				"justify-center",
				"items-start",
				"gap-y-2"
			)}
		>
			{userCountry && (
				<h2 className={cn("font-semibold", "text-xl")}>{userCountry}</h2>
			)}
			{userIp ? (
				<div className={cn("flex", "items-center", "gap-x-2")}>
					<h1 className={cn("font-semibold", "text-2xl")}>{userIp}</h1>
					<CopyButton variant={"ghost"} text={userIp} />
				</div>
			) : (
				<h1 className={cn("font-semibold", "text-2xl")}>
					Failed to get IP address
				</h1>
			)}
		</div>
	)
}
