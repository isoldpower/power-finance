import { Select, SelectTrigger, SelectContent, SelectItem, cn } from "@internal/ui-library";
import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { ComponentProps, FC } from "react";


interface SelectFieldProps extends Omit<ComponentProps<typeof Select>, 'onValueChange'> {
  options: { label: string; value: string }[];
  excluded?: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  options,
  excluded,
  placeholder = 'Select an option',
  ...props
}) => {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
  
	const selectedOption = useMemo(() => {
		return options.find((option) => option.value === props.value);
	}, [options, props.value]);

	const memoizedOptions = useMemo(() => {
	return options
		.filter((option) => {
			const isExcluded = (excluded ?? []).includes(option.value);
			return !isExcluded;
		});
	}, [options, excluded]);

	const optionsVirtualizer = useVirtualizer({
		count: memoizedOptions.length,
		getScrollElement: () => rootRef.current,
		estimateSize: () => 36,
		overscan: 3
	});

	const totalHeight = optionsVirtualizer.getTotalSize();
	const virtualItems = optionsVirtualizer.getVirtualItems();

	return (
		<Select onValueChange={props.onChange} open={open} onOpenChange={setOpen} {...props}>
			<SelectTrigger className="w-full">
				<div className="truncate max-w-full">
					{selectedOption?.label ?? placeholder}
				</div>
			</SelectTrigger>
			<SelectContent>
				<div ref={rootRef} className={cn(
						"w-full overflow-y-auto contain-strict",
						'max-h-[200px]'
					)} style={{ height: `${totalHeight.toString()}px`, position: 'relative' }}>
					<div style={{ height: `${totalHeight.toString()}px`, position: 'relative' }}>
						{virtualItems.map((virtualItem) => {
							const item = memoizedOptions[virtualItem.index];
							return (
								<SelectItem
									key={item.value}
									value={item.value}
									className="absolute top-0 left-0"
									style={{
										height: `${virtualItem.size.toString()}px`,
										transform: `translateY(${virtualItem.start.toString()}px)`
									}}
								>
									<div className="truncate pr-2 max-w-full">
										{item.label}
									</div>
								</SelectItem>
							);
						})}
					</div>
				</div>
			</SelectContent>
		</Select>
	);
};

SelectField.displayName = 'SelectField';

export { SelectField };
export type { SelectFieldProps };