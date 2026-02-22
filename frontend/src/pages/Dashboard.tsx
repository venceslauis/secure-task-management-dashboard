import { useState } from "react";
import api from "../api/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Completed";
}

function Dashboard() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // 🔹 Fetch Tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await api.get("/tasks");
      return res.data;
    },
  });

  // 🔹 Create Task
  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      await api.post("/tasks", { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
    },
  });

  // 🔹 Delete Task
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 🔹 Update Status
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "Todo" | "In Progress" | "Completed";
    }) => {
      await api.put(`/tasks/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 🔹 Handlers
  const handleCreate = () => {
    if (!title.trim()) return;
    createMutation.mutate(title);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleStatusChange = (
    id: string,
    status: "Todo" | "In Progress" | "Completed"
  ) => {
    updateMutation.mutate({ id, status });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
  <div>
    <h1 className="text-4xl font-bold tracking-tight">
      Secure Task Dashboard
    </h1>
    <p className="text-gray-400 mt-1">
      Manage your tasks securely and efficiently
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg border border-gray-700"
  >
    Logout
  </button>
</div>

      {/* Create Task */}
      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter task title..."
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-medium"
        >
          Add
        </button>
      </div>

      {/* Loading */}
      {isLoading && <p className="mb-4">Loading tasks...</p>}

      {/* Error */}
      {isError && (
        <p className="text-red-500 mb-4">Failed to fetch tasks</p>
      )}

      {/* Task List */}
      {!isLoading && tasks.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
  <p className="text-lg">No tasks yet</p>
  <p className="text-sm mt-2">Create your first task above</p>
</div>

      ) : (
        <div className="space-y-4">
          {tasks.map((task: Task) => (
            <div
              key={task._id}
              className="bg-gray-900 border border-gray-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-400">{task.description}</p>

                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(
                      task._id,
                      e.target.value as
                        | "Todo"
                        | "In Progress"
                        | "Completed"
                    )
                  }
                  className={`mt-3 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
  task.status === "Todo"
    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
    : task.status === "In Progress"
    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
    : "bg-green-500/20 text-green-400 border border-green-500/30"
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
    </div>
  );
}

export default Dashboard;
