import styled from '@emotion/styled';
import { useState } from 'react';
import { Button } from './components/Button/index';
import { Label } from './components/Label/index';
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin-bottom: 32px;
`;
const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
// const Label = styled.span`
//   margin: 0 16px;
//   font-size: 1.2rem;
// `;
// const Button = styled.button`
//   border: 0;
//   color: #ffffff;
//   background-color: #ff5722;
//   cursor: pointer;
//   padding: 8px 16px;
//   border-radius: 4px;
//   &:hover {
//     background-color: #ff5722;
//     opacity: 0.8;
//   }
//   &:active {
//     box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
//   }
// `;

function App() {
  const [counter, setCounter] = useState(0);
  const sub = () => {
    setCounter(counter - 1);
  };
  const add = () => {
    setCounter(counter + 1);
  };

  return (
    <Container>
      <Title>Counter App</Title>
      <Contents>
        <Button label="-" onClick={sub}></Button>
        {/* <Label>{counter}</Label> */}
        <Label data={counter} />
        <Button label="+" onClick={add}></Button>
      </Contents>
    </Container>
  );
}

export default App;
