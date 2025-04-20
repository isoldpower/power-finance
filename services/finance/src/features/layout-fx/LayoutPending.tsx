import type {FC} from "react";
import {HeaderBox, HeaderBoxOffset} from "@shared/components";

interface LayoutPendingProps {}

const LayoutPending: FC<LayoutPendingProps> = () => {
	return (
		<>
			<HeaderBox>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
					Loading...
				</div>
			</HeaderBox>
			<HeaderBoxOffset>
				Loading...
			</HeaderBoxOffset>
		</>
	);
};

LayoutPending.displayName = 'LayoutPending';

export {LayoutPending};
export type {LayoutPendingProps};