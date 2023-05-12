import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Output from "../components/Output";
import { collection, addDoc, waitForPendingWrites } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import BG from '../assets/signBG.svg'

const Home = () => {
  const { user } = UserAuth();
  const [orgLink, setOrgLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  
  const handleCall = (e) => {
    e.preventDefault()
    fetch(`https://api.shrtco.de/v2/shorten?url=${orgLink}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data.result.short_link);
        setShortLink(data.result.short_link);
        setOrgLink(data.result.original_link);
        if (user && user.uid) {
          const docRef = await addDoc(collection(db, "urls"), {
            original_link: data.result.original_link,
            short_link: data.result.short_link,
            userId: user.uid,
          });
          await waitForPendingWrites();
          console.log(docRef.id);
        } else {
          console.error("User or user ID is undefined.");
        }
      });
  };
  return (
    <div className=" bg-gray-800 w-screen min-h-screen flex flex-col pb-16 bg-cover bg-center" style={{backgroundImage: `url(${BG})`}}>
      <Navbar />
      <div className="space-y-16">
        <div className=" flex justify-center ">
          <div className="w-full lg:w-1/2 px-4 pt-[20vh] flex flex-col justify-center space-y-8">
            <p className="text-center text-[#1D267D] font-jose text-5xl font-bold  ">Link <span className="line-through"> ShrinK</span></p>
            <form onSubmit={handleCall} className="space-y-4 ">
              <input
                type="text"
                name="url"
                id="inputUrl"
                placeholder="Enter the url to shorten........"
                className=" focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-100 text-gray-700 placeholder-gray-400 bg-gray-100 rounded-lg py-2 px-4  w-full appearance-none leading-normal neon-effect "
                value={orgLink}
                onChange={(e) => {setOrgLink(e.target.value)
                }}
              />
              <button
                className="px-3 py-2 float-right bg-purple-800 text-white font-bold rounded-full border-2 border-purple-500 hover:bg-purple-900 hover:text-white hover:border-transparent transition-all duration-200"
                onClick={handleCall}
              >
                Shrink it!
              </button>
            </form>
          </div>
        </div>

        <Output/>
      </div>
    </div>
  );
};

export default Home;
