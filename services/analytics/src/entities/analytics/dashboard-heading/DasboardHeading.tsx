import { cn } from "@internal/ui-library";
import type { FC, HTMLAttributes, ReactNode } from "react";


interface DashboardHeadingProps extends HTMLAttributes<HTMLDivElement> {
    heading: string;
    text?: string;
    action?: ReactNode;
    children?: ReactNode;
}

const DashboardHeading: FC<DashboardHeadingProps> = ({ heading, text, action, children, className, ...props }) => {
    return (
        <div className={cn("flex flex-col gap-1 pb-5 md:flex-row md:justify-between", className)} {...props}>
            <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
                {text && <p className="text-muted-foreground">{text}</p>}
                {children}
            </div>
            {action && <div className="mt-4 flex md:mt-0">{action}</div>}
        </div>
    )
};

DashboardHeading.displayName = 'DashboardHeading';

export { DashboardHeading };
export type { DashboardHeadingProps };