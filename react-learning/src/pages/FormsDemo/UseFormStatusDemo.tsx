import { useState } from 'react';
import { Link } from 'react-router-dom';

// SubmitButton 컴포넌트
function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button type="submit" disabled={isPending} className="submit-button">
      {isPending ? '전송 중...' : '메시지 보내기'}
    </button>
  );
}

// Form 상태를 표시하는 컴포넌트
function FormStatusIndicator({
  isPending,
  message,
}: {
  isPending: boolean;
  message: string;
}) {
  return (
    <div className="form-status">
      <p>상태: {isPending ? '⏳ 전송 중' : '✅ 대기 중'}</p>
      {isPending && message && (
        <p className="hint">전송할 메시지: "{message}"</p>
      )}
    </div>
  );
}

export default function UseFormStatusDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Form 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (!message.trim()) return;

    setIsPending(true);
    setInputValue(message);

    // 서버 요청 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMessages((prev) => [...prev, message]);
    setIsPending(false);
    setInputValue('');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useFormStatus Hook (React 19)</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useFormStatus</code>는 부모 <code>&lt;form&gt;</code>의 상태 정보를 제공하는 React 19의 Hook입니다.
        </p>
        <p>
          이 Hook은 반드시 <code>&lt;form&gt;</code> 요소의 자식 컴포넌트에서 호출되어야 합니다.
          폼이 제출 중인지, 어떤 데이터가 전송되는지 등의 정보를 확인할 수 있습니다.
        </p>
        <p>
          Submit 버튼의 로딩 상태를 표시하거나, 폼 제출 중 UI를 비활성화하는 데 유용합니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제: 메시지 전송</h2>

        <div className="example">
          <form onSubmit={handleSubmit} className="message-form">
            <FormStatusIndicator isPending={isPending} message={inputValue} />

            <div className="form-group">
              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="메시지를 입력하세요..."
                rows={4}
                disabled={isPending}
              />
            </div>

            <SubmitButton isPending={isPending} />
          </form>

          <div className="messages-list">
            <h3>전송된 메시지</h3>
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
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useFormStatus } from 'react';

// Form 내부의 컴포넌트에서만 사용 가능
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '전송 중...' : '전송'}
    </button>
  );
}

function MyForm() {
  return (
    <form action={submitAction}>
      <input name="username" />

      {/* useFormStatus는 이 안에서 호출해야 함 */}
      <SubmitButton />
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
          <li><code>pending</code>: 폼이 제출 중이면 true, 아니면 false</li>
          <li><code>data</code>: 전송 중인 FormData 객체 (제출 중이 아니면 null)</li>
          <li><code>method</code>: 'get' 또는 'post' (기본값은 'get')</li>
          <li><code>action</code>: form의 action prop에 전달된 함수 참조</li>
        </ul>

        <h3>주요 포인트</h3>
        <ul>
          <li>반드시 <code>&lt;form&gt;</code>의 자식 컴포넌트에서만 호출해야 합니다</li>
          <li>같은 <code>&lt;form&gt;</code> 내의 부모나 형제 컴포넌트의 상태는 제공하지 않습니다</li>
          <li>중첩된 폼의 경우 가장 가까운 부모 폼의 상태를 반환합니다</li>
          <li>폼 전체가 아닌 개별 버튼의 상태가 필요하면 <code>formAction</code>을 사용하세요</li>
        </ul>

        <h3>사용 시나리오</h3>
        <ul>
          <li>Submit 버튼에 로딩 스피너 표시</li>
          <li>폼 제출 중 input 필드 비활성화</li>
          <li>전송 중인 데이터 미리보기</li>
          <li>폼 제출 상태에 따른 UI 변경</li>
        </ul>
      </section>
    </div>
  );
}
