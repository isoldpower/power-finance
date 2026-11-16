import { FinanceBadge, FinanceButton, Icons } from "@internal/ui-library";
import { Caption, MetaText, ShowOn } from "@internal/shared";
import { SettingsLayout, SettingsSectionTitle } from "@entity/configuration";
import { CategoriesListFx, useCategoryCatalog } from "@feature/categories";
import { NewCategoryModal } from "@widget/categories";
import { CategoryEntry } from "./catalog-partials/CategoryEntry.tsx";
import { CATEGORY_CATALOG_COPY } from "./config.ts";

import type { FC } from "react";
import type { CategoryKind } from "@entity/categories";


interface CategoryCatalogProps {
	kind: CategoryKind;
}

const CategoryCatalog: FC<CategoryCatalogProps> = ({ kind }) => {
	const { builtInCategories, ownCategories, status } = useCategoryCatalog(kind);
	const copy = CATEGORY_CATALOG_COPY[kind];

	return (
		<SettingsLayout.Section>
			<SettingsSectionTitle>
				<SettingsSectionTitle.Info>
					<SettingsSectionTitle.Heading>
						{copy.heading}
					</SettingsSectionTitle.Heading>
					<SettingsSectionTitle.Description>
						{copy.description}
					</SettingsSectionTitle.Description>
				</SettingsSectionTitle.Info>
				<SettingsSectionTitle.Action>
					<NewCategoryModal kind={kind}>
						<FinanceButton size="sm">
							<Icons.Plus size={14} />
							New category
						</FinanceButton>
					</NewCategoryModal>
				</SettingsSectionTitle.Action>
			</SettingsSectionTitle>
			<CategoriesListFx status={status}>
				<MetaText className="mb-2 block">
					Built-in
				</MetaText>
				<div className="mb-5 flex flex-wrap gap-1.5">
					{builtInCategories.map((category) => (
						<FinanceBadge key={category.id} size="sm" tone="neutral">
							{category.name}
						</FinanceBadge>
					))}
				</div>
				<MetaText className="mb-1 block">
					Yours
				</MetaText>
				<ShowOn condition={ownCategories.length === 0}>
					<Caption size="12">
						{copy.empty}
					</Caption>
				</ShowOn>
				<ShowOn condition={ownCategories.length > 0}>
					<ul className="flex flex-col">
						{ownCategories.map((category) => (
							<CategoryEntry key={category.id} category={category} />
						))}
					</ul>
				</ShowOn>
			</CategoriesListFx>
		</SettingsLayout.Section>
	);
};

CategoryCatalog.displayName = 'CategoryCatalog';

export { CategoryCatalog };
export type { CategoryCatalogProps };
