// import { createContext,useContext, useEffect,useState } from "react";
// import {createUserWithEmailAndPassword,
//         signInWithEmailAndPassword,
//         signOut,
//         onAuthStateChanged } 
//     from 'firebase/auth'
// import {auth} from '../firebase'
// const UserContext =  createContext();

// export const AuthContextProvider = ({children}) =>{
//     const [user, setUser] = useState({})
//     const createUser = (email,password) =>{
//         return createUserWithEmailAndPassword(auth,email,password);
//     }


//     const logIn =(email,password)=>{
//         return signInWithEmailAndPassword(auth,email,password);
//     }

//     const logout = ()=>{
//         return signOut(auth)
//     }

//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
//             console.log(currentUser);
//             setUser(currentUser)
//         })
//         return ()=>{
//             unsubscribe();
//         }
//     },[])
//     return(
//         <UserContext.Provider value={{createUser,user,logout,logIn}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export const UserAuth = () =>{
//     return useContext(UserContext)
// }
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  getAuth
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const authInstance = getAuth();
    setPersistence(authInstance, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });

        return () => {
          unsubscribe();
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, logIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
