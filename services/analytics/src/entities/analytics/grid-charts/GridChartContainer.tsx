import { Group } from "@visx/group";
import { forwardRef } from "react";

import type { ReactNode } from "react";


interface GridChartContainerProps {
    children: ReactNode;
    width: number;
    height: number;
    margin: { top: number, right: number, bottom: number, left: number };
}
const GridChartContainer = forwardRef<HTMLDivElement, GridChartContainerProps>((
    { children, width, height, margin },
    ref
) => {
    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;

    return (
        <div className="absolute" style={{ height }} ref={ref}>
            <svg className="w-full h-full" viewBox={`0 0 ${fullWidth.toString()} ${fullHeight.toString()}`}>
                <Group left={margin.left} top={margin.top}>
                    {children}
                </Group>
            </svg>
        </div>
    );
});

GridChartContainer.displayName = "GridChartContainer";

export { GridChartContainer };
