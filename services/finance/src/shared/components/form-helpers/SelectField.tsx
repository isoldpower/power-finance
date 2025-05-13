import { Select, SelectTrigger, SelectContent, SelectItem } from "@internal/ui-library";
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
				{selectedOption?.label ?? placeholder}
			</SelectTrigger>
			<SelectContent>
				<div ref={rootRef} className="h-[200px] w-full overflow-y-auto contain-strict">
					<div style={{ height: `${totalHeight.toString()}px`, width: '100%', position: 'relative' }}>
						{virtualItems.map((virtualItem) => {
							const item = memoizedOptions[virtualItem.index];
							return (
								<SelectItem
									key={item.value}
									value={item.value}
									style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${virtualItem.size.toString()}px`,
									transform: `translateY(${virtualItem.start.toString()}px)`
									}}
								>
									{item.label}
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