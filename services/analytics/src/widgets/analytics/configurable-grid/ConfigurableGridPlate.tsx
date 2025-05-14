import type { FC, ReactNode } from "react";


interface ConfigurableGridPlateProps {
    children: ReactNode;
}

const ConfigurableGridPlate: FC<ConfigurableGridPlateProps> = ({ children }) => {
    return (
        <div className="bg-card rounded-lg p-4 border">
            {children}
        </div>
    )
}

ConfigurableGridPlate.displayName = 'ConfigurableGridPlate';

export { ConfigurableGridPlate };
export type { ConfigurableGridPlateProps };