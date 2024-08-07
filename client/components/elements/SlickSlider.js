// components/SlickSlider.js
import { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';

const SlickSlider = () => {
    const { t } = useTranslation();
    useEffect(() => {

    if (typeof window !== 'undefined') {
    
      require('slick-carousel');
      $('.slick-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    }
  }, []);

  return (
    <div className="slick-slider">
      <div><h3 className='w-2/3 mx-5'>{t("Slide 1")}</h3></div>
      <div><h3 className='w-2/3 mx-5'>{t("Slide 1")}</h3></div>
      <div><h3 className='w-2/3 mx-5'>{t("Slide 1")}</h3></div>
      <div><h3 className='w-2/3 mx-5'>{t("Slide 1")}</h3></div>
      <div><h3 className='w-2/3 mx-5'>{t("Slide 1")}</h3></div>
      
      
    </div>
  );
};

export default SlickSlider;
