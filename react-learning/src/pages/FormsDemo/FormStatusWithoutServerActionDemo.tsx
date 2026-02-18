import { useState } from 'react';

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

export default function FormStatusWithoutServerActionDemo() {
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
    <div className="example">
      <h3>❌ useState만 사용 (React 18 이전)</h3>
      <p>
        Hook 없이 수동으로 상태를 관리합니다. props 전달 필요, 코드량 증가.
      </p>

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

      <details>
        <summary>코드 보기</summary>
        <pre>{`import { useState } from 'react';

function SubmitButton({ isPending }) {
  return (
    <button disabled={isPending}>
      {isPending ? '전송 중...' : '전송'}
    </button>
  );
}

function MyForm() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true); // ← 수동으로 설정

    await fetch('/api/submit', {
      method: 'POST',
      body: new FormData(e.target)
    });

    setIsPending(false); // ← 수동으로 해제
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="message" />

      {/* props로 상태 전달 필요 */}
      <SubmitButton isPending={isPending} />
    </form>
  );
}`}</pre>
      </details>
    </div>
  );
}
