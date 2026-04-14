import { useEffect, useState } from "react";

function TaskCard({ task }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{task.description}</p>
      <div className="mt-3 text-xs font-medium text-slate-500">Budget: {task.budget}</div>
    </article>
  );
}

function simulateTasksApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "task-1",
          title: "Landing page UI update",
          description: "Improve hero section and CTA flow for better conversion.",
          budget: "$80",
        },
        {
          id: "task-2",
          title: "Fix responsive navbar issues",
          description: "Adjust breakpoints and spacing for tablet and mobile screens.",
          budget: "$55",
        },
        {
          id: "task-3",
          title: "Create dashboard widgets",
          description: "Build summary cards for active jobs and earnings.",
          budget: "$120",
        },
      ]);
    }, 500);
  });
}

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/tasks");

        if (!response.ok) {
          throw new Error("Tasks endpoint unavailable");
        }

        const data = await response.json();
        if (isMounted) {
          setTasks(Array.isArray(data) ? data : []);
        }
      } catch (fetchError) {
        try {
          const simulatedTasks = await simulateTasksApi();
          if (isMounted) {
            setTasks(simulatedTasks);
          }
        } catch {
          if (isMounted) {
            setError("Tasks could not be loaded.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
