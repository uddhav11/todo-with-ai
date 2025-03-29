import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, selectTask } from "../redux/taskSlice";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks());
    }
  }, [dispatch, token]);



  if (loading) return <div>Loading tasks.....</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="container mx-auto py-4 md:p-4">
      <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>
      <TaskForm />

      <div className="mt-8">
        {tasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
                  <div className="w-[70%]">
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    
                  </div>

                  <div>
                    <div className="flex ">
                      <div className="mt-4 text-sm">
                      <span className="font-bold text-md">Deadline: </span>
                      <span className="font-semibold">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`inline-block m-2 px-3 py-1 text-md rounded-full font-bold  ${
                        task.priority === "high"
                          ? "bg-red-300 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                    </div>
                    
                  <div className="flex justify-between font-semibold mx-2">
                    <button
                      onClick={() => dispatch(selectTask(task))}
                      className="px-6 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTask(task._id))}
                      className="px-5 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
