import ChatBox from "@/components/chat/ChatBox"
import EmptyChatBox from "@/components/chat/EmptyChatBox"
import ContactBox from "@/components/contact/ContactBox"

import { useAppStore } from "@/store/store"



const ChatPage = () => {
  const {selectedChatType,isUploading,isDownloading,fileUploadProgress,fileDownloadProgress} = useAppStore()



  return (
    <div className=" w-full h-[100vh] text-white flex overflow-hidden ">

    {
      isUploading && <div className="h-[100vh] w-[100vw] top-0 fixed left-0 z-10 flex flex-col justify-center items-center gap-5 bg-black/80 backdrop:blur-lg">
        <h5 className="text-5xl animate-pulse">Uploading</h5> {fileUploadProgress}%
      </div>
    }
    {
      isDownloading && <div className="h-[100vh] w-[100vw] top-0 fixed left-0 z-10 flex flex-col justify-center items-center gap-5 bg-black/80 backdrop:blur-lg">
        <h5 className="text-5xl animate-pulse">Downloading</h5> {fileDownloadProgress}%
      </div>
    }
       <ContactBox />
       {
        selectedChatType === null ? <EmptyChatBox /> : <ChatBox />
       }
    
     
    </div>
  )
}

export default ChatPage