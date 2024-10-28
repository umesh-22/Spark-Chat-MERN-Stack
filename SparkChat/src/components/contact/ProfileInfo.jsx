import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { api, GET_USER, LOGOUT_USER } from "@/constants/api";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react";

const ProfileInfo = () => {
  const { userInfo,setUserInfo } = useAppStore();

  useEffect(()=>{
    const getUserData = async () => {
      try {
        const res = await api.get(GET_USER);
        setUserInfo(res.data.user);
      
      } catch (error) {
        console.log({ error });
      }
    };
    getUserData()

  },[setUserInfo])
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await api.post(LOGOUT_USER);
      toast.success(res.data.message);
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message || "LogOut Failed");
    }
  };

  return (
    <div className="absolute bottom-0  h-20 w-full px-5 flex justify-between items-center bg-gray-950">
      <div className="flex justify-center items-center gap-3">
        <div className="relative w-12 h-12">
          <Avatar className="h-12 w-12  rounded-full  overflow-hidden">
            {userInfo?.profileImage ? (
              <AvatarImage
                src={userInfo?.profileImage}
                className="object-cover w-full h-full border-2  rounded-full border-blue-600"
              />
            ) : (
              <div
                className={` 
                               border-blue-500 uppercase h-12 w-12  text-2xl border-[1px] flex justify-center items-center  text-white-500 rounded-full`}
              >
                {userInfo?.username.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div className="capitalize text-xl">
          {userInfo?.name || userInfo?.username}{" "}
        </div>
      </div>
      <div className="flex gap-2 items-center ">
      <DropdownMenu>
  <DropdownMenuTrigger>
    <MdOutlineSettings className="text-2xl hover:text-blue-500" />
  </DropdownMenuTrigger>
  <DropdownMenuContent  className="border-none bg-gray-950  text-neutral-300">
    <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel> 
    <DropdownMenuSeparator  />
    <DropdownMenuItem  className="text-lg">  <Link to="/profile-setup"> Profile</Link> </DropdownMenuItem>
    <DropdownMenuItem  className="text-lg" > <Link to="/about"> About</Link></DropdownMenuItem>
    <DropdownMenuItem  className="text-lg" onClick={handleLogout}>Log Out</DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
{/* 
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link to="/profile-setup">
                {" "}
                <FiEdit2 className="text-2xl text-[#375a64]" />{" "}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="">Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <IoPowerSharp
                className="text-red-600 text-2xl"
                onClick={handleLogout}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-red-600">Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </div>
    </div>
  );
};

export default ProfileInfo;
