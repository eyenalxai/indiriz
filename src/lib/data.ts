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

export const getUserCountryCode = (headersList: ReadonlyHeaders) => {
	return headersList.get("cf-ipcountry")
}

export const getCountryName = (countryCode: string) => {
	const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
	return regionNames.of(countryCode) ?? null
}

export const getUserCountryName = (headersList: ReadonlyHeaders) => {
	const countryCode = getUserCountryCode(headersList)
	if (countryCode) return getCountryName(countryCode)
	return null
}
