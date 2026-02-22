import { useEffect, useState } from "react";
import api from "../api/axios";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Completed";
}

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true); // ✅ START LOADING
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    try {
    const res = await api.get("/tasks");
    setTasks(res.data);
  } catch (err) {
    setError("Failed to fetch tasks");
  } finally {
    setLoading(false); // ✅ STOP LOADING
  }
};


  // 🔹 Create Task
  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to create task");
    }
  };

  // 🔹 Delete Task
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  // 🔹 Update Status
  const handleStatusChange = async (
    id: string,
    status: "Todo" | "In Progress" | "Completed"
  ) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch {
      setError("Failed to update status");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Create Task */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter task title..."
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Task List */}
      {loading && <p className="mb-4">Loading tasks...</p>}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-400">{task.description}</p>

                <select
                    value={task.status}
                    onChange={(e) =>
                    handleStatusChange(
                        task._id,
                        e.target.value as "Todo" | "In Progress" | "Completed"
                        )
                    }
                    className={`mt-2 p-1 rounded text-white ${
                    task.status === "Todo"
                    ? "bg-yellow-600"
                    : task.status === "In Progress"
                    ? "bg-blue-600"
                    : "bg-green-600"
                    }`}
                    >

                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
