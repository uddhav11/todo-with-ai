// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTasks,
//   deleteTask,
//   selectTask,
//   createTask,
//   updateTask,
//   getAiSuggestions,
//   socketAddTask,
//   socketRemoveTask,
//   socketUpdateTask,
// } from "../redux/taskSlice";
// import TaskForm from "./TaskForm";
// import socket from "../lib/socket";
// import { toast } from "react-toastify";

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading, error, selectedTask, aiSuggestion, isGeneratingAi } =
//     useSelector((state) => state.tasks);
//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchTasks());
//       setupSocketConnection();
//     }

//     return () => {
//       socket.disconnect()
//     }
//   }, [dispatch, token]);

//   const setupSocketConnection= () => {
//     socket.connect()

//     socket.on('task-created', (task) => {
//       dispatch(socketAddTask(task))
//       toast.success(`New task: ${task.title}`)
//     })

//     socket.on('task-deleted', (task) => {
//       dispatch(socketUpdateTask(task));
//       toast.info(`Task updated: ${task.title}`)
//     })

//     socket.on('task-deleted', (taskId) => {
//       dispatch(socketRemoveTask(taskId))
//       toast.warning('Task deleted')
//     })

//     socket.on('connect_error', (error) => {
//       console.error('Socket connection error: ', error)
//       toast.error('Realting updated disconnected')
//     })
//   }

//   // useEffect(() => {
//   //   if (!token) return;

//   //   socket.connect();

//   //   const handelTaskUpdate = ({ task, action }) => {
//   //     switch (action) {
//   //       case "created":
//   //         dispatch(createTask(task));
//   //         break;
//   //       case "updated":
//   //         dispatch(updateTask(task));
//   //         break;
//   //       case "deleted":
//   //         dispatch(deleteTask(task._id));
//   //         break;
//   //       default:
//   //         console.log("Unknown task action: ", action);
//   //     }
//   //   };

//   //   socket.on("taskUpdate", handelTaskUpdate);

//   //   tasks.forEach((task) => {
//   //     socket.emit("joinTaskRoom", task._id);
//   //   });

//   //   return () => {
//   //     socket.off("taskUpdate", handelTaskUpdate);
//   //     socket.disconnect();
//   //   };
//   // }, [dispatch, tasks]);

//   const handleDelete = (taskId) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       dispatch(deleteTask(taskId));
//     }
//   };

//   if (loading) return <div>Loading tasks.....</div>;
//   if (error) return <div>Error: {error}</div>;
//   return (
//     <div className="container mx-auto py-4 md:p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>
//       <TaskForm />

//       <div className="mt-8">
//         {tasks.length === 0 ? (
//           <p>No tasks found. Create your first task!</p>
//         ) : (
//           <div className="space-y-4">
//             {tasks.map((task) => (
//               <div key={task._id} className="border p-4 rounded-lg shadow-sm">
//                 <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
//                   <div className="w-[70%]">
//                     <h3 className="font-bold">{task.title}</h3>
//                     <p className="text-gray-600">{task.description}</p>
//                   </div>

//                   <div>
//                     <div className="flex ">
//                       <div className="mt-4 text-sm">
//                         <span className="font-bold text-md">Deadline: </span>
//                         <span className="font-semibold">
//                           {new Date(task.deadline).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <span
//                         className={`inline-block m-2 px-3 py-1 text-md rounded-full font-bold  ${
//                           task.priority === "high"
//                             ? "bg-red-300 text-red-800"
//                             : task.priority === "medium"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {task.priority}
//                       </span>
//                     </div>

//                     <div className="flex justify-between font-semibold mx-2">
//                       <button
//                         onClick={() => dispatch(selectTask(task))}
//                         className="px-6 py-1 bg-blue-500 text-white rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(task._id)}
//                         className="px-5 py-1 bg-red-500 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks, deleteTask, selectTask } from '../redux/taskSlice';
// import socket from '../lib/socket';
// import TaskForm from './TaskForm';
// import { toast } from 'react-toastify';

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading, error } = useSelector((state) => state.tasks);
//   const { token } = useSelector((state) => state.auth);
//   const [aiInsights, setAiInsights] = useState('');

//   // Socket.IO setup
//   useEffect(() => {
//     if (!token) return;

//     socket.connect();

