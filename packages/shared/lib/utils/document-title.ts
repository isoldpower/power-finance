const BRAND_NAME = 'Power Finance';

const formatDocumentTitle = (pageTitle?: string): string => {
	return pageTitle 
		? `${pageTitle} · ${BRAND_NAME}` 
		: BRAND_NAME;
}

export { BRAND_NAME, formatDocumentTitle };
