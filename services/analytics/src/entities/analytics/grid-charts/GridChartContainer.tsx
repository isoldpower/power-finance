import { Group } from "@visx/group";

import type { FC, ReactNode } from "react";


interface GridChartContainerProps {
    children: ReactNode;
    width: number;
    height: number;
    margin: { top: number, right: number, bottom: number, left: number };
	ref?: React.RefObject<HTMLDivElement | null>
}
const GridChartContainer: FC<GridChartContainerProps> = ({
	ref, children, width, height, margin
}) => {
    return (
        <div className="absolute" style={{ height }} ref={ref}>
            <svg className="w-full h-full" viewBox={`0 0 ${width.toString()} ${height.toString()}`}>
                <Group left={margin.left} top={margin.top}>
                    {children}
                </Group>
            </svg>
        </div>
    );
};

GridChartContainer.displayName = "GridChartContainer";

export { GridChartContainer };
