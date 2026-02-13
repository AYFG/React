import { useId } from 'react';
import { Link } from 'react-router-dom';

// 재사용 가능한 Form Field 컴포넌트
function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const id = useId();

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </div>
  );
}

// 여러 개의 같은 컴포넌트 사용
function RegistrationForm() {
  return (
    <form className="registration-form">
      <h3>회원가입</h3>
      <FormField label="이름" />
      <FormField label="이메일" type="email" />
      <FormField label="비밀번호" type="password" />
      <FormField label="비밀번호 확인" type="password" />
    </form>
  );
}

// Accessibility 예제
function AccessibleCheckbox({ children }: { children: React.ReactNode }) {
  const id = useId();
  const descriptionId = `${id}-description`;

  return (
    <div className="accessible-checkbox">
      <input type="checkbox" id={id} aria-describedby={descriptionId} />
      <label htmlFor={id}>{children}</label>
      <p id={descriptionId} className="description">
        체크박스를 선택하면 약관에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}

export default function UseIdDemo() {
  const formId = useId();
  const listId = useId();

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useId Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useId</code>는 접근성 속성에 사용할 수 있는 고유한 ID를 생성하는 React 18의 Hook입니다.
        </p>
        <p>
          서버 사이드 렌더링(SSR)과 클라이언트 렌더링 간의 ID 불일치 문제를 방지합니다.
        </p>
        <p>
          리스트 항목의 <code>key</code>로는 사용하지 마세요. key는 데이터에서 생성되어야 합니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>1. 기본 사용법</h3>
          <p>생성된 ID: <code>{formId}</code></p>
          <p>다른 ID: <code>{listId}</code></p>
          <p className="hint">
            각 useId() 호출마다 고유한 ID가 생성됩니다
          </p>
        </div>

        <div className="example">
          <h3>2. Form Label 연결</h3>
          <RegistrationForm />
          <p className="hint">
            각 input과 label이 고유한 ID로 연결되어 있습니다.
            label을 클릭하면 해당 input에 포커스됩니다.
          </p>
        </div>

        <div className="example">
          <h3>3. Accessibility 속성</h3>
          <AccessibleCheckbox>
            이용약관에 동의합니다
          </AccessibleCheckbox>
          <p className="hint">
            aria-describedby 속성으로 체크박스와 설명이 연결되어 있습니다.
          </p>
        </div>

        <div className="example">
          <h3>4. 여러 관련 ID 생성</h3>
          <ExampleWithMultipleIds />
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useId } from 'react';

function FormField({ label }) {
  // 고유한 ID 생성
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

// 여러 관련 ID 생성
function PasswordField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>비밀번호</label>
      <input
        id={id}
        type="password"
        aria-describedby={\`\${id}-hint\`}
      />
      <p id={\`\${id}-hint\`}>
        8자 이상 입력하세요
      </p>
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useId()</code>는 컴포넌트 최상위에서 호출해야 합니다</li>
          <li>생성된 ID는 콜론(:)을 포함하는 문자열입니다</li>
          <li>같은 컴포넌트에서 여러 번 호출하면 각각 다른 ID를 반환합니다</li>
          <li>서버와 클라이언트에서 동일한 ID가 생성되어 hydration 오류를 방지합니다</li>
          <li>접두사나 접미사를 추가하여 관련된 여러 ID를 만들 수 있습니다</li>
          <li>리스트의 key로는 사용하지 마세요 (데이터 기반 key 사용)</li>
        </ul>

        <h3>사용하면 안 되는 경우</h3>
        <ul>
          <li>리스트의 key (데이터에서 key를 생성하세요)</li>
          <li>CSS 선택자</li>
          <li>외부 시스템과의 통합 (명시적인 ID를 props로 받으세요)</li>
        </ul>
      </section>
    </div>
  );
}

function ExampleWithMultipleIds() {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const hintId = `${baseId}-hint`;
  const errorId = `${baseId}-error`;

  return (
    <div className="password-field">
      <label htmlFor={inputId}>비밀번호</label>
      <input
        id={inputId}
        type="password"
        aria-describedby={`${hintId} ${errorId}`}
      />
      <p id={hintId} className="hint-text">
        8자 이상, 숫자 포함
      </p>
      <p id={errorId} className="error-text">
        {/* 오류 메시지 */}
      </p>
      <p className="hint">
        하나의 useId()로 여러 관련 ID를 생성할 수 있습니다
      </p>
    </div>
  );
}
