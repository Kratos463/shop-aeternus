import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'; // Fix import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(Cookies.get('token')); // Initialize token state

  const clearTokenCookie = () => {
    Cookies.remove('token', { path: '/' }); 
  };

  // Re-run the useEffect whenever the token changes
//   useEffect(() => {
//     console.log("Retrieved token:", token);
//     if (token) {
//       try {
//         const decoded = jwt.decode(token);
//         console.log("Decoded token:", decoded);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Error decoding token:", err);
//       }
//     } else {
//       console.log("No token found in cookies");
//       setUser(null); // Clear user state if token is not there
//     }
//     setLoading(false); 
//   }, [token]); // Re-run when token changes

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", { email, password });
      const token = response.data.token; // Assuming you receive a token in the response
      Cookies.set('token', token, { path: '/', expires: 1 }); // Store token in cookies
      setToken(token); // Update token state
      setUser(response.data.user); // Update user state
      router.push("/"); 
      toast.success("Login successful");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.error || "Error logging in");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/user/logout"); // Backend call
      clearTokenCookie(); // Remove the token from cookies
      setToken(null); // Update token state
      setUser(null); // Reset user state
      router.push("/"); 
      toast.success("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
