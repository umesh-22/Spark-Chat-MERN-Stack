;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';

const AuthPage = () => {
  return (
    <>
      <div className="bg-black flex items-center justify-center min-h-screen text-yellow-400 px-4 poppins-medium">
        <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
          <div className="text-center">
           
            {/* <img src={logo} alt="logo" className='h-24 w-auto mx-auto mb-4 sm:h-32 md:h-40' /> */}
            <h1 className="poppins-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500">
              Welcome to SparkChat✌️
            </h1>
            <p className="poppins-light text-sm sm:text-base md:text-lg  mt-2 text-[#375a64]">
              Ignite Conversations, Spark Connections
            </p>
          </div>
          <div className="w-full max-w-lg">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="flex w-full bg-[#375a64] text-neutral-400">
                <TabsTrigger className="w-1/2 text-sm sm:text-base  data-[state=active]:text-white data-[state=active]:bg-blue-500 data-[state=inactive]:bg-[#375a64]"  value="signin">
                  Sign In
                </TabsTrigger>
                <TabsTrigger className="w-1/2 text-sm sm:text-base data-[state=active]:text-white data-[state=active]:bg-blue-500 data-[state=inactive]:bg-[#375a64] " value="signup">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="p-4 text-sm sm:text-base ">
               <Login />
              </TabsContent>
              <TabsContent value="signup" className="p-4 text-sm sm:text-base">
               <Signup />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
