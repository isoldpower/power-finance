import styles from './BrandAppLoader.module.css';

function BrandAppLoader() {
	return (
		<div className={styles.brandLoader__container}>
			<div className={styles.brandLoader__spinner}></div>
		</div>
	)
}

BrandAppLoader.displayName = 'BrandAppLoader';

export { BrandAppLoader };