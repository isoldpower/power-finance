const QUERY_ARRAY_SEPARATOR = ',';

type QueryParameterValue = string | number | boolean | string[] | undefined | null;
type QueryParameters = Record<string, QueryParameterValue>;

function isAbsentParameter(parameterValue: QueryParameterValue): boolean {
	return parameterValue === undefined || parameterValue === null;
}

function serializeQueryParameters(queryParameters: QueryParameters | undefined): string {
	if (!queryParameters) {
		return '';
	}

	const searchParameters = new URLSearchParams();
	Object.entries(queryParameters)
		.filter(([, parameterValue]) => !isAbsentParameter(parameterValue))
		.forEach(([parameterName, parameterValue]) => {
			if (Array.isArray(parameterValue)) {
				if (parameterValue.length !== 0) {
					searchParameters.set(parameterName, parameterValue.join(QUERY_ARRAY_SEPARATOR));
				}
			} else {
				searchParameters.set(parameterName, String(parameterValue));
			}
		});

	return searchParameters.toString();
}

export { QUERY_ARRAY_SEPARATOR, serializeQueryParameters };
export type { QueryParameters, QueryParameterValue };
