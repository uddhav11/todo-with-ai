import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
  aiSuggestion: "",
  particularAiSuggestion: {},
  isGeneratingAi: false,
};

// Fetch Tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;

      if (!token) throw new Error("Authentication token not found");

      const response = await axios.get("/api/tasks/gettasks", {
        headers: { Authorization: `Bearer ${token}` },
      });


      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the tasks"
      );
    }
  }
);

// Create Task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      if (!token) throw new Error("Authentication token not found");
      console.log('this is create task: ', taskData)
      const response = await axios.post("/api/tasks/create", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, taskData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.put(`/api/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("this is updated task", response.data.task);

      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      if (!token) throw new Error("Authentication token not found");

      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

export const getAISuggestions = createAsyncThunk(
  "tasks/aisuggestion",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      if (!token) throw new Error("Authincation token not found");

      const response = await axios.get("/api/tasks/tips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.suggestion;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get Ai suggestions"
      );
    }
  }
);


export const getParticularSuggestions= createAsyncThunk(
  '/tasks/tip',
  async(id, {getState, rejectWithValue}) => {
    try {
      const token= getState().auth?.token;
      if(!token) throw new Error("Authincation token not found")

      const response= await axios.get(`/api/tasks/tip/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      console.log('particular ai response', response.data.suggestion)
      return {id, suggestion: response.data.suggestion}
    } catch (error) {
      console.log('particular ai suggestions error: ', error)
      return rejectWithValue(
        error.response?.data?.message || "Failed in get particular ai suggestions"
      )
    }
  }
)


// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTasks: (state) => {
      state.selectedTask = null;
    },
    socketAddTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    socketUpdateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    socketRemoveTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.tasks.unshift(action.payload);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
        state.selectedTask = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAISuggestions.pending, (state) => {
        state.isGeneratingAi = true;
        state.error = null;
      })
      .addCase(getAISuggestions.fulfilled, (state, action) => {
        state.isGeneratingAi = false;
        state.aiSuggestion = action.payload;
      })
      .addCase(getAISuggestions.rejected, (state, action) => {
        state.isGeneratingAi = false;
        state.error = action.payload;
      })

      .addCase(getParticularSuggestions.pending, (state) => {
        state.isGeneratingAi = true;
        state.error = null;
      })
      .addCase(getParticularSuggestions.fulfilled, (state, action) => {
        state.isGeneratingAi = false;
        state.particularAiSuggestion[action.payload.id]= action.payload.suggestion;
      })
      .addCase(getParticularSuggestions.rejected, (state, action) => {
        state.isGeneratingAi = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectTask,
  clearSelectedTasks,
  socketAddTask,
  socketRemoveTask,
  socketUpdateTask,
} = taskSlice.actions;
export default taskSlice.reducer;
