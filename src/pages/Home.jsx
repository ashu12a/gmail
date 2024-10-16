import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MailList from "../components/MailList";
import { FaRegSquare } from "react-icons/fa";
import { MdOutlineArrowDropDown, MdOutlineRefresh } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoFileTraySharp } from "react-icons/io5";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../store/context/AuthContextProvider";

export default function Home() {
  const [mails, setMails] = useState();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      // Ensure user.email is available
      const q = query(collection(db, "emails"), where("to", "==", user.email)); // Query where 'to' field matches user.email
      const unsub = onSnapshot(q, (snapshot) => {
        const mailData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMails(mailData); // Set the filtered emails in state
      });

      return () => unsub(); // Unsubscribe on component unmount
    }
  }, [user.email]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="block w-full bg-white rounded-lg min-h-[90vh] overflow-hidden">
        <div className="flex bg-red-100 bg-white items-center px-4 mt-4">
          <p className="hover:bg-gray-100 rounded py-3 cursor-pointer">
            <FaRegSquare className="text-gray-600" size={"17px"} />
          </p>
          <p className="hover:bg-gray-100 rounded py-3 cursor-pointer">
            <MdOutlineArrowDropDown className="text-gray-600" size={"17px"} />
          </p>
          <p
            className="hover:bg-gray-100 rounded-full p-3 ml-2 cursor-pointer"
            title="Refresh"
          >
            <MdOutlineRefresh className="text-gray-600" size={"20px"} />
          </p>
          <p className="hover:bg-gray-100 rounded-full p-3 cursor-pointer">
            <HiOutlineDotsVertical className="text-gray-600" size={"18px"} />
          </p>
        </div>
        <div className="flex mb-3">
          <div className="flex items-center gap-4 px-4 w-[250px] cursor-pointer text-blue-500 rounded bg-gray-100 border-b-2 border-blue-500">
            <p className="hover:bg-gray-100 rounded py-3">
              <IoFileTraySharp size={"17px"} />
            </p>
            <p style={{ fontWeight: "500" }}>Primary</p>
          </div>
        </div>
        {mails?.length > 0 &&
          mails.map((item, index) => (
            <MailList
              name={item.fromName}
              text={item.subject || item.message}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}
