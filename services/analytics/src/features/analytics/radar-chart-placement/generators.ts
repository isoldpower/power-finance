const DEGREES = 360;

const genAngles = (length: number) => {
	return Array.from({ length: length + 1 }).map((_, i) => ({
	  angle: i * (DEGREES / length) + (length % 2 === 0 ? 0 : DEGREES / length / 2),
	}));
}
  
const genPoints = (length: number, radius: number) => {
	const step = (Math.PI * 2) / length;

	return Array.from({ length }).map((_, i) => ({
		x: radius * Math.sin(i * step),
		y: radius * Math.cos(i * step),
	}));
};

export { genAngles, genPoints, DEGREES };