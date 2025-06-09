function stripTags(html) {
	return html.replace(/<\/?[^>]+>/g, "");
}

function stripNewLines(text) {
	return text.replace(/\n/g, " ");
}

export function truncate(html) {
	const maxLength = 200;
	let str = stripNewLines(stripTags(html)).trim();
	if (str.length <= maxLength) return str;
	str = str.slice(0, maxLength).trim();
	return `${str.slice(0, str.lastIndexOf(" "))}...`;
}
