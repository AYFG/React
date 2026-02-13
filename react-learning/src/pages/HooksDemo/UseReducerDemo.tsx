import { useReducer } from 'react';
import { Link } from 'react-router-dom';

// 상태 타입 정의
interface State {
  count: number;
  todos: string[];
  inputValue: string;
}

// 액션 타입 정의
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'ADD_TODO' }
  | { type: 'REMOVE_TODO'; payload: number };

// Reducer 함수
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload };
    case 'ADD_TODO':
      if (!state.inputValue.trim()) return state;
      return {
        ...state,
        todos: [...state.todos, state.inputValue],
        inputValue: '',
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
}

// 초기 상태
const initialState: State = {
  count: 0,
  todos: [],
  inputValue: '',
};

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useReducer Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useReducer</code>는 복잡한 상태 로직을 관리하는 Hook입니다.
        </p>
        <p>
          여러 개의 하위 값을 포함하는 복잡한 상태나, 다음 상태가 이전 상태에 의존적인 경우에 useState보다 useReducer를 선호합니다.
        </p>
        <p>
          Redux의 reducer와 같은 패턴을 사용하여 상태 업데이트 로직을 컴포넌트 외부로 분리할 수 있습니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>1. 카운터 (복수의 액션)</h3>
          <p>현재 카운트: {state.count}</p>
          <div className="button-group">
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
            <button onClick={() => dispatch({ type: 'RESET' })}>초기화</button>
          </div>
        </div>

        <div className="example">
          <h3>2. Todo 리스트</h3>
          <div className="todo-input">
            <input
              type="text"
              value={state.inputValue}
              onChange={(e) =>
                dispatch({ type: 'SET_INPUT', payload: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  dispatch({ type: 'ADD_TODO' });
                }
              }}
              placeholder="할 일을 입력하세요"
            />
            <button onClick={() => dispatch({ type: 'ADD_TODO' })}>추가</button>
          </div>

          <ul className="todo-list">
            {state.todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_TODO', payload: index })
                  }
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
          {state.todos.length === 0 && <p>할 일이 없습니다.</p>}
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useReducer } from 'react';

// Reducer 함수: (현재상태, 액션) => 새로운상태
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  // useReducer(reducer함수, 초기상태)
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        증가
      </button>
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useReducer(reducer, initialState)</code>는 [현재 상태, dispatch 함수]를 반환합니다</li>
          <li>Reducer는 순수 함수여야 합니다 (같은 입력에 항상 같은 출력)</li>
          <li><code>dispatch(action)</code>으로 액션을 전달하여 상태를 업데이트합니다</li>
          <li>useState 대비 장점: 복잡한 상태 로직을 컴포넌트 외부로 분리, 테스트 용이</li>
          <li>여러 하위 값을 포함하는 복잡한 상태에 적합합니다</li>
        </ul>
      </section>
    </div>
  );
}
