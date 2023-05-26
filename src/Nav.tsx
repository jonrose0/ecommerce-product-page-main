import { useState } from 'react';
import navClose from './assets/icon-close.svg';
import deleteIcon from './assets/icon-delete.svg';
import avatar from './assets/image-avatar.png';

type NavProps = {
	navActive: boolean;
	cart: Cart[];
	handleNav: () => void;
	deleteFromCart: (index: number) => void;
};

interface Cart {
	name: string;
	image: string;
	price: string;
	totalPrice: string;
}

const Nav = ({ navActive, cart, handleNav, deleteFromCart }: NavProps) => {
	const [cartActive, setCartActive] = useState(false);

	const handleCart = () => {
		setCartActive(!cartActive);
	};

	return (
		<nav className='nav'>
			<div
				className={
					navActive
						? 'nav__list-wrapper nav__list-wrapper--active'
						: 'nav__list-wrapper'
				}
			>
				<button className='nav__list-close' onClick={handleNav}>
					<img src={navClose} alt='' />
				</button>
				<ul className='nav__list'>
					<li>
						<a className='nav__link' href=''>
							Collections
						</a>
					</li>
					<li>
						<a className='nav__link' href=''>
							Men
						</a>
					</li>
					<li>
						<a className='nav__link' href=''>
							Women
						</a>
					</li>
					<li>
						<a className='nav__link' href=''>
							About
						</a>
					</li>
					<li>
						<a className='nav__link' href=''>
							Contact
						</a>
					</li>
				</ul>
			</div>
			<div className='nav__right'>
				<button className='nav__right-cart-btn' onClick={handleCart}>
					{cart.length ? (
						<span className='nav__right-cart-notification'>{cart.length}</span>
					) : (
						''
					)}
					<svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
						<path
							className='nav__right-cart-icon'
							d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
							fill='#69707D'
							fillRule='nonzero'
						/>
					</svg>
				</button>
				<button>
					<img className='nav__right-avatar' src={avatar} alt='' />
				</button>
				{cartActive ? (
					<div className='nav__right-cart'>
						<div className='nav__right-cart-heading'>Cart</div>
						<div className='nav__right-cart-items'>
							{cart.length > 0 ? (
								<>
									{cart.map((item, index) => {
										return (
											<div key={index} className='nav__right-cart-item'>
												<img
													className='nav__right-cart-image'
													src={item.image}
													alt=''
												/>
												<div className='nav__right-cart-info'>
													<h2>{item.name}</h2>
													<div className='nav__right-cart-price-wrapper'>
														<span className='nav__right-cart-price'>
															{item.price}
														</span>
														<span className='nav__right-cart-total'>{`$${item.totalPrice}`}</span>
													</div>
												</div>
												<button
													className='nav__right-cart-delete'
													onClick={(e) => deleteFromCart(index)}
												>
													<img src={deleteIcon} alt='' />
												</button>
											</div>
										);
									})}
									<button className='btn'>Checkout</button>
								</>
							) : (
								<p>Your cart is empty.</p>
							)}
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</nav>
	);
};

export default Nav;
