import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAdmin = user && user.role === "admin";

  const authInfo = {
    user,
    setUser,
    isAdmin,
  };
  //  530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
