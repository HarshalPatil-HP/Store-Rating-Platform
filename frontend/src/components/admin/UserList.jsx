export default function UserList({ users }) {
  return (
    <div className="grid gap-3">
      {users.map((u) => (
        <div
          key={u.id}
          className="bg-white border-[3px] border-[#1C1917] rounded-lg p-4 shadow-[4px_4px_0px_#1C1917] flex justify-between"
        >
          <div>
            <p className="font-bold">{u.name}</p>
            <p className="text-sm">
              {u.email} • {u.address}
            </p>
          </div>
          <span className="border-2 border-[#1C1917] rounded px-2 h-fit">
            {u.role}
          </span>
        </div>
      ))}
    </div>
  );
}
