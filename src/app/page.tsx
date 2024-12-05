import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import { headers } from "next/headers"

const getUserIp = (headersList: ReadonlyHeaders) => {
	const ipHeaderKeys = [
		"x-real-ip",
		"x-forwarded-for",
		"cf-connecting-ip",
		"fastly-client-ip",
		"true-client-ip",
		"x-cluster-client-ip",
		"x-forwarded",
		"forwarded-for",
		"forwarded"
	]

	for (const key of ipHeaderKeys) {
		const ip = headersList.get(key)
		console.log(key)
		if (ip) {
			return ip.split(",")[0].trim()
		}
	}

	return null
}

export default async function Home() {
	const headersList = await headers()

	const userIp = getUserIp(headersList)

	return (
		<main>
			<h1>{userIp}</h1>
		</main>
	)
}
