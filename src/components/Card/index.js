import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
	id,
	onFavorite,
	imageUrl,
	title,
	price,
	onPlus,
	favorited = false,
	added = false,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const onClickPlus = () => {
		onPlus({ id, title, imageUrl, price });
	};

	const onClickFavorite = () => {
		onFavorite({ id, title, imageUrl, price });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={265}
					viewBox='0 0 150 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='150' />
					<rect x='0' y='167' rx='5' ry='5' width='150' height='15' />
					<rect x='0' y='190' rx='5' ry='5' width='100' height='18' />
					<rect x='0' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='118' y='230' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite} onClick={onClickFavorite}>
						<img
							src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
							alt='Unliked'
						/>
					</div>
					<img width='100%' height={135} src={imageUrl} alt='Sneakers' />
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<img
							className={styles.plus}
							src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
							alt='Plus'
							onClick={onClickPlus}
						/>
					</div>{' '}
				</>
			)}
		</div>
	);
}

export default Card;
