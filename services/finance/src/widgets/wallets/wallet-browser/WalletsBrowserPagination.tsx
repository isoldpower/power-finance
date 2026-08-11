import { Icons } from "@internal/ui-library";

import { useWalletsPaginationContext } from "@feature/wallets";
import { MetaText } from "@shared/pure-components/typography";
import { PagerButton, PaginationRange } from "@shared/pure-components/collections";


const WalletsBrowserPagination = () => {
	const {
		from,
		to,
		total,
		scrollForward,
		scrollBackward,
		pageNumber,
		pageCount
	} = useWalletsPaginationContext();

	return (
		<div className="flex items-center gap-2 border-t border-border px-[18px] py-2.5">
			<PaginationRange 
				total={total} 
				from={from} 
				to={to}
			/>
			<div className="flex-1" />
			<PagerButton disabled={pageNumber <= 1} onClick={scrollBackward}>
				<Icons.ChevronLeft size={15} />
			</PagerButton>
			<MetaText size="11">
				{pageNumber} / {pageCount}
			</MetaText>
			<PagerButton disabled={pageNumber >= pageCount} onClick={scrollForward}>
				<Icons.ChevronRight size={15} />
			</PagerButton>
		</div>
	);
}

export { WalletsBrowserPagination };
