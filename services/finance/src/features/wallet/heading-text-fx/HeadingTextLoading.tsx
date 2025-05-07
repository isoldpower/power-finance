import type { FC } from "react";

import classes from './HeadingTextFx.module.css';
import { cn } from "@internal/ui-library";


type HeadingTextLoadingProps = object;

const HeadingTextLoading: FC<HeadingTextLoadingProps> = () => {
	return (
		<div className={cn(
			classes.headingText__loading,
			'my-3'
		)} />
	);
}

HeadingTextLoading.displayName = 'HeadingTextLoading';

export { HeadingTextLoading };
export type { HeadingTextLoadingProps };