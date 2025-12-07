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
      <Fill width={percentage} color={color}>
        {percentage > 0 && (
          <IconWrapper>
            <CloverIcon size={16} color={color} />
          </IconWrapper>
        )}
      </Fill>
    </Track>
  )
}

export default ProgressBar

// 트랙
const Track = styled.div({
  width: '100%',
  height: '10px',
  backgroundColor: '#000',
  borderRadius: '5px',
  overflow: 'visible',   // 아이콘이 바깥으로 나와도 보이도록
  position: 'fixed',
  bottom: 0,
});

// 채워지는 부분
const Fill = styled.div<{width: number; color: string}>(({ width, color }) => ({
  position: 'relative',               // 아이콘 absolute 기준
  height: '100%',
  width: `${width}%`,
  backgroundColor: color,
  transition: 'width 0.3s ease-in-out',

}));

// 막대 오른쪽 끝에 살짝 튀어나오게
const IconWrapper = styled.div({
  position: 'absolute',
  right: '-8px',          // 막대 오른쪽 밖으로 살짝
  top: '-25px',           // 막대 위로 빼기 (막대 높이가 10px이라 이 정도가 자연스러움)
  display: 'flex',
  alignItems: 'center',
});
