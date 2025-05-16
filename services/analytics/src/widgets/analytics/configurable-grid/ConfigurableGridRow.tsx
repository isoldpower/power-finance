import type { FC, ReactNode } from "react";


interface ConfigurableGridRowProps {
    children: ReactNode;
}

const ConfigurableGridRow: FC<ConfigurableGridRowProps> = ({ children }) => {
    return (
        <div className="flex flex-row gap-4">
            {children}
        </div>
    );
}

ConfigurableGridRow.displayName = 'ConfigurableGridRow';

export { ConfigurableGridRow };
export type { ConfigurableGridRowProps };