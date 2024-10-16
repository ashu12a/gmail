import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get the saved user from localStorage (if it exists)
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Get the saved authentication state from localStorage
        const storedAuthState = localStorage.getItem("isAuthenticated");
        return storedAuthState === "true"; // localStorage stores everything as a string
    });


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
                // Save the current user and authentication state to localStorage
                localStorage.setItem("user", JSON.stringify(currentUser));
                localStorage.setItem("isAuthenticated", "true");
            } else {
                setUser(null);
                setIsAuthenticated(false);
                // Clear localStorage when not authenticated
                localStorage.removeItem("user");
                localStorage.setItem("isAuthenticated", "false");
            }
        });

        return unsubscribe;

    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);



