import { createContext, useRef, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StoreApi } from "zustand";
import type { ReactNode } from "react";

import type { ConfigurationStore, ConfigurationStoreState, CategoryGraphType, TrendsGraphType } from "./types";


const ConfigurationStoreContext = createContext<StoreApi<ConfigurationStore> | null>(null);

interface ConfigurationStoreProviderProps {
	children: ReactNode;
	initialState?: Partial<ConfigurationStoreState>;
}

function ConfigurationStoreProvider({ 
	children,
	initialState
}: ConfigurationStoreProviderProps) {
	const defaultValues = useRef<ConfigurationStoreState>({
		graphType: initialState?.graphType ?? "linear",
		categoryGraphType: initialState?.categoryGraphType ?? "pie",
	});

	const [store] = useState(() => {
		return create<ConfigurationStore>()(
			persist(
				(set) => ({
					graphType: defaultValues.current.graphType,
					setTrendsGraphType: (graphType: TrendsGraphType) => {
						set({ graphType });
					},
					categoryGraphType: defaultValues.current.categoryGraphType,
					setCategoryGraphType: (categoryGraphType: CategoryGraphType) => {
						set({ categoryGraphType });
					},
				}),
				{
					name: "configuration-store",
					storage: createJSONStorage(() => localStorage),
				}
			)
		);
	});

	return (
		<ConfigurationStoreContext value={store}>
			{children}
		</ConfigurationStoreContext>
	);
}


export { ConfigurationStoreContext, ConfigurationStoreProvider };
export type { ConfigurationStoreProviderProps };