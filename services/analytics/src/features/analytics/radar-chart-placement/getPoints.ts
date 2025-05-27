function genPolygonPoints<Datum>(
	dataArray: Datum[],
	scale: (n: number) => number,
	getValue: (d: Datum | null) => number,
) {
	const step = (Math.PI * 2) / dataArray.length;
	return Array
		.from({ length: dataArray.length })
		.map((_, i) => ({
			x: scale(getValue(dataArray[i])) * Math.sin(i * step),
			y: scale(getValue(dataArray[i])) * Math.cos(i * step),
		}));
}

export { genPolygonPoints };