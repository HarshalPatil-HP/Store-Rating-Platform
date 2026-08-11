export default function StoreForm({ storeForm, onChange, onSubmit, storeOwners }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 mb-6 shadow-[4px_4px_0px_#1C1917]"
    >
      <h3 className="font-bold mb-3">Add Store</h3>
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <input
          placeholder="Store Name (5–40 chars)"
          value={storeForm.name}
          onChange={(e) => onChange({ ...storeForm, name: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={storeForm.email}
          onChange={(e) => onChange({ ...storeForm, email: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <input
          placeholder="Address (5–40 chars)"
          value={storeForm.address}
          onChange={(e) => onChange({ ...storeForm, address: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <select
          value={storeForm.owner_id}
          onChange={(e) => onChange({ ...storeForm, owner_id: e.target.value })}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
        >
          <option value="">No owner</option>
          {storeOwners.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-brutal">
        Add Store
      </button>
    </form>
  );
}
