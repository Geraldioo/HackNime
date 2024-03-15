import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../constant";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newInput = {
      ...input,
    };
    newInput[name] = value;

    setInput(newInput);
  };
  //   console.log(input);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Masuk");
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/login`,
        data: input,
      });
      console.log(data, "INI DATA");
      localStorage.access_token = data.token;
      localStorage.username = data.user.username;

      navigate("/");

      Swal.fire({
        title: "Success Login",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      // console.log(error, "<<< INI ERROR");
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleCredentialRes = async ({ credential }) => {
    try {
      console.log(credential, "<<<< CREDENTIALLLLLLLLL");
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/google-login`,
        data: {
          googleToken: credential,
        },
      });

      console.log(data, "<<<<<< ?????");
      localStorage.access_token = data.token;
      localStorage.name = data.name;

      navigate("/");

      Swal.fire({
        title: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "69395850274-8h7op1snhdk96ebh6l9r9np01v31lp7v.apps.googleusercontent.com",
      callback: handleCredentialRes,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } 
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              HackNime
            </h1>
            <p className="text-3xl my-4">
              Make Your Own Favorites Anime List, and Enjoy All The Time 😉
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
          </div>
          <div className="w-full py-6 z-20">
            <div className="flex flex-col items-center justify-center px-24">
              <div className="my-6 flex items-center">
                <img
                  src="/hck-logo.png"
                  alt="logo"
                  className="w-auto h-16 lg:h-20 mr-2"
                />
                <h1 className="text-6xl font-bold">HackNime</h1>
              </div>
             <div className="px-8 md:px-64 lg:px-52" id="buttonDiv"></div><br />
            <p className="text-gray-100">Or Use Your Email Account</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  onChange={handleInputChange}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                  Login
                </button>
              </div>
              <div className="mt-4 text-sm text-center font-semibold">
                <p>
                  Don't have account yet ? &nbsp;
                  <Link to={"/register"}>
                    <span className="text-white hover:underline hover:text-blue-700">
                      Sign Up Here
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
