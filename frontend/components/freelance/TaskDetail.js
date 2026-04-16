export default function TaskDetail({ task }) {
  if (!task) {
    return (
      <section
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        aria-label="Task detail (empty)"
      >
        <div className="mb-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-semibold text-slate-900">Görev detayı</h2>
        </div>
        <p className="text-sm text-slate-500">
          Detayları görmek için listeden bir görev seçin.
        </p>
      </section>
    );
  }

  const title = task.title ?? task.name ?? "Başlıksız görev";
  const description =
    task.description ?? task.detail ?? task.details ?? "Açıklama bulunmuyor.";
  const moreInfo =
    task.moreInfo ??
    task.more_info ??
    task.extra ??
    task.extraInfo ??
    task.additionalInfo ??
    null;

  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-label="Task detail"
    >
      <header className="mb-3 border-b border-slate-100 pb-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </header>

      <div>
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Açıklama
        </div>
        <p className="m-0 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      {task.budget || task.category || task.deadline ? (
        <div className="mt-4 space-y-1 text-sm text-slate-500">
          {task.budget ? <p>Budget: {task.budget}</p> : null}
          {task.category ? <p>Category: {task.category}</p> : null}
          {task.deadline ? <p>Deadline: {task.deadline}</p> : null}
        </div>
      ) : null}

      <div className="mt-4">
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Daha detaylı bilgi
        </div>
        {moreInfo ? (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            {typeof moreInfo === "string" ? (
              <p className="m-0 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {moreInfo}
              </p>
            ) : (
              <pre className="m-0 whitespace-pre-wrap break-words font-mono text-xs leading-normal text-slate-700">
                {JSON.stringify(moreInfo, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          <p className="m-0 text-sm text-slate-500">Ek detay sağlanmadı.</p>
        )}
      </div>
    </article>
  );
}
