import styled from '@emotion/styled';
import TokenEl from '../components/TokenEl';

const Main = () => {
  const tokenArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  return (
    <Container>
      <Text>

      </Text>
      <TokenContainer>
        {tokenArr.map((item)=>(
          <TokenEl key={item} />
        ))}
      </TokenContainer>
    </Container>
  )
}

export default Main

const Container = styled.div({
  width:'100vw',
  height:'100vh',
  background:'black',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
})

const TokenContainer = styled.div({
  display:'flex',
  gap:200,
  alignItems:'center'
})

const Text = styled.span({
  fontSize:60,
  lineHeight: 90,
  textAlign:'center',
  marginTop:130,
})