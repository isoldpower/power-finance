import { ScanReceiptCta } from "@entity/transactions";
import { ForwardIcon, ScanReceiptIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


interface ScanReceiptButtonProps {
	title: string;
	description: string;
	className?: string;
	onClick: () => void;
}

const ScanReceiptButton: FC<ScanReceiptButtonProps> = ({
	title,
	description,
	className,
	onClick,
}) => (
	<button type="button" onClick={onClick} className={className}>
		<ScanReceiptCta>
			<ScanReceiptIcon size={18} className="flex-none text-primary" />
			<span className="flex-1">
				<ScanReceiptCta.Title>
					{title}
				</ScanReceiptCta.Title>
				<ScanReceiptCta.Paragraph>
					{description}
				</ScanReceiptCta.Paragraph>
			</span>
			<ForwardIcon className="flex-none text-primary" />
		</ScanReceiptCta>
	</button>
);

ScanReceiptButton.displayName = 'ScanReceiptButton';

export { ScanReceiptButton };
export type { ScanReceiptButtonProps };
