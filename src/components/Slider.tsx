import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import TokenEl from './TokenEl';

const images: string[] = [
  "soo","soo","soo","soo","soo","soo","soo","soo","soo","soo",
];

// 설정값
const SHOW_COUNT = 5;
const CLONE_COUNT = 3; 
const ITEM_WIDTH_PERCENT = 100 / SHOW_COUNT; // 20%

const InfiniteSlider = ({setCurrentCenter}:{setCurrentCenter:React.Dispatch<React.SetStateAction<string>>}) => {
  // 앞뒤로 복사본 생성
  const extendedImages = [
    ...images.slice(-CLONE_COUNT),
    ...images,
    ...images.slice(0, CLONE_COUNT)
  ];

  // 초기 위치: 앞쪽 복사본(3개) 다음인 진짜 데이터의 첫 번째(index 3)
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isSliding = useRef(false);


  // translateX 계산: 
  // (현재인덱스 * 아이템너비) - (중앙정렬을 위한 왼쪽 여백)
  // 중앙정렬 여백 = (화면 반) - (아이템 반) = 50% - 10% = 40%
  // 즉, 2개의 아이템 너비만큼 왼쪽 공간을 확보해야 함
  const centerOffset = (SHOW_COUNT - 1) / 2 * ITEM_WIDTH_PERCENT;
  const translateValue = (currentIndex * ITEM_WIDTH_PERCENT) - centerOffset;

  const handleNext = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setTransitionEnabled(true);
    setCurrentCenter(images[currentIndex + 1])
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setTransitionEnabled(true);
    setCurrentCenter(images[currentIndex -1])
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isSliding.current = false;
    // 무한 스크롤 좌표 보정
    if (currentIndex >= images.length + CLONE_COUNT) {
      setTransitionEnabled(false);
      setCurrentIndex(CLONE_COUNT);
      setCurrentCenter(images[CLONE_COUNT])
    } else if (currentIndex < CLONE_COUNT) {
      setTransitionEnabled(false);
      setCurrentIndex(images.length + CLONE_COUNT - 1);
      setCurrentCenter(images[images.length + CLONE_COUNT - 1])
    }
  };

  return (
    <BodyContainer>
      <SliderWrapper>
        <ArrowButton position="left" onClick={handlePrev}>◀</ArrowButton>

        <Viewport>
          <Track
            transform={`translateX(-${translateValue}%)`}
            transition={transitionEnabled ? 'transform 0.5s ease' : 'none'}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedImages.map((src, idx) => {
              // 정확히 현재 인덱스와 일치하는지 확인
              const isCenter = idx === currentIndex;
              console.log(idx, currentIndex, isCenter);
              return (
                <SlideItem key={idx}>
                  <TokenEl img={src} isActive={isCenter}/>
                  {idx}
                </SlideItem>
              );
            })}
          </Track>
        </Viewport>

        <ArrowButton position="right" onClick={handleNext}>▶</ArrowButton>
      </SliderWrapper>
    </BodyContainer>
  );
};

export default InfiniteSlider;

/* --- Styles --- */

const BodyContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 10%;
`;

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Viewport = styled.div`
  width: 100%;
  margin: 50px 0;
  overflow-x:hidden;
`;

const Track = styled.div<{ transform: string; transition: string }>`
  display: flex;
  width: 100%;
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  will-change: transform; /* 성능 최적화 */
`;

const SlideItem = styled.div`
  /* 5개를 보여줘야 하므로 100% / 5 = 20% */
  flex: 0 0 20%; 
  width: 20%;
  margin: 50px 0;
  padding: 0 10px; /* 요소 간 간격 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArrowButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  ${({ position }) => (position === 'left' ? 'left: 0px;' : 'right: 0px;')}
  z-index: 10;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: lightgray;
  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;