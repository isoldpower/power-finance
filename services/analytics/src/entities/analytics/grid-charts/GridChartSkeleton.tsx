import { AxisBottom, AxisLeft } from "@visx/axis"
import { GridRows } from "@visx/grid"
import { NumberLike } from "@visx/scale"
import { format } from "date-fns"
import { ComponentProps, FC } from "react"


interface GridChartSkeletonProps {
    horizontalScale: ComponentProps<typeof GridRows>['scale'];
    verticalScale: ComponentProps<typeof GridRows>['scale'];
    width: number;
    height: number;
}

const GridChartSkeleton: FC<GridChartSkeletonProps> = ({ 
    verticalScale,
    horizontalScale,
    width,
    height
}) => {
    return width > 0 && height > 0 && (
        <>
            <GridRows
                scale={verticalScale}
                width={width}
                height={height}
                stroke="var(--color-border)"
                strokeDasharray="3,3"
                numTicks={5}
            />
            <AxisBottom
                top={height}
                scale={horizontalScale}
                numTicks={width > 520 ? 10 : 5}
                stroke='var(--color-border)'
                tickStroke='var(--color-border)'
                tickLabelProps={() => ({
                    fontSize: 12,
                    textAnchor: "middle",
					fill: 'var(--color-foreground)',
                })}
                tickFormat={(date) => format(date as Date, "MMM")}
            />
            <AxisLeft
                scale={verticalScale}
                numTicks={5}
                stroke='var(--color-border)'
                tickStroke='var(--color-border)'
                tickLabelProps={() => ({
                    fontSize: 12,
                    textAnchor: "end",
					fill: 'var(--color-foreground)',
                    dx: -4,
                    dy: 4,
                })}
                tickFormat={(value: NumberLike) => `$${value.valueOf().toLocaleString()}`}
            />
        </>
    )
}

GridChartSkeleton.displayName = "GridChartSkeleton";

export { GridChartSkeleton };