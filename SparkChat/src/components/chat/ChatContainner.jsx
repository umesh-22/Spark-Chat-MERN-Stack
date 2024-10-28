import { api, GET_MESSAGES } from "@/constants/api";
import { useAppStore } from "@/store/store";
import moment from "moment";
import { useEffect, useRef } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { GrDocumentZip } from "react-icons/gr";

const ChatContainner = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessage,
    setSelectedChatMessage,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const BACK_END_URL = import.meta.env.VITE_BACKEND_URI;
    const res = await api.get(`${BACK_END_URL}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (event) => {
        setFileDownloadProgress(Math.round((event.loaded * 100) / event.total));
      },
    });
    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.post(GET_MESSAGES, { Id: selectedChatData._id });
        if (res.data.messages) {
          setSelectedChatMessage(res.data.messages);
        }
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    if (selectedChatData._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessage]);
  // console.log(selectedChatMessage)

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessage.map((message, index) => {
      const msgDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = msgDate !== lastDate;
      lastDate = msgDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDM(message)}
        </div>
      );
    });
  };

  const renderDM = (msg) => (
    <div
      className={`${
        msg.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {msg.messageType === "text" && (
        <div
          className={`${
            selectedChatData?._id !== msg?.sender
              ? "bg-blue-500/5 text-blue-500/90 border-blue-500/90 rounded-lg"
              : "bg-[#ff4f5b]/5 text-[#ff4f5b]/90 border-[#ff4f5b]/50 rounded-lg"
          } border inline-block p-2 px-6 my-1 max-w-[50%] break-words`}
        >
          {msg.content}
        </div>
      )}
      {msg.messageType === "file" && renderFileMessage(msg)}
      <div className="text-xs text-gray-600">
        {moment(msg.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderFileMessage = (msg) => {
    const fileType = getFileType(msg.fileURL);

    if (fileType === "image") {
      return (
        <div
          className={`${
            selectedChatData?._id !== msg?.sender
              ? "bg-blue-500/5 text-blue-500/90 border-blue-500/90 rounded-lg"
              : "bg-[#ff4f5b]/5 text-[#ff4f5b]/90 border-[#ff4f5b]/50 rounded-lg"
          } border inline-block p-2 px-6 my-1 max-w-[50%] break-words`}
          // onClick={() => downloadFile(msg.fileURL)}
        >
          <img
            src={`import.meta.env.VITE_BACKEND_URI${msg.fileURL}`}
            alt="file"
            className="w-96 h-40 object-fill object-top"
          />
          <MdFileDownload
            className="text-2xl hover:text-blue-700"
            onClick={() => downloadFile(msg.fileURL)}
          />
        </div>
      );
    }

    return (
      <div
        className={`${
          selectedChatData?._id !== msg?.sender
            ? "bg-blue-500/5 text-blue-500/90 border-blue-700/50"
            : "bg-[#ff4f5b]/5 text-[#ff4f5b]/90 border-[#ff4f5b]/50"
        } border inline-block p-4 my-1 max-w-[50%] break-words cursor-pointer rounded-lg`}
      >
        {fileType === "pdf" && (
          <span className="text-white/80 flex items-center">
            {" "}
            <FaFilePdf className="text-5xl" />{" "}
            {msg.fileURL.split("/").pop().slice(0, 10)}
            <MdFileDownload
              className="text-2xl hover:text-blue-700"
              onClick={() => downloadFile(msg.fileURL)}
            />{" "}
          </span>
        )}
        {fileType === "zip" && (
          <span className="text-white/80">
            🗜️ <GrDocumentZip /> {msg.fileURL.split("/").pop().slice(0, 10)}
            <MdFileDownload
              className="text-2xl hover:text-blue-700"
              onClick={() => downloadFile(msg.fileURL)}
            />
          </span>
        )}
        {fileType === "text" && (
          <span className="text-white/80">
            📄 Text File: {msg.fileURL.split("/").pop().slice(0, 10)}
            <MdFileDownload
              className="text-2xl hover:text-blue-700"
              onClick={() => downloadFile(msg.fileURL)}
            />
          </span>
        )}
        {fileType === "csv" && (
          <span className="text-white/80">
            📄 CSV File: {msg.fileURL.split("/").pop().slice(0, 10)}
            <MdFileDownload
              className="text-2xl hover:text-blue-700"
              onClick={() => downloadFile(msg.fileURL)}
            />
          </span>
        )}
      </div>
    );
  };

  const getFileType = (fileUrl) => {
    const extension = fileUrl.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
    if (extension === "pdf") return "pdf";
    if (["zip", "rar"].includes(extension)) return "zip";
    if (["txt", "text"].includes(extension)) return "text";
    if (extension === "csv") return "csv";
    return "file";
  };

  return (
    <div className="flex-1 scrollbar-hidden overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full xl:w-[80vw]">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatContainner;
