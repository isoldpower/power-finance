import { HistoryToolbarContainer } from "./HistoryToolbarContainer.tsx";
import { HistoryToolbarTitle } from "./HistoryToolbarTitle.tsx";
import { HistoryToolbarCount } from "./HistoryToolbarCount.tsx";
import { HistoryToolbarHint } from "./HistoryToolbarHint.tsx";


function HistoryToolbar() {
	return null;
}

HistoryToolbar.displayName = 'HistoryToolbar';
HistoryToolbar.Container = HistoryToolbarContainer;
HistoryToolbar.Title = HistoryToolbarTitle;
HistoryToolbar.Count = HistoryToolbarCount;
HistoryToolbar.Hint = HistoryToolbarHint;

export { HistoryToolbar };