//     const handleTaskUpdate = ({ action, task }) => {
//       switch(action) {
//         case 'created':
//           toast.success(`New task: ${task.title}`);
//           break;
//         case 'updated':
//           toast.info(`Updated: ${task.title}`);
//           break;
//         case 'deleted':
//           toast.warning('Task removed');
//           break;
//       }
//     };

//     socket.on('task-update', handleTaskUpdate);

//     return () => {
//       socket.off('task-update', handleTaskUpdate);
//       socket.disconnect();
//     };
//   }, [token]);

//   // Fetch tasks on load
//   useEffect(() => {
//     if (token) dispatch(fetchTasks());
//   }, [dispatch, token]);

//   const handleDelete = (taskId) => {
//     if (window.confirm('Delete this task?')) {
//       dispatch(deleteTask(taskId));
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

//       <TaskForm />

//       {/* AI Insights Panel */}
//       {tasks.length > 0 && (
//         <div className="mb-8 p-4 bg-blue-50 rounded-lg">
//           <h2 className="text-lg font-semibold mb-2">AI Suggestions</h2>
//           <p className="whitespace-pre-line">{aiInsights || 'Click to generate'}</p>
//           <button
//             onClick={async () => {
//               const res = await fetch('/api/tasks', {
//                 headers: { Authorization: `Bearer ${token}` }
//               });
//               const data = await res.json();
//               setAiInsights(data.suggestions);
//             }}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Get AI Tips
//           </button>
//         </div>
//       )}

//       {/* Task List */}
//       <div className="space-y-4">
//         {tasks.map(task => (
//           <div key={task._id} className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-bold">{task.title}</h3>
//                 <p className="text-gray-600">{task.description}</p>
//                 <span className="text-sm text-blue-600">{task.category}</span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => dispatch(selectTask(task))}
//                   className="px-3 py-1 bg-gray-200 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(task._id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTasks,
//   deleteTask,
//   selectTask,
//   getAISuggestions,
//   socketAddTask,
//   socketUpdateTask,
//   socketRemoveTask,
//   getParticularSuggestions,
// } from "../redux/taskSlice";
// import TaskForm from "./TaskForm";
// import socket from "../lib/socket";
// import { toast } from "react-toastify";

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const {
//     tasks,
//     loading,
//     error,
//     selectedTask,
//     aiSuggestion,
//     isGeneratingAI,
//     particularAiSuggestion,
//   } = useSelector((state) => state.tasks);
//   const { token } = useSelector((state) => state.auth);

//   console.log(particularAiSuggestion);

//   // Initialize tasks and socket connection
//   useEffect(() => {
//     if (token) {
//       dispatch(fetchTasks());
//       setupSocketConnection();
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [token, dispatch]);

//   const setupSocketConnection = () => {
//     socket.connect();

//     socket.on("task-created", (task) => {
//       dispatch(socketAddTask(task));
//       toast.success(`New task: ${task.title}`);
//     });

//     socket.on("task-updated", (task) => {
//       dispatch(socketUpdateTask(task));
//       toast.info(`Task updated: ${task.title}`);
//     });

//     socket.on("task-deleted", (taskId) => {
//       dispatch(socketRemoveTask(taskId));
//       toast.warning("Task deleted");
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//       toast.error("Realtime updates disconnected");
//     });
//   };

//   const handleDelete = (taskId) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       dispatch(deleteTask(taskId));
//     }
//   };

//   const handleTipClick = (taskId) => {
//     dispatch(getParticularSuggestions(taskId));
//   };

//   if (loading) return <div className="text-center py-8">Loading tasks...</div>;
//   if (error)
//     return <div className="text-red-500 text-center py-8">Error: {error}</div>;

//   return (
//     <div className="container mx-auto py-4 md:p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

//       <TaskForm />

//       {/* AI Suggestions Panel */}
//       <div className="mb-8 p-4 bg-blue-50 rounded-lg">
//         <h2 className="text-lg font-semibold mb-2">Gemini AI Assistant</h2>
//         <button
//           onClick={() => dispatch(getAISuggestions())}
//           disabled={isGeneratingAI || tasks.length === 0}
//           className={`px-4 py-2 rounded-md ${
//             isGeneratingAI || tasks.length === 0
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white"
//           }`}
//         >
//           {isGeneratingAI ? "Generating..." : "Get Productivity Tips"}
//         </button>

