import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([{ id: Date.now(), text: input.trim(), done: false }, ...todos]);
    setInput("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id) => {
    if (editingText.trim() === "") return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

 

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-black/20 backdrop-blur-md rounded-xl p-8 shadow-xl max-w-md w-full text-white">
        <h2 className="text-3xl font-bold mb-4 text-center tracking-wide">
          Todo List
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-white/30 text-white placeholder-white/70 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={addTodo}
            className="bg-white/30 hover:bg-white/40 px-4 py-2 rounded text-white font-semibold transition"
          >
            + Add 
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center px-4 py-2 rounded-lg shadow backdrop-blur-md ${
                todo.done ? "bg-green-500/30" : "bg-white/20"
              }`}
            >
              {editingId === todo.id ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                    className="bg-white/30 text-white px-2 py-1 rounded w-full mr-2"
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={`flex-1 text-left ${
                      todo.done ? "line-through text-gray-200" : ""
                    }`}
                  >
                    {todo.text}
                  </div>
                  <div className="flex gap-2 ml-2">
                    
                    <button
                      onClick={() => startEditing(todo)}
                      className="bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-white text-center mt-6">No tasks yet!</p>
        )}
      </div>
    </div>
  );
}

export default App;
