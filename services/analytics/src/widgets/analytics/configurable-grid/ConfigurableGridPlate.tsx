import type { FC, ReactNode } from "react";


interface ConfigurableGridPlateProps {
    children: ReactNode;
    basis: string;
}

const ConfigurableGridPlate: FC<ConfigurableGridPlateProps> = ({ children, basis }) => {
    return (
        <div className="bg-card rounded-lg p-4 border" style={{ flexBasis: basis }}>
            {children}
        </div>
    )
}

ConfigurableGridPlate.displayName = 'ConfigurableGridPlate';

export { ConfigurableGridPlate };
export type { ConfigurableGridPlateProps };