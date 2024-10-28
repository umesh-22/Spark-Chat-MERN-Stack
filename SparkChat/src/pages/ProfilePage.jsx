import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store/store";
import { useState, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { api, DELETE_USER, GET_USER, UPDATE_USER } from "@/constants/api";
import { toast } from "sonner";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
//   const [hovered, setHovered] = useState(false);
  const [loading, setloading] = useState(false);

  const [userData, setUserData] = useState({
    name: userInfo?.name || "",
    userBio: userInfo?.userBio || "",
    profileImage: userInfo?.profileImage || null,
  });

  const getUserData = async () => {
    try {
      const res = await api.get(GET_USER);
      setUserInfo(res.data.user);
      setUserData((prevData) => ({
        ...prevData,
        profileImage: res.data.user.profileImage,
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  const fileInputRef = useRef();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBackButton = () => {
    navigate("/chat");
  };

  const handleFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await api.put(DELETE_USER);
      console.log(res.data);

      setUserData((prevData) => ({ ...prevData, profileImage: null }));
      await getUserData();
      toast.success("Profile deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async () => {
    try {
      setloading(true);
      let imageUrl = userData.profileImage;
      if (fileInputRef.current.files[0]) {
        const data = new FormData();
        data.append("file", fileInputRef.current.files[0]);
        data.append("upload_preset", "image_preset");

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxcctsa4l/image/upload",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const response = await api.put(UPDATE_USER, {
        ...userData,
        profileImage: imageUrl,
      });

      toast.success("Profile Updated.");
      navigate("/chat");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error(error.response?.data?.message || "Save Changes Failed");
    }
  };

  return (
    <div className="bg-black h-[100vh] flex flex-col items-center justify-center gap-10 poppins-regular">
      <div className="flex flex-col w-[80vw] md:w-max">
        <IoArrowBack
          onClick={handleBackButton}
          className="text-3xl lg:text-6xl text-white/70 cursor-pointer pr-3 hover:text-blue-500"
        />
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex justify-center items-center">
            <Avatar className="h-32 w-32 md:w-44 md:h-44 rounded-full overflow-hidden">
              {userData?.profileImage ? (
                <AvatarImage
                  src={userData?.profileImage}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="uppercase h-32 w-32 md:w-44 md:h-44 text-5xl border-[1px] flex justify-center items-center text-white rounded-full">
                  {userData?.username?.charAt(0)}
                </div>
              )}
            </Avatar>
            {userData.profileImage ? (
              <div
                onClick={handleDeleteImage}
                className="absolute inset-15 flex items-center justify-center bg-black/10 rounded-full cursor-pointer"
              >
                <FaTrash className="text-white text-3xl cursor-pointer" />
              </div>
            ) : (
              <div
                onClick={handleFileInput}
                className="absolute inset-15 flex items-center justify-center bg-black/10 rounded-full cursor-pointer"
              >
                <FaPlus className="text-white text-3xl cursor-pointer" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col text-white items-center justify-center">
            <div className="w-full p-2">
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                placeholder="Email"
                disabled
                value={userInfo?.email || "ex@gmail.com"}
              />
            </div>
            <div className="w-full p-2">
              <Label className="text-[#ff4f5b]">Name</Label>
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="text"
                placeholder="Name"
                name="name"
                value={userData?.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full p-2">
              <Label className="text-[#ff4f5b]">User Name</Label>
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="text"
                placeholder="User Name"
                name="username"
                value={userInfo?.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-full p-2">
              <Label className="text-[#ff4f5b]">Bio</Label>
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="text"
                placeholder="Bio"
                name="userBio"
                value={userData?.userBio}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            disabled={loading}
            className="w-full h-8 md:h-16 text-[#ff4f5b] bg-[#375a64] hover:bg-blue-900 transition-all duration-300"
            onClick={saveChanges}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
