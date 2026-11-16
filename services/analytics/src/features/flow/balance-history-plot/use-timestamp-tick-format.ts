import { useCallback } from "react";
import { useDateFormat } from "@shared/formatting";


const useTimestampTickFormat = (timestamps: string[]): ((value: unknown) => string) => {
	const { formatBucket } = useDateFormat();

	return useCallback((value: unknown) => {
		const timestamp = timestamps[Number(value)] as string | undefined;

		return timestamp ? formatBucket(timestamp, 'day') : '';
	}, [timestamps, formatBucket]);
};

export { useTimestampTickFormat };
