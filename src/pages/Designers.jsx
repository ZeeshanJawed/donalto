/* eslint-disable react/no-unknown-property */
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Dropdown, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCaretDown, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { authToken } from "../constant/AuthToken";
import { serverDomain } from "../constant/serverDomain";

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

const renderComp = (item) => {
  // uploads/file-1725257402284.pdf
  console.log("item", item);
  const fileType =
    item[0].substring(item.lastIndexOf(".") + 1) ||
    item.substring(item.lastIndexOf(".") + 1);

  const newItem =
    item[0].replace(/^uploads\//, "") || item.replace(/^uploads\//, "");
  // console.log(fileType);
  // console.log(item);

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `${serverDomain}/upload/download/file/${newItem}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (fileType === "pdf") {
    return (
      <div
        onClick={handleClick}
        className="w-full h-full flex items-center gap-2 mb-1"
      >
        <img src="/pdf.png" alt="" className="w-[36px] object-cover" />
        <h6 className="text-black font-medium">{newItem}</h6>
      </div>
    );
  }
};

export default function Designers() {
  const [openModal, setOpenModal] = useState(false);
  const [singleComment, setSingleComment] = useState(false);
  const [selectBOQ, setSelectBOQ] = useState(false);
  const allowedExtensions = [".pdf", ".docx", ".xlsx", ".csv"]; // Fixed ".docs" to ".docx"
  const [isFileAllowed, setFileAllowed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [projects, setProjects] = useState([]);
  const [boqFields, setBoqFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [boqSummaryList, setBoqSummaryList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update fileList regardless of isFileAllowed
  };

  const handleChange2 = ({ fileList: newFileList }) => {
    setFileList2(newFileList); // Update fileList2 regardless of isFileAllowed
  };

  const handleChange3 = ({ fileList: newFileList }) => {
    setFileList3(newFileList); // Update fileList3 regardless of isFileAllowed
  };

  const beforeUpload = (file) => {
    const isAllowed = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!isAllowed) {
      setFileAllowed(false);
      // toast.error('File formats allowed are ".pdf, .docx, .xlsx, .csv"')
      return false; // Prevents the file from being added to the fileList
    }

    setFileAllowed(true);
    return true; // Proceed with the upload
  };
  const [showSummary, setShowSummary] = useState(false);
  const [viewItem, setViewItem] = useState(false);

  const [isComments, setIsComments] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({
    projectId: 1,
    productName: "Wall Panel 4",
    layouts: [
      {
        layoutName: "wall 4",
        fileUrl: "https//jsjs.com",
        layoutDescription: "need to paint this wall",
        status: "PENDING",
        tragetDate: "2022-01-01",
        comments: [
          {
            userId: 1,
            commentText: "need to pain blue colour",
            commentDate: "2022-01-01",
            commentMedia: null,
          },
        ],
      },
    ],
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [boqFormData, setBoqFormData] = useState({
    jobCardId: 1,
    projectId: 1,
    layouts: [
      {
        BoqFeildName: "wall panel",
        amentmentQyt: 12,
        actualQty: 20,
      },
    ],
  });

  const handleBoqAdd = async () => {
    try {
      const res = await axios.post(
        `${serverDomain}/boqSummary/create`,
        {
          ...boqFormData,
          layouts: [
            {
              ...boqFormData.layouts[0],
              difference:
                Number(boqFormData.layouts[0].actualQty) -
                Number(boqFormData.layouts[0].amentmentQyt),
            },
          ],
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // console.log("file", fileList2);

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

  const handleSubmit = async () => {
    try {
      console.log(formData);
      if (!fileList2[0]?.originFileObj) {
        alert("Please upload a file");
        return;
      }

      const formData2 = new FormData();

      formData2.append("file", fileList2[0]?.originFileObj);
      console.log("file", fileList2[0]);

      const fileRes = await axios.post(
        `${serverDomain}/upload/file`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authToken,
          },
        }
      );

      console.log(fileRes);
      if (fileRes.status === 200) {
        const res = await axios.post(
          `${serverDomain}/product/create`,
          {
            ...formData,
            layouts: [
              {
                ...formData.layouts[0],
                fileUrl: fileRes.data.file,
              },
            ],
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (item) => {
    try {
      const res = await axios.put(
        `${serverDomain}/product/update/${item.id}`,
        {
          ...item,
          layouts: [
            {
              ...item.layouts[0],
              status: "APPROVE",
            },
          ],
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log("update product response", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverDomain}/product/projectById/1`, {
          headers: {
            Authorization: authToken,
          },
        });

        console.log(res);
        setProjects(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleAddField = async () => {
    try {
      const res = await axios.post(
        `${serverDomain}/boqField/create`,
        {
          fieldName,
          fieldDescription: "MS Countdut Panel Ok",
          fieldType: "Text",
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setRefresh(!refresh);
      setFieldName("");
      console.log("add field res", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverDomain}/boqField/list`, {
          headers: {
            Authorization: authToken,
          },
        });

        // console.log("boqfield", res);
        setBoqFields(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/boqSummary/projectById/1`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        console.log("boqsummary", res);
        setBoqSummaryList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

  // console.log(formData);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full  md:p-10 px-3 py-10  bg-[#fff] ">
        <div className="w-full  flex flex-row 2xl:flex-nowrap gap-3 flex-wrap items-center border p-3 rounded-xl border-[rgba(0, 0, 0, 0.10)] justify-between">
          <div className=" xl:w-[40%] w-full flex flex-row gap-4">
            <div className="flex flex-col">
              <h2 className=" opacity-[0.6] text-xl font-medium">May</h2>
              <p className=" opacity-[0.5] text-sm">
                Today is Saturday, Jul 9th, 2023
              </p>
            </div>
            <vr className="border border-[#000000] opacity-[0.2]" />
          </div>
          <div className=" xl:w-[60%] w-full flex flex-row sm:flex-nowrap flex-wrap  gap-4 justify-start md:justify-end">
            <div className=" md:w-[230px] w-[180px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg">
              <button
                onClick={() => setSelectBOQ(true)}
                className="w-full justify-center items-center   md:px-5 md:h-[38px] h-[50px] font-medium bg-white rounded-lg text-[#0645D5] flex flex-row gap-3 "
              >
                <span className=" text-sm">View BOQ Summary</span>
              </button>
            </div>
            <div className=" md:w-[230px] w-[180px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg">
              <button
                onClick={() => setViewItem(true)}
                className="w-full justify-center items-center   md:px-5 md:h-[38px] h-[50px] font-medium bg-white rounded-lg text-[#0645D5] flex flex-row gap-3 "
              >
                <span className=" text-sm">Generate Team Report</span>
              </button>
            </div>
            <div className=" md:w-[230px] w-[180px] justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg">
              <button className=" w-full items-center justify-center   md:px-5 md:h-[38px] h-[50px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                <AiOutlinePlus className="text-white text-lg" />
                <span className=" text-sm">Add File</span>
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
        <div className="">
          <div className="">
            <div className=" flex mt-5 flex-row min-h-[1000px] gap-5 flex-shrink-0 w-[1000px] overflow-x-auto">
              <div className="min-h-[1000px] w-[335px] flex flex-col p-2 gap-3 bg-white border rounded-xl border-[rgba(0, 0, 0, 0.20)]">
                <div className="flex w-full flex-row justify-between items-center p-1 opacity-[0.7]">
                  <input
                    className="border-none outline-none opacity-[0.7] font-medium text-lg text-black"
                    placeholder="Wall Panel"
                    value={formData.productName}
                    onChange={handleFormChange}
                    name="productName"
                  />
                  {/* Wall Panel Details */}
                  {/* </h3> */}
                  <HiOutlineDotsVertical className=" cursor-pointer" />
                </div>
                <hr className="border border-[#000] opacity-[0.2]" />
                <div className=" p-2 rounded-lg flex flex-col gap-2 bg-[#F7F7F7] mt-1">
                  <div className=" flex flex-row justify-between items-center w-full ">
                    <input
                      className=" w-[60%] text-[#505050] rounded-lg bg-white p-2 text-center border-none outline-none"
                      value={formData.layouts[0].layoutName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          layouts: [
                            {
                              ...formData.layouts[0],
                              layoutName: e.target.value,
                            },
                          ],
                        })
                      }
                      placeholder="Layout Name"
                    />
                    {/* Layout */}
                    {/* </div> */}
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
                        fileList={fileList2}
                        onChange={handleChange2}
                      >
                        {fileList2.length >= 1 ? null : uploadButton}
                      </Upload>
                      {/* <p className=" text-[#828282] text-xs">On Nov 16, 2023</p> */}
                      <input
                        type="date"
                        className="text-[#053BD3] p-2 border-none outline-none"
                        placeholder="2024-12-12"
                        defaultValue={"2024-12-12"}
                        min={today} // Set the minimum date to today
                        value={formData.layouts[0].tragetDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            layouts: [
                              {
                                ...formData.layouts[0],
                                tragetDate: e.target.value,
                              },
                            ],
                          })
                        }
                      />
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
                  <div
                    onClick={() => setOpenModal(true)}
                    className="w-full cursor-pointer text-xs py-3 mt-5 bg-white h-[40px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg"
                  >
                    View Comments (23)
                    <FaCaretRight className=" text-lg" />
                  </div>
                </div>
                <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Senior Comments</p>
                  <FaCaretRight className="text-[#828282]" />
                </div>
                <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Client Comments</p>
                  <FaCaretRight className="text-[#828282]" />
                </div>

                <div className=" p-2 rounded-lg flex flex-col gap-2 bg-[#F7F7F7] mt-1">
                  <div className=" flex flex-row justify-between items-center w-full ">
                    <div className=" w-[60%] text-[#505050] rounded-lg bg-white p-2 text-center">
                      Production BOQ
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
                        fileList={fileList2}
                        onChange={handleChange2}
                      >
                        {fileList2.length >= 1 ? null : uploadButton}
                      </Upload>
                      <p className=" text-[#828282] text-xs">On Nov 16, 2023</p>
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
                  <div
                    onClick={() => setOpenModal(true)}
                    className="w-full cursor-pointer text-xs py-3 mt-5 bg-white h-[40px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg"
                  >
                    View Comments (23)
                    <FaCaretRight className=" text-lg" />
                  </div>
                </div>

                <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">
                    BOQ Comments(Senior)
                  </p>
                  <FaCaretRight className="text-[#828282]" />
                </div>
                <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Client Comment</p>
                  <FaCaretRight className="text-[#828282]" />
                </div>

                <div
                  className=" md:w-[230px] w-[180px] justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
                  onClick={handleSubmit}
                >
                  <button className=" w-full items-center justify-center   md:px-5 md:h-[38px] h-[50px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                    <AiOutlinePlus className="text-white text-lg" />
                    <span className=" text-sm">Submit Product</span>
                  </button>
                </div>
              </div>

              {projects.map((p) => (
                <>
                  <div className="min-h-[1000px] min-w-[435px] flex flex-col p-2 gap-3 bg-white border rounded-xl border-[rgba(0, 0, 0, 0.20)]">
                    <div className="flex w-full flex-row justify-between items-center p-1 opacity-[0.7]">
                      <h3 className=" opacity-[0.7] font-medium text-lg text-black">
                        {p?.productName}
                      </h3>
                      <HiOutlineDotsVertical className=" cursor-pointer" />
                    </div>
                    <hr className="border border-[#000] opacity-[0.2]" />
                    <div className=" p-2 rounded-lg flex flex-col gap-2 bg-[#F7F7F7] mt-1">
                      <div className=" flex flex-row justify-between items-center w-full ">
                        <div className=" w-[60%] text-[#505050] rounded-lg bg-white p-2 text-center">
                          {p?.layouts[0]?.layoutName}
                        </div>
                      </div>
                      <div className=" flex flex-row justify-between gap-2 items-start w-full ">
                        <div className=" w-[70%] bg-[#D3E9FF] p-2 rounded-lg">
                          {/* <Upload
                          listType="picture-card"
                          beforeUpload={beforeUpload}
                          fileList={fileList2}
                          onChange={handleChange2}
                        >
                          {fileList2.length >= 1 ? null : uploadButton}
                        </Upload> */}
                          {renderComp(p?.layouts[0]?.fileUrl)}
                          <p className=" text-[#828282] text-xs">
                            {p?.layouts[0]?.tragetDate || "On Nov 16, 2023"}
                          </p>
                        </div>
                        <div
                          onClick={() => updateStatus(p)}
                          className=" w-[30%] cursor-pointer p-1 flex-col justify-start flex gap-2  "
                        >
                          <div className=" w-full p-1 py-2 rounded-lg bg-[#B4FFBB] text-[#00900D] text-xs text-center">
                            Approve
                          </div>
                          <div className=" w-full p-1 py-2 rounded-lg bg-[#FFABAB] text-[#AD0000] text-xs text-center">
                            Rework
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => setIsComments(true)}
                        className="w-full cursor-pointer text-xs py-3 mt-5 bg-white h-[40px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg"
                      >
                        View Comments (23)
                        <FaCaretRight className=" text-lg" />
                      </div>
                    </div>
                    <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                      <Checkbox onChange={() => {}}></Checkbox>
                      <p className=" text-[#505050] text-sm ">Senior Comment</p>
                      <FaCaretLeft className="text-[#828282]" />
                    </div>

                    <div className=" p-2 rounded-lg flex flex-col gap-2 bg-[#F7F7F7] mt-1">
                      <div className=" flex flex-row justify-between items-center w-full ">
                        <div className=" w-[60%] text-[#505050] rounded-lg bg-white p-2 text-center">
                          Production BOQ
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
                            fileList={fileList2}
                            onChange={handleChange2}
                          >
                            {fileList2.length >= 1 ? null : uploadButton}
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
                      <div
                        onClick={() => setIsComments(p?.id)}
                        className="w-full cursor-pointer text-xs py-3 mt-5 bg-white h-[40px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg"
                      >
                        View Comments (23)
                        <FaCaretRight className=" text-lg" />
                      </div>
                    </div>
                    <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                      <Checkbox onChange={() => {}}></Checkbox>
                      <p className=" text-[#505050] text-sm ">
                        BOQ Comments(Senior)
                      </p>
                      <FaCaretRight className="text-[#828282]" />
                    </div>
                    <div className="flex flex-row border border-[rgba(0, 0, 0, 0.10)] bg-white  p-2 items-center justify-between rounded-lg">
                      <Checkbox onChange={() => {}}></Checkbox>
                      <p className=" text-[#505050] text-sm ">Client Comment</p>
                      <FaCaretRight className="text-[#828282]" />
                    </div>
                  </div>

                  {p?.id == isComments && (
                    <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#79797998]  flex justify-center ">
                      <div className=" md:w-[680px] m-2 w-[500px] h-[771px] flex flex-col gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
                        <div className=" flex justify-between  bg-white">
                          <h1 className=" text-2xl font-medium text-[#000000] opacity-[0.6]">
                            Comments
                          </h1>
                          <div className=" mt-[-35px] mr-[-35px] h-[40px] flex justify-center  items-center w-[40px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-2 rounded-full">
                            <RxCross2
                              className="text-white  text-2xl cursor-pointer"
                              onClick={() => {
                                setIsComments(false);
                              }}
                            />
                          </div>
                        </div>
                        <hr className=" border border-[#000000] opacity-[0.2]" />
                        {singleComment ? (
                          <>
                            <div className=" w-full bg-[#F2F2F2] rounded-lg p-4 px-6">
                              <div className=" w-full flex flex-row justify-between">
                                <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                                  Rorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nunc vulputate libero et
                                  velit interdum, ac aliquet odio mattis.
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
                                  <input
                                    type="date"
                                    className="text-[#053BD3] p-2 border-none outline-none"
                                    placeholder="2024-12-12"
                                    value={
                                      p?.layouts[0]?.comments[0]?.commentDate
                                    }
                                  />
                                  {/* 3:04 PM</span> -12 Jan */}
                                  {/* 2024 */}
                                </div>
                                <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                                  <div className=" p-2 bg-[#D6E1FF] rounded-lg text-center">
                                    Janvi Sidana - Senior
                                  </div>
                                </div>
                              </div>
                              <div className=" w-full flex flex-col  mt-5 bg-white rounded-lg p-4">
                                <textarea
                                  value={p?.layouts[0].comments[0].commentText}
                                  placeholder="Write Your Reply here"
                                  rows={6}
                                  className="w-full focus:outline-none border-0 placeholder:font-medium placeholder:text-lg"
                                />
                                <hr className=" border border-black my-2 opacity-[0.1]" />
                                <div className=" w-full flex flex-row gap-2 justify-end">
                                  <button className=" items-center w-[150px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-xl text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
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
                                    <span className=" text-sm font-medium">
                                      Attach file
                                    </span>
                                  </button>
                                  <button className=" items-center w-[80px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-full text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
                                    <span className=" text-sm font-medium">
                                      Send
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {p?.layouts[0]?.comments?.map((comment) => (
                              <div className=" w-full cursor-pointer bg-[#F2F2F2] rounded-lg p-4 px-6">
                                <div className=" w-full flex flex-row justify-between">
                                  <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                                    {comment?.commentText}
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
                                <div className=" text-lg font-medium text-[#000000] text-start  op">
                                  <div className="py-1 w-[50%] bg-white my-1 rounded-lg">
                                    {renderComp(p?.layouts[0]?.fileUrl)}
                                  </div>
                                </div>
                                <div className=" w-full flex flex-row justify-between mt-4">
                                  <div className=" w-[50%] text-lg font-medium text-[#000000] text-start  op">
                                    <span className=" text-[#053BD3]">
                                      {new Date(
                                        comment?.commentDate
                                      ).toLocaleTimeString()}
                                    </span>{" "}
                                    -{comment?.commentDate}
                                  </div>
                                  <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                                    <div className=" p-2 bg-[#D6E1FF] rounded-lg text-center">
                                      Janvi Sidana - Senior
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#79797998]  flex justify-center ">
          <div className=" md:w-[680px] m-2 w-[500px] h-[771px] flex flex-col gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
            <div className=" flex justify-between  bg-white">
              <h1 className=" text-2xl font-medium text-[#000000] opacity-[0.6]">
                Comments
              </h1>
              <div className=" mt-[-35px] mr-[-35px] h-[40px] flex justify-center  items-center w-[40px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-2 rounded-full">
                <RxCross2
                  className="text-white  text-2xl cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                    setSingleComment(false);
                  }}
                />
              </div>
            </div>
            <hr className=" border border-[#000000] opacity-[0.2]" />
            {singleComment ? (
              <>
                <div className=" w-full bg-[#F2F2F2] rounded-lg p-4 px-6">
                  <div className=" w-full flex flex-row justify-between">
                    <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                      Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
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
                      <input
                        type="date"
                        className="text-[#053BD3] p-2 border-none outline-none"
                        placeholder="2024-12-12"
                        min={today} // Set the minimum date to today
                        value={formData.layouts[0].comments[0].commentDate}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            layouts: [
                              {
                                ...formData.layouts[0],
                                comments: [
                                  {
                                    ...formData.layouts[0].comments[0],
                                    commentDate: e.target.value,
                                  },
                                ],
                              },
                            ],
                          });
                        }}
                      />
                      {/* 3:04 PM</span> -12 Jan */}
                      {/* 2024 */}
                    </div>
                    <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                      <div className=" p-2 bg-[#D6E1FF] rounded-lg text-center">
                        Janvi Sidana - Senior
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex flex-col  mt-5 bg-white rounded-lg p-4">
                    <textarea
                      value={formData.layouts[0].comments[0].commentText}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          layouts: [
                            {
                              ...formData.layouts[0],
                              comments: [
                                {
                                  ...formData.layouts[0].comments[0],
                                  commentText: e.target.value,
                                },
                              ],
                            },
                          ],
                        });
                      }}
                      placeholder="Write Your Reply here"
                      rows={6}
                      className="w-full focus:outline-none border-0 placeholder:font-medium placeholder:text-lg"
                    />
                    <hr className=" border border-black my-2 opacity-[0.1]" />
                    <div className=" w-full flex flex-row gap-2 justify-end">
                      <button className=" items-center w-[150px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-xl text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
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
                        <span className=" text-sm font-medium">
                          Attach file
                        </span>
                      </button>
                      <button className=" items-center w-[80px] justify-center p-1 h-[40px] bg-gradient-to-r rounded-full text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]">
                        <span className=" text-sm font-medium">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => setSingleComment(true)}
                  className=" w-full cursor-pointer bg-[#F2F2F2] rounded-lg p-4 px-6"
                >
                  <div className=" w-full flex flex-row justify-between">
                    <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                      Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
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
                      <span className=" text-[#053BD3]">3:04 PM</span> -12 Jan
                      2024
                    </div>
                    <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                      <div className=" p-2 bg-[#D6E1FF] rounded-lg text-center">
                        Janvi Sidana - Senior
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setSingleComment(true)}
                  className=" w-full cursor-pointer bg-[#F2F2F2] rounded-lg p-4 px-6"
                >
                  <div className=" w-full flex flex-row justify-between">
                    <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                      Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
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
                      <div className=" w-[70%] bg-white my-1 rounded-lg">
                        <Upload
                          listType="picture-card"
                          beforeUpload={beforeUpload}
                          fileList={fileList2}
                          onChange={handleChange2}
                        >
                          {fileList2.length >= 1 ? null : uploadButton}
                        </Upload>
                      </div>
                      <span className=" text-[#053BD3]">3:04 PM</span> -12 Jan
                      2024
                    </div>
                    <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                      <div className=" p-2 bg-[#D6E1FF] h-[40px] rounded-lg text-center">
                        Janvi Sidana - Senior
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setSingleComment(true)}
                  className=" w-full cursor-pointer bg-[#F2F2F2] rounded-lg p-4 px-6"
                >
                  <div className=" w-full flex flex-row justify-between">
                    <div className=" w-[95%] text-lg font-medium text-[#000000] text-start  opacity-[0.8]">
                      Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
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
                      <div className=" w-[70%] bg-white my-1 rounded-lg">
                        <Upload
                          listType="picture-card"
                          beforeUpload={beforeUpload}
                          fileList={fileList2}
                          onChange={handleChange2}
                        >
                          {fileList2.length >= 1 ? null : uploadButton}
                        </Upload>
                      </div>
                      <span className=" text-[#053BD3]">3:04 PM</span> -12 Jan
                      2024
                    </div>
                    <div className=" w-[50%] text-[15px] font-medium text-[#000000] text-start flex justify-end  ">
                      <div className=" p-2 bg-[#A4FFAC] h-[40px] rounded-lg text-center">
                        Janvi Sidana - Senior
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {viewItem && (
        <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#79797998]  flex justify-center ">
          <div className=" md:w-[800px] w-[500px] m-2 h-[400px] flex flex-col gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
            <div className=" flex flex-row justify-between  bg-white">
              <h1 className=" text-3xl font-[600] text-[#000000] opacity-[0.8]">
                Select the Item you want to view
              </h1>
              <div className=" mt-[-40px] mr-[-40px] h-[40px] border border-[#00000040] flex justify-center  items-center w-[40px] bg-white p-2 rounded-full">
                <RxCross2
                  className="text-[#053BD3]  text-2xl cursor-pointer"
                  onClick={() => {
                    setViewItem(false);
                  }}
                />
              </div>
            </div>
            <div className=" flex flex-col w-full p-2 mt-2 text-start gap-2 ">
              <span className=" text-[#053BD3] font-medium text-lg">
                Category
              </span>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <div className=" cursor-pointer w-full flex flex-row justify-between items-center text-[#626262] rounded-lg border border-[#E7E7E7] bg-[#FCFCFC] py-2 px-4">
                  <p className="  text-lg font-normal">Wall Panel</p>
                  <FaCaretDown className=" text-lg" />
                </div>
              </Dropdown>
            </div>

            <div className=" flex flex-col w-full p-2 mt-2 text-start gap-2 ">
              <span className=" text-[#053BD3] font-medium text-lg">
                Sub-Category
              </span>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <div className=" w-full cursor-pointer flex flex-row justify-between items-center text-[#626262] rounded-lg border border-[#E7E7E7] bg-[#FCFCFC] py-2 px-4">
                  <p className="  text-lg font-normal">Elevation</p>
                  <FaCaretDown className=" text-lg" />
                </div>
              </Dropdown>
            </div>
            <div className=" flex flex-row w-full justify-between items-start">
              {/* <p className=" text-lg text-[#FF0000] flex flex-row items-center ml-2 gap-2">
                <IoIosWarning className=" text-xl" /> Invalid Password!
              </p> */}
              <button className=" p-3 bg-[#306BFF] text-lg font-semibold rounded-lg text-white flex justify-center items-center w-[150px]">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#79797998]  flex justify-center ">
          <div className=" md:w-[780px] w-[500px] m-2 h-[1600px] flex flex-col gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
            <div className=" flex justify-between  bg-white">
              <h1 className="mt-5 font-bold text-2xl selectBOQHeading  opacity-[0.6]">
                BOQ Summary
              </h1>
              <div className=" mt-[-35px] mr-[-35px] h-[40px] flex justify-center  items-center w-[40px] bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-2 rounded-full">
                <RxCross2
                  className="text-white  text-2xl cursor-pointer"
                  onClick={() => {
                    setShowSummary(false);
                  }}
                />
              </div>
            </div>
            <hr className=" border border-[#000000] opacity-[0.2]" />

            <div className=" text-start  overflow-x-scroll p-4  flex flex-col w-full">
              <div className=" min-w-[700px]">
                <div className="flex justify-end">
                  <div
                    onClick={handleBoqAdd}
                    className=" md:w-[230px] w-[180px] justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
                  >
                    <button className=" w-full items-center justify-center   md:px-5 md:h-[38px] h-[50px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                      <AiOutlinePlus className="text-white text-lg" />
                      <span className=" text-sm">Add Boq Summary</span>
                    </button>
                  </div>
                </div>
                <input
                  className="text-lg border-none outline-none mb-3 font-medium text-[#000]"
                  placeholder="Wall Panel"
                  value={boqFormData.layouts[0].BoqFeildName}
                  onChange={(e) => {
                    setBoqFormData({
                      ...boqFormData,
                      layouts: [
                        {
                          ...boqFormData.layouts[0],
                          BoqFeildName: e.target.value,
                        },
                      ],
                    });
                  }}
                />
                {/* Wall Panel 50 */}
                {/* </h1> */}
                <div className="w-full flex flex-row gap-3 items-center justify-start">
                  <div className="w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[120px] text-xs">
                      Amentment QTY
                    </p>
                    <input
                      type="text"
                      className="w-full outline-none"
                      value={boqFormData.layouts[0].amentmentQyt}
                      onChange={(e) => {
                        setBoqFormData({
                          ...boqFormData,
                          layouts: [
                            {
                              ...boqFormData.layouts[0],
                              amentmentQyt: e.target.value,
                            },
                          ],
                        });
                      }}
                    />
                  </div>
                  <p>-</p>
                  <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                      Actual QTY
                    </p>
                    <input
                      type="text"
                      className="w-full outline-none"
                      value={boqFormData.layouts[0].actualQty}
                      onChange={(e) => {
                        setBoqFormData({
                          ...boqFormData,
                          layouts: [
                            {
                              ...boqFormData.layouts[0],
                              actualQty: e.target.value,
                            },
                          ],
                        });
                      }}
                    />
                  </div>
                  <p>=</p>
                  <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                      Difference
                    </p>
                    <input
                      type="text"
                      className="w-full outline-none"
                      disabled
                      value={
                        boqFormData.layouts[0].amentmentQyt -
                        boqFormData.layouts[0].actualQty
                      }
                    />
                  </div>
                </div>
                {boqSummaryList?.layouts?.map((item, index) => (
                  <div key={item.BoqFeildName}>
                    <h1 className="text-lg mt-5 mb-3 font-medium text-[#000]">
                      {item.BoqFeildName}
                    </h1>
                    <div className="w-full flex flex-row gap-3 items-center justify-start">
                      <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                        <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[120px] text-xs">
                          Amentment QTY
                        </p>
                        {item.amentmentQyt}
                      </div>
                      <p>-</p>
                      <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                        <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                          Actual QTY
                        </p>
                        {item.actualQty}
                      </div>
                      <p>=</p>
                      <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                        <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                          Difference
                        </p>
                        {item.difference}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectBOQ && (
        <div className="w-full h-[100vh] overflow-y-scroll z-10  fixed top-0 start-0 bg-[#f0f0f030]  flex justify-center ">
          <div className=" md:w-[550px] w-[450px] m-2 h-[500px] flex flex-col selectBOQBox gap-3 my-32 rounded-lg p-6 bg-white opacity-[100] text-center ">
            <div className=" flex justify-between  bg-white">
              <h1 className=" text-2xl font-medium text-[#000000] selectBOQHeading opacity-[0.6]">
                Select fields to view BOQ Summary
              </h1>
              <div
                onClick={() => setShowAdd(true)}
                className="cursor-pointer text-lg font-medium opacity-[0.6] p-2 rounded-full"
              >
                +Add
              </div>
            </div>
            <hr className=" border border-[#000000] opacity-[0.2]" />

            <>
              <div className=" w-full flex flex-col gap-4 relative">
                {showAdd && (
                  <div className="absolute top-0 w-[300px] opacity-[1] items-center right-0 h-[70px] p-4 flex flex-row justify-between border border-[#0000001A] z-10 bg-[#c1e0ff] rounded-lg">
                    <input
                      onChange={(e) => setFieldName(e.target.value)}
                      value={fieldName}
                      placeholder="Name of field"
                      type="text"
                      className=" bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        handleAddField();
                        setShowAdd(false);
                      }}
                      className=" items-center w-[70px] justify-center p-1 h-[35px] bg-gradient-to-r rounded-lg text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]"
                    >
                      <span className=" text-xs font-normal">Done</span>
                    </button>
                  </div>
                )}
                {boqFields?.map((item, index) => (
                  <div className="w-full flex flex-row justify-between">
                    <div className=" w-[50%] flex flex-row gap-2">
                      <div className="w-[25px] h-[25px] bg-gradient-to-r rounded from-[#053BD3] to-[#03EAEA] p-[3px] flex flex-row justify-center items-center">
                        <div className=" w-full h-full bg-white ">
                          <label class="container">
                            <input type="checkbox" />
                            <svg viewBox="0 0 64 64" height="100%" width="100%">
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                          </label>
                        </div>
                      </div>
                      <h3 className=" opacity-[0.6] font-medium">
                        {item.fieldName}
                      </h3>
                    </div>
                  </div>
                ))}
                <div className=" w-full flex flex-row justify-end">
                  <button
                    onClick={() => {
                      setSelectBOQ(false);
                      setShowSummary(true);
                    }}
                    className=" items-center w-[200px] justify-center p-1 h-[50px] bg-gradient-to-r rounded-full text-white flex flex-row gap-3 from-[#053BD3] to-[#03EAEA]"
                  >
                    <span className=" text-sm font-medium">
                      View BOQ Summary
                    </span>
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
