import styled from '@emotion/styled';
import { ErrorInfo, useState } from 'react';
import { Component } from 'react';
import { Button } from './components/Button/index';
import { Label } from './components/Label/index';
import { IScriptSnapshot } from 'typescript';
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
type Props = Record<string, never>;
interface State {
  readonly counter: number;
}

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }
  private sub = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter - 1,
    });
  };
  private add = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  };
  render() {
    const { counter } = this.state;

    return (
      <Container>
        <Title>Counter App</Title>
        <Contents>
          <Button label="-" onClick={this.sub}></Button>
          <Label data={counter} />
          <Button label="+" onClick={this.add}></Button>
        </Contents>
      </Container>
    );
  }
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');
    console.log('nextProps:', nextProps);
    console.log('prevState:', prevState);

    return null;
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: Readonly<State>) {
    console.log('getSnapshotBeforeUpdate');
    console.log('prevProps:', prevProps);
    console.log('prevState:', prevState);

    return {
      testData: true,
    };
  }
  componentDidUpdate(prevProps: Props, prevState: Readonly<State>, snapshot?: any): void {
    console.log('componentDidUpdate');
    console.log('prevProps:', prevProps);
    console.log('prevState:', prevState);
    console.log('snapshot:', snapshot);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    console.log('shouldComponentUpdate');
    console.log('nextProps:', nextProps);
    console.log('nextState:', nextState);
    return true;
  }
  componentWillUnmount(): void {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.log('componentDidCatch');
    console.log('error', error);
    console.log('info', info);
    // this.setState({
    // error:true,
    // })
  }
}

export default App;
