
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import img3 from '../../../assets/Banner/Banner3.jpg'

import { EffectCoverflow, Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="h-3/4" src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img  src={img3}  />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img  src={img3}  />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img  src={img3}  />
        </SwiperSlide>
      </Swiper>
    </>
    );
};

export default Banner;