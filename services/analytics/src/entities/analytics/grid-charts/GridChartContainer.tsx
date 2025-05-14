import { Group } from "@visx/group";
import { forwardRef } from "react";

import type { ReactNode } from "react";


interface GridChartContainerProps {
    children: ReactNode;
    width: number;
    height: number;
}

const GridChartContainer = forwardRef<HTMLDivElement, GridChartContainerProps>((
    { children, width, height },
    ref
) => {
    return (
        <div className="w-full" style={{ height }} ref={ref}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width.toString()} ${height.toString()}`}>
                <Group>
                    {children}
                </Group>
            </svg>
        </div>
    );
});

GridChartContainer.displayName = "GridChartContainer";

export { GridChartContainer };
