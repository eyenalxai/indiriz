import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

export const getUserIp = (headersList: ReadonlyHeaders) => {
	const ipHeaderKeys = ["cf-connecting-ip", "x-forwarded-for"]

	for (const [key, value] of headersList) {
		console.log(`${key}: ${value}`)
	}

	for (const key of ipHeaderKeys) {
		const value = headersList.get(key)
		if (value) return value.split(",")[0].trim()
	}

	return null
}
