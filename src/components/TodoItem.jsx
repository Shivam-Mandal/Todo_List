import React, { useState } from 'react';

function TodoItem({ todo, toggleCompleted, editTodo, deleteTodo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.text); // assuming `todo.text` holds the message

    const handleEdit = () => {
        if (todo.completed) return;
        if (isTodoEditable) {
            editTodo(todo.id, todoMsg.trim());
        }
        setIsTodoEditable((prev) => !prev);
    };

    return (
        <div
            className={`flex items-center border border-white/20 rounded-xl px-4 py-2 gap-3 shadow-sm backdrop-blur-md transition-all duration-300 ${
                todo.completed ? 'bg-green-100/30' : 'bg-white/10'
            }`}
        >
            <input
                type="checkbox"
                className="accent-green-500 cursor-pointer"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
            />
            <input
                type="text"
                className={`flex-1 bg-transparent text-white placeholder:text-white/40 border rounded-md px-3 py-1.5 outline-none transition-all duration-200
                    ${isTodoEditable
                        ? 'border-white/40 focus:ring-2 focus:ring-green-400'
                        : 'border-transparent cursor-default'} 
                    ${todo.completed ? 'line-through text-white/50' : ''}
                `}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit / Save Button */}
            <button
                className="w-8 h-8 rounded-md text-sm border border-white/20 text-white bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
                onClick={handleEdit}
                disabled={todo.completed}
            >
                {isTodoEditable ? '💾' : '✏️'}
            </button>

            {/* Delete Todo Button */}
            <button
                className="w-8 h-8 rounded-md text-sm border border-white/20 text-white bg-white/10 hover:bg-red-500 hover:text-white transition"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