//         {aiSuggestion && (
//           <div className="mt-4 p-3 bg-white rounded border">
//             <pre className="whitespace-pre-wrap font-sans font-bold">{aiSuggestion}</pre>
//           </div>
//         )}
//       </div>

//       {/* Task List */}
//       <div className="space-y-4">
//         {tasks.length === 0 ? (
//           <p className="text-center text-gray-500 py-8">
//             No tasks found. Create your first task!
//           </p>
//         ) : (
//           tasks.map((task) => (
//             <div
//               key={task._id}
//               className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start">
//                 <div className="w-[65%]">
//                   <h3 className="font-bold">{task.title}</h3>
//                   <p className="text-gray-600">{task.description}</p>

//                 </div>
//                 {/* flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 */}
//                 {/* <div >
//                   <div className="flex">
//                     <span className="font-semibold">Deadline: </span>
//                     <span>
//                       {new Date(task.deadline).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <span className={`px-3 py-1 text-sm rounded-full font-bold ${
//                     task.priority === "high" ? "bg-red-100 text-red-800" :
//                     task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
//                     "bg-green-100 text-green-800"
//                   }`}>
//                     {task.priority}
//                   </span>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => dispatch(selectTask(task))}
//                       className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task._id)}
//                       className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     {task.category && (
//                     <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 rounded-full">
//                       {task.category}
//                     </span>
//                   )}
//                   </div>
//                 </div> */}
//                 <div>
//                   <div className="flex ">
//                     <div className="mt-4 text-sm">
//                       <span className="font-bold text-md">Deadline: </span>
//                       <span className="font-semibold">
//                         {new Date(task.deadline).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <span
//                       className={`inline-block m-2 px-3 py-1 text-md rounded-full font-bold  ${
//                         task.priority === "high"
//                           ? "bg-red-300 text-red-800"
//                           : task.priority === "medium"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {task.priority}
//                     </span>
//                   </div>

//                   <div className="flex justify-between font-semibold mx-2">
//                     <button
//                       onClick={() => dispatch(selectTask(task))}
//                       className="px-4 py-1 bg-blue-500 text-white rounded m-1"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task._id)}
//                       className="px-3 py-1 m-1 bg-red-500 text-white rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => handleTipClick(task._id)}
//                       className="m-1 px-4 py-2 bg-green-500 rounded-2xl text-white font-bold hover:cursor-pointer hover:bg-green-600"
//                     >
//                       Get AI Tip
//                     </button>
//                     {task.category && (
//                       <span className=" mt-2 px-2 py-2 text-md bg-gray-300 rounded-full font-bold capitalize">
//                         {task.category}
//                       </span>
//                     )}
//                   </div>

//                 </div>

//               </div>
//               {particularAiSuggestion[task._id] && (
//                     <div className="mt-2 p-3 bg-white rounded border">
//                     <pre className="whitespace-pre-wrap font-sans font-bold">{particularAiSuggestion[task._id]}</pre>
//                   </div>
//                   )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTasks,
//   deleteTask,
//   selectTask,
//   getAISuggestions,
//   socketAddTask,
//   socketUpdateTask,
//   socketRemoveTask,
//   getParticularSuggestions,
// } from "../redux/taskSlice";
// import TaskForm from "./TaskForm";
// import socket from "../lib/socket";
// import { toast } from "react-toastify";

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const {
//     tasks,
//     loading,
//     error,
//     aiSuggestion,
//     isGeneratingAI,
//     particularAiSuggestion,
//   } = useSelector((state) => state.tasks);
//   const { token } = useSelector((state) => state.auth);

//   const [loadingSuggestions, setLoadingSuggestions] = useState({});

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchTasks());
//       setupSocketConnection();
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [token, dispatch]);

//   const setupSocketConnection = () => {
//     socket.connect();

//     socket.on("task-created", (task) => {
//       dispatch(socketAddTask(task));
//       toast.success(`New task: ${task.title}`);
//     });

//     socket.on("task-updated", (task) => {
//       dispatch(socketUpdateTask(task));
//       toast.info(`Task updated: ${task.title}`);
//     });

//     socket.on("task-deleted", (taskId) => {
//       dispatch(socketRemoveTask(taskId));
//       toast.warning("Task deleted");
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//       toast.error("Realtime updates disconnected");
//     });
//   };

