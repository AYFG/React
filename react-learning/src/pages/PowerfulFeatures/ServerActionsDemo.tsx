import { useState } from 'react';
import { Link } from 'react-router-dom';

// Server Action 시뮬레이션 (실제로는 'use server' 지시어가 필요)
async function addTodoAction(formData: FormData) {
  const title = formData.get('title') as string;

  // 서버에서 처리
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: Date.now(),
    title,
    completed: false,
  };
}

export default function ServerActionsDemo() {
  const [todos, setTodos] = useState<
    Array<{ id: number; title: string; completed: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTodo = async (formData: FormData) => {
    setIsLoading(true);
    try {
      // 서버 액션 호출 (form action과 동일)
      const newTodo = await addTodoAction(formData);
      setTodos((prev) => [...prev, newTodo]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="demo-page">
      <Link to="/powerful-features" className="back-link">
        ← 뒤로 가기
      </Link>

      <h1>🚀 Server Actions - 직접 서버 함수 호출</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          클라이언트에서 직접 서버 함수를 호출할 수 있습니다.
          REST API나 GraphQL을 따로 만들 필요가 없습니다.
        </p>
        <ul>
          <li>
            <strong>간단함</strong>: 함수를 정의하고 호출하기만 하면 됨
          </li>
          <li>
            <strong>타입 안정</strong>: 클라이언트와 서버의 타입이 동기화
          </li>
          <li>
            <strong>자동 직렬화</strong>: FormData, JSON 자동 처리
          </li>
        </ul>
      </section>

      <section className="demo">
        <h2>예제: Todo 앱</h2>
        <p>서버 액션으로 Todo를 추가합니다. API 엔드포인트가 필요 없습니다!</p>

        <div className="example">
          <form
            action={handleAddTodo}
            className="todo-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddTodo(formData);
              e.currentTarget.reset();
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="새로운 Todo를 입력하세요..."
              className="todo-input"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '추가 중...' : '추가'}
            </button>
          </form>

          <div className="todos-container">
            <h3>Todo 목록</h3>
            {todos.length === 0 ? (
              <p className="empty">Todo가 없습니다. 추가해보세요!</p>
            ) : (
              <ul className="todos-list">
                {todos.map((todo) => (
                  <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span>{todo.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="comparison">
        <h2>Server Actions vs REST API</h2>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>Server Actions</th>
              <th>REST API</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>엔드포인트 정의</td>
              <td>❌ 필요 없음</td>
              <td>✅ 필요함</td>
            </tr>
            <tr>
              <td>클라이언트 코드</td>
              <td>간단</td>
              <td>복잡</td>
            </tr>
            <tr>
              <td>타입 안정성</td>
              <td>✅ 완벽</td>
              <td>⚠️ 수동</td>
            </tr>
            <tr>
              <td>배열/객체 전달</td>
              <td>자동</td>
              <td>JSON 직렬화</td>
            </tr>
            <tr>
              <td>학습 곡선</td>
              <td>낮음</td>
              <td>높음</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`// 서버 파일 (app/actions.ts)
'use server'; // ← 서버 액션 지시어

export async function addTodoAction(formData: FormData) {
  const title = formData.get('title') as string;

  // 서버에서만 실행됨
  const db = await getDatabase();
  const todo = await db.todos.create({ title });

  return todo;
}

// 클라이언트 컴포넌트
import { addTodoAction } from '@/app/actions';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async (formData: FormData) => {
    // 서버 액션 직접 호출
    const newTodo = await addTodoAction(formData);
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <form action={handleAddTodo}>
      <input name="title" placeholder="Todo 입력..." />
      <button type="submit">추가</button>
    </form>
  );
}`}