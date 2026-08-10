import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [tab, setTab] = useState("users");
  const { logout } = useAuth();

  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", address: "", role: "normal" });
  const [storeForm, setStoreForm] = useState({ name: "", email: "", address: "", owner_id: "" });

  const fetchAll = async () => {
    const [statsRes, usersRes, storesRes] = await Promise.all([
      api.get("/admin/dashboard"),
      api.get("/admin/users"),
      api.get("/admin/stores"),
    ]);
    setStats(statsRes.data.data);
    setUsers(usersRes.data.data.users);
    setStores(storesRes.data.data.stores);
  };

  useEffect(() => { fetchAll(); }, []);

 const handleAddUser = async (e) => {
  e.preventDefault();
  try {
    await api.post("/admin/users", userForm);
    toast.success("User added successfully", { id: "form-success" });
    setUserForm({ name: "", email: "", password: "", address: "", role: "normal" });
    fetchAll();
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors && errors.length > 0) {
      errors.forEach(e => toast.error(Object.values(e)[0]));
    } else {
      toast.error(err.response?.data?.message || "Failed to add user", { id: "form-error" });
    }
  }
};

  const handleAddStore = async (e) => {
  e.preventDefault();
  try {
    await api.post("/admin/stores", { ...storeForm, owner_id: storeForm.owner_id || null });
    toast.success("Store added successfully", { id: "form-success" });
    setStoreForm({ name: "", email: "", address: "", owner_id: "" });
    fetchAll();
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors && errors.length > 0) {
      errors.forEach(e => toast.error(Object.values(e)[0]));
    } else {
      toast.error(err.response?.data?.message || "Failed to add store", { id: "form-error" });
    }
  }
};

  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-[Archivo_Black] text-3xl">Admin Dashboard</h1>
        <button onClick={logout} className="btn-brutal">Logout</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {[["Users", stats.totalUsers], ["Stores", stats.totalStores], ["Ratings", stats.totalRatings]].map(([label, val]) => (
          <div key={label} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 shadow-[4px_4px_0px_#1C1917] text-center">
            <p className="text-sm">{label}</p>
            <p className="font-[Archivo_Black] text-4xl">{val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
         <button onClick={() => setTab("users")} className={`btn-brutal ${tab !== "users" && "opacity-50"}`}>
            Our Members
        </ button>
        <button onClick={() => setTab("stores")} className={`btn-brutal ${tab !== "stores" && "opacity-50"}`}>
            Active Stores
        </button>
      </div>

      {tab === "users" && (
        <>
         <h2 className="font-[Archivo_Black] text-2xl mb-4">Our Members</h2>
          <form onSubmit={handleAddUser} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 mb-6 shadow-[4px_4px_0px_#1C1917]">
            <h3 className="font-bold mb-3">Add User</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input placeholder="Name (20-60 chars)" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <input placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <input placeholder="Password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <input placeholder="Address" value={userForm.address} onChange={(e) => setUserForm({ ...userForm, address: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2">
                <option value="normal">Normal</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
              </select>
            </div>
            <button type="submit" className="btn-brutal">Add User</button>
          </form>

          <div className="grid gap-3">
            {users.map((u) => (
              <div key={u.id} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-4 shadow-[4px_4px_0px_#1C1917] flex justify-between">
                <div>
                  <p className="font-bold">{u.name}</p>
                  <p className="text-sm">{u.email} • {u.address}</p>
                </div>
                <span className="border-2 border-[#1C1917] rounded px-2 h-fit">{u.role}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "stores" && (
        <>
         <h2 className="font-[Archivo_Black] text-2xl mb-4">Active Stores</h2>
          <form onSubmit={handleAddStore} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 mb-6 shadow-[4px_4px_0px_#1C1917]">
            <h3 className="font-bold mb-3">Add Store</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input placeholder="Store Name" value={storeForm.name} onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <input placeholder="Email" value={storeForm.email} onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <input placeholder="Address" value={storeForm.address} onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2" required />
              <select value={storeForm.owner_id} onChange={(e) => setStoreForm({ ...storeForm, owner_id: e.target.value })} className="border-[3px] border-[#1C1917] rounded-md p-2">
                <option value="">No owner</option>
                {users.filter(u => u.role === "store_owner").map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-brutal">Add Store</button>
          </form>

          <div className="grid gap-3">
            {stores.map((s) => (
              <div key={s.id} className="bg-white border-[3px] border-[#1C1917] rounded-lg p-4 shadow-[4px_4px_0px_#1C1917]">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm">{s.address}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}