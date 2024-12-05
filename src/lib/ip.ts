import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

export const getUserIp = (headersList: ReadonlyHeaders) => {
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
		const value = headersList.get(key)
		if (value) return value.split(",")[0].trim()
	}

	return null
}
