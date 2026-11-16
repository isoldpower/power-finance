import { Caption, SkeletonText } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


const CATEGORIES_UNAVAILABLE = "Categories couldn't be loaded.";
const CATEGORY_SAMPLE_SIZE = 3;

type CategoriesListFxProps = PropsWithChildren<{
	status: 'pending' | 'error' | 'success';
}>;

const sampleKeys = Array.from({ length: CATEGORY_SAMPLE_SIZE }, (_, index) => `category-${index.toString()}`);

const CategoriesListFx: FC<CategoriesListFxProps> = ({ status, children }) => {
	switch (status) {
		case 'pending':
			return sampleKeys.map((key) => (
				<SkeletonText key={key} size="13.5" width="w-40" className="my-2" />
			));
		case 'error':
			return (
				<Caption size="12">
					{CATEGORIES_UNAVAILABLE}
				</Caption>
			);
		case 'success':
			return children;
		default:
			throw Error("Unknown Categories List status");
	}
};

CategoriesListFx.displayName = 'CategoriesListFx';

export { CategoriesListFx };
export type { CategoriesListFxProps };
