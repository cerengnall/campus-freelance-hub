export default function TaskDetail({ task }) {
  if (!task) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Task Detail</h2>
        <p className="mt-2 text-sm text-slate-500">No task selected.</p>
      </section>
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{task.title || "Untitled task"}</h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {task.description || "No description available for this task."}
      </p>

      <div className="mt-4 space-y-1 text-sm text-slate-500">
        {task.budget ? <p>Budget: {task.budget}</p> : null}
        {task.category ? <p>Category: {task.category}</p> : null}
        {task.deadline ? <p>Deadline: {task.deadline}</p> : null}
      </div>
    </article>
  );
}
