import { useEffect } from "react";
import NewDm from "../dm/NewDm";
import ProfileInfo from "./ProfileInfo";
import { api, GET_CONTACT_DM } from "@/constants/api";
import { useAppStore } from "@/store/store";
import ContactList from "./ContactList";
const ContactBox = () => {
  const { selectedDM, setSelectedDM, selectedChatData } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await api.get(GET_CONTACT_DM);
        setSelectedDM(res.data.contacts);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, [setSelectedDM, selectedChatData]);
  // console.log(selectedDM);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] poppins-medium bg-black border-r-2 border-[#2f303b]">
      <div className="pt-2 flex p-4 mt-4 text-4xl">
        {/* <img src={logo} alt="" className='h-24 w-24' /> */}
        Spark <span className="text-blue-500 pl-1 "> Chat</span>
      </div>
      <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
      </div>
      {/* Channel  */}
      {/* <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Channel" />
        </div>

      </div> */}
      <div className="h-[38vh] overflow-y-auto scrollbar-hidden">
        <ContactList contacts={selectedDM} />
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactBox;

// eslint-disable-next-line react/prop-types
export const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest poppins-regular text-neutral-400 font-light pl-10 text-opacity-90 text-sm">
      {" "}
      {text}
    </h6>
  );
};
