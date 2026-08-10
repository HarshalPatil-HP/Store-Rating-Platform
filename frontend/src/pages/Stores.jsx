import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const { logout } = useAuth();

  const fetchStores = async () => {
    const res = await api.get("/user/stores", { params: { name: search } });
    setStores(res.data.data);
  };

  useEffect(() => { fetchStores(); }, [search]);

  const handleRate = async (storeId, rating) => {
    await api.post(`/user/stores/${storeId}/rating`, { rating });
    fetchStores();
  };

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-[Archivo_Black] text-3xl">Stores</h1>
        <button onClick={logout} className="btn-brutal">Logout</button>
      </div>

      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-[3px] border-[#1C1917] rounded-md p-2 mb-8"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 shadow-[4px_4px_0px_#1C1917]">
            <h3 className="font-bold text-xl">{store.name}</h3>
            <p className="text-sm mb-2">{store.address}</p>
            <p className="mb-1">Avg Rating: <b>{Number(store.average_ratings).toFixed(1)}</b> / 5</p>
            <p className="mb-3">Your Rating: <b>{store.user_ratings ?? "Not rated"}</b></p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => handleRate(store.id, n)}
                  className={`w-8 h-8 border-2 border-[#1C1917] rounded ${store.user_ratings >= n ? "bg-[#D97706]" : "bg-white"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}