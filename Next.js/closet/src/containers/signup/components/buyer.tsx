import { updateUserData } from "./updateUserData";
import { UserData } from "./type";

export default function Buyer({ userData, setUserData }: UserData) {
  return (
    <>
      <label
        htmlFor="username"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        아이디
      </label>
      <input
        type="text"
        id="username"
        value={userData.user.username}
        onChange={(e) => updateUserData(e, setUserData)}
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
        id="password"
        value={userData.user.password}
        onChange={(e) => updateUserData(e, setUserData)}
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
        id="password2"
        value={userData.user.password2}
        onChange={(e) => updateUserData(e, setUserData)}
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
        value={userData.user.phone_number}
        onChange={(e) => updateUserData(e, setUserData)}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">
        이름
      </label>
      <input
        type="text"
        id="name"
        value={userData.user.name}
        onChange={(e) => updateUserData(e, setUserData)}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />
      <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">
        사업자 등록번호
      </label>
      <input
        type="text"
        id="company_registration_number"
        value={userData.user.company_registration_number}
        onChange={(e) => updateUserData(e, setUserData)}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />
      <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">
        스토어 이름
      </label>
      <input
        type="text"
        id="store_name"
        value={userData.user.store_name}
        onChange={(e) => updateUserData(e, setUserData)}
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        가입하기
      </button>
    </>
  );
}
