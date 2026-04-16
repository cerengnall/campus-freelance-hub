import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="shrink-0">
        <Navbar />
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Sidebar />

        <main className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 lg:p-8 md:ml-56">
          <div className="flex min-h-[12rem] flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
            Main Content
          </div>
        </main>
      </div>
    </div>
  );
}
