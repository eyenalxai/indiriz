export const getUserIp = (headersList: Headers) => {
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

export const getUserCountryCode = (headersList: Headers) => {
	return headersList.get("cf-ipcountry")
}

export const getCountryName = (countryCode: string) => {
	const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
	return regionNames.of(countryCode) ?? null
}

export const getUserCountryName = (headersList: Headers) => {
	const countryCode = getUserCountryCode(headersList)
	if (countryCode) return getCountryName(countryCode)
	return null
}
