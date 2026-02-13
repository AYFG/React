import { useState, useOptimistic, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sending?: boolean;
}

// 메시지 전송 시뮬레이션 (네트워크 요청)
async function sendMessage(text: string): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        text,
      });
    }, 2000); // 2초 지연
  });
}

export default function UseOptimisticDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '안녕하세요!' },
    { id: 2, text: 'useOptimistic 테스트입니다' },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(
    messages,
    (state: Message[], newMessage: string) => [
      ...state,
      {
        id: Date.now(),
        text: newMessage,
        sending: true, // 전송 중 표시
      },
    ]
  );

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;
    if (!text.trim()) return;

    // 1. 즉시 낙관적 업데이트 (UI에 바로 표시)
    addOptimisticMessage(text);
    formRef.current?.reset();

    try {
      // 2. 실제 서버 요청
      const newMessage = await sendMessage(text);

      // 3. 성공 시 실제 메시지로 교체
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      // 4. 실패 시 에러 처리 (실제로는 낙관적 업데이트 롤백)
      alert('메시지 전송 실패!');
    }
  }

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useOptimistic Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useOptimistic</code>은 React 19에서 도입된 Hook으로, 낙관적 UI 업데이트를 구현할 수 있게 해줍니다.
        </p>
        <p>
          낙관적 업데이트란 서버 응답을 기다리지 않고 즉시 UI를 업데이트하는 것을 말합니다.
          사용자에게 즉각적인 피드백을 제공하여 더 나은 사용자 경험을 만듭니다.
        </p>
        <p>
          메시지 전송, 좋아요 누르기, 댓글 작성 등의 비동기 작업에 유용합니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제: 채팅 메시지</h2>

        <div className="example">
          <div className="chat-container">
            <div className="messages">
              {optimisticMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sending ? 'sending' : ''}`}
                >
                  {message.text}
                  {message.sending && <span className="sending-indicator">전송 중...</span>}
                </div>
              ))}
            </div>

            <form
              ref={formRef}
              action={(formData) => handleSubmit(formData)}
              className="message-form"
            >
              <input
                type="text"
                name="message"
                placeholder="메시지를 입력하세요..."
                required
              />
              <button type="submit">전송</button>
            </form>
          </div>

          <p className="hint">
            💡 메시지를 전송하면 즉시 화면에 표시되고 "전송 중..." 표시가 나타납니다.
            2초 후 실제 전송이 완료됩니다.
          </p>
        </div>

        <div className="example">
          <h3>비교: 일반 vs 낙관적 업데이트</h3>
          <ComparisonExample />
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useState, useOptimistic } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);

  // useOptimistic(실제 상태, 업데이트 함수)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      { text: newMessage, sending: true }
    ]
  );

  async function sendMessage(text) {
    // 1. 즉시 낙관적 업데이트
    addOptimisticMessage(text);

    // 2. 서버 요청
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ text })
    });

    // 3. 성공 시 실제 데이터로 교체
    const newMessage = await response.json();
    setMessages(prev => [...prev, newMessage]);
  }

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div key={msg.id}>
          {msg.text}
          {msg.sending && <Spinner />}
        </div>
      ))}
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useOptimistic(state, updateFn)</code>은 [낙관적 상태, 업데이트 함수]를 반환합니다</li>
          <li>업데이트 함수를 호출하면 즉시 UI가 업데이트됩니다</li>
          <li>비동기 작업(transition)이 완료되면 실제 상태로 자동 전환됩니다</li>
          <li>실패 시 자동으로 이전 상태로 롤백되지 않으므로 에러 처리가 필요합니다</li>
          <li>React 19의 Form Actions와 함께 사용하면 더욱 강력합니다</li>
        </ul>

        <h3>사용 시나리오</h3>
        <ul>
          <li>채팅 메시지 전송</li>
          <li>좋아요/북마크 토글</li>
          <li>댓글 작성</li>
          <li>항목 추가/삭제</li>
          <li>설정 변경</li>
        </ul>

        <h3>주의사항</h3>
        <ul>
          <li>낙관적 업데이트는 대부분 성공할 것으로 예상되는 작업에만 사용하세요</li>
          <li>실패 시 사용자에게 명확한 피드백을 제공하세요</li>
          <li>중요한 작업(결제 등)에는 신중하게 사용하세요</li>
        </ul>
      </section>
    </div>
  );
}

// 비교 예제 컴포넌트
function ComparisonExample() {
  const [count, setCount] = useState(0);
  const [optimisticCount, setOptimisticCount] = useOptimistic<number, void>(
    count
  );
  const [isLoading, setIsLoading] = useState(false);

  async function incrementNormal() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCount((c) => c + 1);
    setIsLoading(false);
  }

  async function incrementOptimistic() {
    setOptimisticCount(count + 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCount((c) => c + 1);
  }

  return (
    <div className="comparison">
      <div className="comparison-item">
        <h4>일반 업데이트</h4>
        <p>카운트: {count}</p>
        <button onClick={incrementNormal} disabled={isLoading}>
          {isLoading ? '처리 중...' : '+1 (1초 후 업데이트)'}
        </button>
      </div>

      <div className="comparison-item">
        <h4>낙관적 업데이트</h4>
        <p>카운트: {optimisticCount}</p>
        <button onClick={incrementOptimistic}>
          +1 (즉시 업데이트)
        </button>
      </div>
    </div>
  );
}
