"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://openmarket.weniv.co.kr/accounts/login/",
        {
          id,
          password,
        }
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    console.log(id);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg"
      >
        <span className="block text-xl mb-4 font-semibold text-gray-800">
          Login
        </span>
        <label
          htmlFor="loginId"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          ID
        </label>
        <input
          type="text"
          onChange={handleId}
          id="loginId"
          className="border border-gray-300 p-2 mb-4 rounded-lg"
        />
        <label
          htmlFor="loginPassword"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          onChange={handlePassword}
          id="loginPassword"
          className="border border-gray-300 p-2 mb-6 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          로그인
        </button>
        <Link
          href="/signup"
          className="mt-4 text-center text-sm text-blue-500 hover:underline"
        >
          회원가입
        </Link>
      </form>
    </>
  );
}
