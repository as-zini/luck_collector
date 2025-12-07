// BouncingBall.tsx
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import CloverIcon from "./CloverIcon";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-50px) scale(1.02, 0.98);
  }
  70% {
    transform: translateY(0) scale(1.1, 0.9);
  }
`;

const Ground = styled.div({
  position: "relative",
  width: "200px",
  height: "200px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
});

const Ball = styled.div({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  animation: `${bounce} 1s infinite ease-in-out`,
});

export default function BouncingBall() {
  return (
    <Ground>
      <Ball>
        <CloverIcon color={"#fff"} size={28}/>
      </Ball>
    </Ground>
  );
}
