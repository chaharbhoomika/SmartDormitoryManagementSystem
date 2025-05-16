import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT":
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // LOGIN FUNCTION
  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });
    
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials, {
        withCredentials: true, // ✅ needed for cookies
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      
      return { success: true };
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message || "Login failed" });
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  // REGISTER FUNCTION
  const register = async (userData) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", userData);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
