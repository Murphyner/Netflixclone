import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import FilterRes from "./FilterRes";
import { PopUpContext } from "../Context/PopUpContext";
import { useGetDataQuery } from "../store/tmdbApi";
import { genres, tvShowsGenres } from "../store/URL";
import { VscListSelection } from "react-icons/vsc";
import { CiGrid41 } from "react-icons/ci";

function Nav() {
  const [input, setInput] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [scroll, setScroll] = useState(0);
  const { query, setQuery } = useContext(PopUpContext);
  const { data } = useGetDataQuery({ endpoint: genres }); 
  const [genreId, setGenreId] = useState(0); 
  const username = localStorage.getItem("username");

  const location = useLocation();
  const navigate = useNavigate();
  

  // Sticky Nav on Scroll
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setScroll(scrollY);
      setSticky(scrollY > 20); 
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length > 0) {
      navigate("/search");
    } else {
      navigate("/"); 
    }
  };
  const isKids = location.pathname === "/kids" 
  const isMovies = location.pathname === "/movies" || /^\/movies\/\d+$/.test(location.pathname) || location.pathname === '/moviesgrid'
  const isTvShowsPage =
    location.pathname === "/tvshows" ||
    location.pathname === "/tvshowsgrid" || 
    /^\/\d+$/.test(location.pathname) 
  const isMyList = location.pathname === "/mylist";
  const backgroundClass =
    isMyList || (isTvShowsPage && sticky)
      ? "bg-bg-custom opacity-100"
      : sticky
        ? "bg-black opacity-95"
        : "bg-transparent";

  return (
    <nav
      className={`hidden md:block font-medium text-white fixed transition-all duration-700  w-full z-20 left-0 ${backgroundClass}`}
    >
      <div className="flex justify-between w-[93%] mx-auto items-center p-2 h-16">
        <div className="flex items-center gap-6 lg:gap-8 w-[50%] lg:w-[75%]">
          <Link to={"/"}>
            <img
              src="/assets/images/logo.png"
              className="h-[25px]"
              alt="Logo"
            />
          </Link>
          <ul className="gap-4 text-sm items-center hidden lg:flex w-[88%]">
            <li className="cursor-pointer">
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/tvshows"}>TV Shows</Link>
            </li>
            <li>
              <Link to={'/movies'}>Movies</Link>
            </li>
            <li>
              <Link>Latest</Link>
            </li>
            <li>
              <Link to={"/mylist"}>My List</Link>
            </li>
            <li>
              <Link>Browse by Languages</Link>
            </li>
          </ul>
          <FilterRes />
        </div>
        <div className="flex items-center gap-5">
          <div className="relative text-white flex items-center">
            <input
              onInput={(e) => handleInput(e)}
              type="text"
              className={`p-1 transition-all pl-8 text-sm duration-300 bg-transparent ${input ? "w-[220px]" : "w-0"
                }`}
              placeholder="Titles, people, genres"
            />
            <IoSearchOutline
              className={`absolute top-[1px] text-2xl ${input ? "left-1" : ""}`}
              onClick={() => setInput(!input)}
            />
          </div>
          {isKids ? (
            <div className="flex items-center gap-2">
              <div>
                <img className="h-7" src="/assets/images/kids2.png" alt="" />
              </div>
              <Link to={'/'} className="bg-red-600 py-1 px-3 rounded">
                Exit Kids
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden lg:block text-sm font-medium">
                <Link to={"kids"}>Kids</Link>
              </div>
              <div className="cursor-pointer">
                <LuBellRing className="text-xl" />
              </div>
              <div className="profiles relative group cursor-pointer text-sm">
                <div className="flex items-center group">
                  <div className="h-8 w-8">
                    <img
                      className="h-8 rounded"
                      src="/assets/images/profil2.png"
                      alt="Profile"
                    />
                  </div>
                  <div className="text-white text-2xl">
                    <MdOutlineArrowDropDown className="group-hover:rotate-180 transition-all duration-300" />
                  </div>
                </div>
                <MdOutlineArrowDropDown className="absolute top-8 right-6 rotate-180 hidden group-hover:block text-2xl" />
                <div className="hidden absolute bg-black bg-opacity-80 flex-col gap-2 rounded w-[200px] right-2 p-3 group-hover:flex top-[50px]">
                  <Link className="flex items-center h-8 w-8 gap-3">
                    <img
                      className="h-8 w-8 rounded"
                      src="/assets/images/profil2.png"
                      alt="Profile"
                    />
                    <h2 className="hover:underline">{username}</h2>
                  </Link>
                  <Link to={"kids"} className="flex w-full items-center gap-3">
                    <img
                      className="h-8 rounded"
                      src="/assets/images/kids.webp"
                      alt="Kids"
                    />
                    <h2 className="hover:underline">Kids</h2>
                  </Link>
                  <Link to={"profiles/manage"} className="flex w-full items-center gap-3 pt-3">
                    <div className="h-8 w-8">
                      <FaPencilAlt className="text-2xl" />
                    </div>
                    <h2 className="hover:underline">Manage profiles</h2>
                  </Link>
                  <Link to={"help"} className="flex w-full items-center pb-6 gap-3">
                    <div className="h-8 w-8">
                      <IoIosHelpCircleOutline className="text-3xl" />
                    </div>
                    <h2 className="hover:underline">Help Center</h2>
                  </Link>
                  <button className="absolute w-full border-t-[1px] right-0 border-opacity-50 border-white bottom-0 py-1">
                    Sign out of Netflix
                  </button>
                </div>
              </div> 
            </>
          )}
        </div>
      </div>
      {/* Conditionally render "My List" at the bottom when on /mylist */}
      {isMyList && (
        <div className="w-full p-2">
          <h1 className="text-white w-[93%] mx-auto text-2xl font-semibold">
            My List
          </h1>
        </div>
      )}
      {isTvShowsPage && (
        <div className="w-[93%] mx-auto p-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-white  text-4xl font-semibold">Tv Shows</h1>
              <select
                onChange={(e) => {
                  navigate(`/${genreId}`);
                  setGenreId(e.target.value); // Set the selected genre ID
                }}
                className="bg-black rounded-md w-[100px] h-7 outline-none border-[1px] border-white"
              >
                {data?.genres?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-2xl flex gap-2 mr-2 justify-between border-[1px]  border-white bg-black bg-opacity-45">
              <Link to={"/tvshows"} className="border-r-[1px] border-white px-4 py-1">
                <VscListSelection />
              </Link>
              <Link to={`/tvshowsgrid`} className="p-1 cursor-pointer px-2">
                <CiGrid41 />
              </Link>
            </div>
          </div>
        </div>
      )}
      {isMovies && (
        <div className="w-[93%] mx-auto p-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-white  text-4xl font-semibold">Movies</h1>
              <select
                onChange={(e) => {
                  navigate(`movies/${genreId}`);
                  setGenreId(e.target.value); // Set the selected genre ID
                }}
                className="bg-black rounded-md w-[100px] h-7 outline-none border-[1px] border-white"
              >
                {data?.genres?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-2xl flex gap-2 mr-2 justify-between border-[1px]  border-white bg-black bg-opacity-45">
              <Link to={"/movies"} className="border-r-[1px] border-white px-4 py-1">
                <VscListSelection />
              </Link>
              <Link to={`/moviesgrid`} className="p-1 cursor-pointer px-2">
                <CiGrid41 />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
