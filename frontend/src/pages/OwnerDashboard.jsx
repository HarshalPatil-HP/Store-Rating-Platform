import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    api.get("/owner/dashboard")
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-[Archivo_Black] text-3xl">Owner Dashboard</h1>
        <button onClick={logout} className="btn-brutal">Logout</button>
      </div>

      {!data?.store ? (
        <p>No store assigned to your account yet.</p>
      ) : (
        <>
          <div className="bg-white border-[3px] border-[#1C1917] rounded-lg p-6 mb-6 shadow-[4px_4px_0px_#1C1917]">
            <h2 className="font-bold text-xl mb-2">{data.store}</h2>
            <p>Average Rating: <b>{Number(data.averageRating).toFixed(1)}</b> / 5</p>
          </div>

          <h3 className="font-bold text-lg mb-3">Raters</h3>
          <div className="grid gap-3">
            {data.raters.map((r) => (
              <div key={r.userId} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-4 shadow-[4px_4px_0px_#1C1917] flex justify-between">
                <div>
                  <p className="font-bold">{r.userName}</p>
                  <p className="text-sm">{r.userEmail}</p>
                </div>
                <span className="border-2 border-[#1C1917] rounded px-3 h-fit font-bold">{r.rating} ★</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}