import styled from '@emotion/styled'
import CloverIcon from './CloverIcon'; // 경로는 프로젝트에 맞게

interface ProgressBarProps{
  totalSteps: number;
  currentStep: number;
  color: string;
}

const ProgressBar = ({ totalSteps, currentStep, color }:ProgressBarProps) => {
  const safeTotalSteps = (typeof totalSteps === 'number' && totalSteps > 0) ? totalSteps : 1;
  const safeCurrentStep = (typeof currentStep === 'number') ? currentStep : 0;

  let percentage = ((safeCurrentStep + 1) / safeTotalSteps) * 100;

  if (Number.isNaN(percentage)) {
    percentage = 0;
  }

  percentage = Math.min(100, Math.max(0, percentage));

  return (
    <Track>
      <Fill width={percentage} color={color} />
      <IconWrapper width={percentage}>
        <CloverIcon size={16} color={color} />
      </IconWrapper>
    </Track>
  )
}

export default ProgressBar

const Track = styled.div({
  width: '100%',
  height: '10px',
  backgroundColor: '#000',
  borderRadius: '5px',
  overflow: 'visible',   // 바깥으로 나와도 보이도록
  position: 'fixed',
  bottom: 0,
});

// 채워지는 부분 + 아이콘 컨테이너
const Fill = styled.div<{width: number, color: string}>(({ width, color }) => ({
  height: '100%',
  width: `${width}%`,
  backgroundColor: color,
  transition: 'width 0.3s ease-in-out',
  display: 'flex',                // 오른쪽 정렬 위해 flex
  justifyContent: 'flex-end',     // 오른쪽 끝으로
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingRight: '4px',            // 아이콘이 너무 끝에 딱 붙지 않게
}));

const IconWrapper = styled.div<{ width: number }>(({ width }) => ({
  position: 'absolute',
  left: `${width}%`,         // 진행률에 따라 이동
  bottom: '10px',            // 막대 위로 살짝 띄우기
  transform: 'translateX(-50%)',
}));