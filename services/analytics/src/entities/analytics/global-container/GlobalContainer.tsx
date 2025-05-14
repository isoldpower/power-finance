import type { FC, ReactNode } from "react";


interface GlobalContainerProps {
    children: ReactNode;
}

const GlobalContainer: FC<GlobalContainerProps> = ({ children }) => {
    return (
        <main className="flex flex-col min-h-screen max-w-7xl mx-auto w-max-content">
            { children }
        </main>
    )
}

GlobalContainer.displayName = 'GlobalContainer';

export { GlobalContainer };
export type { GlobalContainerProps };