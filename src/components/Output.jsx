// import React, { useEffect, useState } from "react";
// import { collection, getDocs, where, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// import { UserAuth } from "../context/AuthContext";
// const Output = () => {
//   const { user } = UserAuth();
//   const [urlList, setUrlList] = useState([]);
//   const urlCollectionRef = collection(db, "urls");

//   const handleCopy = (event) => {
//     const valueToCopy = event.target.value;
//     navigator.clipboard.writeText(valueToCopy);
//     alert('Link copied to Clipboard')
//   };

//   useEffect(() => {
//     const getList = async () => {
//       const data = await getDocs(urlCollectionRef);
//       setUrlList(data.docs.map((url) => ({ ...url.data(), id: url.id })));
//     };
//     getList();
//   }, [user]);
//   return (
//     <div className="flex justify-center">
//       <div className="w-full lg:w-1/2 px-4">
//         {/* <h1 className="text-2xl font-bold mb-4">Link Shortener</h1> */}
//         <table className="table-auto w-full bg-white rounded-2xl shadow-2xl ">
//           <thead>
//             <tr>
//               <th className="px-4 brder-b border-r py-2">Original Link</th>
//               <th className="px-4 brder py-2">Shorten Link</th>
//               <th className="px-4 brder-b border-l py-2"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {urlList.map(
//               (link) =>
//                 link.userId == user.uid && (
//                   <tr key={link.id}>
//                     <td className="border-r border-t px-4 py-2">
//                       {link.original_link}
//                     </td>
//                     <td className="border px-4 py-2">{link.short_link}</td>
//                     <td className="border-l border-t px-4 py-2">
//                       <button
//                         className="px-2 py-1 bg-purple-500 hover:bg-purple-700 rounded-md"
//                         value={link.short_link}
//                         onClick={handleCopy}
//                       >
//                         Copy
//                       </button>
//                     </td>
//                   </tr>
//                 )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Output;

import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { SpinnerCircular } from "spinners-react";

const Output = () => {
  const { user } = UserAuth();
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlCollectionRef = collection(db, "urls");

  const handleCopy = (event) => {
    const valueToCopy = event.target.value;
    navigator.clipboard.writeText(valueToCopy);
    alert("Link copied to Clipboard");
  };

  useEffect(() => {
    if (user) {
      const userId = user.uid;

      // Make sure userId is defined before executing the query
      if (userId) {
        const urlQuery = query(urlCollectionRef, where("userId", "==", userId));
        const unsubscribe = onSnapshot(urlQuery, (snapshot) => {
          const urls = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUrlList(urls);
          setIsLoading(false);
        });

        return () => unsubscribe();
      }
    }
  }, [user]);

  return (
    <>
      
      {isLoading && <div className="flex justify-center"> <SpinnerCircular></SpinnerCircular></div>}
      

      {!isLoading && (
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2 mx-12 sm:mx-0">
            <table className="table-auto w-full bg-white rounded-2xl shadow-2xl ">
              <thead>
                <tr>
                  <th className="px-4 brder-b border-r py-2">Original Link</th>
                  <th className="px-4 border py-2 hidden sm:block">Shorten Link</th>
                  <th className="px-4 brder-b border-l py-2"></th>
                </tr>
              </thead>
              <tbody>
                {urlList.map((link) => (
                  <tr key={link.id}>
                    <td className="border-r border-t px-4 py-2  text-blue-500 underline hover:cursor-pointer">
                      <a href={`${link.original_link}`} target='_blank'>{link.original_link}</a>
                    </td>
                    <td className="border-t  px-4 py-2 hidden sm:block text-blue-500 underline hover:cursor-pointer"><a href={link.short_link} target='_blank'>{link.short_link}</a></td>
                    <td className="border-l border-t px-2 py-2 sm:px-4">
                      <button
                        className="px-2 py-1 bg-purple-500 hover:bg-purple-700 rounded-md"
                        value={link.short_link}
                        onClick={handleCopy}
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Output;
