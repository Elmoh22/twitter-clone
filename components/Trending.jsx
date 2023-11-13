import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";

export default function Trending() {
  return (
    <div className="hidden lg:flex flex-col ml-7 mt-4">
      <div className="flex space-x-3 bg-[#16181C] w-[300px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none placeholder:text-gray-600"
          placeholder="Search on Twitter"
        />
      </div>
      <div className="bg-[#16181C] w-[300px] h-[500px] rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening?</h1>
        <TrendingData />
        <TrendingData />
        <TrendingData />
        <TrendingData />
        <TrendingData />
        <div className="p-3 cursor-pointer">
          <p className="text-s text-[#1d9bf0]">Show more</p>
        </div>
      </div>
      <div className="bg-[#16181C] w-[300px] h-[300px] rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow?</h1>
        <FollowData />
        <FollowData />
        <FollowData />
      </div>
    </div>
  );
}

function TrendingData() {
  return (
    <div className="p-3 relative hover:bg-[#1D1F23] cursor-pointer">
      <div className="group w-8 h-8 absolute right-4 rounded-full hover:bg-[#1D2C37]">
        <DotsHorizontalIcon className="w-5 absolute top-1.5 right-1.5 text-gray-600 group-hover:text-[#1d9bf0]" />
      </div>
      <p className="text-xs text-gray-500">Trending in US</p>
      <h1 className="text-[15px] font-bold">China</h1>
      <p className="text-xs text-gray-500">340k Tweets</p>
    </div>
  );
}

function FollowData() {
  return (
    <div className="flex justify-between p-3 hover:bg-[#1D1F23] cursor-pointer">
      <div className="flex space-x-3">
        <img
          className="w-11 h-11 object-cover rounded-full"
          src="/assets/bragg.png"
          alt="David Bragg"
        />
        <div>
          <div className="flex space-x-1">
            <h1 className="font-bold">David Bragg</h1>
            <BadgeCheckIcon className="w-[18px] text-blue-400" />
          </div>
          <h1 className="text-[12px] mt-1 text-gray-500">@davidbragg</h1>
        </div>
      </div>
      <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold hover:bg-[#D7DBDC]">
        Follow
      </button>
    </div>
  );
}
