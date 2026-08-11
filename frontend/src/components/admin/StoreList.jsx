export default function StoreList({ stores }) {
  return (
    <div className="grid gap-3">
      {stores.map((s) => (
        <div
          key={s.id}
          className="bg-white border-[3px] border-[#1C1917] rounded-lg p-4 shadow-[4px_4px_0px_#1C1917]"
        >
          <p className="font-bold">{s.name}</p>
          <p className="text-sm">{s.address}</p>
        </div>
      ))}
    </div>
  );
}
