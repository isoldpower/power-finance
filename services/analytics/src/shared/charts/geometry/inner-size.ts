interface ChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface ChartInnerSize {
	innerWidth: number;
	innerHeight: number;
}

const innerSize = (width: number, height: number, margin: ChartMargin): ChartInnerSize => {
	const horizontalMargin = margin.left + margin.right;
	const verticalMargin = margin.top + margin.bottom;

	return {
		innerWidth: width - horizontalMargin,
		innerHeight: height - verticalMargin,
	};
};

export { innerSize };
export type { ChartInnerSize, ChartMargin };
