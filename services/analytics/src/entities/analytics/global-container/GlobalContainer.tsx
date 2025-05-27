import type { FC, ReactNode } from "react";


interface GlobalContainerProps {
    children: ReactNode;
}

const GlobalContainer: FC<GlobalContainerProps> = ({ children }) => {
    return (
        <main className="flex flex-col min-h-screen max-w-7xl mx-auto w-max-content px-4 sm:px-6 lg:px-8">
            { children }
        </main>
    )
}

GlobalContainer.displayName = 'GlobalContainer';

export { GlobalContainer };
export type { GlobalContainerProps };