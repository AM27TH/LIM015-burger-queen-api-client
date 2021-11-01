import { createContext, useState, useEffect } from "react";
import { signIn } from "../../helpers/post";
import { getUserById } from "../../helpers/get";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      sessionStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const contextValue = {
    user,
    login: async (email, password) => {
      const data = { email, password };
      let response = await signIn(data)
      if(response.err) setUser(null)
      else {
        const userAuth = await getUserById(email, response.token);
        response = { ...userAuth, ...response }
        setUser(response)
      }
      return response
    },
    logout: () => {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
    urlRol: () => {
      if (user.roles.rol !== 'mesero') return `/${user.roles.rol}`;
      else return '/waiter'
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;