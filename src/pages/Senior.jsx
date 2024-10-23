/* eslint-disable react/no-unknown-property */

import { memo, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCaretRight } from "react-icons/fa";
import { Checkbox, Progress, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverDomain } from "../constant/serverDomain";
import { authToken } from "../constant/AuthToken";

export default function Senior() {
  const [openModal, setOpenModal] = useState("");
  const [jobCardDetails, setJobCardDetails] = useState({});
  const [pannels, setPannels] = useState([
    {
      projectId: Math.floor(Math.random() * 100),
      productName: "Wall Panel 4",
      layouts: [
        {
          layoutName: "wall 4",
          layoutDescription: "need to paint this wall",
          status: "PENDING",
          fileUrl: [],
          tragetDate: "2024-12-12",
          comments: [
            {
              userId: 1,
              commentText: "need to pain blue colour",
              commentDate: "2024-11-11",
              commentMedia: [],
            },
          ],
        },
      ],
    },
  ]);
  const [singleComment, setSingleComment] = useState(false);
  const allowedExtensions = [".pdf", ".docx", ".xlsx", ".xls", ".doc", ".dwg"];
  const [isFileAllowed, setFileAllowed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
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
  const navigate = useNavigate();
  const addMorePannels = () => {
    setPannels([
      ...pannels,
      {
        projectId: 1,
        productName: "Wall Panel 4",
        layouts: [
          {
            layoutName: "wall 4",
            layoutDescription: "need to paint this wall",
            status: "PENDING",
            fileUrl: [],
            tragetDate: "2024-12-12",
            comments: [
              {
                userId: 1,
                commentText: "need to pain blue colour",
                commentDate: "2024-11-11",
                commentMedia: [],
              },
            ],
          },
        ],
      },
    ]);
  };

  const addMoreLayouts = (index) => {
    setPannels((prev) =>
      prev.map((pannel, pannelIndex) =>
        pannelIndex === index
          ? {
              ...pannel,
              projectId: Math.floor(Math.random() * 100),
              layouts: [
                ...pannel.layouts,
                {
                  layoutName: "wall 4",
                  layoutDescription: "need to paint this wall",
                  status: "PENDING",
                  fileUrl: [],
                  tragetDate: "2024-12-12",
                  comments: [
                    {
                      userId: 1,
                      commentText: "need to pain blue colour",
                      commentDate: "2024-11-11",
                      commentMedia: [],
                    },
                  ],
                },
              ],
            }
          : pannel
      )
    );
  };

  const handlePannelDataChange = (name, value, index) => {
    // const newPannels = pannels.map((pannel, pannelIndex) => {
    //   if (pannelIndex === index) {
    //     return {
    //       ...pannel,
    //       [name]: value,
    //     };
    //   }
    //   return pannel;
    // });

    setPannels((prev) =>
      prev.map((pannel, pannelIndex) =>
        pannelIndex === index ? { ...pannel, [name]: value } : pannel
      )
    ); // Corrected from setting state to a nested array.
  };

  const handleLayoutDataChange = (
    name,
    value,
    index,
    layoutIndex,
    isComment
  ) => {
    console.log("value file", value);
    if (name === "fileUrl") {
      const fileList = [...value.fileList];
      setPannels((prev) =>
        prev.map((pannel, pannelIndex) =>
          pannelIndex === index
            ? {
                ...pannel,
                layouts: pannel.layouts.map((layout, layoutInd) =>
                  layoutIndex === layoutInd
                    ? {
                        ...layout,
                        fileUrl: fileList.map((file) => file.originFileObj),
                      }
                    : layout
                ),
              }
            : pannel
        )
      );
      return;
    }
    if (isComment) {
      console.log(name, value, index, layoutIndex);
      setPannels((prev) =>
        prev.map((pannel, pannelIndex) =>
          pannelIndex === index
            ? {
                ...pannel,
                layouts: pannel.layouts.map((layout, layoutInd) =>
                  layoutInd === layoutIndex
                    ? {
                        ...layout,
                        comments: [{ ...layout.comments[0], [name]: value }],
                      }
                    : layout
                ),
              }
            : pannel
        )
      );
    } else {
      setPannels((prev) =>
        prev.map((pannel, pannelIndex) =>
          pannelIndex === index
            ? {
                ...pannel,
                layouts: pannel.layouts.map((layout, layoutInd) =>
                  layoutIndex === layoutInd
                    ? { ...layout, [name]: value }
                    : layout
                ),
              }
            : pannel
        )
      );
    }
  };

  const handleModalClose = () => {
    setOpenModal("");
  };

  console.log(pannels);

  const handleSubmit = async () => {
    try {
      const newPannels = await Promise.all(
        pannels.map(async (pannel) => {
          const updatedLayouts = await Promise.all(
            pannel.layouts.map(async (layout) => {
              // Handle file uploads in layout.fileUrl
              const updatedFileUrls = await Promise.all(
                layout.fileUrl.map(async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  const res = await axios.post(
                    `${serverDomain}/upload/file`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: authToken,
                      },
                    }
                  );
                  return res.data.file;
                })
              );

              // Handle file uploads in each comment's commentMedia
              const updatedComments = await Promise.all(
                layout.comments.map(async (comment) => {
                  if (comment.commentMedia.length > 0) {
                    const formData = new FormData();
                    formData.append("file", comment.commentMedia);
                    const res = await axios.post(
                      `${serverDomain}/upload/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          Authorization: authToken,
                        },
                      }
                    );
                    return {
                      ...comment,
                      commentMedia: res.data.file, // Update the commentMedia with the uploaded file URL
                    };
                  }
                  return comment; // Return the comment unchanged if there's no media to upload
                })
              );

              return {
                ...layout,
                fileUrl: updatedFileUrls,
                comments: updatedComments, // Update the comments array with the new media URLs
              };
            })
          );

          return {
            ...pannel,
            layouts: updatedLayouts,
          };
        })
      );

      console.log("new pannels",newPannels);
      setPannels(newPannels);

     
      for (const pannel of newPannels) {
        const res = await axios.post(
          `${serverDomain}/product/create`,
          pannel, // Send each pannel object individually
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        console.log(res);
      }
      // console.log(res);
      setPannels([
        {
          projectId: Math.floor(Math.random() * 100),
          productName: "",
          layouts: [
            {
              layoutName: "",
              layoutDescription: "",
              status: "PENDING",
              fileUrl: [],
              tragetDate: "",
              comments: [
                {
                  userId: 1,
                  commentText: "",
                  commentDate: "",
                  commentMedia: [],
                },
              ],
            },
          ],
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/jobcard/jobcarddetails/1`,
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
  },[])

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full  md:p-10 py-10 px-2 bg-[#fff] ">
        <div className="w-full  flex flex-row xl:flex-nowrap flex-wrap items-center border gap-4 p-3 rounded-xl border-[rgba(0, 0, 0, 0.10)] justify-between">
          <div className=" xl:w-[60%] w-full flex flex-row md:flex-nowrap flex-wrap gap-4 ">
            <div className="flex flex-col h-full justify-center">
              <h2 className=" opacity-[0.6] text-xl font-medium mt-3">May</h2>
              <p className=" opacity-[0.5] text-sm">
                Today is Saturday, Jul 9th, 2023
              </p>
            </div>
            <vr className="border border-[#000000] opacity-[0.2]" />
            <div className=" w-[200px]">
              <h3 className="font-medium ">Initial PO</h3>
              <div className=" h-16 mt-2 gap-2 bg-white rounded-lg flex items-center p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <Link
                  target="_blank"
                  to={
                    "/" + jobCardDetails?.po?.length > 0 &&
                    jobCardDetails?.po[0]
                  }
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                </Link>
                <p>{jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}</p>
              </div>
            </div>
            <div className=" w-[200px]">
              <h3 className="font-medium">Service PO</h3>
              {/* <div className="  w-full rounded-lg p-1">
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#F4F6F8",
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div> */}
              <div className=" h-16 mt-2 gap-2 bg-white rounded-lg flex items-center p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <Link
                  target="_blank"
                  to={
                    "/" + jobCardDetails?.offer?.length > 0 &&
                    jobCardDetails?.offer[0]
                  }
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                </Link>
                <p>
                  {jobCardDetails?.offer?.length > 0 &&
                    jobCardDetails?.offer[0]}
                </p>
              </div>
            </div>
          </div>
          <div className=" xl:w-[40%] w-full flex flex-row flex-wrap gap-4 md:justify-end justify-start">
            <div className=" bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg">
              <button
                onClick={() => navigate("/designers")}
                className=" w-[210px] justify-center items-center p-2  px-5 h-[38px] font-medium bg-white rounded-lg text-[#0645D5] flex flex-row gap-3 "
              >
                <span className=" text-sm">Generate Team Report</span>
              </button>
            </div>
            <div
              onClick={handleSubmit}
              className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
            >
              <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                <AiOutlinePlus className="text-white text-lg" />
                <span className=" text-sm">Add Submittals</span>
              </button>
            </div>
          </div>
        </div>
        {/* <div className=" flex w-full  justify-end my-2">
            <div className="w-[400px] ">
              <Progress
                percent={45}
                showInfo={false}
                strokeColor={"#80A1FF"}
                trailColor="#E9E9E9"
                size={{
                  height: 10,
                }}
              />
            </div>
          </div> */}
        <div className="overflow-x-scroll w-full">
          <div className="min-w-[1000px]">
            <div className="min-w-full mt-5 flex flex-row min-h-[1000px] gap-5">
              {pannels.map((item, index) => (
                <>
                  <div
                    key={item.productName}
                    className="min-h-[1000px] min-w-[335px] flex flex-col p-2 gap-3 bg-white border rounded-xl border-[rgba(0, 0, 0, 0.20)]"
                  >
                    <div className="flex w-full flex-row justify-between items-center p-1 opacity-[0.7]">
                      <h3 className=" font-medium text-lg text-black">
                        <input
                          type="text"
                          className="outline-none"
                          placeholder="Wall Pannel"
                          value={item.productName}
                          onChange={(e) =>
                            handlePannelDataChange(
                              e.target.name,
                              e.target.value,
                              index
                            )
                          }
                          name={"productName"}
                        />
                      </h3>
                      <HiOutlineDotsVertical className=" cursor-pointer" />
                    </div>
                    <hr className="border border-[#000] opacity-[0.2]" />
                    {item.layouts.map((layout, layoutIndex) => (
                      <>
                        <div key={layoutIndex}>
                          <div className=" p-2 rounded-lg flex flex-col gap-2 bg-[#F7F7F7] mt-1">
                            <div className=" flex flex-row justify-between items-center w-full ">
                              <div className="bg-white w-[60%] text-[#505050] rounded-lg  p-2 text-center">
                                <input
                                  type="text"
                                  className="outline-none bg-transparent w-full"
                                  placeholder="Layout name"
                                  value={layout.layoutName}
                                  onChange={(e) =>
                                    handleLayoutDataChange(
                                      "layoutName",
                                      e.target.value,
                                      index,
                                      layoutIndex,
                                      false
                                    )
                                  }
                                  name={"layoutName"}
                                />
                              </div>
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
                                  d="M5.8 14H5V15H5.8C6.1 15 6.3 14.8 6.3 14.5C6.3 14.2 6.1 14 5.8 14ZM11 2H3V18H16V7L11 2ZM7.2 14.6C7.2 15.4 6.6 16 5.8 16H5V17H4V13H5.8C6.6 13 7.2 13.6 7.2 14.4V14.6ZM11.3 15.1C11.3 16.1 10.5 17 9.4 17H8V13H9.4C10.4 13 11.3 13.8 11.3 14.9V15.1ZM15 14H13V15H14.5V16H13V17H12V13H15V14ZM15 12H4V3H11V7H15V12ZM9.4 14H9V16H9.4C10 16 10.4 15.6 10.4 15C10.4 14.4 9.9 14 9.4 14Z"
                                  fill="#1D8CFB"
                                />
                              </svg>
                            </div>
                            <div className=" flex flex-row justify-between gap-2 items-start w-full ">
                              <div className=" w-[70%] bg-[#D3E9FF] p-2 rounded-lg">
                                <Upload
                                  listType="picture-card"
                                  beforeUpload={beforeUpload}
                                  fileList={layout?.fileUrl.map((file) => ({
                                    uid: file.uid,
                                    name: file.name,
                                    status: "done",
                                    originFileObj: file,
                                  }))}
                                  onChange={(e) => {
                                    console.log(e);
                                    if (!isFileAllowed) {
                                      toast.error(
                                        "Only pdf, docx, xls, xlsx, dwg, doc are allowed"
                                      );
                                      return;
                                    }
                                    handleLayoutDataChange(
                                      "fileUrl",
                                      e,
                                      index,
                                      layoutIndex
                                    );
                                  }}
                                >
                                  {/* {layout.fileUrl.length >= 1
                                    ? null */}
                                  {/* : */}
                                  uploadButton
                                  {/* } */}
                                </Upload>
                                <p className=" text-[#828282] text-xs">
                                  On Nov 16, 2023
                                </p>
                              </div>
                              <div className=" w-[30%] p-1 flex-col justify-start flex gap-2  ">
                                <div className=" w-full p-1 py-2 rounded-lg bg-[#B4FFBB] text-[#00900D] text-xs text-center">
                                  Approve
                                </div>
                                <div className=" w-full p-1 py-2 rounded-lg bg-[#FFABAB] text-[#AD0000] text-xs text-center">
                                  Rework
                                </div>
                              </div>
                            </div>
                            <div className="w-full text-xs py-3 mt-2 bg-white h-[40px] text-[#000] flex flex-row justify-between items-center p-2 rounded-lg">
                              Set Target Date
                              <span className="">
                                <input
                                  type="date"
                                  min={new Date().toISOString().split("T")[0]}
                                  className="outline-none"
                                  placeholder="dd/mm/yyyy"
                                  value={layout.tragetDate}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    handleLayoutDataChange(
                                      e.target.name,
                                      e.target.value,
                                      index,
                                      layoutIndex,
                                      false
                                    );
                                  }}
                                  name={"tragetDate"}
                                />
                              </span>
                            </div>
                            <div
                              onClick={() => setOpenModal(index)}
                              className="w-full cursor-pointer text-xs py-3 mt-2 bg-white h-[40px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg"
                            >
                              View Comments (23)
                              <FaCaretRight className=" text-lg" />
                            </div>
                          </div>
                          <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                            <Checkbox onChange={() => {}}></Checkbox>
                            <p className=" text-[#505050] text-sm ">
                              Senior Comments
                            </p>
                            <FaCaretRight className="text-[#828282]" />
                          </div>
                          <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                            <Checkbox onChange={() => {}}></Checkbox>
                            <p className=" text-[#505050] text-sm ">
                              Client Comments
                            </p>
                            <FaCaretRight className="text-[#828282]" />
                          </div>
                        </div>
                        {openModal === index ? (
                          <CommentModal
                            pannelIndex={index}
                            layoutIndex={layoutIndex}
                            handleLayoutDataChange={handleLayoutDataChange}
                            handleModalClose={handleModalClose}
                            layout={layout}
                          />
                        ) : null}
                      </>
                    ))}
                    <button
                      onClick={() => addMoreLayouts(index)}
                      className=" items-center w-[130px] justify-center mx-auto p-1 h-[40px] bg-gradient-to-r rounded-full text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]"
                    >
                      <span className=" text-sm font-medium">+ Add More</span>
                    </button>
                  </div>
                </>
              ))}

              <div
                onClick={addMorePannels}
                className=" flex flex-col justify-center "
              >
                <button className=" items-center w-[80px] justify-center mx-auto p-1 h-[60px] bg-gradient-to-r rounded-2xl text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
                  <span className=" text-sm font-medium">
                    + <br />
                    Add More
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CommentModal = memo(
  ({
    handleModalClose,
    pannelIndex,
    layoutIndex,
    handleLayoutDataChange,
    layout,
  }) => {
    console.log("layoutIndex", layoutIndex);
    console.log("pannelIndex", pannelIndex);
    console.log("layout", layout);
    return (
      <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#79797998]  flex justify-center ">
        <div className=" md:w-[680px] m-2 w-[500px] h-[771px] flex flex-col gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
          <div className=" flex justify-between  bg-white">
            <h1 className=" text-2xl font-medium text-[#000000] opacity-[0.6]">
              Comments
            </h1>
            <div className=" mt-[-35px] mr-[-35px] h-[40px] flex justify-center  items-center w-[40px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-2 rounded-full">
              <RxCross2
                className="text-white  text-2xl cursor-pointer"
                onClick={handleModalClose}
              />
            </div>
          </div>
          <hr className=" border border-[#000000] opacity-[0.2]" />

          <>
            <div className=" w-full bg-[#F2F2F2] rounded-lg p-4 px-6">
              <div className=" w-full flex flex-row justify-between">
                <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                  Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                >
                  <path
                    d="M28.1841 26.2231V6.02915C28.1841 5.42746 27.9825 4.92548 27.5793 4.52319C27.1762 4.12091 26.6746 3.91933 26.0747 3.91846H6.78327C6.18245 3.91846 5.6809 4.12004 5.27861 4.52319C4.87633 4.92635 4.67475 5.42833 4.67388 6.02915V20.0948C4.67388 20.6956 4.87546 21.1976 5.27861 21.6007C5.68177 22.0039 6.18332 22.205 6.78327 22.2042H24.1651L28.1841 26.2231ZM23.6127 17.6327H14.4698V16.3266H23.6127V17.6327ZM23.6127 13.7144H9.24531V12.4083H23.6127V13.7144ZM23.6127 9.79601H9.24531V8.48989H23.6127V9.79601Z"
                    fill="url(#paint0_linear_1_7624)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_7624"
                      x1="28.1841"
                      y1="15.0708"
                      x2="4.67388"
                      y2="15.0708"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#053BD3" />
                      <stop offset="1" stop-color="#03EAEA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className=" w-full flex flex-row justify-between mt-5">
                <div className=" w-[50%] text-lg font-medium text-[#000000] text-start  op">
                  {/* <span className=" text-[#053BD3]">3:04 PM</span> */}

                  {/* -12 Jan */}
                  {/* 2024 */}
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="outline-none p-2 rounded-lg"
                    value={layout.comments && layout.comments[0].commentDate}
                    onChange={(e) => {
                      const isComment = true;
                      handleLayoutDataChange(
                        e.target.name,
                        e.target.value,
                        pannelIndex,
                        layoutIndex,
                        isComment
                      );
                    }}
                    name="commentDate"
                  />
                </div>
                <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                  <div className=" p-2 bg-[#D6E1FF] rounded-lg text-center">
                    Janvi Sidana - Senior
                  </div>
                </div>
              </div>
              <div className=" w-full flex flex-col  mt-5 bg-white rounded-lg p-4">
                <textarea
                  placeholder="Write Your Reply here"
                  rows={6}
                  className="w-full focus:outline-none border-0 placeholder:font-medium placeholder:text-lg"
                  onChange={(e) => {
                    const isComment = true;
                    handleLayoutDataChange(
                      e.target.name,
                      e.target.value,
                      pannelIndex,
                      layoutIndex,
                      isComment
                    );
                  }}
                  value={layout.comments && layout.comments[0].commentText}
                  name="commentText"
                />
                <hr className=" border border-black my-2 opacity-[0.1]" />
                <div className=" w-full flex flex-row gap-2  justify-end">
                  <button className="hover:cursor-pointer items-center w-[150px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-xl text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA] relative">
                    <input
                      type="file"
                      name="commentMedia"
                      className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const isComment = true;
                        handleLayoutDataChange(
                          e.target.name,
                          e.target.files[0],
                          pannelIndex,
                          layoutIndex,
                          isComment
                        );
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                    >
                      <path
                        d="M19.7036 6.8653C19.0034 6.25724 18.0985 5.93743 17.1717 5.97042C16.2448 6.0034 15.365 6.38673 14.7097 7.04303L7.35546 14.3952C7.20664 14.5549 7.02717 14.683 6.82776 14.7718C6.62835 14.8607 6.41309 14.9084 6.19482 14.9123C5.97655 14.9161 5.75974 14.876 5.55732 14.7942C5.3549 14.7125 5.17102 14.5908 5.01666 14.4364C4.86229 14.2821 4.7406 14.0982 4.65884 13.8958C4.57708 13.6933 4.53693 13.4765 4.54078 13.2583C4.54463 13.04 4.59241 12.8247 4.68126 12.6253C4.77011 12.4259 4.89821 12.2464 5.05792 12.0976L12.41 4.7455C13.0576 4.09823 13.8272 3.58593 14.6742 3.2383C15.5213 2.89067 16.4289 2.71462 17.3444 2.72035C18.26 2.72609 19.1653 2.91349 20.008 3.27171C20.8506 3.62992 21.6137 4.15182 22.2531 4.80715C22.8925 5.46249 23.3955 6.23821 23.7329 7.08937C24.0703 7.94053 24.2353 8.8502 24.2186 9.76563C24.2018 10.6811 24.0035 11.5841 23.6351 12.4223C23.2668 13.2605 22.7357 14.0173 22.0727 14.6487L11.8335 24.3938C11.4417 24.776 10.9784 25.0774 10.4702 25.2806C9.96189 25.4839 9.41856 25.585 8.87121 25.5783C7.76578 25.5646 6.71104 25.1124 5.93901 24.3212C5.16698 23.5299 4.74091 22.4643 4.75453 21.3589C4.76814 20.2535 5.22033 19.1987 6.01162 18.4267L15.2083 9.22786C15.3583 9.07267 15.5377 8.94891 15.7361 8.86381C15.9345 8.77871 16.1478 8.73397 16.3637 8.73219C16.5795 8.73042 16.7935 8.77165 16.9933 8.85348C17.193 8.93532 17.3745 9.05611 17.527 9.20881C17.6796 9.36152 17.8002 9.54308 17.8819 9.7429C17.9635 9.94272 18.0045 10.1568 18.0026 10.3726C18.0006 10.5885 17.9556 10.8018 17.8704 11.0001C17.7851 11.1984 17.6611 11.3777 17.5058 11.5276L8.31566 20.7264C8.15488 20.8987 8.06662 21.1263 8.06922 21.362C8.07182 21.5976 8.16507 21.8233 8.32962 21.992C8.49417 22.1607 8.71737 22.2596 8.95289 22.2681C9.18842 22.2766 9.41818 22.1941 9.59448 22.0377L19.8294 12.2927C20.2003 11.9406 20.4933 11.5148 20.6897 11.0426C20.8861 10.5704 20.9814 10.0624 20.9696 9.55113C20.9577 9.03988 20.839 8.53677 20.6209 8.07419C20.4029 7.61162 20.0904 7.19982 19.7036 6.8653Z"
                        fill="white"
                      />
                    </svg>
                    <span className=" text-sm font-medium">Attach file</span>
                  </button>
                  <button className=" items-center w-[80px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-full text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
                    <span className=" text-sm font-medium">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    );
  }
);
