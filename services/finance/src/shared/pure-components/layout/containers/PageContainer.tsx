import type { FC, ReactNode } from "react";


interface PageContainerProps {
	children?: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			{children}
		</div>
	);
}

PageContainer.displayName = 'PageContainer';

export { PageContainer };