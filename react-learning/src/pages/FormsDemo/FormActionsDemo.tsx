import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormState {
  message: string;
  error?: string;
}

export default function FormActionsDemo() {
  const [state, setState] = useState<FormState>({ message: '' });
  const [isPending, setIsPending] = useState(false);

  // Form 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // 유효성 검사
    if (!name || name.length < 2) {
      setState({
        message: '',
        error: '이름은 2자 이상이어야 합니다.',
      });
      setIsPending(false);
      return;
    }

    if (!email || !email.includes('@')) {
      setState({
        message: '',
        error: '유효한 이메일 주소를 입력하세요.',
      });
      setIsPending(false);
      return;
    }

    // 서버 요청 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setState({
      message: `${name}님, 가입이 완료되었습니다!`,
      error: undefined,
    });
    setIsPending(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>Form Actions (React 19)</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          React 19에서는 폼 처리를 더 효율적으로 할 수 있습니다.
          비동기 작업을 쉽게 처리하고, 로딩 상태, 에러 처리를 간편하게 관리할 수 있습니다.
        </p>
        <p>
          <code>useFormStatus</code> Hook을 사용하면 폼 제출 상태를 추적할 수 있습니다.
          이를 통해 더 나은 사용자 경험을 제공할 수 있습니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제: 회원가입 폼</h2>

        <div className="example">
          <form onSubmit={handleSubmit} className="action-form">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isPending}
              />
            </div>

            <button type="submit" disabled={isPending}>
              {isPending ? '처리 중...' : '가입하기'}
            </button>

            {state.error && <p className="error-message">{state.error}</p>}
            {state.message && <p className="success-message">{state.message}</p>}
          </form>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useState } from 'react';

function SignupForm() {
  const [state, setState] = useState({ message: '' });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');

    // 유효성 검사
    if (!email.includes('@')) {
      setState({ error: '유효한 이메일을 입력하세요' });
      setIsPending(false);
      return;
    }

    // 서버 요청
    await fetch('/api/signup', {
      method: 'POST',
      body: formData
    });

    setState({ message: '가입 완료!' });
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" disabled={isPending} />
      <input name="email" type="email" disabled={isPending} />
      <button disabled={isPending}>
        {isPending ? '처리 중...' : '가입'}
      </button>
      {state.error && <p>{state.error}</p>}
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li>폼 제출 시 <code>onSubmit</code> 이벤트를 처리합니다</li>
          <li><code>isPending</code> 상태로 폼 제출 진행 상태를 관리합니다</li>
          <li><code>FormData</code>를 사용하여 폼 데이터를 수집합니다</li>
          <li>유효성 검사는 제출 전에 수행합니다</li>
          <li>비동기 작업 중에는 버튼과 입력을 비활성화합니다</li>
          <li>에러 처리와 성공 메시지를 상태로 관리합니다</li>
        </ul>

        <h3>React 19 Form 기능</h3>
        <ul>
          <li><code>useFormStatus</code>: 폼 제출 상태 확인 (부모 form의 상태)</li>
          <li><code>useOptimistic</code>: 낙관적 UI 업데이트</li>
          <li>향상된 폼 처리 및 유효성 검사</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>폼 제출 전 유효성 검사 수행</li>
          <li>비동기 작업 중 UI 비활성화</li>
          <li>사용자에게 명확한 피드백 제공</li>
          <li>에러 메시지를 명확하게 표시</li>
        </ul>
      </section>
    </div>
  );
}
