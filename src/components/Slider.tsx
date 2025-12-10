

import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import TokenEl from './TokenEl';

const images: string[] = [
  "yoon", "sae", "yeon", "sang", "soo", "eun", "ga", "yea", "tae", "na",
  "seon", "hoon", "hyeon", "seung", "rim", "lee", "hak", "gee", "wook", "jin",
];

const SHOW_COUNT = 5;
const CLONE_COUNT = 3;
const ITEM_WIDTH_PERCENT = 100 / SHOW_COUNT;

const InfiniteSlider = ({
  setCurrentCenter,
}: {
  setCurrentCenter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const location = useLocation();

  // 디테일 페이지에서 돌아올 때 넘겨준 index
  const fromIndex = (() => {
    const idx = (location.state as { tokenIndex?: number } | null)?.tokenIndex;
    if (typeof idx === 'number' && idx >= 0 && idx < images.length) return idx;
    return 0; // 기본값
  })();

  // clones + 원본 index를 반영한 초기 currentIndex
  const [currentIndex, setCurrentIndex] = useState(
    CLONE_COUNT + fromIndex + 2,
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isSliding = useRef(false);

  const extendedImages = [
    ...images.slice(-CLONE_COUNT),
    ...images,
    ...images.slice(0, CLONE_COUNT),
  ];

  const centerOffset = ((SHOW_COUNT - 1) / 2) * ITEM_WIDTH_PERCENT;
  const translateValue = currentIndex * ITEM_WIDTH_PERCENT - centerOffset;

  const handleNext = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isSliding.current = false;
    if (currentIndex >= images.length + CLONE_COUNT) {
      setTransitionEnabled(false);
      setCurrentIndex(CLONE_COUNT);
    } else if (currentIndex < CLONE_COUNT) {
      setTransitionEnabled(false);
      setCurrentIndex(images.length + CLONE_COUNT - 1);
    }
  };

  return (
    <BodyContainer>
      <SliderWrapper>
        <ArrowButton position="left" onClick={handlePrev}>
          ◀
        </ArrowButton>

        <Viewport>
          <Track
            transform={`translateX(-${translateValue}%)`}
            transition={transitionEnabled ? 'transform 0.5s ease' : 'none'}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedImages.map((src, idx) => {
              const isCenter = idx === currentIndex;

              // ✅ 원본 배열에서의 인덱스(0 ~ images.length-1)
              const originalIndex =
                (idx - CLONE_COUNT + images.length) % images.length;

              return (
                <SlideItem key={`${src}-${idx}`}>
                  <TokenEl
                    img={src}
                    isActive={isCenter}
                    originalIndex={originalIndex}
                    setCurrentCenter={setCurrentCenter}
                  />
                </SlideItem>
              );
            })}
          </Track>
        </Viewport>

        <ArrowButton position="right" onClick={handleNext}>
          ▶
        </ArrowButton>
      </SliderWrapper>
    </BodyContainer>
  );
};

export default InfiniteSlider;

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
