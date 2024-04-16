import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../constant";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUpgrade = async () => {
    const { data } = await axios({
      method: "GET",
      url: `${BASE_URL}/payment`,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        console.log(result);
        await axios({
          method: "PATCH",
          url: `${BASE_URL}/upgrade`,
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
          data: {
            OrderId: data.OrderId,
          },
        });
      },
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();

    navigate("/login");
    Swal.fire({
      title: "You've Been Log Out",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
  };
  return (
    <>
      <div
        id="header"
        className="w-full z-30 sticky top-0 bg-slate-600 shadow-lg md:relative md:top-0 md:py-2"
      >
        <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
          >
            <svg
              className="fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              onClick={toggleMenu}
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center md:w-auto w-full md:order-1`}
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-start text-base text-white pt-4 md:pt-4">
                <li>
                  <img
                    src="/hck-logo.png"
                    alt="logo"
                    className="py-1 px-4 lg:-ml-2 w-32"
                  />
                </li>
                <li>
                  <Link to={"/"}>
                    <button className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                      Anime List
                    </button>
                  </Link>
                </li>
                <li>
                  {localStorage.status === "Premium" ? (
                    <Link to={"/favorite"}>
                      <button className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                        My Favorite
                        <span className="text-red-600 fw-bold"> *</span>
                      </button>
                    </Link>
                  ) : (
                      <h1 hidden className="inline-block no-underline text-red-600 hover:text-white font-medium text-sm py-2 px-4 lg:-ml-2">
                        You Need Upgrade To Premium for enjoy Favorite Feature
                        <span className="text-yellow-600 fw-bold"> *</span>
                      </h1>
                  )}
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
            id="nav-content"
          >
            <div className="auth flex items-center w-full md:w-full">
              {localStorage.status === "Premium" ? (
                <button
                  hidden
                  onClick={handleUpgrade}
                  className="bg-blue-500 text-white p-2 rounded border border-gray-300 mr-4 hover:bg-yellow-300 hover:text-gray-100"
                >
                  Upgrade
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="bg-blue-500 text-white p-2 rounded border border-gray-300 mr-4 hover:bg-yellow-300 hover:text-gray-100"
                >
                  Upgrade
                </button>
              )}
              {localStorage.access_token ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-gray-200 border border-gray-300 p-2 rounded hover:bg-red-800 hover:text-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="bg-blue-600 text-gray-200 p-2 px-5 rounded hover:bg-blue-500 hover:text-gray-100">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
