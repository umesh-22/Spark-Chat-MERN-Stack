import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";
import { api, LOGIN } from "@/constants/api";

const Login = () => {
  const naviagte = useNavigate();
  const { setUserInfo } = useAppStore();
  const [loading, setloading] = useState(false);

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setloading(true)
    if (validateSignin(signinForm)) {
      try {
        const res = await api.post(LOGIN, signinForm);
        // console.log(res.data.userExist);
        toast.success("Sign In Successful");
        setUserInfo(res.data.userExist);
        if (res.data.userExist.profileSetup) {
          naviagte("/chat");
        } else {
          naviagte("/profile-setup");
        }
      } catch (error) {
        toast.error(error.res?.data?.message || "Sign In Failed");
      }
      finally{
        setloading(false)
      }
    }
  };

  const validateSignin = (data) => {
    if (!data.email || data.password.length === 0) {
      toast.error("All fields are required");
      setloading(false)
      return false;
    }
    return true;
  };

  return (
    <div>
      <Card className="bg-gray-950 text-neutral-300 border-none">
        <CardHeader>
      
        </CardHeader>
        <CardContent className="space-y-2 ">
          <div className="space-y-1">
            <Label htmlFor="username" className="text-[#ff4f5b]">
              @Username / Email
            </Label>

            <Input
              id="username"
              name="email"
              value={signinForm.email}
              className="rounded-full  focus:border-[#375a64]"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-[#ff4f5b]">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              className="rounded-full  focus:border-[#375a64]"
              value={signinForm.pas}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={loading}
            onClick={handleSignin}
            className="w-full text-[#ff4f5b] bg-[#375a64]"
          >
           { loading ? 'Signing In' :'Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
