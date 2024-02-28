export default function sineUp({ response }: { response: any }) {
  return (
    <form className="flex flex-col p-4 max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <label
        htmlFor="username"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label
        htmlFor="password"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label
        htmlFor="password2"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Confirm Password
      </label>
      <input
        type="password"
        id="password2"
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label
        htmlFor="phone_number"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Phone Number
      </label>
      <input
        type="number"
        id="phone_number"
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="border border-gray-300 p-2 mb-4 rounded-lg"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        Sign Up
      </button>
    </form>
  );
}
