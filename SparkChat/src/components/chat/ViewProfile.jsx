import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";


const ViewProfile = () => {
;
    const { closeChat, selectedChatData } = useAppStore();
    // console.log(selectedChatData)
  return (
    <div>
         <div className="flex  flex-col  gap-3 items-center">
          <Avatar className="h-36 w-36 md:h-52 md:w-52 rounded-full overflow-hidden">
            {selectedChatData?.profileImage ? (
              <AvatarImage
                src={selectedChatData?.profileImage}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="uppercase h-36 w-36 md:h-52 md:w-52 border-blue-500 bg-blue-400 md:text-7xl text-5xl border-[1px] flex justify-center items-center text-white-500 rounded-full text-white/90"
              >
                {selectedChatData?.username.charAt(0)}
              </div>
            )}
          </Avatar>
          <h3 className=""> User name: {selectedChatData?.username}</h3>
          <h3 className="capitalize">Name: {selectedChatData?.name}</h3>
          <h3 className="">Email: {selectedChatData?.email}</h3>
          <h3 className="">Bio: {selectedChatData?.userBio}</h3>
          <h3 className="">Last Message Time:   {moment(selectedChatData?.lastMessageTime).format('LT')} </h3>
        
        </div>

    </div>
  )
}

export default ViewProfile