// import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.withCredentials = true;

// const initialState = {
//   user: null,
//   token: localStorage.getItem("token"),
//   loading: false,
//   error: null,
// };

// const storedUser = localStorage.getItem("user");
// const user =
//   storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
// const token = localStorage.getItem("token");

// const saveUserToLocalStorage = (user, token) => {
//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("token", token);
// };

// const removeUserFromLocalStorage = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// };

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/auth/register", userData, {
//         withCredentials: true,
//       });
//       saveUserToLocalStorage(res.data.user, res.data.token);
//       return res.data.user;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "/auth/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/auth/login", userData, {
//         withCredentials: true,
//       });
//       saveUserToLocalStorage(res.data.user, res.data.token);
//       return res.data.user;
//     } catch (error) {
//       rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const getProfile = createAsyncThunk(
//   "/auth/profile",
//   async (_, { rejectWithValue }) => {
//     try {
//         console.log('this is getProfile')
//       const token = getState().auth.token || localStorage.getItem("token");
//       if (!token) {
//         return rejectWithValue("No authentication token provided");
//       }
//       const res = await axios.get("/api/auth/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       console.log("this is the getProfile", res);
//       return res.data.user;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "getProfile failed"
//       );
//     }
//   }
// );

// export const googleLogin = createAsyncThunk(
//     "auth/googleLogin",
//     async (_, { rejectWithValue }) => {
//       try {
//         // Redirect to initiate the Google login flow.
//         window.location.href = "http://localhost:4000/api/auth/google";
//         // Return an empty object since the redirect will occur immediately.
//         return {};
//       } catch (error) {
//         return rejectWithValue(error.response?.data || "Google login failed");
//       }
//     }
//   );

// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       localStorage.removeItem("token");
//       return res.data;
//     } catch (error) {}
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       removeUserFromLocalStorage();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getProfile.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(getProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.token = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(googleLogin.fulfilled, (state) => {
//         // Although this case might never fire due to the redirect,
//         // it resets the loading state in case the redirect does not occur.
//         state.loading = false;
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Google login failed.";
//       });
//   },
// });

// export const {logout}= authSlice.actions;
// export default authSlice.reducer;







import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://todo-with-ai.onrender.com";
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      saveUserToLocalStorage(res.data.user, res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", userData);
      saveUserToLocalStorage(res.data.user, res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token || localStorage.getItem("token");
  
        if (!token) {
          return rejectWithValue("No authentication token provided");
        }
  
        const res = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
  
        return res.data.user;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Get profile failed"
        );
      }
    }
  );
  
export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (_, { rejectWithValue }) => {
      try {
        // Redirect to initiate the Google login flow.
        window.location.href = "http://localhost:4000/api/auth/google";
        // Return an empty object since the redirect will occur immediately.
        return {};
      } catch (error) {
        return rejectWithValue(error.response?.data || "Google login failed");
      }
    }
  );

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/logout", null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      removeUserFromLocalStorage();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
    },
    setUser: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        saveUserToLocalStorage(action.payload.user, action.payload.token);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
