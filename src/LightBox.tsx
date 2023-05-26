import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import product1 from './assets/image-product-1.jpg';
import product2 from './assets/image-product-2.jpg';
import product3 from './assets/image-product-3.jpg';
import product4 from './assets/image-product-4.jpg';
import product1Thumbnail from './assets/image-product-1-thumbnail.jpg';
import product2Thumbnail from './assets/image-product-2-thumbnail.jpg';
import product3Thumbnail from './assets/image-product-3-thumbnail.jpg';
import product4Thumbnail from './assets/image-product-4-thumbnail.jpg';

type LightBoxProps = {
	lightBoxActive: boolean;
	isLightBoxActive: () => void;
	index: number | undefined;
};

const LightBox = ({
	lightBoxActive,
	isLightBoxActive,
	index,
}: LightBoxProps) => {
	const [lightBoxThumbsSwiper, setLightBoxThumbsSwiper] = useState<any>(null);
	const lightBoxSwiperRef = useRef<SwiperCore>();

	useEffect(() => {
		if (index !== undefined) {
			lightBoxSwiperRef.current?.slideTo(index);
		}
	});

	return (
		<div
			className={
				lightBoxActive
					? 'overlay--lightbox overlay overlay--lightbox--active'
					: 'overlay--lightbox overlay'
			}
		>
			<div className='lightbox-wrapper'>
				<button className='lightbox-close' onClick={isLightBoxActive}>
					<svg width='14' height='15' xmlns='http://www.w3.org/2000/svg'>
						<path
							className='lightbox-close-icon'
							d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
							fill='#fff'
							fillRule='evenodd'
						/>
					</svg>
				</button>
				<Swiper
					modules={[Navigation, Thumbs]}
					thumbs={{ swiper: lightBoxThumbsSwiper }}
					className='lightbox-swiper'
					spaceBetween={0}
					slidesPerView={1}
					onSlideChange={() => console.log('slide change')}
					onSwiper={(swiper) => console.log(swiper)}
					onBeforeInit={(swiper) => {
						lightBoxSwiperRef.current = swiper;
					}}
				>
					<SwiperSlide>
						<img
							className='swiper__img swiper__img--lightbox'
							src={product1}
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							className='swiper__img swiper__img--lightbox'
							src={product2}
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							className='swiper__img swiper__img--lightbox'
							src={product3}
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							className='swiper__img swiper__img--lightbox'
							src={product4}
							alt=''
						/>
					</SwiperSlide>
				</Swiper>
				<div className='swiper__nav swiper__nav--lightbox'>
					<button
						className='swiper__nav-arrow'
						onClick={() => lightBoxSwiperRef.current?.slidePrev()}
					>
						<svg width='12' height='18' xmlns='http://www.w3.org/2000/svg'>
							<path
								className='swiper__nav-arrow-icon'
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
						onClick={() => lightBoxSwiperRef.current?.slideNext()}
					>
						<svg width='13' height='18' xmlns='http://www.w3.org/2000/svg'>
							<path
								className='swiper__nav-arrow-icon'
								d='m2 1 8 8-8 8'
								stroke='#1D2026'
								strokeWidth='3'
								fill='none'
								fillRule='evenodd'
							/>
						</svg>
					</button>
				</div>
				<Swiper
					className='swiper__thumbs--lightbox'
					modules={[Thumbs]}
					watchSlidesProgress
					spaceBetween={30}
					slidesPerView={4}
					onSwiper={setLightBoxThumbsSwiper}
				>
					<SwiperSlide className='swiper__thumb'>
						<img className='swiper__img' src={product1Thumbnail} alt='' />
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
		</div>
	);
};

export default LightBox;
