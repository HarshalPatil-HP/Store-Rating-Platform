import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { showErrorQueue } from "../utils/showErrorQueue";
import UserForm from "../components/admin/UserForm";
import UserList from "../components/admin/UserList";
import StoreForm from "../components/admin/StoreForm";
import StoreList from "../components/admin/StoreList";

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
      showErrorQueue(err, "Failed to add user");
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
      showErrorQueue(err, "Failed to add store");
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
        </button>
        <button onClick={() => setTab("stores")} className={`btn-brutal ${tab !== "stores" && "opacity-50"}`}>
          Active Stores
        </button>
      </div>

      {tab === "users" && (
        <>
          <h2 className="font-[Archivo_Black] text-2xl mb-4">Our Members</h2>
          <UserForm userForm={userForm} onChange={setUserForm} onSubmit={handleAddUser} />
          <UserList users={users} />
        </>
      )}

      {tab === "stores" && (
        <>
          <h2 className="font-[Archivo_Black] text-2xl mb-4">Active Stores</h2>
          <StoreForm
            storeForm={storeForm}
            onChange={setStoreForm}
            onSubmit={handleAddStore}
            storeOwners={users.filter(u => u.role === "store_owner")}
          />
          <StoreList stores={stores} />
        </>
      )}
    </div>
  );
}