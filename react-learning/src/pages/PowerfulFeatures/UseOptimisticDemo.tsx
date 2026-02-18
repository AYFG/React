import { useOptimistic, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UseOptimisticDemo() {
  const [messages, setMessages] = useState<Array<{ id: number; text: string }>>(
    []
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { id: Date.now(), text: newMessage },
    ]
  );

  const sendMessage = async (formData: FormData) => {
    const message = formData.get('message') as string;

    // 낙관적 업데이트: 즉시 UI에 표시
    addOptimisticMessage(message);

    // 서버 요청 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 서버 응답 후 실제 업데이트
    setMessages((prev) => [...prev, { id: Date.now(), text: message }]);
  };

  return (
    <div className="demo-page">
      <Link to="/powerful-features" className="back-link">
        ← 뒤로 가기
      </Link>

      <h1>✨ useOptimistic - 낙관적 UI 업데이트</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          사용자 액션에 즉시 UI를 업데이트하고, 서버 응답 후 자동으로 동기화합니다.
        </p>
        <ul>
          <li>
            <strong>즉시</strong>: UI에 변경 사항 표시
          </li>
          <li>
            <strong>비동기</strong>: 백그라운드에서 서버 요청
          </li>
          <li>
            <strong>자동 동기화</strong>: 응답 후 실제 데이터로 업데이트
          </li>
        </ul>
      </section>

      <section className="demo">
        <h2>예제: 메시지 전송</h2>
        <p>메시지 전송 버튼을 누르면 즉시 표시되고, 서버 응답 후 확정됩니다.</p>

        <div className="example">
          <form
            action={sendMessage}
            className="message-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              sendMessage(formData);
              e.currentTarget.reset();
            }}
          >
            <input
              type="text"
              name="message"
              placeholder="메시지를 입력하세요..."
              className="message-input"
            />
            <button type="submit">전송</button>
          </form>

          <div className="messages-container">
            <h3>메시지 목록</h3>
            {optimisticMessages.length === 0 ? (
              <p className="empty">아직 메시지가 없습니다.</p>
            ) : (
              <ul className="messages-list">
                {optimisticMessages.map((msg) => (
                  <li
                    key={msg.id}
                    className={
                      messages.some((m) => m.id === msg.id)
                        ? 'confirmed'
                        : 'optimistic'
                    }
                  >
                    {msg.text}
                    {!messages.some((m) => m.id === msg.id) && (
                      <span className="badge">전송 중...</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useOptimistic } from 'react';

function MessageList() {
  const [messages, setMessages] = useState([]);

  // useOptimistic: 낙관적 상태 추적
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    // reducer 함수: 낙관적 업데이트 정의
    (state, newMessage) => [
      ...state,
      { id: Date.now(), text: newMessage }
    ]
  );

  const sendMessage = async (formData) => {
    const message = formData.get('message');

    // 1. UI에 즉시 표시
    addOptimisticMessage(message);

    // 2. 서버에 요청
    await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ message })
    });

    // 3. 실제 데이터 업데이트
    setMessages(prev => [...prev, { id: Date.now(), text: message }]);
  };

  return (
    <>
      <form action={sendMessage}>
        <input name="message" />
        <button type="submit">전송</button>
      </form>

      {/* optimisticMessages: 낙관적 업데이트 포함 */}
      <ul>
        {optimisticMessages.map(msg => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </>
  );
}`}