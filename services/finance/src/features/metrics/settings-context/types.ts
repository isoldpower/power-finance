type MetricsPeriod = '1W' | '1M' | '3M' | '1Y'; 

interface MetricsPreferences {
	metricsPeriod: MetricsPeriod;
}

interface MetricsPreferencesState extends MetricsPreferences {
	changePeriod: (period: MetricsPeriod) => void;
}

export type { MetricsPeriod, MetricsPreferences, MetricsPreferencesState };