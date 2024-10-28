import ChatContainner from "./ChatContainner";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";

const ChatBox = () => {
  return (
    <div className="fixed top-0 h-[90vh] md:h-[100vh]  w-[100vw] flex flex-col bg-black md:static md:flex-1">
      <ChatHeader />
      <ChatContainner />
      <MessageBar />
    </div>
  );
};

export default ChatBox;
