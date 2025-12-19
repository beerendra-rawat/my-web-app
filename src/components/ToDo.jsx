import { useEffect, useState } from "react";
import "../styles/todo.css";

export default function ToDo() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const addTask = () => {
        if (!task.trim()) return;

        let updatedTasks;

        if (editId !== null) {
            updatedTasks = tasks.map((t) =>
                t.id === editId ? { ...t, text: task } : t
            );
            setEditId(null);
        } else {
            updatedTasks = [
                ...tasks,
                { id: Date.now(), text: task, completed: false },
            ];
        }

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTask("");
    };

    const editTask = (task) => {
        setTask(task.text);
        setEditId(task.id);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTask('')
    };

    return (
        <div className="container">
            <div className="todo-main">
                <h2 className="todo-title">Add To-Do Task</h2>
            </div>

            <div className="second-main">
                <input
                    className="task-input"
                    placeholder="Enter the task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <button className="add-btn" onClick={addTask}>
                    {editId !== null ? "Update" : "Add"}
                </button>
            </div>

            <ul>
                {tasks.map((item) => (
                    <li key={item.id} className="todo-item">
                        {item.text}
                        <div className="action-buttons">
                            <button className="edit-btn" onClick={() => editTask(item)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTask(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
