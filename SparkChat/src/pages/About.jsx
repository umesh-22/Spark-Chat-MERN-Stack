import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/chat");
  };
  return (
    <div className="bg-black min-h-screen flex flex-col text-white/70   p-5 gap-10 poppins-regular">
      <div className="flex   w-[80vw] md:w-max">
        <IoArrowBack
          onClick={handleBackButton}
          className="text-5xl text-white/70 cursor-pointer pr-3 hover:text-blue-500"
        />
        <h1 className="text-3xl lg:text-5xl text-center text-white/70 ">About</h1>
      </div>
      <div className="flex flex-col min-h-screen justify-normal items-center  space-y-2 px-5">
        <p className="text-xl">
          Welcome to <strong className="text-blue-500">SparkChat</strong> – a seamless, modern chat
          application designed to connect you with friends, family, and
          colleagues.
        </p>
        <p className="text-lg">
          Built with user experience and real-time communication in mind,
          SparkChat ensures that every message is just a click away.
        </p>
        <div className="">
          <h2 className="text-2xl font-semibold mb-1 text-blue-500 ">Features</h2>
          <ul className="list-disc list-inside space-y-2 ml-5">
            <li>
              <strong>Real-Time Messaging</strong>: Instantly send and receive
              messages with low latency, keeping conversations alive and
              dynamic.
            </li>
            {/* <li>
              <strong>File Sharing</strong>: Easily share files, images, and
              documents with a secure and efficient uploading process.
            </li> */}
            <li>
              <strong>Emoji Support</strong>: Express yourself with a wide range
              of emojis to make your conversations more engaging.
            </li>
          </ul>
         
        </div>
        <div className="">
        <h2 className="text-2xl font-semibold mb-1 text-blue-500">Upcoming Features</h2>
          <p>
            <strong>Channel Feature</strong>: Soon, SparkChat will introduce
            channels – a powerful way to bring groups together for organized,
            topic-based discussions. Channels will let users communicate with
            multiple people at once, making it easy to collaborate and stay
            updated.
          </p>
          <h2 className="text-2xl font-semibold mb-1 text-blue-500">Security Commitment</h2>
          <p>
            We prioritize user privacy and security. In an upcoming update, we
            will implement{" "}
            <strong>
              end-to-end encryption using Diffie-Hellman key exchange
            </strong>
            . This will ensure that your messages remain private and accessible
            only to you and the intended recipient.
          </p>
          <h2 className="text-2xl font-semibold mb-1 text-blue-500">
            Join Us on the Journey!
          </h2>
          <p>
            We’re constantly evolving SparkChat to offer a more intuitive,
            feature-rich chat experience. Keep an eye out for exciting updates,
            and thank you for being a part of SparkChat’s journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
