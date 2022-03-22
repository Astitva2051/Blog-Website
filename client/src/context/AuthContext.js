import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";

const AuthCotext = createContext({
  currentUser: null,
  username: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise
});

export const useAuth = () => useContext(AuthCotext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setcurrentUser] = useState(null);
  const [username, setusername] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      user ?  setusername(user.displayName) : setusername(null)
     
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function updateprofile(username){
    updateProfile(auth.currentUser,{
      displayName: username
    }).then(()=>{
        setusername(username)
    })
  }

  function forgotPassword(email){
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login'
    })
  }

  function resetPassword(oobcode,newPassword){
    return confirmPasswordReset(auth, oobcode, newPassword)
  }

  const value = {
    currentUser,
    username,
    register,
    login,
    logout,
    updateprofile,
    forgotPassword,
    resetPassword
  };
  return <AuthCotext.Provider value={value}>{children}</AuthCotext.Provider>;
}
