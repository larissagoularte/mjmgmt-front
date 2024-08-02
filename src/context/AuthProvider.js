import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/auth/check-auth', { credentials: 'include' });
            if (response.status === 200) {
                setAuth({ user: response.data.user });
            }
        } catch (error) {
            setAuth(null);
        }
    };

    checkAuthStatus();
}, []);
    

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;