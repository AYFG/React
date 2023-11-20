import React from "react";

import logo from "./logo.svg";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import "./index.css";

const Container = styled.div`
  text-align: center;
`;
const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
    
  `;
const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spinAnimation} infinite 2s linear;
  }
`;
const AppLink = styled.a`
  color: #61dafb;
`;
function App() {
  return (
    // <div className="App">
    <Container>
      {/* <header className="App-header"> */}
      <Header>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <AppLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </Header>
      {/* </header> */}
    </Container>
    // </div>
  );
}

export default App;
