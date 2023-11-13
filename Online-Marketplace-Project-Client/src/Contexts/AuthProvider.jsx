import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import Loading from "../AnimationJson/Loading.json";
import Lottie from "lottie-react";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const socialLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUser = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Successfully logout!");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = ({ email, password, name, photoUrl }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(!loading);
      } else {
        setUser(null);
        setLoading(!loading);
      }
    });
  }, []);

  const authInfo = { user, signUp, signIn, logOut, updateUser, socialLogin };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <Lottie animationData={Loading} loop={true}></Lottie> : <>{ children }</>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
