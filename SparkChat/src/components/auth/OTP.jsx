/* eslint-disable react/prop-types */
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { api, VERIFY_OTP } from "@/constants/api";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/store";

const OTP = ({ otp, user }) => {
  const navigate = useNavigate();

  const { setUserInfo } = useAppStore();
  const [value, setValue] = useState("");

  const handleOtpVerify = async () => {
    try {
      const res = await api.post(VERIFY_OTP, {
        otpId: otp._id,
        otp: value,
        email: user.email,
        username: user.username,
        password: user.password,
      });

      if (res.data.newUser) {
        toast.success("OTP Verified Successfully");
        setUserInfo(res.data.newUser);
        navigate("/profile-setup");
      }
      // console.log(res.data);
    } catch (error) {
      toast.error(error.res?.data?.message || "OTP Verification Failed");
    }
  };

  return (
    <div className="space-y-2 flex items-center flex-col justify-center ">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="">
        <p>Please enter the OTP send to your Email</p>
      </div>

      <div className="py-5">
        <Button onClick={handleOtpVerify} className="w-full py-4 text-blue-500">
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default OTP;
