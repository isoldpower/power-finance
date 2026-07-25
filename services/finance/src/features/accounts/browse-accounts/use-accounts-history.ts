import { MOCK_ACCOUNT_HISTORY } from "../mock.ts";
import {useMemo} from "react";


const useAccountHistory = () => {
	const accountHistory = useMemo(() => {
		return MOCK_ACCOUNT_HISTORY;
	}, []);
	
	return {
		history: accountHistory
	};
}

export { useAccountHistory };