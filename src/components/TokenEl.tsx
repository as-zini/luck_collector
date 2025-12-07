import styled from "@emotion/styled"
import soo from '../assets/soo_token.png';
import { useNavigate } from "react-router-dom";

interface TokenElProps{
  img: string;
  isActive: boolean;
  setCurrentCenter: React.Dispatch<React.SetStateAction<string>>
}

const TokenEl = ({img, isActive, setCurrentCenter}:TokenElProps) => {
  const imgMap = {
    soo: soo
  }

  const navigation = useNavigate();

  const handleClick = () => {
    if(!isActive) return
    navigation(`/detail/${img}`)
  }

  const handleMouseEnter = () => {
    setCurrentCenter(img)
  }

  const handleMouseLeave = () => {
    setCurrentCenter("")
  }

  
  return (
    <TokenBody src={imgMap[img]} isActive={isActive} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></TokenBody>
  )
}

export default TokenEl

const TokenBody = styled.img<{isActive:boolean}>(({isActive}) => ({
  width:"14vw",
  height:"70vh",
  cursor:isActive ? 'pointer' : 'default',
  zIndex:999,
  margin: '0 -20px',

  "&:hover":{
    transform:`translateY(${isActive ? "-50px" : "0"})`,
  }
  
}))