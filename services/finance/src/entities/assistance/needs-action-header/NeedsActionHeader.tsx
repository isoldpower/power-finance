import { NeedsActionHeaderBadge } from './NeedsActionHeaderBadge.tsx';
import { NeedsActionHeaderTitle } from './NeedsActionHeaderTitle.tsx';
import { NeedsActionHeaderDescriptor } from './NeedsActionHeaderDescriptor.tsx';
import { NeedsActionHeaderContainer } from './NeedsActionHeaderContainer.tsx';


function NeedsActionHeader() {
	return null;
}

NeedsActionHeader.displayName = 'NeedsActionHeader';
NeedsActionHeader.Badge = NeedsActionHeaderBadge;
NeedsActionHeader.Title = NeedsActionHeaderTitle;
NeedsActionHeader.Descriptor = NeedsActionHeaderDescriptor;
NeedsActionHeader.Container = NeedsActionHeaderContainer;

export { NeedsActionHeader };
