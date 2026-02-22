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

      {/* Loading */}
      {isLoading && <p className="mb-4">Loading tasks...</p>}

      {/* Error */}
      {isError && (
        <p className="text-red-500 mb-4">Failed to fetch tasks</p>
      )}

      {/* Task List */}
      {!isLoading && tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task: Task) => (
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
                      e.target.value as
                        | "Todo"
                        | "In Progress"
                        | "Completed"
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
