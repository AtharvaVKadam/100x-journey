import ProtectedRoute from "../../../components/ProtectedRoute";
import UserMenu from "../../components/UserMenu"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 font-sans">

        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-2xl text-indigo-600 tracking-tight">
            MeetAI
          </div>
          <nav className="flex-1 p-4 space-y-2 mt-4">
            <a href="/dashboard" className="block px-4 py-2 text-indigo-700 bg-indigo-50 rounded-lg font-medium transition-colors">
              Overview
            </a>
            <a href="/dashboard/meetings" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              Meeting History
            </a>
            <a href="/dashboard/agents" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              AI Agents
            </a>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
            <UserMenu />
          </header>

          <div className="p-8 flex-1 overflow-y-auto">
            {children}
          </div>
        </main>

      </div>
    </ProtectedRoute>
  );
}