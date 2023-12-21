import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavorites, selectIsAuth } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { AlertError, Container, ProductCard } from '../../components';
import { ProductsCardsLoader } from '../../components/loaders';
import styled from 'styled-components';

const FavoritesContainer = ({ className }) => {
	const { favorites, isLoading, error } = useSelector(selectFavorites);

	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return (
			<div className={className}>
				<Container>
					<AlertError>
						Чтобы пользоваться избранным необходимо{' '}
						<Link to="/authorization" className="link-to-auth">
							авторизоваться
						</Link>
					</AlertError>
				</Container>
			</div>
		);
	}

	return (
		<div className={className}>
			<Container>
				<div className="favorites-block">
					<h2>Избранное</h2>
					{error && <AlertError>{error}</AlertError>}
					{isLoading ? (
						<div className="grid-cards">
							{generateLoader(9, <ProductsCardsLoader />)}
						</div>
					) : favorites.length ? (
						<div className="grid-cards">
							{favorites.map((favorite) => (
								<ProductCard
									key={favorite.id}
									product={favorite.product}
								/>
							))}
						</div>
					) : (
						<div className="favorites-empty">
							<h3>
								В избранном пусто <span>😕</span>
							</h3>
							<p>
								Вероятней всего, вы не еще ничего не добавили.
								<br />
								Для того, чтобы добавить товар, перейдите на{' '}
								<Link to="/">главную страницу</Link>.
							</p>
							<img
								src={
									process.env.PUBLIC_URL +
									'/static/img/empty-favorite.png'
								}
								alt="Empty Favorites"
							/>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export const Favorites = styled(FavoritesContainer)`
	.grid-cards {
		flex-grow: 1;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}

	.favorites-empty {
		text-align: center;

		img {
			display: inline;
		}

		a {
			text-decoration: underline;
		}
	}

	.link-to-auth {
		text-decoration: underline;
	}
`;
