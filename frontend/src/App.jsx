import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "./api/tasksApi";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // Load tasks initially
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    const taskData = { title, description, status };
    await createTask(taskData);
    await loadTasks();

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  return (
    <div className="app-wrapper">
      <div className="task-container">
        <h1 className="title">📝 Task Manager</h1>

        {/* Form */}
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button className="btn">Add Task</button>
        </form>

        {/* Task List */}
        <h2 className="subtitle">📌 Your Tasks</h2>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <li key={task._id} className="task-card">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
