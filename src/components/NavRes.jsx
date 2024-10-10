import { useContext, useEffect, useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetDataQuery } from "../store/tmdbApi";
import { genres } from "../store/URL";
import { PopUpContext } from "../Context/PopUpContext";

function NavRes() {
    const [show, setShow] = useState(false);
    const [sticky, setSticky] = useState(false);
    const { query, setQuery } = useContext(PopUpContext);
    const { data } = useGetDataQuery({ endpoint: genres });
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [profileImage, setProfileImage] = useState("/assets/images/Character1.webp");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            setProfileImage(storedImage);
        } else {
            localStorage.setItem('profileImage', '/assets/images/Character1.webp')
        }
    }, []);

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY;
            if (scrollY > 20) setSticky(true);
            else setSticky(false);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInput = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        if (inputValue.length > 0) {
            navigate('/search');
        } else navigate('/');
    };

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShow(false); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const tvShows = location.pathname === '/tvshows';
    const isMyList = location.pathname === '/mylist';
    const backgroundClass = isMyList || (tvShows && sticky) ? 'bg-bg-custom opacity-100' : (sticky ? 'bg-black opacity-95' : 'bg-transparent');

    return (
        <nav ref={menuRef} className={`md:hidden block font-medium text-white fixed w-full transition-all duration-500 bg-black z-50 left-0 ${sticky ? 'opacity-100' : 'opacity-95'}`}>
            <div className='w-[93%] mx-auto pl-2 h-16 py-2 flex items-center justify-between'>
                <div className="flex items-center gap-4 ">
                    <div onClick={() => setShow(!show)}>
                        <RxHamburgerMenu className="text-3xl font-bold" />
                    </div>
                    <Link to={'/'}>
                        <img src="assets/images/logo.png" className="h-[25px]" alt="" />
                    </Link>
                </div>
                <div>
                    <input onInput={(e) => handleInput(e)} type="text" className='bg-transparent border-[1px] w-[178px] border-white border-opacity-65 rounded p-1' placeholder='Search' />
                </div>
                <div  className={`fixed min-h-screen bg-black top-16 p-2 overflow-y-auto no-scrollbar w-[300px] mx-auto z-40 left-0 transition-all duration-300 ${show ? 'translate-x-0' : '-translate-x-[100%]'}`}>
                    <div className="flex mx-auto pl-4 sm:pl-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <img className="h-8 w-8 bg-red-600 rounded" src={profileImage}/>
                                <span className="font-extrabold text-lg opacity-50">{username}</span>
                            </div>
                            <ul className="text-xl flex flex-col gap-2 font-bold opacity-60">
                                <li className="flex items-center gap-2">
                                    <img className="h-8 w-8" src="/assets/images/kids2.png" alt="" />
                                    <Link to={'/kids'}>Kids</Link>
                                </li>
                                <li>
                                    <Link to={'profiles/manage'}>Account</Link>
                                </li>
                                <li>
                                    <Link to={'/mylist'}>My List</Link>
                                </li>
                                <li>
                                    <Link>Help Center</Link>
                                </li>
                                <li>
                                    <Link>Sign out of Netflix</Link>
                                </li>
                            </ul>
                            <hr className="border-t-[1px] w-[300px] border-white border-opacity-50 absolute left-0 top-[235px]" />
                            <ul className="absolute top-[245px] text-xl font-bold opacity-60 flex flex-col gap-2">
                                {data?.genres?.map((item, i) => (
                                    <li key={i}>
                                        <Link>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isMyList && (
                <div className="w-full p-2">
                    <h1 className="text-white w-[93%] mx-auto text-2xl font-semibold">My List</h1>
                </div>
            )}
            {tvShows && (
                <div className="w-full p-2">
                    <h1 className="text-white w-[93%] mx-auto text-2xl font-semibold">Tv Shows</h1>
                </div>
            )}
        </nav>
    );
}

export default NavRes;
