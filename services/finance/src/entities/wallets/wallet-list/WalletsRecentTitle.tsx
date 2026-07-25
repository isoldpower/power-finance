import {FC, ReactNode} from "react";

interface WalletsRecentTitleProps {
	children: ReactNode;
}

const WalletsRecentTitle: FC<WalletsRecentTitleProps> = ({ children }) => (
	<div className="px-[18px] pb-1 pt-3.5">
		<span className="text-[13.5px] font-semibold">
			{children}
		</span>
	</div>
);

export { WalletsRecentTitle };