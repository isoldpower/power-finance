import { CategoryPanelCard } from "./CategoryPanelCard.tsx";
import { CategoryPanelHeader } from "./CategoryPanelHeader.tsx";
import { CategoryPanelSwatch } from "./CategoryPanelSwatch.tsx";
import { CategoryPanelTitle } from "./CategoryPanelTitle.tsx";
import { CategoryPanelList } from "./CategoryPanelList.tsx";


function CategoryPanel() {
	return null;
}

CategoryPanel.displayName = 'CategoryPanel';
CategoryPanel.Card = CategoryPanelCard;
CategoryPanel.Header = CategoryPanelHeader;
CategoryPanel.Swatch = CategoryPanelSwatch;
CategoryPanel.Title = CategoryPanelTitle;
CategoryPanel.List = CategoryPanelList;

export { CategoryPanel };
