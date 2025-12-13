import styled from "@emotion/styled"
import soo from '../assets/soo_token.png';
import sae from '../assets/sae_token.png';
import yeon from '../assets/yeon_token.png';
import sang from '../assets/sang_token.png';
import eun from '../assets/eun_token.png';
import ga from '../assets/ga_token.png';
import yea from '../assets/yea_token.png';
import tae from '../assets/tae_token.png';
import na from '../assets/na_token.png';
import seon from '../assets/seon_token.png';
import hoon from '../assets/hoon_token.png';
import hyeon from '../assets/hyeon_token.png';
import seung from '../assets/seung_token.png';
import rim from '../assets/rim_token.png';
import lee from '../assets/lee_token.png';
import hak from '../assets/hak_token.png';
import gee from '../assets/gee_token.png';
import wook from '../assets/wook_token.png';
import jin from '../assets/jin_token.png';
import yoon from '../assets/yoon_token.png';
import { useNavigate } from "react-router-dom";
import { pageNum } from "../constants";

interface TokenElProps{
  img: string;
  isActive: boolean;
  setCurrentCenter: React.Dispatch<React.SetStateAction<string>>;
  originalIndex: number;
}

const TokenEl = ({img, isActive, setCurrentCenter, originalIndex}:TokenElProps) => {
  const imgMap: Record<string, string> = {
    soo: soo,
    sae: sae,
    yeon: yeon,
    sang: sang,
    eun: eun,
    ga: ga,
    yea: yea,
    tae: tae,
    na: na,
    seon: seon,
    hoon: hoon,
    hyeon: hyeon,
    seung: seung,
    rim: rim,
    lee: lee,
    hak: hak,
    gee: gee,
    wook: wook,
    jin: jin,
    yoon: yoon,
  }

  const navigation = useNavigate();

  const handleClick = () => {
    if(!pageNum[img]) return
    navigation(`/detail/${img}`, {
      state: { tokenIndex: originalIndex },
    });
  }

  const handleMouseEnter = () => {
    setCurrentCenter(img)
  }

  const handleMouseLeave = () => {
    setCurrentCenter("")
  }

  
  return (
    <TokenBody src={imgMap[img]} img={img} isActive={isActive} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></TokenBody>
  )
}

export default TokenEl

const TokenBody = styled.img<{isActive:boolean, img:string}>(({img}) => ({
  width:"15vw",
  height:"70vh",
  cursor:pageNum[img] ? 'pointer' : 'default',
  zIndex:999,
  margin: '0 -20px',

  "&:hover":{
    transform:`translateY(-50px)`,
  }
  
}))