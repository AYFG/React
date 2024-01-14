import styled from "@emotion/styled";
import { Title } from "Components/Title";
import { ToDoList } from "Components/ToDoList";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

function App() {
  return (
    <Container>
      <Title label="할 일 목록" />
      <ToDoList toDoList={["리액트 공부하기", "운동하기", "책읽기"]} />
    </Container>
  );
}

export default App;
