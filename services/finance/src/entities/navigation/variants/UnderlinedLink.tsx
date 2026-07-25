import type {FC, ReactNode} from "react";


interface UnderlinedLinkProps {
	children: ReactNode;
}

const UnderlinedLink: FC<UnderlinedLinkProps> = ({ children }) => {
	return (
		<div className="whitespace-nowrap text-xs font-semibold text-primary hover:underline">
			{children}
		</div>
	);
}

export { UnderlinedLink };