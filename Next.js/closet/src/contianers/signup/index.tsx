"use client";
import { useState } from "react";
export default function sineUp() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPhoneNum, setUserPhoneNum] = useState<string>("");

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    console.log(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(e.target.value);
    console.log(e.target.value);
  };

  const handleInputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const handleInputPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhoneNum(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    const joinData = {
      userId: userId,
      password: password,
      password2: confirmPw,
      phone_number: userPhoneNum,
      name: userName,
    };
  };
  return (
    <form
      className="flex flex-col p-4 max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-xl mb-6">회원가입</h2>
      <label
        htmlFor="userIdInput"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        아이디
      </label>
      <input
        type="text"
        id="userIdInput"
        value={userId}
        onChange={handleInputId}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label
        htmlFor="passwordInput"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        비밀번호
      </label>
      <input
        type="password"
        id="passwordInput"
        value={password}
        onChange={handleInputPassword}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label
        htmlFor="confirmPasswordInput"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        비밀번호 재확인
      </label>
      <input
        type="password"
        id="confirmPasswordInput"
        value={confirmPw}
        onChange={handleConfirmPassword}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">
        이름
      </label>
      <input
        type="text"
        id="name"
        value={userName}
        onChange={handleInputUserName}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />
      <label
        htmlFor="phone_number"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        휴대폰 번호
      </label>
      <input
        type="number"
        id="phone_number"
        value={userPhoneNum}
        onChange={handleInputPhoneNumber}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        가입하기
      </button>
    </form>
  );
}
