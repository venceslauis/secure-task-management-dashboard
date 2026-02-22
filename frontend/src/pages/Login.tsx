import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await api.post("/auth/register", { email, password });
      }

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error: unknown) {
      // Safely narrow Axios error
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Invalid credentials or user already exists";
        setError(message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-10 rounded-2xl w-96 shadow-xl"
      >
        <h2 className="text-2xl text-white mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-gray-950 border border-gray-800 focus:outline-none focus:border-blue-500 transition text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-medium"
        >
          {isRegister ? "Register & Login" : "Login"}
        </button>

        <p
          className="text-gray-400 text-sm mt-4 text-center cursor-pointer hover:text-white"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
}

export default Login;
