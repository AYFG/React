import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormStatusWithoutServerActionDemo from './FormStatusWithoutServerActionDemo';

// Server Action 시뮬레이션
async function submitMessage(formData: FormData) {
  const message = formData.get('message') as string;

  if (!message.trim()) {
    throw new Error('메시지를 입력하세요');
  }

  // 서버 요청 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    message: `메시지 전송 완료: "${message}"`,
  };
}

// SubmitButton 컴포넌트 - Form 내부에서만 사용 가능
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="submit-button">
      {pending ? '전송 중...' : '메시지 보내기'}
    </button>
  );
}

// Form 상태를 표시하는 컴포넌트 - Form 내부에서만 사용 가능
function FormStatusIndicator() {
  const { pending, data } = useFormStatus();
  const message = data?.get('message') as string | undefined;

  return (
    <div className="form-status">
      <p>상태: {pending ? '⏳ 전송 중' : '✅ 대기 중'}</p>
      {pending && message && (
        <p className="hint">전송할 메시지: "{message}"</p>
      )}
    </div>
  );
}

function UseFormStatusExample() {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form Action 핸들러
  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      setSuccess(null);

      const result = await submitMessage(formData);

      if (result.success) {
        const message = formData.get('message') as string;
        setMessages((prev) => [...prev, message]);
        setSuccess(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류 발생');
    }
  };

  return (
    <div className="example">
      <h3>✅ useFormStatus 사용 (React 19)</h3>
      <p>
        Hook이 자동으로 폼 상태를 추적합니다. props 전달 불필요, FormData 자동 접근.
      </p>

      <form action={handleSubmit} className="message-form">
        <FormStatusIndicator />

        <div className="form-group">
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="메시지를 입력하세요..."
            rows={4}
          />
        </div>

        <SubmitButton />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>

      <div className="messages-list">
        <h4>전송된 메시지</h4>
        {messages.length === 0 ? (
          <p>아직 메시지가 없습니다.</p>
        ) : (
          <ul>
            {messages.map((msg: string, index: number) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function UseFormStatusDemo() {
  return (
    <div className="demo-page">
      <Link to="/" className="back-link">
        ← 홈으로
      </Link>

      <h1>useFormStatus Hook (React 19)</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useFormStatus</code>는 React 19에서 폼 제출 상태를 추적하는 Hook입니다.
        </p>
        <p>
          <strong>중요:</strong> 이 Hook은 반드시{' '}
          <code>&lt;form&gt;</code> 요소의 자식 컴포넌트에서만 호출할 수 있습니다.
          부모 form의 상태 정보를 제공합니다.
        </p>
        <p>
          폼이 제출 중인지, 어떤 데이터가 전송되는지 등의 정보를 자동으로 확인할
          수 있습니다.
        </p>
      </section>

      <section className="demo">
        <h2>두 가지 방식 비교</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <UseFormStatusExample />
          <FormStatusWithoutServerActionDemo />
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useFormStatus } from 'react-dom';

// Form 내부의 컴포넌트에서만 사용 가능
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '전송 중...' : '전송'}
    </button>
  );
}

function FormStatusDisplay() {
  const { pending, data } = useFormStatus();

  // data는 전송 중인 FormData 객체
  const message = data?.get('message');

  return (
    <div>
      {pending && <p>상태: 전송 중...</p>}
      {pending && message && <p>메시지: {message}</p>}
    </div>
  );
}

function MyForm() {
  const handleSubmit = async (formData) => {
    // 서버 요청 처리
    await fetch('/api/submit', { method: 'POST', body: formData });
  };

  return (
    <form action={handleSubmit}>
      <input name="message" />

      {/* useFormStatus는 이 안에서만 호출 가능 */}
      <SubmitButton />
      <FormStatusDisplay />
    </form>
  );
}

// ❌ 잘못된 사용
function MyForm() {
  // 여기서는 useFormStatus를 호출할 수 없음
  const { pending } = useFormStatus(); // Error!

  return <form>...</form>;
}`}</pre>

        <h3>반환 값</h3>
        <ul>
          <li>
            <code>pending</code>: boolean - 폼이 제출 중이면 true
          </li>
          <li>
            <code>data</code>: FormData | null - 전송 중인 FormData 객체
          </li>
          <li>
            <code>method</code>: string - 'get' 또는 'post'
          </li>
          <li>
            <code>action</code>: function - form의 action prop에 전달된 함수
          </li>
        </ul>

        <h3>주요 포인트</h3>
        <ul>
          <li>
            ✅ 반드시 <code>&lt;form&gt;</code>의 자식 컴포넌트에서만 호출
          </li>
          <li>
            ✅ 같은 form 내의 부모나 형제 컴포넌트의 상태를 추적
          </li>
          <li>
            ✅ 중첩된 폼의 경우 가장 가까운 부모 폼의 상태 반환
          </li>
          <li>
            ❌ Form 외부에서 호출 시 에러 발생
          </li>
        </ul>

        <h3>실제 사용 시나리오</h3>
        <ul>
          <li>✅ Submit 버튼에 로딩 스피너 표시</li>
          <li>✅ 폼 제출 중 input 필드 자동 비활성화</li>
          <li>✅ 전송 중인 데이터 미리보기</li>
          <li>✅ 폼 제출 상태에 따른 UI 변경</li>
          <li>✅ 중복 제출 방지</li>
        </ul>

        <h3>useFormStatus vs useState 비교</h3>
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>기능</th>
              <th>useFormStatus</th>
              <th>useState</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>자동 추적</td>
              <td>✅ 자동</td>
              <td>❌ 수동 설정</td>
            </tr>
            <tr>
              <td>props 전달</td>
              <td>❌ 불필요</td>
              <td>✅ 필요</td>
            </tr>
            <tr>
              <td>FormData 접근</td>
              <td>✅ 제공</td>
              <td>❌ 별도 처리</td>
            </tr>
            <tr>
              <td>코드량</td>
              <td>✅ 적음</td>
              <td>❌ 많음</td>
            </tr>
            <tr>
              <td>Server Action</td>
              <td>✅ 완벽 지원</td>
              <td>⚠️ 별도 처리</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
