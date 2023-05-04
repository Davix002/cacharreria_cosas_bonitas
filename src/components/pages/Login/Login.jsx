import Form from "./Form";

const Login = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="bg-gray-200 w-full flex items-center justify-center lg:w-1/2">
        <Form />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-r from-yellowOrange-600   to-romTurquoise-600  rounded-full" />
        <div className="w-full absolute bottom-0 h-1/2 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
