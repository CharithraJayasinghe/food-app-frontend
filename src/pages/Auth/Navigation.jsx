import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineShoppingCart, AiOutlineUserAdd,} from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/autheSlice";
import "./Navigation.css";



const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate("/login");
        } catch (error) {
          console.error(error);
        }
      };

      if (!userInfo) {
        return null;
      }


    return <div
        className={`xl:flex lg:flex md:flex sm:flex flex-col  text-black bg-[#ffffff] fixed-center`}
        id="navigation-container">
            
        <div className="flex flex-raw justify-center space-x-20 mb-10">
            <Link
                to="/"
                className="flex items-center transition-transform transform hover:translate-x-2"
            >
                <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                <span className="mt-[3rem]">HOME</span>{" "}
            </Link>


            <Link
                to="/favourites"
                className="flex items-center transition-transform transform hover:translate-x-2"
            >
                <FaRegHeart className="mr-2 mt-[3rem]" size={26} />
                <span className="mt-[3rem]">FAVOURITE</span>{" "}
            </Link>


            <div className="relative">
            <button 
             onClick = {toggleDropdown}
             className="flex items-center text-gray-8000 focus:outline-none ">
                   {userInfo ?(
                    <span className="text-black mt-[3rem]">{userInfo.firstname}</span>
                    
                   ): (<></>
                   )} 
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 mt-[3rem]${
                                dropdownOpen ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
          )}
            </button>
            {dropdownOpen && userInfo && (
          <ul
            className={`absolute mt-3 space-y-2 bg-white  text-gray-600 ${
              !userInfo.isAdmin ? "-down-20" : "-down-60"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
        </div>
 
        </div> 
        
        



    </div>
   
    
  };
  
  export default Navigation;