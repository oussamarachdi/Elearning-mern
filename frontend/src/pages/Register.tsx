import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [message,setMessage] = useState("");

  const register = async () => {
    try {
      await api.post("/auth/register", { name,email,password,role });
      setMessage("Account created 🎉 Redirecting...");
      setTimeout(()=>navigate("/login"),1200);
    } catch {
      setMessage("Failed to register ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-500">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[450px]">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Join the learning platform
        </p>

        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={role}
          onChange={e=>setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          onClick={register}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>

        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
