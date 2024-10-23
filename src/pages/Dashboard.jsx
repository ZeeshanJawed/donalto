/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import { FaSortDown } from "react-icons/fa";
import { Progress, Upload } from "antd";
import { GoArrowRight } from "react-icons/go";
import { Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverDomain } from "../constant/serverDomain";
import { authToken } from "../constant/AuthToken";
import { useJobContext } from "../context/jobContext";

const items = [
  {
    key: "1",
    type: "group",
    label: "Group title",
    children: [
      {
        key: "1-1",
        label: "1st menu item",
      },
      {
        key: "1-2",
        label: "2nd menu item",
      },
    ],
  },
];

export default function Dashboard() {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const [isFileAllowed, setFileAllowed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [jobCardDetails, setJobCardDetails] = useState({});
  const [productUpdates, setProductUpdates] = useState([]);
  const [clientInfo, setClientInfo] = useState("");
  const [projectLists, setProjectLists] = useState([]);
  const [data, setData] = useState({});
  const [selectedButton, setselectedButton] = useState(1);
  const [projectId, setProjectId] = useState(1);
  const [percentageData, setPercentage] = useState({
    teamName: "designer Team",
    percentage: 0,
  });
  const handleChange = ({ fileList: newFileList }) => {
    if (isFileAllowed) {
      setFileList(newFileList);
    }
  };
  const handleChange2 = ({ fileList: newFileList }) => {
    if (isFileAllowed) {
      setFileList2(newFileList);
    }
  };
  const handleChange3 = ({ fileList: newFileList }) => {
    if (isFileAllowed) {
      setFileList3(newFileList);
    }
  };

  const { search } = useJobContext();

  const filteredProductUpdates = productUpdates?.filter((update) =>
    update.productName.toLowerCase().startsWith(search.toLowerCase())
  );

  const beforeUpload = async (file) => {
    const isAllowed = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!isAllowed) {
      setFileAllowed(false);
      // toast.error('Image formats allowed are ".jpg, .jpeg, .png"')
      return false; // Prevents the file from being added to the fileList
    }

    setFileAllowed(true);
    return true; // Proceed with the upload
  };
  const navigate = useNavigate();
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/jobcard/jobcarddetails/30`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        console.log("pos response", res);

        setJobCardDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/project/projectList?page=1&limit=50`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        console.log("project list response", res);
        const items = res.data.data.map((item) => {
          return {
            key: item.id,
            label: item.service,
          };
        });
        console.log("items", items);
        setProjectLists(items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/dashboard/details/byProjectId/${projectId}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        console.log("product updates response", res);

        setProductUpdates(res.data.productUpdates);
        setClientInfo(res.data.projectData.clientInfo);
        setData(res.data.teamsData);
        setPercentage({
          percentage: res.data.teamsData.designerTeam.percentage,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [projectId]);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full p-10 bg-[#F4F6F8] ">
        <div className="w-full flex flex-row gap-2 lg:flex-nowrap flex-wrap items-center justify-between">
          <h1 className=" text-3xl font-[600] mb-0 ">Project Information</h1>
          <Dropdown
            menu={{
              items: projectLists,
              selectable: true,
              onClick: (e) => {
                console.log(e);
                setProjectId(e.key);
              },
            }}
            trigger={["click"]}
          >
            <div className="lg:w-[30%] w-[300px] bg-[#fff] rounded-lg text-[#306BFF] p-3 cursor-pointer flex justify-between flex-row items-center">
              <p>Project Name</p>
              <FaSortDown />
            </div>
          </Dropdown>
        </div>
        <hr className="w-full my-3 border-[#d3d2d2]" />
        <div className="w-full flex flex-row lg:h-[100px] lg:flex-nowrap flex-wrap gap-3  items-center justify-between">
          <div className="lg:w-[60%] w-full flex flex-row lg:flex-nowrap gap-3 flex-wrap justify-between">
            <div className="w-[300px] ">
              <h3 className="font-medium">Initial PO</h3>
              <div className=" h-16 mt-2 gap-2 bg-white rounded-lg flex items-center p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div
                  // target="_blank"
                  // href={jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  onClick={() => {
                    window.location.href =
                      jobCardDetails?.po?.length > 0
                        ? serverDomain + "/" + jobCardDetails.po[0]
                        : serverDomain; // Or some other default URL
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                  <p className="truncate w-[90px]">
                    {jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[300px] ">
              <h3 className="font-medium">Service PO</h3>
              <div className=" h-16 mt-2 gap-2 bg-white rounded-lg flex items-center p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div
                  // target="_blank"
                  // href={jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  onClick={() => {
                    window.location.href =
                      jobCardDetails?.offer?.length > 0
                        ? serverDomain + "/" + jobCardDetails.offer[0]
                        : serverDomain; // Or some other default URL
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                  <p className="truncate w-[90px]">
                    {jobCardDetails?.offer?.length > 0 &&
                      jobCardDetails?.offer[0]}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[300px] ">
              <h3 className="font-medium">Conceptual Layout</h3>
              <div className=" h-16 mt-2 gap-2 bg-white rounded-lg flex items-center p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div
                  // target="_blank"
                  // href={jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  onClick={() => {
                    window.location.href =
                      jobCardDetails?.tendor?.length > 0
                        ? serverDomain +
                        "/" +
                        "upload/download/file/" +
                        jobCardDetails.tendor[0]
                        : serverDomain; // Or some other default URL
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                  <p className="truncate w-[90px]">
                    {jobCardDetails?.tendor?.length > 0 &&
                      jobCardDetails?.tendor[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full flex flex-row lg:justify-end justify-start lg:flex-nowrap flex-wrap items-end h-full gap-3">
            {/* <button className=" items-center p-3 h-[50px] bg-gradient-to-r rounded-lg text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM3.75 10.5H7.5V13.5H3.75V10.5ZM9 10.5H20.25V13.5H9V10.5ZM20.25 6V9H3.75V6H20.25ZM3.75 15H7.5V18H3.75V15ZM20.25 18H9V15H20.25V18Z"
                  fill="white"
                />
              </svg>
              <span className=" text-sm">View BOQ Summary</span>
            </button> */}
            <button
              onClick={() => navigate("/sales-team-table")}
              className="  p-3 h-[50px] items-center bg-gradient-to-r rounded-lg text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM3.75 10.5H7.5V13.5H3.75V10.5ZM9 10.5H20.25V13.5H9V10.5ZM20.25 6V9H3.75V6H20.25ZM3.75 15H7.5V18H3.75V15ZM20.25 18H9V15H20.25V18Z"
                  fill="white"
                />
              </svg>
              <span className=" text-sm">View Job Card</span>
            </button>
          </div>
        </div>
        <div className="w-full my-8 flex gap-2 flex-col py-3 px-5 bg-white rounded-lg">
          <h1 className=" text-lg font-[600]">Client Info</h1>
          <hr />
          <p className="w-full text-[#4e4e4e]">{clientInfo}</p>
        </div>
        <div className="w-full flex flex-row gap-5  lg:flex-nowrap flex-wrap items-start justify-between">
          <div className=" bg-white rounded-lg p-3 lg:w-[60%] w-full h-full flex flex-col gap-2">
            <h1 className=" text-[#05004E] my-2 text-lg font-[600]">
              Products Update
            </h1>
            <div className="w-full p-2 overflow-x-scroll">
              <table className="w-[600px]  text-left  ">
                <thead className="text-sm  text-[#96A5B8] ">
                  <tr className=" border-b border-[#EDF2F6] ">
                    <th scope="col" className=" font-normal px-3 ">
                      #
                    </th>
                    <th scope="col" className="px-3 font-normal py-3">
                      Name
                    </th>
                    <th scope="col" className="px-3 font-normal py-3">
                      Status
                    </th>
                    <th scope="col" className=" font-normal px-3 py-3">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProductUpdates?.map((p) => (
                    <tr key={p.productId} className="border-b border-[#EDF2F6]">
                      <th scope="row" className="px-3 font-normal py-3">
                        {p.productId}
                      </th>
                      <td className="px-3 py-4">{p.productName}</td>
                      <td className="px-3 py-4 w-[200px]">
                        <Progress
                          percent={Number(p.percentage.replace("%", ""))}
                          showInfo={false}
                          strokeColor={"#0095FF"}
                          trailColor="#CDE7FF"
                          size={{
                            height: 5,
                          }}
                        />
                      </td>
                      <td className="px-3 py-4">
                        <div className=" mx-auto w-[50px] text-[#0095FF] flex justify-center items-center rounded-lg bg-[#F0F9FF] border border-[#0095FF]">
                          {p.percentage}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className=" bg-white rounded-lg p-5 lg:w-[40%] w-full justify-between flex flex-col gap-2">
            <div className=" flex flex-row gap-3 items-center my-5">
              <Progress
                percent={
                  percentageData?.percentage &&
                  Number(percentageData?.percentage.replace("%", ""))
                }
                type="circle"
                strokeColor="#306BFF"
                className="circle-progress"
                strokeWidth={10}
                format={(percent) => (
                  <p className=" text-[#306BFF] mb-0 leading-5 text-3xl mt-1 font-bold">
                    {percent}% <br /> <span className="text-lg">Done</span>
                  </p>
                )}
              />
              <p>
                By clicking on team <br /> you can view the
                <br /> team progress
              </p>
            </div>
            <div className=" w-full flex flex-row flex-wrap gap-3 items-center my-5">
              <button
                onClick={() => {
                  setPercentage({ percentage: data?.salesTeam.percentage, }), setselectedButton(1)
                }
                }
                style={{ backgroundColor: selectedButton == 1 ? '#306BFF' : '#ffffff', color: selectedButton == 1 ? '#ffffff' : '#306BFF', }}
                className=" w-[150px] items-center p-3 h-full font-medium border border-[#306BFF] rounded-lg flex flex-row gap-2 "
              >
                Sales Team <GoArrowRight />
              </button>
              <button
                onClick={() => {
                  setPercentage({ percentage: data?.designTeam?.percentage }), setselectedButton(2)
                }
                }
                style={{ backgroundColor: selectedButton == 2 ? '#306BFF' : '#ffffff', color: selectedButton == 2 ? '#ffffff' : '#306BFF', }}
                className=" w-[170px] items-center font-medium p-3 h-full border border-[#306BFF]  rounded-lg flex flex-row gap-2 "
              >
                Design Team <GoArrowRight />
              </button>
              <button
                onClick={() => {
                  setPercentage({ percentage: data?.factoryTeam?.percentage }), setselectedButton(3)
                }
                }
                style={{ backgroundColor: selectedButton == 3 ? '#306BFF' : '#ffffff', color: selectedButton == 3 ? '#ffffff' : '#306BFF', }}
                className=" w-[170px] items-center font-medium p-3 h-full border border-[#306BFF]  rounded-lg flex flex-row gap-2 "
              >
                Factory Team <GoArrowRight />
              </button>
              <button onClick={() => {
                setPercentage({ percentage: data?.factoryTeam?.percentage }), setselectedButton(4)
              }
              }
                style={{ backgroundColor: selectedButton == 4 ? '#306BFF' : '#ffffff', color: selectedButton == 4 ? '#ffffff' : '#306BFF', }}
                className=" w-[170px] items-center font-medium p-3 h-full border border-[#306BFF]  rounded-lg flex flex-row gap-2 ">
                Planning <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
