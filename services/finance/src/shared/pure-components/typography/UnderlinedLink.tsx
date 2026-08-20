import type {FC, ReactNode} from "react";
import { Text } from "@shared/pure-components/typography";


interface UnderlinedLinkProps {
	children: ReactNode;
}

const UnderlinedLink: FC<UnderlinedLinkProps> = ({ children }) => {
	return (
		<Text as="div" size="xs" weight="semibold" tone="accent" className="whitespace-nowrap hover:underline">
			{children}
		</Text>
	);
}

export { UnderlinedLink };