import { useEffect, useRef } from "react";


const useOnValuesChange = (values: unknown[], onChange: () => void) => {
	const previousValues = useRef<unknown[]>(values);

	useEffect(() => {
		const changed = values.some((value, index) => value !== previousValues.current[index]);

		if (!changed) {
			return;
		}

		previousValues.current = values;
		onChange();
	}, [onChange, values]);
}

export { useOnValuesChange };
