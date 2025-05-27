import { FC } from "react";

interface GridChartLegendEntry {
    color: string;
    label: string;
}

interface GridChartLegendProps {
    entries: GridChartLegendEntry[];
}

const GridChartLegend: FC<GridChartLegendProps> = ({
    entries
}) => {
    return (
        <div className="flex justify-center gap-6">
            {entries.map((item, index) => (
                <div className="flex items-center gap-2" key={`chart-legend-item-${index.toString()}`}>
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

GridChartLegend.displayName = 'GridChartLegend';

export { GridChartLegend };
export type { GridChartLegendProps, GridChartLegendEntry };