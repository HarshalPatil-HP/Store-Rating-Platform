import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { showErrorQueue } from "../utils/showErrorQueue";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data.data;
      login(token, user);
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "store_owner") navigate("/owner/dashboard");
      else navigate("/stores");
    } catch (err) {
       showErrorQueue(err, "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-[3px] border-[#1C1917] rounded-lg p-8 w-full max-w-md shadow-[4px_4px_0px_#1C1917]"
      >
        <h2 className="font-[Archivo_Black] text-3xl mb-6">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={5}
          maxLength={40}
          className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password (8–16 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={5}
          maxLength={16}
          className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-6"
          required
        />
        <button type="submit" className="btn-brutal w-full">Login</button>
        <p className="mt-4 text-sm">
            No account? <Link to="/signup" className="underline">Sign up</Link> · <Link to="/" className="underline font-bold ">Home</Link>
        </p>
      </form>
    </div>
  );
}