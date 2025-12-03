import styled from "@emotion/styled"
import soo from '../assets/soo_token.png';

const TokenEl = ({img}:{img: string}) => {
  const imgMap = {
    soo: soo
  }
  return (
    <TokenBody src={imgMap[img]}></TokenBody>
  )
}

export default TokenEl

const TokenBody = styled.img({
  width:"14vw",
  height:"70vh",
  cursor:'pointer',
  zIndex:999,
  margin: '0 -20px',

  "&:hover":{
    transform:"translateY(-50px)",
  }
  
})