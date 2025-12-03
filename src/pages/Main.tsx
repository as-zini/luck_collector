import styled from "@emotion/styled";
import TokenSlider from "../components/Slider";


const Main = () => {
  const defaultText = "글자가 만들어진 과정을 볼 수 있어요!\n궁금한 글자를 선택해보세요!";

  return (
    <Container>
      <Text>{defaultText}</Text>
        <TokenSlider/>
    </Container>
  );
};

export default Main;

const Container = styled.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: '#000',
});

const Text = styled.p({
  color: '#fff',
  fontSize: 20,
  lineHeight: 1.5,
  marginBottom: 50,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  position:'fixed',
  top:30
});