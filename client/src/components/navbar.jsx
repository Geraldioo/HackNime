import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Navbar = () => {
  const navigate = useNavigate();

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
        className="w-full z-30 sticky top-0 bg-slate-600 shadow-lg"
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
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>
          <div
            className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
                <li>
                  <img
                    src="/hck-logo.png"
                    alt="logo"
                    className="py-1 px-4 lg:-ml-2 w-28"
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
                  <a
                    className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                    href="#"
                  >
                    My Favorite<span className="text-red-600 fw-bold"> *</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
            id="nav-content"
          >
            <div className="auth flex items-center w-full md:w-full">
              <button className="bg-blue-500 text-white  p-2 rounded border border-gray-300 mr-4 hover:bg-blue-800 hover:text-gray-100">
                Upgrade<span className="text-yellow-400 fw-bold hover:bg"> *</span>
              </button>
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
