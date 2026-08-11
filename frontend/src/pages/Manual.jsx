import { Link } from "react-router-dom";
import { useState } from "react";

const sections = [
  {
    icon: "🙋",
    role: "Normal User",
    color: "#D97706",
    points: [
      "Sign up with your name, email, address & password",
      "Browse all registered stores on the platform",
      "Search stores by name or address",
      "Rate any store from 1 to 5 stars",
      "Change your rating anytime — just click a new star",
      "Update your password from your account",
    ],
  },
  {
    icon: "🏪",
    role: "Store Owner",
    color: "#166534",
    points: [
      "Your account is created by an Admin — you can't sign up yourself",
      "Log in to see your store's average rating",
      "View the full list of users who rated your store",
      "Track how your rating changes over time",
      "Small gift for you if you are reading this",
      "giftbydeveloper@gmail.com  Gift@123",
    ],
  },
  {
    icon: "🛡️",
    role: "Admin",
    color: "#7C2D12",
    points: [
      "See platform-wide stats: total users, stores & ratings",
      "Add new users — assign them Normal, Admin, or Store Owner role",
      "Add new stores and optionally assign a Store Owner to them",
      "View & filter all users and stores",
      "Special gift for you if you are reading this",
      "admin@test.com  Admin@1234"
    ],
  },
];

export default function Manual() {
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link to="/" className="underline font-bold">← Home</Link>

      <h1 className="font-[Archivo_Black] text-4xl md:text-5xl mt-6 mb-3">
        How This Works
      </h1>
      <p className="text-lg mb-10">
        Three roles, one platform. Tap a card to see what you can do.
      </p>

      <div className="grid gap-4">
        {sections.map((s, i) => (
          <div
            key={s.role}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="bg-white border-[3px] border-[#1C1917] rounded-lg shadow-[4px_4px_0px_#1C1917] cursor-pointer overflow-hidden transition-all"
          >
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.icon}</span>
                <h2 className="font-bold text-xl">{s.role}</h2>
              </div>
              <span
                className="text-2xl transition-transform"
                style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </div>

            {open === i && (
              <div className="px-5 pb-5">
                <div className="h-[3px] mb-4" style={{ backgroundColor: s.color }} />
                <ul className="space-y-2">
                  {s.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span style={{ color: s.color }} className="font-bold">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4 justify-center">
        <Link to="/login" className="btn-brutal">Login</Link>
        <Link to="/signup" className="btn-brutal">Sign Up</Link>
      </div>
    </div>
  );
}