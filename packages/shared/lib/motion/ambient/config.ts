const sceneConfig = {
	MAX_PIXEL_RATIO: 2,
	MAX_FRAME_DELTA: 50,
	FULL_TURN: Math.PI * 2,
}

const particlesConfig = {
	SPAWN_HEIGHT_RATIO: 0.66,
	RADIUS: { MIN: 0.8, MAX: 2.4 },
	LIFESPAN: { MIN: 4200, MAX: 9000 },
	DRIFT: { MIN: -7, MAX: 7 },
	RISE: { MIN: 10, MAX: 28 }
}

export { sceneConfig, particlesConfig };