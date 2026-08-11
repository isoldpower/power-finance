import { useAutomationsFiltersContext } from "@feature/assistance";
import { ListFilterBar } from "@shared/pure-components/collections";

import { AUTOMATIONS_STATUS_OPTIONS } from "../config.ts";


const AutomationsBrowserFilters = () => {
	const { search, setSearch, statusFilter, setStatusFilter } = useAutomationsFiltersContext();

	return (
		<ListFilterBar
			query={search}
			onQueryChange={setSearch}
			placeholder="Search rules…"
			filter={statusFilter}
			onFilterChange={setStatusFilter}
			options={AUTOMATIONS_STATUS_OPTIONS}
		/>
	);
}

export { AutomationsBrowserFilters };
