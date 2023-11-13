import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import { db } from "@/firebase";
import {
  ArrowLeftIcon,
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { userAgent } from "next/server";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl,
    text: data.tweet,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null,
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="bg-black min-h-screen text-[#E7E9EA] max-w-[1400px] mx-auto flex">
      <Sidebar />
      <div
        className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
    border-gray-700 border-x 
    "
      >
        <div
          className="flex space-x-8 px-3 py-2 text-lg sm:text-xl font-bold
          bg-black/70 backdrop-blur sticky top-0 z-50
      "
        >
          <Link href={"/"}>
            <div className="cursor-pointer w-10 h-10 rounded-full hover:bg-[#181919] flex items-center justify-center">
              <ArrowLeftIcon className="w-5" />
            </div>
          </Link>
          <h1 className="flex items-center">Tweet</h1>
        </div>
        <div className="border-b border-gray-700">
          <div className="flex space-x-3 p-3 border-gray-700">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={tweetData.photoUrl}
              alt="Kylie Jenner"
            />
            <div>
              <div className="text-gray-500 flex items-center space-x-2 mb-1">
                <h1 className="text-white font-bold ">{tweetData.name}</h1>
                <span>@{tweetData.username}</span>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
              </div>
              <span className="text-2xl">{tweetData.text}</span>
              {tweetData.image && (
                <img
                  className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
                  src={tweetData.image}
                />
              )}
            </div>
          </div>
          <div className="p-3 ml-16 text-gray-500 flex space-x-14">
            <ChatIcon className="w-5 cursor-pointer hover:text-green-500" />
            <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
            <ChartBarIcon className="w-5 cursor-not-allowed" />
            <UploadIcon className="w-5 cursor-not-allowed" />
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-500 p-2">
          <div className="flex justify-center items-center p-4 space-x-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user.photoUrl || "/assets/twitter-logo.png"}
            />
            <h1 className="text-xl text-gray-500">Tweet you reply</h1>
          </div>
          <button
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50"
            disabled={true}
          >
            Tweet
          </button>
        </div>
        {tweetData.comments?.map((comment) => (
          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3 border-gray-700">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={comment.photoUrl}
                alt="Kylie Jenner"
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-white font-bold ">{comment.name}</h1>
                  <span>@{comment.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                </div>
                <span>{comment.comment}</span>
              </div>
            </div>
            <div className="p-3 ml-16 text-gray-500 flex space-x-14">
              <ChatIcon className="w-5 cursor-pointer hover:text-green-500" />
              <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
              <ChartBarIcon className="w-5 cursor-not-allowed" />
              <UploadIcon className="w-5 cursor-not-allowed" />
            </div>
          </div>
        ))}
      </div>
      <Trending />
    </div>
  );
}
