import Form from "./Form";

const Login = () => {
  return (
    <div className="flex w-full h-screen ">
      <div className=" bg-white sm:white w-full flex items-center justify-center lg:w-1/2 ">
        <Form  />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white">
        <div className="w-60 h-60 bg-gradient-to-r from-yellowOrange-500 via-lime-300  to-romTurquoise-500  rounded-full" />
        <div className="w-full absolute bottom-0 h-1/2 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