//   const handleDelete = (taskId) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       dispatch(deleteTask(taskId));
//     }
//   };

//   const handleTipClick = async (taskId) => {
//     setLoadingSuggestions((prev) => ({ ...prev, [taskId]: true }));
//     await dispatch(getParticularSuggestions(taskId));
//     setLoadingSuggestions((prev) => ({ ...prev, [taskId]: false }));
//   };

//   if (loading) return <div className="text-center py-8">Loading tasks...</div>;
//   if (error)
//     return <div className="text-red-500 text-center py-8">Error: {error}</div>;

//   return (
//     <div className="container mx-auto py-4 md:p-4 text-center ">
//       <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

//       <TaskForm />

//       {/* AI Suggestions Panel */}
//       <div className="mb-8 p-4 bg-blue-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
//         <h2 className="text-lg font-semibold mb-2">🤖 Gemini AI Assistant</h2>
//         <button
//           onClick={() => dispatch(getAISuggestions())}
//           disabled={isGeneratingAI || tasks.length === 0}
//           className={`px-4 py-2 rounded-md transition-all duration-300 ${
//             isGeneratingAI || tasks.length === 0
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           {isGeneratingAI ? "Generating..." : "✨ Get Productivity Tips"}
//         </button>

//         {aiSuggestion && (
//           <div className="mt-4 p-3 bg-white rounded border shadow-md transition-all">
//             <pre className="whitespace-pre-wrap font-sans font-semibold text-gray-700">
//               {aiSuggestion}
//             </pre>
//           </div>
//         )}
//       </div>

//       {/* Task List */}
//       <div className="space-y-4">
//         {tasks.length === 0 ? (
//           <p className="text-center text-gray-500 py-8">
//             No tasks found. Create your first task!
//           </p>
//         ) : (
//           tasks.map((task) => (
//             <div
//               key={task._id}
//               className="border p-4 rounded-lg shadow-sm bg-white transition-all duration-300 hover:shadow-md"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start">
//                 <div className="w-[65%]">
//                   <h3 className="font-bold text-gray-800">{task.title}</h3>
//                   <p className="text-gray-600">{task.description}</p>
//                 </div>

//                 <div>
//                   <div className="flex ">
//                     <div className="mt-4 text-sm">
//                       <span className="font-bold text-md">⏳ Deadline: </span>
//                       <span className="font-semibold">
//                         {new Date(task.deadline).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <span
//                       className={`inline-block m-2 px-3 py-1 text-md rounded-full font-bold transition-all ${
//                         task.priority === "high"
//                           ? "bg-red-300 text-red-800"
//                           : task.priority === "medium"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {task.priority}
//                     </span>
//                   </div>

//                   <div className="flex justify-between font-semibold mx-2 space-x-2">
//                     <button
//                       onClick={() => dispatch(selectTask(task))}
//                       className="px-4 py-1 bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task._id)}
//                       className="px-3 py-1 bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-600"
//                     >
//                       ❌ Delete
//                     </button>
//                   </div>

//                   <div>
//                     <button
//                       onClick={() => handleTipClick(task._id)}
//                       disabled={loadingSuggestions[task._id]}
//                       className={`m-1 px-4 py-1 bg-green-500 rounded-md text-white font-bold transition-all duration-300 hover:bg-green-600 ${
//                         loadingSuggestions[task._id] ? "cursor-not-allowed bg-gray-300" : ""
//                       }`}
//                     >
//                       {loadingSuggestions[task._id] ? "Generating..." : "💡 Get AI Tip"}
//                     </button>

