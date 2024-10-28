import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api, SEND_OTP } from "@/constants/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OTP from "./OTP";

const Signup = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otp, setOpt] = useState();
  const [loading, setLoading] = useState(false);

  const [signupForm, SetSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    SetSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const validateSignup = (data) => {
    if (!data.email || data.password.length === 0) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateSignup(signupForm)) {
      try {
        setLoading(true);
        const response = await api.post(SEND_OTP, {
          email: signupForm.email,
          username: signupForm.username,
        });
        // console.log(response.data);
        setOpt(response.data.newOTP);
        setIsDialogOpen(true);
        toast.success("OTP Send");
      } catch (error) {
        toast.error(error.response?.data?.message || "Sign Up Failed");
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div>
      <Card className="bg-black text-neutral-300  border-none">
        <CardHeader></CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username" className="text-[#ff4f5b]">
              User Name
            </Label>
            <Input
              className="rounded-full  focus:border-[#375a64]"
              id="username"
              name="username"
              value={signupForm.username}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-[#ff4f5b]">
              {" "}
              Email
            </Label>
            <Input
              className="rounded-full focus:border-[#375a64]"
              id="email"
              name="email"
              value={signupForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-[#ff4f5b]">
              Password
            </Label>
            <Input
              className="rounded-full  focus:border-[#375a64]"
              type="password"
              id="password"
              name="password"
              value={signupForm.password}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="w-full">
              <Button
                disabled={loading}
                onClick={handleSignUp}
                className="w-full bg-[#375a64] text-[#ff4f5b]"
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 text-center text-neutral-500">
              <DialogHeader>
                <DialogTitle className="text-center p-2">
                  OTP Verification
                </DialogTitle>
                <DialogDescription className="text-center">
                  {setOpt && <OTP user={signupForm} otp={otp} />}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};
// red #ff4f5b  gray #375a64
export default Signup;
