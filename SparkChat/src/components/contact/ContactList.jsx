/* eslint-disable react/prop-types */
import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Title } from "./ContactBox";

import chat from "../../assets/chat.json";


import LottieAinme from "../dm/LottieAnime";

const ContactList = ({ contacts, channel = false }) => {
  const {
    setSelectedChatType,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatMessage,

    selectedDM,
    unreadMessages,
    setUnreadMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (channel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
      setSelectedChatData(contact);

      setUnreadMessages({
        ...unreadMessages,
        [contact._id]: 0,
      });
    }

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
  };
  const options = {
    loop: true,
    autoplay: true,
    animationData: chat,
    rendererSettings: {},
  };

  // console.log(selectedDM.length);

  return (
    <div className="mt-5">
      {contacts && (
        <div className="p-1">
          <Title text="Chats" />
        </div>
      )}
      {selectedDM.length === 0 && (
        <div className=" flex flex-col items-center justify-center">
          <LottieAinme height={140} width ={150} options={options} />
          <p className="poppins-light">
            Ignite Conversations, <br />{" "}
            <span className="text-blue-500">Spark Connections.</span>{" "}
          </p>
        </div>
      )}

      {selectedDM.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#375a64]"
              : "hover:bg-[#375a64]"
          } ${
            unreadMessages[contact._id]
              ? "font-bold text-[#ff4f5b]"
              : "text-neutral-500"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start">
            {!channel && (
              <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                {contact?.profileImage ? (
                  <AvatarImage
                    src={contact?.profileImage}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-2xl border-[1px] flex justify-center items-center rounded-full text-[#ff4f5b]`}
                  >
                    {contact?.username.charAt(0)}
                  </div>
                )}
              </Avatar>
            )}
            <span className="text-blue-500 capitalize text-xl">
              {contact?.name || contact?.username}
            </span>
            {unreadMessages[contact._id] > 0 && (
              <span className="ml-2 bg-red-500 rounded-full text-xs px-2 py-1 text-white">
                {unreadMessages[contact._id]}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
