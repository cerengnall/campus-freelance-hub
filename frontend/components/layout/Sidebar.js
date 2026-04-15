const MENU_ITEMS = [
  { label: "Dashboard", href: "#" },
  { label: "Tasks", href: "#" },
  { label: "Events", href: "#" },
];

export default function Sidebar() {
  return (
    <>
      <aside
        className="sidebar fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-slate-200/80 bg-white/95 py-6 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {MENU_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <style jsx>{`
        @media (max-width: 767px) {
          .sidebar {
            transform: translateX(-100%);
            width: 0;
            border-right: 0;
            overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}
