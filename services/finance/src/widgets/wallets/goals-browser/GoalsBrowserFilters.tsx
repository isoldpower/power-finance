import { useGoalsFiltersContext } from "@feature/wallets";
import { ListFilterBar } from "@shared/pure-components/collections";

import { GOALS_STATUS_OPTIONS } from "../config.ts";


const GoalsBrowserFilters = () => {
	const { search, setSearch, statusFilter, setStatusFilter } = useGoalsFiltersContext();

	return (
		<ListFilterBar
			query={search}
			onQueryChange={setSearch}
			placeholder="Search goals…"
			filter={statusFilter}
			onFilterChange={setStatusFilter}
			options={GOALS_STATUS_OPTIONS}
		/>
	);
}

export { GoalsBrowserFilters };
