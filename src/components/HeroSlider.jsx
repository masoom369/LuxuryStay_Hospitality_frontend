import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from '../constants/data';
import { EffectFade, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css/effect-fade';
import 'swiper/css';

/**
 * Button and accent color use the same hex so button blends with site gold accent.
 * If you want a different gold, change the hex below (both bg and hover).
 */
const ACCENT = '#a67c52';       // main gold; tweak if needed
const ACCENT_HOVER = '#8c653f'; // hover shade

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className='heroSlider h-[600px] lg:h-[860px]'
    >
      {sliderData.map(({ id, title, bg, btnNext }) => (
        <SwiperSlide
          className='h-full relative flex justify-center items-center'
          key={id}
        >
          {/* Text content */}
          <div className='z-20 text-white text-center px-4'>
            <div className='uppercase font-tertiary tracking-[9px] mb-5'>
              Just Enjoy & Relax
            </div>

            <h1 className='font-primary text-[28px] sm:text-[36px] md:text-[48px] lg:text-[68px] uppercase tracking-[2px] max-w-[900px] leading-tight mb-6 mx-auto'>
              {title}
            </h1>

            {/* Accent-matching button: fixed padding so it's normal size */}
            <Link
              to="/rooms"
              className='inline-block text-white px-8 py-3 rounded-md text-sm uppercase tracking-wider transition-transform duration-300'
              style={{
                backgroundColor: ACCENT,
                transform: 'translateZ(0)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            >
              {btnNext}
            </Link>
          </div>

          {/* Background image */}
          <div className='absolute top-0 w-full h-full'>
            <img className='object-cover h-full w-full' src={bg} alt="background" />
          </div>

          {/* Overlay */}
          <div className='absolute w-full h-full bg-black/70' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
