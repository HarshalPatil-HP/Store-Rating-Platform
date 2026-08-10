import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-[Archivo_Black] text-5xl md:text-7xl mb-4">
        Rate Stores. <span className="text-[#D97706]">Honestly.</span>
      </h1>
      <p className="text-lg max-w-xl mb-10">
        A platform where your voice shapes real store ratings — sign up and start rating.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/login" className="btn-brutal">Login</Link>
        <Link to="/signup" className="btn-brutal">Sign Up</Link>
        <Link to="/manual" className="relative btn-brutal bg-white text-[#1C1917]">
          📖 User Manual
          <span className="absolute -top-2 -right-2 bg-[#D97706] text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
            New
          </span>
        </Link>
      </div>
    </div>
  );
}