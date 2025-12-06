import styled from '@emotion/styled'

interface ProgressBarProps{
  totalSteps: number;
  currentStep: number;
  color: string;
}

const ProgressBar = ({ totalSteps, currentStep, color }:ProgressBarProps) => {
  // 입력값 검증: 숫자가 아니거나 유효하지 않은 값이 들어올 경우 기본값 설정
  // totalSteps가 0이거나 없으면 나눗셈 오류가 나므로 최소 1로 설정
  const safeTotalSteps = (typeof totalSteps === 'number' && totalSteps > 0) ? totalSteps : 1;
  const safeCurrentStep = (typeof currentStep === 'number') ? currentStep : 0;

  // 진행률 퍼센트 계산 (0 ~ 100)
  // currentStep이 0부터 시작한다고 가정 (예: 0, 1, 2...)
  let percentage = ((safeCurrentStep + 1) / safeTotalSteps) * 100;

  // 계산 결과가 NaN이면 0으로 처리 (이중 안전장치)
  if (Number.isNaN(percentage)) {
    percentage = 0;
  }

  // 0과 100 사이로 값 제한
  percentage = Math.min(100, Math.max(0, percentage));

  return (
    <Track>
      <Fill width={percentage} color={color} />
    </Track>
  )
}

export default ProgressBar

// 회색 배경 트랙 (빈 막대)
const Track = styled.div({
  width: '100%',
  height: '10px',        // 바 두께 조절
  backgroundColor: '#000', // 트랙 색상 (연한 회색)
  borderRadius: '5px',   // 둥근 모서리
  overflow: 'hidden',
  position:'fixed',
  bottom:0    // 내부 Fill이 튀어나오지 않게 함
});

// 실제로 차오르는 색상 막대
const Fill = styled.div<{width: number, color: string}>(({ width, color }) => ({
  height: '100%',
  width: `${width}%`,    // 계산된 퍼센트만큼 너비 설정
  backgroundColor: color, // 넘겨받은 색상 적용
  transition: 'width 0.3s ease-in-out', // 스텝 변경 시 부드럽게 차오르는 효과
}));