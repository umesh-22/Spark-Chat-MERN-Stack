import LottieAinme from "../dm/LottieAnime";

import robot from "../../assets/roabot.json";



const EmptyChatBox = () => {

  const options = {
    loop: true,
    autoplay: true,
    animationData: robot,
    rendererSettings: {},
  };



  return (
    <div className="flex-1 md:bg-black md:flex flex-col justify-center items-center hidden transition-all duration-1000">
     <LottieAinme height={220} width={220} options={options} />
      <div className="text-opacity-80 text-white flex flex-col gap-5 mt-10 items-center lg:text-4xl text-3xl transition-all duration-300 text-clip">
        <h3 className="font-mono">
          Hi <span className="text-blue-500"></span>Welcome to
          <span className="text-blue-500"> Spark Chat.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatBox;
