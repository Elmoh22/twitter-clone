import BottomBanner from "@/components/BottomBanner";
import PostFeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { useSelector } from "react-redux";

export default function Home() {
  const username = useSelector((state) => state.user.username);
  console.log(username);
  return (
    <div>
      <div className="bg-black min-h-screen text-[#E7E9EA] max-w-[1400px] mx-auto flex">
        <Sidebar />
        <PostFeed />
        <Trending />
      </div>
      <CommentModal />
      {!username && <BottomBanner />}
    </div>
  );
}
