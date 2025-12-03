// SimpleSlider.tsx
import Slider,{ type Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TokenEl from './TokenEl';
import styled from '@emotion/styled';

const images: string[] = [
  "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo", "soo",
];

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow-y: visible;
    padding: 50px 0;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
  }
`;

const SlideItem = styled.div`
  padding: 0 100px;  /* ← 이 값이 요소 간 간격 느낌을 결정 */
`;

const TokenSlider = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

const BodyContainer = styled.div`
    width:90vw;
    margin: 0 auto;
    margin-top:5%;
`

  return (
      <BodyContainer>
            <StyledSlider {...settings}>
            {images.map((src, idx) => (
              <SlideItem key={idx}>
                <TokenEl img={src}/>
              </SlideItem>
            ))}
          </StyledSlider>
      </BodyContainer>
      
  );
};

export default TokenSlider;
