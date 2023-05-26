import './App.css';
import navToggle from './assets/icon-menu.svg';
import logo from './assets/logo.svg';
import product1Thumbnail from './assets/image-product-1-thumbnail.jpg';
import product2Thumbnail from './assets/image-product-2-thumbnail.jpg';
import product3Thumbnail from './assets/image-product-3-thumbnail.jpg';
import product4Thumbnail from './assets/image-product-4-thumbnail.jpg';
import product1 from './assets/image-product-1.jpg';
import product2 from './assets/image-product-2.jpg';
import product3 from './assets/image-product-3.jpg';
import product4 from './assets/image-product-4.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useEffect, useRef, useState } from 'react';
import LightBox from './LightBox';
import Nav from './Nav';

function App() {
	interface Cart {
		name: string;
		image: string;
		price: string;
		totalPrice: string;
	}

	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const swiperRef = useRef<SwiperCore>();
	const [navActive, setNavActive] = useState(false);
	const [lightBoxActive, setLightBoxActive] = useState(false);
	const [itemAmount, setItemAmount] = useState(0);
	const [cart, setCart] = useState<Cart[]>([]);

	const productName = useRef<HTMLHeadingElement | null>(null);
	const productImage = useRef<HTMLImageElement | null>(null);
	const productPrice = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		navActive
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'visible');
	});

	const handleNav = () => {
		setNavActive(!navActive);
	};

	const addItem = () => {
		setItemAmount((itemAmount) => itemAmount + 1);
	};

	const subtractItem = () => {
		itemAmount > 0 ? setItemAmount((itemAmount) => itemAmount - 1) : '';
	};

	const addToCart = () => {
		const cartItemName = productName.current?.textContent as string;
		const cartItemImage = productImage.current?.src as string;
		const cartItemPrice = productPrice.current?.textContent as string;

		if (itemAmount > 0) {
			setCart((items) => [
				...items,
				{
					name: cartItemName,
					image: cartItemImage,
					price: `${cartItemPrice} x ${itemAmount}`,
					totalPrice: (parseFloat(cartItemPrice.slice(1)) * itemAmount).toFixed(
						2
					),
				},
			]);
		}
	};

	const deleteFromCart = (index: number) => {
		const updatedCart = cart;
		updatedCart.splice(index, 1);
		setCart([...updatedCart]);
	};

	const isLightBoxActive = () => {
		setLightBoxActive(!lightBoxActive);
	};

	return (
		<div className='App'>
			<div className={navActive ? 'overlay overlay--active' : 'overlay'}></div>
			<header className='header'>
				<div className='header__wrapper'>
					<div className='header__left'>
						<button className='nav-toggle' onClick={handleNav}>
							<img src={navToggle} alt='' />
						</button>
						<a href=''>
							<img src={logo} alt='' />
						</a>
					</div>
					<Nav
						navActive={navActive}
						cart={cart}
						handleNav={handleNav}
						deleteFromCart={deleteFromCart}
					/>
				</div>
			</header>
			<main className='main'>
				<div className='swiper__wrapper'>
					<Swiper
						modules={[Navigation, Thumbs]}
						thumbs={{ swiper: thumbsSwiper }}
						className='mySwiper'
						spaceBetween={0}
						slidesPerView={1}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
						onBeforeInit={(swiper) => {
							swiperRef.current = swiper;
						}}
					>
						<SwiperSlide onClick={isLightBoxActive}>
							<img className='swiper__img' src={product1} alt='' />
						</SwiperSlide>
						<SwiperSlide onClick={isLightBoxActive}>
							<img className='swiper__img' src={product2} alt='' />
						</SwiperSlide>
						<SwiperSlide onClick={isLightBoxActive}>
							<img className='swiper__img' src={product3} alt='' />
						</SwiperSlide>
						<SwiperSlide onClick={isLightBoxActive}>
							<img className='swiper__img' src={product4} alt='' />
						</SwiperSlide>

						<div className='swiper__nav'>
							<button
								className='swiper__nav-arrow'
								onClick={() => swiperRef.current?.slidePrev()}
							>
								<svg width='12' height='18' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M11 1 3 9l8 8'
										stroke='#1D2026'
										strokeWidth='3'
										fill='none'
										fillRule='evenodd'
									/>
								</svg>
							</button>
							<button
								className='swiper__nav-arrow'
								onClick={() => swiperRef.current?.slideNext()}
							>
								<svg width='13' height='18' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='m2 1 8 8-8 8'
										stroke='#1D2026'
										strokeWidth='3'
										fill='none'
										fillRule='evenodd'
									/>
								</svg>
							</button>
						</div>
					</Swiper>

					<Swiper
						className='swiper__thumbs'
						modules={[Thumbs]}
						watchSlidesProgress
						spaceBetween={30}
						slidesPerView={4}
						onSwiper={setThumbsSwiper}
					>
						<SwiperSlide className='swiper__thumb'>
							<img
								ref={productImage}
								className='swiper__img'
								src={product1Thumbnail}
								alt=''
							/>
						</SwiperSlide>
						<SwiperSlide className='swiper__thumb'>
							<img className='swiper__img' src={product2Thumbnail} alt='' />
						</SwiperSlide>
						<SwiperSlide className='swiper__thumb'>
							<img className='swiper__img' src={product3Thumbnail} alt='' />
						</SwiperSlide>
						<SwiperSlide className='swiper__thumb'>
							<img className='swiper__img' src={product4Thumbnail} alt='' />
						</SwiperSlide>
					</Swiper>
				</div>
				<div className='product'>
					<p className='product__company'>Sneaker Company</p>
					<h1 ref={productName} className='product__name'>
						Fall Limited Edition Sneakers
					</h1>
					<p className='product__info'>
						These low-profile sneakers are your perfect casual wear companion.
						Featuring a durable rubber outer sole, they’ll withstand everything
						the weather can offer.
					</p>
					<div className='product__price'>
						<div className='product__price-current'>
							<p ref={productPrice} className='product__price-current-amount'>
								$125.00
							</p>
							<p className='product__price-current-sale'>50%</p>
						</div>
						<p className='product__price-previous'>$250.00</p>
					</div>
					<div className='product__quantity'>
						<div className='product__cart'>
							<button
								className='product__cart-btn product__cart-btn--minus'
								onClick={subtractItem}
							>
								<svg
									width='12'
									height='4'
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
								>
									<defs>
										<path
											className='product__cart-btn-icon'
											d='M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z'
											id='a'
										/>
									</defs>
									<use fill='#FF7E1B' fillRule='nonzero' xlinkHref='#a' />
								</svg>
							</button>
							<p className='product__cart-quantity'>{itemAmount}</p>
							<button
								className='product__cart-btn product__cart-btn--plus'
								onClick={addItem}
							>
								<svg
									width='12'
									height='12'
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
								>
									<defs>
										<path
											className='product__cart-btn-icon'
											d='M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z'
											id='b'
										/>
									</defs>
									<use fill='#FF7E1B' fillRule='nonzero' xlinkHref='#b' />
								</svg>
							</button>
						</div>
						<button className='btn btn--shadow btn--flex' onClick={addToCart}>
							<svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
									fill='#fff'
									fillRule='nonzero'
								/>
							</svg>
							Add to cart
						</button>
					</div>
				</div>
				<LightBox
					lightBoxActive={lightBoxActive}
					isLightBoxActive={isLightBoxActive}
					index={swiperRef.current?.activeIndex}
				/>
			</main>
		</div>
	);
}

export default App;
