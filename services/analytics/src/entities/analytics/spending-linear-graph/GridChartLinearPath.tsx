import { LinearGradient } from "@visx/gradient";
import { AreaClosed, LinePath } from "@visx/shape";
import { AccessorForArrayItem } from "@visx/shape/lib/types";
import { ComponentProps, FC } from "react";


interface DataPoint {
    key: string;
    value: number;
}

interface GridChartLinearPathProps {
    curve: ComponentProps<typeof AreaClosed>['curve'];
    data: DataPoint[];
    xAccessor: AccessorForArrayItem<DataPoint, number>;
    yAccessor: AccessorForArrayItem<DataPoint, number>;
    yScale: ComponentProps<typeof AreaClosed>['yScale'];
    color: string;
    title?: string;
}

const GridChartLinearPath: FC<GridChartLinearPathProps> = ({
    curve,
    data,
    xAccessor,
    yAccessor,
    yScale,
    color,
    title = 'chart-path'
}) => {
    const gradientId = `${title}-gradient`;
    
    return (
        <>
            <LinearGradient
                id={gradientId}
                from={color}
                to={color}
                fromOpacity={0.3}
                toOpacity={0.05}
            />
            <AreaClosed
                data={data}
                x={xAccessor}
                y={yAccessor}
                yScale={yScale}
                strokeWidth={2}
                stroke={color}
                fill={`url(#${gradientId})`}
                curve={curve}
            />
            <LinePath
                data={Object.entries(data).map(([date, value]) => ({ date, ...value }))}
                x={xAccessor}
                y={yAccessor}
                stroke={color}
                strokeWidth={2}
                curve={curve}
            />
            {data.map((item, i) => (
                <circle
                    key={`${title}-point-${i.toString()}`}
                    cx={xAccessor(item, i, data)}
                    cy={yAccessor(item, i, data)}
                    r={4}
                    fill={color}
                    stroke="white"
                    strokeWidth={2}
                    style={{ opacity: 0.8 }}
                />
            ))}
        </>
    )    
};

GridChartLinearPath.displayName = "GridChartLinearPath";

export { GridChartLinearPath };
export type { GridChartLinearPathProps };