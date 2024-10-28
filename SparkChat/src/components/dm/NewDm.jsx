import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { api, SEARCH_USER } from "@/constants/api";
import { useAppStore } from "@/store/store";
import LottieAinme from "./LottieAnime";

import search from "../../assets/search.json";


const NewDm = () => {


  const { setSelectedChatData, setSelectedChatType } = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSelectedContact = (contact) => {
    // console.log(contact);
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleSearchContact = async (search) => {
    try {
      const res = await api.post(SEARCH_USER, { searchTerm: search });
      // console.log(res.data);
      setSearchResults(res.data.contacts || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search Failed");
    }
  };

  const handleInputChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search) {
      handleSearchContact(search);
    } else {
      setSearchResults([]);
    }
  };
// For lottie animation
  const options = {
    loop: true,
    autoplay: true,
    animationData: search,
    rendererSettings: {},
  };

  return (
    <div className="poppins-regular">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus className="hover:text-blue-500" onClick={() => setOpenNewContactModal(true)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select New Contacts</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select the contacts</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              onChange={handleInputChange}
              type="text"
              placeholder="Search Contacts"
              value={searchTerm}
              className=" bg-gray-700 rounded-lg p-6 border-none"
            />

           
            <ScrollArea className="h-[250px] scrollbar-hidden">
            {
              searchTerm && !searchResults.length  && (
                <span className="text-blue-500 text-center"> No user found.Please check the user name again. </span>
              )
             }
             

              {searchResults.length > 0 ? (
                searchResults.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center cursor-pointer gap-3"
                    onClick={() => handleSelectedContact(contact)}
                  >
                    <div className="flex gap-5 items-center w-full justify-between ">
                      <div className="flex gap-3 p-2 justify-between items-center titlecase ">
                        <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                          {contact?.profileImage ? (
                            <AvatarImage
                              src={contact?.profileImage}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div
                              className={`bg-[#375a64] uppercase h-12 w-12  text-2xl border-[1px] flex justify-center items-center  text-white-500 rounded-full`}
                            >
                              {contact?.username.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                        <h3 className="capitalize">{contact?.username}</h3>
                      </div>
                    </div>
                    <div className="flex p-3 justify-center items-center ">
                      {/* <span>{contact.email || "No email available"}</span> */}
                    </div>
                  </div>
                ))
              ) : (
                <div className="">
                 <LottieAinme height={200} weight={200} options={options} />
                  <div className="text-opacity-80 text-white flex flex-col items-center text-xl transition-all duration-300 text-center">
                    <h3 className="font-mono">
                      Hi <span className="text-blue-500"></span>Welcome to
                      <span className="text-blue-500"> Spark Chat.</span>
                     
                    </h3>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewDm;
