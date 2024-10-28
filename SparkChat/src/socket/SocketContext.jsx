import { useAppStore } from "@/store/store";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const {
    userInfo,
    selectedDM,
    setSelectedDM,
    unreadMessages,
    setUnreadMessages,
  } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io.connect(import.meta.env.VITE_BACKEND_URI , {
        query: { userId: userInfo._id },
        withCredentials: true,
      });

      const handleReceive = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();

        const contactId =
          message.sender._id === userInfo._id
            ? message.recipient._id
            : message.sender._id;
        const isContactExist = selectedDM.some(
          (contact) => contact._id === contactId
        );

        if (!isContactExist) {
          setSelectedDM([...selectedDM, message.sender]);
        }

        if (
          selectedChatType !== null &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        } else {
          setUnreadMessages({
            ...unreadMessages,
            [contactId]: (unreadMessages[contactId] || 0) + 1,
          });
        }
      };

      socket.current.on("connect", () => {
        // console.log("Connected to socket");
      });

      socket.current.on("recieveMessage", handleReceive);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo, selectedDM, setSelectedDM, unreadMessages, setUnreadMessages]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