//                     {task.category && (
//                       <span className="mt-2 px-2 py-1 text-md bg-gray-300 rounded-full font-bold capitalize">
//                         {task.category}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* AI Suggestion for Particular Task */}
//               {particularAiSuggestion[task._id] && (
//                 <div className="mt-3 p-3 bg-gray-50 rounded-lg border shadow-sm transition-all duration-300">
//                   <pre className="whitespace-pre-wrap font-sans font-semibold text-gray-700">
//                     {particularAiSuggestion[task._id]}
//                   </pre>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  selectTask,
  getAISuggestions,
  socketAddTask,
  socketUpdateTask,
  socketRemoveTask,
  getParticularSuggestions,
  clearSelectedTasks,
} from "../redux/taskSlice";
import TaskForm from "./TaskForm";
import socket from "../lib/socket";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiZap,
  FiCheck,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const {
    tasks,
    loading,
    error,
    aiSuggestion,
    isGeneratingAI,
    particularAiSuggestion,
    selectedTask,
  } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  const [loadingSuggestions, setLoadingSuggestions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks());
      setupSocketConnection();
    }

    return () => {
      socket.disconnect();
    };
  }, [token, dispatch]);

  const setupSocketConnection = () => {
    socket.connect();

    socket.on("task-created", (task) => {
      dispatch(socketAddTask(task));
      toast.success(`New task: ${task.title}`, { theme: "dark" });
    });

    socket.on("task-updated", (task) => {
      dispatch(socketUpdateTask(task));
      toast.info(`Task updated: ${task.title}`, { theme: "dark" });
    });

    socket.on("task-deleted", (taskId) => {
      dispatch(socketRemoveTask(taskId));
      toast.warning("Task deleted", { theme: "dark" });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      toast.error("Realtime updates disconnected", { theme: "dark" });
    });
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleTipClick = async (taskId) => {
    setLoadingSuggestions((prev) => ({ ...prev, [taskId]: true }));
    await dispatch(getParticularSuggestions(taskId));
    setLoadingSuggestions((prev) => ({ ...prev, [taskId]: false }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedTasks());
  };

  const handleEdit = (task) => {
    dispatch(selectTask(task));
    setIsModalOpen(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-900/30 text-red-300 border-red-700";
      case "medium":
        return "bg-yellow-900/20 text-yellow-300 border-yellow-700";
      case "low":
        return "bg-green-900/20 text-green-300 border-green-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };
  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-purple-400 text-lg">
          Loading tasks...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              NeuroTask Dashboard
            </h1>
          </div>

          <button
            onClick={openModal}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
          >
            <FiPlus className="mr-2" />
            Create Task
          </button>
        </div>

        {/* Task Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    {selectedTask ? "Edit Task" : "Create New Task"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-300 hover:text-white"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <TaskForm onClose={closeModal} />
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Panel */}
        <div className="mb-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden ">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-4">
            <h2 className="text-lg font-semibold text-white flex items-center  justify-center">
              <FiZap className="mr-2" />
              AI Productivity Assistant
            </h2>
          </div>
          <div className="p-4 flex justify-center">
            <button
              onClick={() => dispatch(getAISuggestions())}
              disabled={isGeneratingAI || tasks.length === 0}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                isGeneratingAI || tasks.length === 0
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              }`}
            >
              {isGeneratingAI ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "✨ Get Productivity Tips"
              )}
            </button>

            {aiSuggestion && (
              <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-purple-500/20">
                <div className="text-purple-100 whitespace-pre-wrap">
                  {aiSuggestion}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
              <div className="text-gray-400 mb-4">No tasks found</div>
              <button
                onClick={openModal}
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
              >
                Create your first task
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-800/50 hover:bg-gray-800/70 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/10"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row justify-between">
                    {/* Task Content */}
                    <div className="md:w-2/3 mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-purple-300 mb-2">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-300 whitespace-pre-wrap">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Task Meta */}
                    <div className="md:w-1/3">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center text-sm text-gray-400">
                          <FiClock className="mr-1" />
                          {new Date(task.deadline).toLocaleDateString()}
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-purple-300 rounded-lg transition-colors"
                        >
                          <FiEdit2 className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="flex items-center px-3 py-1.5 bg-red-900/30 hover:bg-red-900/40 text-red-300 rounded-lg border border-red-700/30 transition-colors"
                        >
                          <FiTrash2 className="mr-1" />
                          Delete
                        </button>
                        <button
                          onClick={() => handleTipClick(task._id)}
                          disabled={loadingSuggestions[task._id]}
                          className={`flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                            loadingSuggestions[task._id]
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-purple-900/30 hover:bg-purple-900/40 text-purple-300 border border-purple-700/30"
                          }`}
                        >
                          {loadingSuggestions[task._id] ? (
                            "Generating..."
                          ) : (
                            <>
                              <FiZap className="mr-1" />
                              AI Tip
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestion for Task */}
                  {particularAiSuggestion[task._id] && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-purple-500/20">
                      <div className="text-sm text-purple-100">
                        <div className="font-bold text-purple-300 mb-1">
                          AI Suggestion:
                        </div>
                        {particularAiSuggestion[task._id]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
