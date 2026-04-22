import { Icons } from '@internal/ui-library';


const TransactionTypeIcon: React.FC = () => {
	return (
		<div className="w-8 h-8 p-2 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
			<Icons.ArrowUpRight className="text-gray-500" />
		</div>
	);
};

TransactionTypeIcon.displayName = 'TransactionTypeIcon';

export { TransactionTypeIcon };
