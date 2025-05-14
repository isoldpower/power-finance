import { FC, useMemo, useRef } from "react";
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear, scaleTime } from "@visx/scale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from "@internal/ui-library";

import { data } from "./dataMock";
import { GridChartSkeleton, LinearChartPath, GridChartContainer, GridChartLegend } from "@entity/analytics";
import { HoverTooltipOverlay } from "@feature/analytics";


interface SpendingTrendsLinearGraphProps {
    width?: number;
    height?: number; 
}

const SpendingTrendsLinearGraph: FC<SpendingTrendsLinearGraphProps> = ({ 
    width = 800,
    height = 400
}) => {
    const dataset = useMemo(() => {
        return Object.entries(data)
            .map(([key, value]) => ({ date: key, ...value }));
    }, []);

    const margin = useRef({ top: 0, right: 0, bottom: 30, left: 0 });
    const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width]);
    const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height]);
    
    const dateScale = useMemo(() => {
        const dates = Object.keys(data).map((key) => new Date(key));
        return scaleTime({
            range: [0, innerWidth],
            domain: [dates[0], dates[dates.length - 1]],
        });
    }, [innerWidth]);
    
    const valueScale = useMemo(() => {
        const dataset = Object.values(data);
        return scaleLinear({
            range: [innerHeight, 0],
            domain: [0, Math.max(...dataset.map((part) => Math.max(part.income, part.expenses))) * 1.1],
            nice: true,
        });
    }, [innerHeight]);

    return (
        <Card className={cn("h-full")}>
            <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>
                    Income vs. expenses over the period of time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <GridChartContainer width={width} height={height}>
                    <GridChartSkeleton
                        horizontalScale={dateScale}
                        verticalScale={valueScale}
                        width={innerWidth}
                        height={innerHeight}
                    />
                    <LinearChartPath
                        color='var(--chart-1)'
                        xAccessor={(d: { key: string, value: number }) => dateScale(new Date(d.key))}
                        yAccessor={(d: { key: string, value: number }) => valueScale(d.value)}
                        yScale={valueScale}
                        curve={curveMonotoneX}
                        data={Object.entries(data).map(([date, value]) => ({ key: date, value: value.income }))}
                        title='income'
                    />
                    <LinearChartPath
                        color='var(--chart-2)'
                        xAccessor={(d: { key: string, value: number }) => dateScale(new Date(d.key))}
                        yAccessor={(d: { key: string, value: number }) => valueScale(d.value)}
                        yScale={valueScale}
                        curve={curveMonotoneX}
                        data={Object.entries(data).map(([date, value]) => ({ key: date, value: value.expenses }))}
                        title='expenses'
                    />
                    <HoverTooltipOverlay
                        horizontalScale={dateScale}
                        verticalScale={valueScale}
                        dataset={dataset}
                        margin={margin.current}
                    />
                </GridChartContainer>
                <GridChartLegend
                    entries={[
                        { color: 'var(--chart-1)', label: 'Income' },
                        { color: 'var(--chart-2)', label: 'Expenses' },
                    ]}
                />
            </CardContent>
        </Card>
    )
};

SpendingTrendsLinearGraph.displayName = 'SpendingTrendsLinearGraph';

export { SpendingTrendsLinearGraph };
export type { SpendingTrendsLinearGraphProps };
