import styles from './AppError.module.css';

function AppError() {
	return (
		<div className={styles.brandError__container}>
			<div className={styles.brandError__spinner}></div>
		</div>
	)
}

AppError.displayName = 'BrandAppError';

export { AppError };