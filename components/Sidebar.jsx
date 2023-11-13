import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import { signOutUser } from "@/redux/userSlice";
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(signOutUser());
      dispatch(closeSignupModal());
      dispatch(closeLoginModal());
    } catch (e) {
      console.log(e.message);   
    }
  }

  return (
    <div className="h-full hidden sm:flex flex-col fixed xl:ml-24">
      <nav className="h-full relative xl:space-y-1">
        <div className="flex justify-center items-center xl:justify-start xl:p-1">
          <Image src={"/assets/twitter-logo.png"} width={48} height={48} />
        </div>
        <Link href={"/"}>
          <SidebarLink text={"Home"} Icon={HomeIcon} />
        </Link>
        <SidebarLink text={"Explore"} Icon={SearchIcon} />
        <SidebarLink text={"Notifications"} Icon={BellIcon} />
        <SidebarLink text={"Messages"} Icon={MailIcon} />
        <SidebarLink text={"Lists"} Icon={DocumentTextIcon} />
        <SidebarLink text={"Bookmarks"} Icon={BookmarkIcon} />
        <li className="hoverAnimation flex mb-3 justify-center xl:justify-start items-center text-xl space-x-3">
          <Image src={"/assets/twitter-logo.png"} width={32} height={32} />
          <span className="hidden xl:inline">Premium</span>
        </li>
        <SidebarLink text={"Profile"} Icon={UserIcon} />
        <SidebarLink text={"More"} Icon={DotsCircleHorizontalIcon} />
        <button className="hidden xl:inline bg-[#1d9bf0] rounded-full h-[52px] w-[200px] text-lg font-bold mt-2">
          Tweet
        </button>
        <div
          className="absolute flex justify-center items-center xl:p-3 p-1 space-x-3 hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-full bottom-0"
          onClick={handleSignOut}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoUrl || "/assets/twitter-logo.png"}
            alt="profilePicture"
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline" />
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation hover:ease-in transition duration-150 flex mb-3 justify-center xl:justify-start items-center text-xl space-x-3">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
