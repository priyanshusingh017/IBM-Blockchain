
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user roles
export type UserRole = "patient" | "doctor" | "admin";

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Define the context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Mock users for testing
const mockUsers: User[] = [
  {
    id: "1",
    email: "patient@example.com",
    name: "John Doe",
    role: "patient",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    email: "doctor@example.com",
    name: "Dr. Sarah Smith",
    role: "doctor",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user with matching email
      const foundUser = mockUsers.find((u) => u.email === email);
      
      // Check if passwords match (in a real app, you'd check hashed passwords)
      if (foundUser) {
        // For testing purposes, we check specific passwords
        const passwordsMatch = 
          (email === "patient@example.com" && password === "Patient@123") ||
          (email === "doctor@example.com" && password === "Doctor@123") ||
          (email === "admin@example.com" && password === "Admin@123");
        
        if (passwordsMatch) {
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));
          return;
        }
      }
      
      throw new Error("Invalid email or password");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
