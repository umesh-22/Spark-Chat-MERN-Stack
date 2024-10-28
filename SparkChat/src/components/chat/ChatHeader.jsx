import { useState } from "react";
import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import ViewProfile from "./ViewProfile";
import { api, DELETE_MESSAGES } from "@/constants/api";
import { toast } from "sonner";

const ChatHeader = () => {
  const { closeChat, selectedChatData } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteChat = async () => {
    try {
      await api.delete(DELETE_MESSAGES, { data: { Id: selectedChatData._id } });
      // console.log(res)
      closeChat();
    
      toast.success("Chat Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[10vh] bg-gray-950 border-b-2 border-[#2f303b] flex items-center justify-between px-5">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {selectedChatData?.profileImage ? (
              <AvatarImage
                src={selectedChatData?.profileImage}
                className="object-cover w-full h-full border-2 border-blue-500 rounded-full"
              />
            ) : (
              <div className="uppercase h-12 w-12 border-blue-500 bg-blue-400 text-2xl border-[1px] flex justify-center items-center text-white-500 rounded-full text-white/90">
                {selectedChatData?.username.charAt(0)}
              </div>
            )}
          </Avatar>
          <h3 className="capitalize">{selectedChatData?.username}</h3>
        </div>
        <div className="flex items-center justify-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-neutral-500 border-none outline-none focus:outline-none duration-300 transition-all">
                <BsThreeDotsVertical className="text-3xl hover:text-blue-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 text-blue-500 border-none rounded-lg ">
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteChat}>
                Delete Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={closeChat}>
                Close Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className=" bg-black text-white border-none shadow-md shadow-blue-500">
          <DialogHeader>
            {/* <DialogTitle>Profile</DialogTitle> */}
          </DialogHeader>

          <ViewProfile />
        
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHeader;
