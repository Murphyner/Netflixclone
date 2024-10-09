import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";


function FilterRes() {
    const [show , setShow] = useState(false)
  return (
    <div className="block lg:hidden relative">
      <div onClick={() => setShow(!show)} className="text-white flex items-center text-[12px] font-medium">
        Browse
        <MdOutlineArrowDropDown className="text-xl" />
      </div>
      <ul className={`text-white bg-black rounded-sm border-2 border-white  bg-opacity-90 text-center py-2 px-6 gap-5 absolute top-6  w-[160px]  ${show ? 'grid grid-col-1' : 'hidden'}`}>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/tvshows'}>Tv Shows</Link>
            </li>
            <li>
              <Link to={'/movies'}>Movies</Link>
            </li>
            <li>
              <Link to={'/mylist'}>My List</Link>
            </li>
            <li>
              <Link to={'/latest'}>Latest</Link>
            </li>
      </ul>
    </div>
  )
}

export default FilterRes
