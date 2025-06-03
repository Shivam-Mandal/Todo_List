import React, { useState } from "react";
import { useTodo } from "../context";
import { Plus } from "lucide-react"; // optional: if you're using Lucide icons
// import { text } from "express";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;
        addTodo({ text: todo.trim(), completed: false });
        setTodo("");
    };

    return (
        <form
            onSubmit={add}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 transition-all duration-300"
        >
            <input
                type="text"
                placeholder="What needs to be done?"
                // className="flex-1 px-4 py-5 text-white bg-transparent border border-white/30 placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                className="flex-1 py-5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-200 text-white font-medium px-4 py-2 rounded-lg shadow"
            >
                <Plus className="w-4 h-4" /> Add
            </button>
        </form>
    );
}

export default TodoForm;
