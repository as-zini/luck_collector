import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { color, imgMap, pageNum, textMap } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import CloverIcon from "../components/CloverIcon";
import BouncingBall from "../components/BouncingClover";

const DetailPage = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigate();
  const {name} = useParams();

  // 해결 2: 이미지 프리로딩 (배경 깜빡임 방지)
  useEffect(() => {
    const images = name ? imgMap[name] : [];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // index가 18 이상이면 타이머를 시작하지 않음 (종료)
    if (index >= 7) return;

    const timer = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 1500);

    return () => clearInterval(timer);
  }, [index]); // 의존성 배열에 index 추가

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && name && index >= 7 && index <= pageNum[name]-1) {
        setIndex(prev => prev + 1);
        return
      }
      console.log(e.key)
      if(e.key === "ArrowLeft" && name && index >= 8 && index <= pageNum[name]-1){
        setIndex(prev => prev - 1);
        return
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 사라질 때 이벤트 리스너 정리 (Cleanup)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [index]);

  useEffect(() => {
    console.log(index);
  }, [index])
  
  // 배경색과 배경이미지를 분리해서 관리
  const currentBgColor = index <= 2 && name ? color[name] : 'black';
  
  // 오타 수정: 마지막 fallback 값을 index(숫자)가 아닌 null로 변경
  const currentBgImg = !name ? null : index === 4 ? imgMap[name][0] : index === 5 ? imgMap[name][1] : index >= 7 ? imgMap[name][index-5] : null;

  const firstTextArr = !name ? null : textMap[name][0].split('\n')

  return (
    // 문제 1 해결: bgColor와 bgImg prop을 분리하여 전달
    <Container bgColor={currentBgColor} bgImg={currentBgImg}>
      {/* 해결 1: index >= 7 조건 추가 (7번 이후에도 텍스트 보이도록) */}
      {index === 0 || index === 2 || index === 6 ? null :
      <TextArea>
        {index === 1 && firstTextArr ? 
          <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Text color="black">{firstTextArr[0]}</Text>
            <CloverText>
              <Text color="black">{firstTextArr[1]}</Text>
              <CloverIcon size={14}/>
            </CloverText>
          </div>
        :<Text color={index === 1 ? 'black' : 'white'}>
          {!name ? "" : textMap[name][index === 1 ? 0 : (index === 3 || index === 4 || index === 5) ? 1 : index >= 7 ? index-5 : textMap[name].length-1]}
        </Text>
        }
      </TextArea>}
      {name && index === pageNum[name] ? 
        <HomeButton onClick={() => navigation('/')}>
          <BouncingBall/>
          홈으로 !
        </HomeButton>
      :null}
      {index >= 7 && name ? <ProgressBar totalSteps={pageNum[name]-6} currentStep={index-7} color={color[name]}/> : null}
    </Container>
  )
}

export default DetailPage

// 스타일 수정
const Container = styled.div<{bgColor: string, bgImg: string | null}>(({bgColor, bgImg}) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: bgColor, // 배경색 적용
  // 이미지가 있을 때만 url()로 감싸서 적용, 없으면 none
  backgroundImage: bgImg ? `url(${bgImg})` : 'none',
  backgroundSize: 'cover', // 이미지가 화면에 꽉 차게 설정
  backgroundPosition: 'center', // 이미지가 중앙에 오게 설정
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
}))

const TextArea = styled.div({
  marginTop: '2.3%', // % 값이 너무 작아서(3%) 텍스트가 안 보일 수 있어 조금 늘렸습니다 (필요 시 조정)
  display: 'flex',
  justifyContent: 'center',
})

const Text = styled.span<{color: string}>(({color}) => ({
  fontSize: 16,
  fontWeight: 500,
  color: color,
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap', 
  textAlign: 'center',
}))

const HomeButton = styled.div({
  position:'fixed',
  bottom:'4%',
  right:'3%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  gap:5,
  fontSize:12,
  fontWeight:600,
  color:"#fff",
  cursor:'pointer',
  zIndex:99
})

const CloverText = styled.div({
  display:'flex',
  alignItems:'center',
  gap:3
})
