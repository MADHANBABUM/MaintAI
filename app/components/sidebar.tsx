export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-10">MaintAI</h1>

      <nav className="space-y-3">
        <button className="w-full text-left p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
          📊 Dashboard
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
          🏭 Machines
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
          📈 Analytics
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
          ⚙️ Settings
        </button>
      </nav>
    </aside>
  );
}
