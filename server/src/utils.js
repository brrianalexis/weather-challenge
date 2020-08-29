/**
 * @description Sets the parameters passed inside an array on a given url, replacing the numbers inside curly braces
 * @param {string} url
 * @param {array} params
 */
export function setParamsInUrl(url, params) {
	return url.replace(/{(\d+)}/g, (match, number) => {
		return typeof params[number] !== 'undefined' ? params[number] : match;
	});
}
