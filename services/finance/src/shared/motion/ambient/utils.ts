function randomBetween(min: number, max: number): number {
	return min + Math.random() * (max - min);
}

function pickColor(palette: string[]): string {
	return palette[Math.floor(Math.random() * palette.length)];
}


export { randomBetween, pickColor };