import { useEffect, useRef } from "react";


const useOnValuesChange = (values: unknown[], onChange: () => void) => {
	const previousValues = useRef<unknown[]>(values);

	useEffect(() => {
		const isChanged = values.some((value, index) => {
			return value !== previousValues.current[index];
		});

		if (isChanged) {
			previousValues.current = values;
			onChange();
		}
	}, [onChange, values]);
}

export { useOnValuesChange };
