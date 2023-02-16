import React,{useState} from "react";
import { UserAuth } from "../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, waitForPendingWrites, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const {createUser} = UserAuth();
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        const userCredential = await createUser(email, password);
        const user = userCredential.user
        const docRef = await addDoc(collection(db, "users"), {
          userId: user.uid,
          email: user.email
        });
        navigate("/home");
        // await waitForPendingWrites()   // wait for the write to complete before navigating to the next page
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-[url('https://images.unsplash.com/photo-1606926693780-ec99c3f747f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGlua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')]">
        <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
          <div className="text-white mt-10">
            <h1 className="font-bold text-4xl">Welcome</h1>
            <p className="font-semibold">Let's create your account!</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-8 mt-10">
            
            <input
              type="text"
              placeholder="Email"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <button className="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">
              Submit
            </button>
          </form>
          <p className="text-white font-xl font-semibold">Already have an account <Link className="animate-pulse" to={'/login'}>Sign In</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
