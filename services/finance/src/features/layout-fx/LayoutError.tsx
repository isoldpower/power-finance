import type {FC} from "react";
import {HeaderBox, HeaderBoxOffset} from "@shared/components";

interface LayoutErrorProps {}

const LayoutError: FC<LayoutErrorProps> = () => {
	return (
		<>
			<HeaderBox>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
					Oops...
				</div>
			</HeaderBox>
			<HeaderBoxOffset>
				Something went wrong
			</HeaderBoxOffset>
		</>
	);
};

LayoutError.displayName = 'LayoutError';

export {LayoutError};
export type {LayoutErrorProps};