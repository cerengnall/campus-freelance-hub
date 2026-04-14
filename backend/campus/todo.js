const todos = [];

function listTodos() {
  return [...todos];
}

function addTodo(title) {
  const trimmedTitle = String(title || "").trim();

  if (!trimmedTitle) {
    throw new Error("Todo basligi bos olamaz.");
  }

  const newTodo = {
    id: Date.now(),
    title: trimmedTitle,
  };

  todos.push(newTodo);

  return newTodo;
}

export { addTodo, listTodos };
