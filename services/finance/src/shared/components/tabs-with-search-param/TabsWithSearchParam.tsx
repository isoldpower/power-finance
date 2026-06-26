import { useEffect, useMemo, useState } from "react";
import {UiTabs} from "@internal/ui-library";
import {useNavigate, useSearch} from "@tanstack/react-router";
import type { ComponentProps, FC } from "react";


type TabsWithSearchParamsProps = {
	searchParam: string;
	defaultValue: string;
} & ComponentProps<typeof UiTabs>;

const TabsWithSearchParam: FC<TabsWithSearchParamsProps> = ({ 
	searchParam,
	defaultValue,
	children,
	value,
	onValueChange,
	...props
}) => {
	const searchParams = useSearch({ strict: false });
	const navigate = useNavigate();
	
	const tabSearchParam = useMemo(() => {
		const currentValue = Object.entries(searchParams)
			.find(([key]) => key === searchParam);
		
		return currentValue ? currentValue[1] : defaultValue;
	}, [defaultValue, searchParam, searchParams]);
	const [tabValue, setTabValue] = useState<string>(tabSearchParam);
	
	useEffect(() => {
		if (tabValue !== tabSearchParam) {
			navigate({
				to: '.',
				search: (prev) => ({
					...prev,
					[searchParam]: tabValue
				})
			})
				.catch((err: unknown) => {
					console.error("Failed to navigate: ", err);
				});
		}
	}, [searchParam, navigate, tabValue, tabSearchParam]);

	useEffect(() => {
		if (value) {
			setTabValue(value);
		}
	}, [value]);

	return (
		<UiTabs value={value ?? tabValue} onValueChange={onValueChange ?? setTabValue} {...props}>
			{children}
		</UiTabs>
	);
}

export { TabsWithSearchParam };