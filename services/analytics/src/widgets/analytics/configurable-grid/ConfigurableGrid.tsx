import type { FC, ReactNode } from "react";


interface ConfigurableGridProps {
    children: ReactNode;
}

const ConfigurableGrid: FC<ConfigurableGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {children}
        </div>
    )
}

ConfigurableGrid.displayName = 'ConfigurableGrid';

export { ConfigurableGrid };
export type { ConfigurableGridProps };