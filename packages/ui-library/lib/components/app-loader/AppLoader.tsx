import styles from './AppLoader.module.css';

function AppLoader() {
	return (
		<div className={styles.brandLoader__container}>
			<div className={styles.brandLoader__spinner}></div>
		</div>
	)
}

AppLoader.displayName = 'BrandAppLoader';

export { AppLoader };