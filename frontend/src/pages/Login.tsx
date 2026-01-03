import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Save user + tokens using context
      login(
        res.data.user,
        res.data.accessToken,
        res.data.refreshToken
      );

      setMessage("Logged in successfully 🎉");

      if (res.data.user.role === "instructor")
        navigate("/instructor");
      else
        navigate("/");

    } catch {
      setMessage("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h1>
        <p className="text-gray-500 text-center mb-6">Login to continue</p>

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
