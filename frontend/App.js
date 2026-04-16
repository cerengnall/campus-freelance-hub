import { useSyncExternalStore } from "react";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./components/freelance/TaskDetail";

function readRoute() {
  if (typeof window === "undefined") return "dashboard";
  const raw = (window.location.hash.replace(/^#/, "") || "/").split("?")[0];
  if (raw === "/task" || raw === "/task-detail") return "task";
  return "dashboard";
}

export default function App() {
  const route = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("hashchange", onStoreChange);
      return () => window.removeEventListener("hashchange", onStoreChange);
    },
    readRoute,
    () => "dashboard"
  );

  return (
    <div className="flex min-h-screen flex-col">
      <nav
        className="flex shrink-0 flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 text-sm shadow-sm"
        aria-label="Sayfa gezinmesi"
      >
        <a
          href="#/dashboard"
          className={
            route === "dashboard"
              ? "rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white"
              : "rounded-lg px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-100"
          }
        >
          Dashboard
        </a>
        <a
          href="#/task"
          className={
            route === "task"
              ? "rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white"
              : "rounded-lg px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-100"
          }
        >
          Task Detail
        </a>
      </nav>

      <div className="flex min-h-0 flex-1 flex-col">
        {route === "task" ? (
          <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
              <TaskDetail />
            </div>
          </main>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}
