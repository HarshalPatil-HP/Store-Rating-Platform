export default function UserForm({ userForm, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-[3px] border-[#1C1917] rounded-lg p-5 mb-6 shadow-[4px_4px_0px_#1C1917]"
    >
      <h3 className="font-bold mb-3">Add User</h3>
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <input
          placeholder="Name (5–40 chars)"
          value={userForm.name}
          onChange={(e) => onChange({ ...userForm, name: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={userForm.email}
          onChange={(e) => onChange({ ...userForm, email: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <input
          placeholder="Password (8–16 chars)"
          type="password"
          value={userForm.password}
          onChange={(e) => onChange({ ...userForm, password: e.target.value })}
          minLength={5}
          maxLength={16}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <input
          placeholder="Address (5–40 chars)"
          value={userForm.address}
          onChange={(e) => onChange({ ...userForm, address: e.target.value })}
          minLength={5}
          maxLength={40}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
          required
        />
        <select
          value={userForm.role}
          onChange={(e) => onChange({ ...userForm, role: e.target.value })}
          className="border-[3px] border-[#1C1917] rounded-md p-2"
        >
          <option value="normal">Normal</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>
      <button type="submit" className="btn-brutal">
        Add User
      </button>
    </form>
  );
}
