import { getUserIp } from "@/lib/ip"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"

export default async function Home() {
	const headersList = await headers()
	const userIp = getUserIp(headersList)

	return <h1 className={cn("font-semibold", "text-2xl")}>{userIp}</h1>
}
