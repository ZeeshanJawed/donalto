/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { useJobContext } from "../context/jobContext";
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { search, setSearch } = useJobContext();
  const { userLogout } = useAuthContext();
  const [path, setPath] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to ensure the width is set
    handleResize();

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSidebarToggle = () => {
    if (showSidebar) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        setShowSidebar(false);
      }, 500); // The timeout should match the duration of the slide-out animation
    } else {
      setShowSidebar(true);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={userLogout} key="3">
        <div className="flex flex-row gap-2 items-center">
          <CiLogout /> Logout
        </div>
      </Menu.Item>
    </Menu>
  );
  const items = [
    {
      key: "1",
      label: <a onClick={() => navigate("/senior")}>Senior</a>,
    },
    {
      key: "2",
      label: <a onClick={() => navigate("/designers")}>Designers</a>,
    },
    {
      key: "3",
      label: <a onClick={() => navigate("/planning")}>Planning</a>,
    },
    {
      key: "4",
      label: <a onClick={() => navigate("/purchase")}>Purchase</a>,
    },
    {
      key: "4",
      label: <a onClick={() => navigate("/factory")}>Factory</a>,
    },
  ];

  return (
    <>
      {path === "/dashboard" && (
        <div className=" fixed top-0 z-10 top-bar bg-[#F5F8FF] p-2 right-0 flex flex-row justify-between px-6 items-center h-16 w-full  lg:w-[82%]">
          <div className="lg:w-[45%] ml-8 lg:ml-0 h-full text-[#151D48] font-[600] text-2xl flex items-center">
            Dashboard
          </div>
          <div className="lg:w-[55%]  h-full gap-2 flex flex-row lg:justify-between justify-end items-center">
            <div className="lg:w-[50%]  hidden rounded-lg h-10 bg-white px-5 flex-row  gap-1 lg:flex items-center">
              <IoSearch className=" text-[#5D5FEF] w-[24px] text-2xl" />
              <input
                type="text"
                placeholder="Search Here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" focus:border-0 placeholder:text-[#737791] font-normal focus:outline-none h-7  text-slate-600  placeholder:font-light text-sm w-[70%]"
              />
            </div>
            <div className="lg:w-[50%]  rounded-lg h-10    gap-1 flex flex-row items-center">
              <div className="bg-[#FFFAF1] sm:flex cursor-pointer rounded-lg hidden justify-center items-center w-8 h-8 relative ">
                <span className="absolute top-1 right-1 bg-[#EB5757] w-1 h-1 rounded-full"></span>
                <IoMdNotificationsOutline className="text-[#FFA412] text-lg" />
              </div>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="lg:w-[75%] sm:w-[200px] w-[150px] p-2 cursor-pointer flex items-center justify-between">
                  <div className="flex justify-start flex-row gap-3 items-center">
                    <img
                      src="/assets/images/profile.jpeg"
                      className=" rounded-xl w-[41px] h-[41px] "
                    />
                    <div>
                      <p className="text-[#151D48] text-sm font-medium">
                        Mushfiq
                      </p>
                      <p className="text-[#737791] text-xs font-normal">
                        Admin
                      </p>
                    </div>
                  </div>
                  <FaAngleDown className="text-[#333333] text-sm" />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      )}

      {(path === "/teams" || path === "/clients") && (
        <div className=" fixed top-0 z-10  bg-white p-2 right-0 flex flex-row justify-between md:px-6 ps-6 pe-2 items-center h-20 w-full  lg:w-[82%]">
          <div className="w-[50%] lg:ms-0 ms-8 h-full text-[#001942]  sm:text-2xl text-lg font-light flex items-center">
            {path === "/teams" ? (
              <>
                Your &nbsp; <span className="font-semibold">Teams</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Clients</span>
              </>
            )}
          </div>

          <div className="w-[250px] rounded-lg h-10 justify-end   gap-1 flex flex-row items-center">
            <div className="md:w-[70%] w-[90%] p-1 cursor-pointer justify-end flex items-center ">
              <div className="flex justify-end flex-row md:gap-3 gap-1 items-center">
                <img
                  style={{
                    boxShadow: "0px 2px 11px 0px rgba(0, 0, 0, 0.29)",
                  }}
                  src="/assets/images/teamProfile.jpeg"
                  className=" rounded-xl w-[41px] h-[41px] "
                />
                <div>
                  <p className="text-[#151D48] text-sm font-medium">
                    Varun Kubal
                  </p>
                  <p className="text-[#737791] text-xs font-normal">Senior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(path === "/designers" ||
        path === "/senior" ||
        path === "/sales" ||
        path === "/sales-team-table") && (
        <div className=" fixed top-0 z-10  bg-white border-b border-[rgba(0, 0, 0, 0.10)] p-2 right-0 flex flex-row justify-between lg:ps-10 ps-16 px-10 items-center h-20 w-full  lg:w-[82%]">
          <div className="md:w-[40%] w-[180px] h-full   flex items-center">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
              trigger={["click"]}
            >
              <div className=" bg-[#F4F6F8] cursor-pointer rounded-xl px-4 items-center font-medium flex flex-row md:text-lg text-[#000000] justify-between w-[230px] p-2">
                {path === "/sales" || path === "/sales-team-table"
                  ? "Sales team"
                  : "Designing team"}
                <FaCaretDown />
              </div>
            </Dropdown>
          </div>
          <div className="w-[60%] h-full  flex flex-row md:justify-between justify-end items-center">
            <div className="md:w-[70%] hidden rounded-lg h-10 bg-[#F4F6F8] border-[#E9E9E9] border custom-search-shadow px-5 flex-row  gap-1 md:flex items-center">
              <input
                type="text"
                placeholder="Find Something"
                className=" focus:border-0 bg-[#F4F6F8] placeholder:text-[#787878]  focus:outline-none h-7  text-[#272626] font-medium placeholder:font-medium text-sm w-[94%]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g opacity="0.3">
                  <path
                    d="M15.5 14H14.71L14.43 13.73C15.0549 13.0039 15.5117 12.1487 15.7675 11.2256C16.0234 10.3024 16.072 9.33413 15.91 8.38998C15.44 5.60998 13.12 3.38997 10.32 3.04997C9.33559 2.92544 8.33576 3.02775 7.397 3.34906C6.45824 3.67038 5.60542 4.20219 4.90381 4.90381C4.20219 5.60542 3.67038 6.45824 3.34906 7.397C3.02775 8.33576 2.92544 9.33559 3.04997 10.32C3.38997 13.12 5.60998 15.44 8.38998 15.91C9.33413 16.072 10.3024 16.0234 11.2256 15.7675C12.1487 15.5117 13.0039 15.0549 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.49997 14C7.00997 14 4.99997 11.99 4.99997 9.49997C4.99997 7.00997 7.00997 4.99997 9.49997 4.99997C11.99 4.99997 14 7.00997 14 9.49997C14 11.99 11.99 14 9.49997 14Z"
                    fill="black"
                  />
                </g>
              </svg>
            </div>
            <div className="md:w-[30%] rounded-lg h-10 justify-end md:gap-6 gap-2   px-2 flex flex-row items-center">
              <div className="bg-[#F2F2F2] cursor-pointer rounded-full flex justify-center items-center w-10 h-10 relative ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 19V10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10V19M6 19H18M6 19H4M18 19H20M11 22H13"
                    stroke="#41416E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4Z"
                    stroke="#41416E"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div className="bg-[#F2F2F2] cursor-pointer rounded-full flex justify-center items-center w-10 h-10 relative ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.1251 11.25H19.8751C19.9746 11.25 20.0699 11.2105 20.1403 11.1402C20.2106 11.0698 20.2501 10.9745 20.2501 10.875V8.25C20.2502 8.15148 20.2308 8.05391 20.1932 7.96286C20.1556 7.87182 20.1003 7.78908 20.0307 7.71938L14.7807 2.46938C14.711 2.39975 14.6283 2.34454 14.5372 2.3069C14.4462 2.26926 14.3486 2.24992 14.2501 2.25H5.2501C4.85227 2.25 4.47074 2.40804 4.18944 2.68934C3.90813 2.97064 3.7501 3.35218 3.7501 3.75V10.875C3.7501 10.9745 3.78961 11.0698 3.85993 11.1402C3.93026 11.2105 4.02564 11.25 4.1251 11.25ZM14.2501 4.125L18.3751 8.25H14.2501V4.125ZM21.0001 14.2997C20.9833 14.4925 20.8943 14.6718 20.7508 14.8017C20.6074 14.9315 20.4202 15.0024 20.2267 15H18.0001V16.5H19.4748C19.6683 16.4974 19.8557 16.5682 19.9992 16.6981C20.1427 16.828 20.2317 17.0075 20.2482 17.2003C20.255 17.3029 20.2407 17.4058 20.2061 17.5026C20.1714 17.5994 20.1173 17.6881 20.0469 17.7631C19.9766 17.8381 19.8916 17.8978 19.7972 17.9385C19.7028 17.9793 19.601 18.0002 19.4982 18H18.0001V19.4747C18.0027 19.6682 17.9319 19.8556 17.802 19.9991C17.6721 20.1426 17.4926 20.2316 17.2998 20.2481C17.1972 20.2549 17.0943 20.2406 16.9975 20.206C16.9007 20.1713 16.812 20.1172 16.737 20.0468C16.662 19.9765 16.6023 19.8915 16.5615 19.7971C16.5208 19.7027 16.4999 19.6009 16.5001 19.4981V14.25C16.5001 14.0511 16.5791 13.8603 16.7198 13.7197C16.8604 13.579 17.0512 13.5 17.2501 13.5H20.2501C20.3529 13.4998 20.4547 13.5207 20.5491 13.5615C20.6435 13.6022 20.7285 13.6619 20.7988 13.7369C20.8691 13.8119 20.9233 13.9006 20.9579 13.9974C20.9926 14.0942 21.0069 14.1971 21.0001 14.2997ZM6.0001 13.5H4.5001C4.30118 13.5 4.11042 13.579 3.96977 13.7197C3.82911 13.8603 3.7501 14.0511 3.7501 14.25V19.4747C3.74701 19.6686 3.81757 19.8564 3.94754 20.0003C4.07752 20.1442 4.25722 20.2334 4.45041 20.25C4.553 20.2568 4.65589 20.2425 4.7527 20.2078C4.84951 20.1732 4.93817 20.119 5.01316 20.0487C5.08816 19.9784 5.14789 19.8934 5.18865 19.799C5.22941 19.7046 5.25032 19.6028 5.2501 19.5V18.75H5.94385C7.3726 18.75 8.58197 17.6325 8.62416 16.2047C8.63483 15.8534 8.57485 15.5035 8.44777 15.1759C8.3207 14.8482 8.12912 14.5494 7.88439 14.2971C7.63967 14.0449 7.34678 13.8444 7.0231 13.7074C6.69943 13.5705 6.35155 13.5 6.0001 13.5ZM5.96728 17.25H5.2501V15H6.0001C6.15745 14.9993 6.3132 15.0315 6.4573 15.0948C6.6014 15.158 6.73063 15.2507 6.83666 15.367C6.94268 15.4832 7.02313 15.6205 7.07281 15.7698C7.1225 15.9191 7.14031 16.0771 7.1251 16.2338C7.09236 16.5165 6.95579 16.777 6.74186 16.9648C6.52794 17.1526 6.2519 17.2542 5.96728 17.25ZM12.0001 13.5H10.5001C10.3012 13.5 10.1104 13.579 9.96977 13.7197C9.82911 13.8603 9.7501 14.0511 9.7501 14.25V19.5C9.7501 19.6989 9.82911 19.8897 9.96977 20.0303C10.1104 20.171 10.3012 20.25 10.5001 20.25H11.9363C13.7795 20.25 15.331 18.7987 15.3742 16.9566C15.385 16.5066 15.3058 16.059 15.1411 15.6402C14.9765 15.2213 14.7297 14.8396 14.4153 14.5175C14.1009 14.1954 13.7253 13.9395 13.3105 13.7648C12.8957 13.59 12.4502 13.5 12.0001 13.5ZM11.9542 18.75H11.2501V15H12.0001C12.2525 14.9998 12.5024 15.0506 12.7347 15.1493C12.967 15.248 13.177 15.3926 13.3521 15.5744C13.5272 15.7563 13.6638 15.9716 13.7536 16.2075C13.8435 16.4434 13.8848 16.695 13.8751 16.9472C13.8357 17.9616 12.9695 18.75 11.9542 18.75Z"
                    fill="#41416E"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      <dutton
        onClick={handleSidebarToggle}
        className="bg-gradient-to-r from-[#053BD3] lg:hidden cursor-pointer to-[#03EAEA] text-white flex justify-center items-center w-[40px] h-[40px] rounded fixed top-2 left-2 p-1 z-30"
      >
        {showSidebar ? (
          <RxCross2 className=" text-white text-3xl " />
        ) : (
          <FiMenu className=" text-white text-3xl " />
        )}
      </dutton>
      {path !== "/" && path !== "/employee-id" && path !== "/mail-code" && (
        <>
          <div
            className={`fixed top-0 z-10 left-0 bg-white sidebar min-h-[100vh] lg:w-[18%] w-[250px] lg:block
          ${
            showSidebar && !isAnimatingOut
              ? "animate__animated animate__slideInLeft animate__faster block"
              : ""
          }
          ${
            isAnimatingOut
              ? "animate__animated animate__slideOutLeft animate__faster"
              : ""
          }
        `}
            style={{
              display:
                showSidebar || isAnimatingOut || screenWidth >= 1024
                  ? "block"
                  : "none",
            }}
          >
            <div className="flex flex-col min-h-[100vh] justify-between w-full gap-2 px-5 pt-5 pb-2">
              <div className=" w-full">
                <div className="w-full flex justify-center items-center mb-5">
                  {(path === "/dashboard" ||
                    path === "/directors" ||
                    path === "/designers" ||
                    path === "/senior" ||
                    path === "/sales" ||
                    path === "/sales-team-table" ||
                    path === "/teams" ||
                    path === "/add-team" ||
                    path === "/add-project" ||
                    path === "/clients") && (
                    <img className="w-[113] h-[111px]" src="/assets/logo.png" />
                  )}
                  {(path === "/purchase" ||
                    path === "/factory" ||
                    path === "/project" ||
                    path === "/planning") && (
                    <h1 className=" text-[#0E111E] text-2xl font-bold mt-4">
                      FABLAB
                    </h1>
                  )}
                </div>
                {(path === "/dashboard" ||
                  path === "/directors" ||
                  path === "/designers" ||
                  path === "/senior" ||
                  path === "/sales" ||
                  path === "/sales-team-table" ||
                  path === "/teams" ||
                  path === "/add-team" ||
                  path === "/add-project" ||
                  path === "/clients" ||
                  path === "/purchase" ||
                  path === "/factory" ||
                  path === "/project" ||
                  path === "/planning") && (
                  <>
                    <div
                      onClick={() => navigate("/dashboard")}
                      className={`w-full items-center rounded-xl p-2 ${
                        path === "/dashboard"
                          ? "bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white"
                          : "text-[#A1A1A1]"
                      }  cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 17.9668V10.1503C21 8.93937 20.4604 7.7925 19.5301 7.02652L14.5301 2.90935C13.0577 1.69688 10.9423 1.69689 9.46986 2.90935L4.46986 7.02652C3.53964 7.7925 3 8.93937 3 10.1503V17.9668C3 20.1943 4.79086 22 7 22H17C19.2091 22 21 20.1943 21 17.9668Z"
                          stroke={`${
                            path === "/dashboard" ? "#fff" : "#A2A2A2"
                          }`}
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 18H14"
                          stroke="#A2A2A2"
                          stroke-width="1.1"
                          stroke-linecap="round"
                        />
                      </svg>
                      Dashboard
                    </div>
                    <div
                      onClick={() => navigate("/add-project")}
                      className={`w-full items-center rounded-xl p-2 ${
                        path === "/directors" ||
                        path === "/designers" ||
                        path === "/senior" ||
                        path === "/sales" ||
                        path === "/sales-team-table" ||
                        path === "/add-project"
                          ? "bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white"
                          : "text-[#A1A1A1]"
                      }  cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]`}
                    >
                      {path === "/dashboard" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19 17C20.6569 17 22 15.6569 22 14L22 5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V14C2 15.6569 3.34314 17 5 17H6.52542L4.35687 20.6142C4.14376 20.9694 4.25893 21.4301 4.61412 21.6432C4.9693 21.8563 5.43 21.7412 5.64311 21.386L8.2747 17L11.25 17V19.0001C11.25 19.4143 11.5858 19.7501 12 19.7501C12.4142 19.7501 12.75 19.4143 12.75 19.0001V17L15.7253 17L18.3569 21.386C18.57 21.7412 19.0307 21.8563 19.3859 21.6432C19.741 21.4301 19.8562 20.9694 19.6431 20.6142L17.4746 17H19ZM6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7C17.75 7.41421 17.4142 7.75 17 7.75H7C6.58579 7.75 6.25 7.41421 6.25 7ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H7Z"
                            fill={"#A1A1A1"}
                          />
                        </svg>
                      )}
                      {(path === "/directors" ||
                        path === "/designers" ||
                        path === "/senior" ||
                        path === "/sales" ||
                        path === "/sales-team-table" ||
                        path === "/add-project") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19 17C20.6569 17 22 15.6569 22 14L22 5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V14C2 15.6569 3.34314 17 5 17H6.52542L4.35687 20.6142C4.14376 20.9694 4.25893 21.4301 4.61412 21.6432C4.9693 21.8563 5.43 21.7412 5.64311 21.386L8.2747 17L11.25 17V19.0001C11.25 19.4143 11.5858 19.7501 12 19.7501C12.4142 19.7501 12.75 19.4143 12.75 19.0001V17L15.7253 17L18.3569 21.386C18.57 21.7412 19.0307 21.8563 19.3859 21.6432C19.741 21.4301 19.8562 20.9694 19.6431 20.6142L17.4746 17H19ZM6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7C17.75 7.41421 17.4142 7.75 17 7.75H7C6.58579 7.75 6.25 7.41421 6.25 7ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H7Z"
                            fill={"white"}
                          />
                        </svg>
                      )}
                      Projects
                    </div>
                    <div
                      onClick={() => navigate("/teams")}
                      className={`w-full items-center rounded-xl p-2 ${
                        path === "/teams" || path === "/add-team"
                          ? "bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white"
                          : "text-[#A1A1A1]"
                      }  cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]`}
                    >
                      {path === "/teams" || path === "/add-team" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 0C0.895431 0 0 0.895431 0 2V6C0 7.10457 0.895431 8 2 8H6C7.10457 8 8 7.10457 8 6V2C8 0.895431 7.10457 0 6 0H2ZM16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8ZM8 16C8 18.2091 6.20914 20 4 20C1.79086 20 0 18.2091 0 16C0 13.7909 1.79086 12 4 12C6.20914 12 8 13.7909 8 16ZM14 12C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V8C10 9.10457 9.10457 10 8 10H4C2.89543 10 2 9.10457 2 8V4Z"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                          />
                          <path
                            d="M22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                          />
                          <path
                            d="M10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18Z"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                          />
                          <path
                            d="M14 16C14 14.8954 14.8954 14 16 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V16Z"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                          />
                        </svg>
                      )}
                      Team
                    </div>
                    <div
                      onClick={() => navigate("/clients")}
                      className={`w-full items-center rounded-xl p-2 ${
                        path === "/clients"
                          ? "bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white"
                          : "text-[#A1A1A1]"
                      }  cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]`}
                    >
                      {path === "/clients" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <ellipse
                            cx="12"
                            cy="16.5"
                            rx="6"
                            ry="2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="8"
                            r="3"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.44547 13.2617C5.20689 13.3133 4.06913 13.5364 3.18592 13.8897C2.68122 14.0915 2.22245 14.3507 1.87759 14.6768C1.53115 15.0045 1.25 15.4514 1.25 16.0002C1.25 16.5491 1.53115 16.996 1.87759 17.3236C2.22245 17.6498 2.68122 17.9089 3.18592 18.1108C3.68571 18.3107 4.26701 18.469 4.90197 18.578C4.40834 18.0455 4.09852 17.4506 4.01985 16.8197C3.92341 16.7872 3.83104 16.7533 3.74301 16.7181C3.34289 16.558 3.06943 16.3862 2.90826 16.2338C2.7498 16.084 2.74999 16.0048 2.75 16.0003L2.75 16.0002L2.75 16.0002C2.74999 15.9956 2.7498 15.9165 2.90826 15.7667C3.06943 15.6142 3.34289 15.4424 3.74301 15.2824C3.94597 15.2012 4.17201 15.1268 4.41787 15.0611C4.83157 14.3712 5.53447 13.7562 6.44547 13.2617Z"
                            fill="#fff"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.9802 16.8197C19.9015 17.4506 19.5917 18.0455 19.0981 18.578C19.733 18.469 20.3143 18.3107 20.8141 18.1108C21.3188 17.9089 21.7776 17.6498 22.1224 17.3236C22.4689 16.996 22.75 16.5491 22.75 16.0002C22.75 15.4514 22.4689 15.0045 22.1224 14.6768C21.7776 14.3507 21.3188 14.0916 20.8141 13.8897C19.9309 13.5364 18.7931 13.3133 17.5546 13.2617C18.4656 13.7562 19.1685 14.3712 19.5822 15.0611C19.828 15.1268 20.0541 15.2012 20.257 15.2824C20.6571 15.4424 20.9306 15.6142 21.0918 15.7667C21.2502 15.9165 21.25 15.9956 21.25 16.0002V16.0002V16.0003C21.25 16.0048 21.2502 16.084 21.0918 16.2338C20.9306 16.3862 20.6571 16.558 20.257 16.7181C20.169 16.7533 20.0766 16.7872 19.9802 16.8197Z"
                            fill="#fff"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.5145 10.1522C16.2946 10.6126 16.0063 11.0341 15.6628 11.4036C16.0587 11.6243 16.5147 11.75 17.0001 11.75C18.5188 11.75 19.7501 10.5188 19.7501 9C19.7501 7.48122 18.5188 6.25 17.0001 6.25C16.8958 6.25 16.7929 6.2558 16.6916 6.26711C16.8637 6.73272 16.9684 7.23096 16.9939 7.75001C16.996 7.75 16.998 7.75 17.0001 7.75C17.6904 7.75 18.2501 8.30964 18.2501 9C18.2501 9.69036 17.6904 10.25 17.0001 10.25C16.8278 10.25 16.6637 10.2152 16.5145 10.1522Z"
                            fill="#fff"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.30845 6.26711C7.20719 6.2558 7.10427 6.25 7 6.25C5.48122 6.25 4.25 7.48122 4.25 9C4.25 10.5188 5.48122 11.75 7 11.75C7.48537 11.75 7.94138 11.6243 8.33721 11.4036C7.99374 11.0341 7.70549 10.6126 7.4856 10.1522C7.33631 10.2152 7.17222 10.25 7 10.25C6.30964 10.25 5.75 9.69036 5.75 9C5.75 8.30964 6.30964 7.75 7 7.75C7.00205 7.75 7.00409 7.75 7.00614 7.75001C7.0317 7.23096 7.13641 6.73272 7.30845 6.26711Z"
                            fill="#fff"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <ellipse
                            cx="12"
                            cy="16.5"
                            rx="6"
                            ry="2.5"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="8"
                            r="3"
                            stroke="#A1A1A1"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.44547 13.2617C5.20689 13.3133 4.06913 13.5364 3.18592 13.8897C2.68122 14.0915 2.22245 14.3507 1.87759 14.6768C1.53115 15.0045 1.25 15.4514 1.25 16.0002C1.25 16.5491 1.53115 16.996 1.87759 17.3236C2.22245 17.6498 2.68122 17.9089 3.18592 18.1108C3.68571 18.3107 4.26701 18.469 4.90197 18.578C4.40834 18.0455 4.09852 17.4506 4.01985 16.8197C3.92341 16.7872 3.83104 16.7533 3.74301 16.7181C3.34289 16.558 3.06943 16.3862 2.90826 16.2338C2.7498 16.084 2.74999 16.0048 2.75 16.0003L2.75 16.0002L2.75 16.0002C2.74999 15.9956 2.7498 15.9165 2.90826 15.7667C3.06943 15.6142 3.34289 15.4424 3.74301 15.2824C3.94597 15.2012 4.17201 15.1268 4.41787 15.0611C4.83157 14.3712 5.53447 13.7562 6.44547 13.2617Z"
                            fill="#A1A1A1"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.9802 16.8197C19.9015 17.4506 19.5917 18.0455 19.0981 18.578C19.733 18.469 20.3143 18.3107 20.8141 18.1108C21.3188 17.9089 21.7776 17.6498 22.1224 17.3236C22.4689 16.996 22.75 16.5491 22.75 16.0002C22.75 15.4514 22.4689 15.0045 22.1224 14.6768C21.7776 14.3507 21.3188 14.0916 20.8141 13.8897C19.9309 13.5364 18.7931 13.3133 17.5546 13.2617C18.4656 13.7562 19.1685 14.3712 19.5822 15.0611C19.828 15.1268 20.0541 15.2012 20.257 15.2824C20.6571 15.4424 20.9306 15.6142 21.0918 15.7667C21.2502 15.9165 21.25 15.9956 21.25 16.0002V16.0002V16.0003C21.25 16.0048 21.2502 16.084 21.0918 16.2338C20.9306 16.3862 20.6571 16.558 20.257 16.7181C20.169 16.7533 20.0766 16.7872 19.9802 16.8197Z"
                            fill="#A1A1A1"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.5145 10.1522C16.2946 10.6126 16.0063 11.0341 15.6628 11.4036C16.0587 11.6243 16.5147 11.75 17.0001 11.75C18.5188 11.75 19.7501 10.5188 19.7501 9C19.7501 7.48122 18.5188 6.25 17.0001 6.25C16.8958 6.25 16.7929 6.2558 16.6916 6.26711C16.8637 6.73272 16.9684 7.23096 16.9939 7.75001C16.996 7.75 16.998 7.75 17.0001 7.75C17.6904 7.75 18.2501 8.30964 18.2501 9C18.2501 9.69036 17.6904 10.25 17.0001 10.25C16.8278 10.25 16.6637 10.2152 16.5145 10.1522Z"
                            fill="#A1A1A1"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.30845 6.26711C7.20719 6.2558 7.10427 6.25 7 6.25C5.48122 6.25 4.25 7.48122 4.25 9C4.25 10.5188 5.48122 11.75 7 11.75C7.48537 11.75 7.94138 11.6243 8.33721 11.4036C7.99374 11.0341 7.70549 10.6126 7.4856 10.1522C7.33631 10.2152 7.17222 10.25 7 10.25C6.30964 10.25 5.75 9.69036 5.75 9C5.75 8.30964 6.30964 7.75 7 7.75C7.00205 7.75 7.00409 7.75 7.00614 7.75001C7.0317 7.23096 7.13641 6.73272 7.30845 6.26711Z"
                            fill="#A1A1A1"
                          />
                        </svg>
                      )}
                      Clients
                    </div>
                  </>
                )}
                {/* {(path === "/purchase" ||
                  path === "/project" ||
                  path === "/planning") && (
                  <>
                    <div className=" w-full  rounded-xl p-2 text-[#fff] cursor-pointer text-lg bg-[#0E111E]   font-light flex flex-row items-center gap-2 h-[43px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19 17C20.6569 17 22 15.6569 22 14L22 5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V14C2 15.6569 3.34314 17 5 17H6.52542L4.35687 20.6142C4.14376 20.9694 4.25893 21.4301 4.61412 21.6432C4.9693 21.8563 5.43 21.7412 5.64311 21.386L8.2747 17L11.25 17V19.0001C11.25 19.4143 11.5858 19.7501 12 19.7501C12.4142 19.7501 12.75 19.4143 12.75 19.0001V17L15.7253 17L18.3569 21.386C18.57 21.7412 19.0307 21.8563 19.3859 21.6432C19.741 21.4301 19.8562 20.9694 19.6431 20.6142L17.4746 17H19ZM6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7C17.75 7.41421 17.4142 7.75 17 7.75H7C6.58579 7.75 6.25 7.41421 6.25 7ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H7Z"
                          fill="white"
                        />
                      </svg>
                      Projects
                    </div>
                    <div className=" w-full items-center rounded-xl p-2 text-[#0E111E] cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V8C10 9.10457 9.10457 10 8 10H4C2.89543 10 2 9.10457 2 8V4Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M14 16C14 14.8954 14.8954 14 16 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V16Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                      </svg>
                      Team
                    </div>

                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <div
                        className={`w-full p-3 items-center rounded-3xl  py-5 bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white  cursor-pointer text-lg    flex flex-row justify-center gap-3 leading-[20px] h-[50px] font-medium text-center`}
                      >
                        Wall Panel Layout{" "}
                        <FaAngleDown className="text-white text-xl" />
                      </div>
                    </Dropdown>
                  </>
                )} */}
                {/* {path === "/factory" && (
                  <>
                    <div className=" w-full  rounded-xl p-2 text-[#fff] cursor-pointer text-lg bg-[#0E111E]   font-light flex flex-row items-center gap-2 h-[43px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19 17C20.6569 17 22 15.6569 22 14L22 5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V14C2 15.6569 3.34314 17 5 17H6.52542L4.35687 20.6142C4.14376 20.9694 4.25893 21.4301 4.61412 21.6432C4.9693 21.8563 5.43 21.7412 5.64311 21.386L8.2747 17L11.25 17V19.0001C11.25 19.4143 11.5858 19.7501 12 19.7501C12.4142 19.7501 12.75 19.4143 12.75 19.0001V17L15.7253 17L18.3569 21.386C18.57 21.7412 19.0307 21.8563 19.3859 21.6432C19.741 21.4301 19.8562 20.9694 19.6431 20.6142L17.4746 17H19ZM6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7C17.75 7.41421 17.4142 7.75 17 7.75H7C6.58579 7.75 6.25 7.41421 6.25 7ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H7Z"
                          fill="white"
                        />
                      </svg>
                      Projects
                    </div>
                    <div className=" w-full items-center rounded-xl p-2 text-[#0E111E] cursor-pointer text-lg  font-light flex flex-row gap-2 h-[43px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V8C10 9.10457 9.10457 10 8 10H4C2.89543 10 2 9.10457 2 8V4Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                        <path
                          d="M14 16C14 14.8954 14.8954 14 16 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V16Z"
                          stroke="#0E111E"
                          stroke-width="1.5"
                        />
                      </svg>
                      Team
                    </div>
                  </>
                )} */}
              </div>
              <div className="w-full bg-white logout p-2 rounded-lg flex flex-row items-center justify-between">
                <div className=" flex flex-row w-[80%] gap-2">
                  <img
                    style={{
                      boxShadow: "0px 2px 11px 0px rgba(0, 0, 0, 0.29)",
                    }}
                    src="/assets/images/teamProfile.jpeg"
                    className=" rounded-xl w-[41px] h-[41px] "
                  />
                  <div className=" flex flex-col  w-[60%] ">
                    <h2 className=" text-sm font-medium">Varun Kubal</h2>
                    <p className="text-[#909090] text-xs font-medium">Senior</p>
                  </div>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.39552 0.408269C4.80214 -0.529476 6.64978 0.33023 6.92381 1.90919H9.66671C10.9324 1.90919 11.9584 2.9352 11.9584 4.20086C11.9584 4.54604 11.6786 4.82586 11.3334 4.82586C10.9882 4.82586 10.7084 4.54604 10.7084 4.20086C10.7084 3.62556 10.242 3.15919 9.66671 3.15919H6.95837V13.5759H9.66671C10.242 13.5759 10.7084 13.1095 10.7084 12.5342C10.7084 12.189 10.9882 11.9092 11.3334 11.9092C11.6786 11.9092 11.9584 12.189 11.9584 12.5342C11.9584 13.7998 10.9324 14.8259 9.66671 14.8259H6.92381C6.64978 16.4048 4.80214 17.2645 3.39552 16.3268L1.72885 15.2157C1.09131 14.7906 0.708374 14.0751 0.708374 13.3089V3.42616C0.708374 2.65994 1.09131 1.94441 1.72885 1.51938L3.39552 0.408269ZM10.9419 6.2589C11.1859 6.50298 11.1859 6.89871 10.9419 7.14279L10.3421 7.74251L14.6666 7.74251C15.0118 7.74251 15.2916 8.02234 15.2916 8.36751C15.2916 8.71269 15.0118 8.99251 14.6666 8.99251H10.3421L10.9419 9.59224C11.1859 9.83632 11.1859 10.232 10.9419 10.4761C10.6978 10.7202 10.3021 10.7202 10.058 10.4761L8.98056 9.39871C8.41105 8.8292 8.41105 7.90583 8.98056 7.33632L10.058 6.2589C10.3021 6.01483 10.6978 6.01483 10.9419 6.2589Z"
                      fill="#CCCCCC"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
