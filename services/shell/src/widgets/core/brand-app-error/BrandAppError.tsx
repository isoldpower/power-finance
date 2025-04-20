import styles from './BrandAppError.module.css';

function BrandAppError() {
	return (
		<div className={styles.brandError__container}>
			<div className={styles.brandError__spinner}></div>
		</div>
	)
}

BrandAppError.displayName = 'BrandAppError';

export { BrandAppError };