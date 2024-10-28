import { api, UPLOAD_FILE } from "@/constants/api";
import { useSocket } from "@/socket/SocketContext";
import { useAppStore } from "@/store/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";
const MessageBar = () => {
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerClose] = useState(false);

  const handleEmojiPicker = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (!socket || message.trim() === "") {
      toast.error("Please enter a message");
      return;
    }

    try {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileURL: undefined,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Error sending message. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    const handleCloseEmoji = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerClose(false);
      }
    };
    document.addEventListener("mousedown", handleCloseEmoji);
    return () => {
      document.removeEventListener("mousedown", handleCloseEmoji);
    };
  }, [emojiRef]);

  const fileInputRef = useRef();

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      // console.log(file);

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        // console.log(formData);

        setIsUploading(true);

        const res = await api.post(UPLOAD_FILE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
          },
        });

        if (res.data) {
          socket.emit("sendMessage", {
            sender: userInfo._id,
            content: undefined,
            recipient: selectedChatData._id,
            messageType: "file",
            fileURL: res.data.filePath,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="h-[10vh] hidden  w-full  md:flex justify-center items-center gap-2 px-1 md:mb-3">
        <div className="flex-1 flex bg-[#282b33] gap-1 pt-1 rounded-md md:px-3">
          <div className="relative flex px-1">
            <button
              className="text-neutral-400 border-none outline-none focus:text-white duration-300 transition-all p-1"
              onClick={() => setEmojiPickerClose(true)}
            >
              <RiEmojiStickerLine className="text-2xl hover:text-blue-500" />
            </button>
            <div className="absolute bottom-16 right-[-1] z-10" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                open={emojiPickerOpen}
                onEmojiClick={handleEmojiPicker}
                autoFocusSearch={false}
              />
            </div>
          </div>

          <input
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-1 p-5 text-xl bg-transparent rounded-md border-none outline-none focus:ring-0"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="relative flex">
            <button
              onClick={handleAttachmentClick}
              className="text-neutral-400 border-none outline-none focus:text-white duration-300 transition-all p-1"
            >
              <GrAttachment className="text-2xl hover:text-blue-500" />
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAttachmentChange}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className=" rounded-full flex items-center justify-center  hover:text-blue-700 border-none outline-none focus:text-white duration-300 transition-all"
          >
            <IoSend className="text-3xl" />
          </button>
        </div>
      </div>
      <div className="md:hidden flex w-[20vw] mb-1">
        <div className="flex-1 flex bg-[#282b33] gap-1 rounded-md p-1">
          <div className="relative flex px-1">
            <button
              className="text-neutral-400 border-none outline-none focus:text-white duration-300 transition-all p-1"
              onClick={() => setEmojiPickerClose(true)}
            >
              <RiEmojiStickerLine className="text-xl hover:text-blue-500" />{" "}
            </button>
            <div className="absolute bottom-16 right-[-1] z-10" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                open={emojiPickerOpen}
                onEmojiClick={handleEmojiPicker}
                autoFocusSearch={false}
              />
            </div>
          </div>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 text-lg bg-transparent rounded-md border-none outline-none focus:ring-0"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="relative flex">
            <button
              onClick={handleAttachmentClick}
              className="text-neutral-400 border-none outline-none focus:text-white duration-300 transition-all p-1" // Added padding for better touch target
            >
              <GrAttachment className="text-xl hover:text-blue-500" />{" "}
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAttachmentChange}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="rounded-full flex items-center justify-center hover:text-blue-700 border-none outline-none focus:text-white duration-300 transition-all p-1" // Added padding for better touch target
          >
            <IoSend className="text-xl" /> {/* Reduced icon size */}
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageBar;
