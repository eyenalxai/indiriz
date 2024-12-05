import { getUserCountryCode, getUserCountryName, getUserIp } from "@/lib/data"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"

export default async function Home() {
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
			<h1 className={cn("font-semibold", "text-2xl")}>{userIp}</h1>
		</div>
	)
}
