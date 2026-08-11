import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { showErrorQueue } from "../utils/showErrorQueue";
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
       showErrorQueue(err, "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-[3px] border-[#1C1917] rounded-lg p-8 w-full max-w-md shadow-[4px_4px_0px_#1C1917]"
      >
        <h2 className="font-[Archivo_Black] text-3xl mb-6">Sign Up</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input name="name" placeholder="Full Name (5–40 chars)" onChange={handleChange} minLength={5} maxLength={40} className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-4" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} minLength={5} maxLength={40} className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-4" required />
        <input name="address" placeholder="Address (5–40 chars)" onChange={handleChange} minLength={5} maxLength={40} className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-4" required />
        <input name="password" type="password" placeholder="Password (8–16 chars)" onChange={handleChange} minLength={5} maxLength={16} className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-6" required />
        <button type="submit" className="btn-brutal w-full">Sign Up</button>
        <p className="mt-4 text-sm">
            Already have an account? <Link to="/login" className="underline">Login</Link> · <Link to="/" className="underline font-bold  ">Home</Link>
        </p>
      </form>
    </div>
  );
}