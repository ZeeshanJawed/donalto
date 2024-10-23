/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Upload } from "antd";
import { Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authToken } from "../constant/AuthToken";
import { serverDomain } from "../constant/serverDomain";

export default function Factory() {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const [isFileAllowed, setFileAllowed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [jobCardDetails, setJobCardDetails] = useState({});
  const [formData, setFormData] = useState({
    projectId: 1,
    jobCardId: 1,
    productId: 1,
    title: "row material wall panel",
    total: {
      totalQuantity: 100,
      usedQuantity: 100,
      pending: 0,
    },
    shearing: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
    cutToLength: {
      totalQuantity: 0,
      done: 0,
      pending: 10,
    },
    bending: {
      totalQuantity: 12,
      done: 0,
      pending: 0,
    },
    powderCoating: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
    assembly: {
      totalQuantity: 0,
      done: 0,
      pending: 12,
    },
    puffingAndPressing: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
    qualityCheck: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
    packaging: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
    dispatch: {
      totalQuantity: 0,
      done: 0,
      pending: 0,
    },
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
  const navigate = useNavigate();
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
      key: "5",
      label: <a onClick={() => navigate("/factory")}>Factory</a>,
    },
    {
      key: "6",
      label: <a onClick={() => navigate("/project")}>Project</a>,
    },
    {
      key: "7",
      label: <a onClick={() => navigate("/directors")}>Directors</a>,
    },
  ];

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

  const handleSubmit = async () => {
    console.log("form data", formData);
    setIsSubmit(true);

    try {
      const res = await axios.post(`${serverDomain}/factory/create`, formData, {
        headers: {
          Authorization: authToken,
        },
      });

      console.log("factory response", res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };

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
  }, []);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] bg-[#F4F6F8] w-full  ">
        <div className="w-full flex md:px-10 px-3 pb-1 pt-4  bg-white flex-col">
          {/* <h1 className="  md:text-4xl text-2xl font-medium mb-0 lg:ms-0 ms-10">
            Glenmark
          </h1> */}
           <div className=" pb-2 w-[180px]">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <div
                  className={`w-full items-center rounded-3xl p-2 py-53 bg-gradient-to-r from-[#053BD3] to-[#03EAEA] text-white  cursor-pointer text-lg    flex flex-row justify-center gap-3 h-[50px] font-medium text-center`}
                >
                  Wall Panel <FaAngleDown className="text-white text-xl" />
                </div>
              </Dropdown>
            </div>
          <div className=" w-full flex flex-row gap-2 md:flex-nowrap flex-wrap  mt-8 items-end p-3 justify-start">
            <div className=" w-[200px]">
              <h3 className="font-medium mt-1">Initial PO</h3>
              <div className="  w-full rounded-lg p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#F4F6F8",
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div className=" h-16 mt-2 gap-2 bg-[#F4F6F8] rounded-lg flex items-center p-1">
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
                  <p>
                    {jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  </p>
                </div>
                </div>
              </div>
            </div>
            <div className=" w-[200px]">
              <h3 className="font-medium mt-1">Service PO</h3>
              <div className="  w-full rounded-lg p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#F4F6F8",
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div className=" h-16 mt-2 gap-2 bg-[#F4F6F8] rounded-lg flex items-center p-1">
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
                  <p>
                    {jobCardDetails?.offer?.length > 0 && jobCardDetails?.offer[0]}
                  </p>
                </div>
                </div>
              </div>
            </div>
            <div className=" w-[200px]">
              <h3 className="font-medium mt-1">Conceptual Layout</h3>
              <div className="  w-full rounded-lg p-1">
                {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#F4F6F8",
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                <div className=" h-16 mt-2 gap-2 bg-[#F4F6F8] rounded-lg flex items-center p-1">
                <div
                  // target="_blank"
                  // href={jobCardDetails?.po?.length > 0 && jobCardDetails?.po[0]}
                  onClick={() => {
                    window.location.href =
                      jobCardDetails?.tendor?.length > 0
                        ? serverDomain + "/" + jobCardDetails.tendor[0]
                        : serverDomain; // Or some other default URL
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <img
                    src="/file.png"
                    alt="file"
                    className="w-6 object-cover h-6"
                  />
                  <p>
                    {jobCardDetails?.tendor?.length > 0 && jobCardDetails?.tendor[0]}
                  </p>
                </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>

        <div className=" md:p-10 py-10 px-4 w-full  min-h-[73vh]">
          <div className="flex min-h-[50vh] md:px-6 px-2 py-4 flex-col gap-4 bg-[#FFFFFF] lg:w-[70%] w-full  border border-[#B5BBC2] rounded-2xl">
            <div className="flex justify-between w-full mb-4 items-center">
              <h1 className="md:text-2xl text-xl font-[600]">
                <input
                  type="text"
                  className="outline-none w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Wall Pannel"
                />
                {/* Raw Material - Wall Panel */}
              </h1>
              <div
                className=" md:w-[230px] w-[180px] justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
                onClick={isSubmit ? null : handleSubmit}
              >
                <button className=" w-full items-center justify-center   md:px-5 md:h-[38px] h-[50px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                  <span className=" text-sm">
                    {isSubmit ? "Submitting..." : "Create"}
                  </span>
                </button>
              </div>
            </div>
            <div className=" w-full overflow-x-scroll">
              <div className=" min-w-[600px]">
                <div className="w-full flex flex-row gap-3 items-center mt-1 justify-start">
                  <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                      Total Quantity
                    </p>
                    <input
                      type="text"
                      className="outline-none w-full"
                      value={formData.total.totalQuantity}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          total: {
                            ...formData.total,
                            totalQuantity: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <p>-</p>
                  <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                      Used Quantity
                    </p>
                    <input
                      type="text"
                      className="outline-none w-full"
                      value={formData.total.usedQuantity}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          total: {
                            ...formData.total,
                            usedQuantity: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <p>=</p>
                  <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                    <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                      Pending
                    </p>
                    <input
                      type="text"
                      className="outline-none w-full"
                      value={formData.total.pending}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          total: {
                            ...formData.total,
                            pending: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className=" bg-white border border-[#0000001a] rounded-lg mt-5  p-4  flex flex-col w-full">
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Shearing
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.shearing.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            shearing: {
                              ...formData.shearing,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.shearing.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            shearing: {
                              ...formData.shearing,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.shearing.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            shearing: {
                              ...formData.shearing,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Cut to Length
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.cutToLength.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            cutToLength: {
                              ...formData.cutToLength,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.cutToLength.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            cutToLength: {
                              ...formData.cutToLength,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.cutToLength.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            cutToLength: {
                              ...formData.cutToLength,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Bending
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.bending.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            bending: {
                              ...formData.bending,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.bending.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            bending: {
                              ...formData.bending,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.bending.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            bending: {
                              ...formData.bending,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Power Coating
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.powderCoating.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            powderCoating: {
                              ...formData.powderCoating,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.powderCoating.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            powderCoating: {
                              ...formData.powderCoating,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.powderCoating.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            powderCoating: {
                              ...formData.powderCoating,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Assembly
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.assembly.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            assembly: {
                              ...formData.assembly,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.assembly.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            assembly: {
                              ...formData.assembly,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.assembly.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            assembly: {
                              ...formData.assembly,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Puffing/Pressing
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.puffingAndPressing.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            puffingAndPressing: {
                              ...formData.puffingAndPressing,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.puffingAndPressing.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            puffingAndPressing: {
                              ...formData.puffingAndPressing,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.puffingAndPressing.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            puffingAndPressing: {
                              ...formData.puffingAndPressing,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Quality Check
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.qualityCheck.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            qualityCheck: {
                              ...formData.qualityCheck,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.qualityCheck.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            qualityCheck: {
                              ...formData.qualityCheck,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.qualityCheck.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            qualityCheck: {
                              ...formData.qualityCheck,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Packaging
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.packaging.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            packaging: {
                              ...formData.packaging,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.packaging.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            packaging: {
                              ...formData.packaging,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.packaging.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            packaging: {
                              ...formData.packaging,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="text-lg mt-4 mb-3 font-medium text-[#000]">
                    Dispatch
                  </h1>
                  <div className="w-full flex flex-row gap-3 items-center justify-start">
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Total Quantity
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.dispatch.totalQuantity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            dispatch: {
                              ...formData.dispatch,
                              totalQuantity: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>-</p>
                    <div className=" w-[30%] h-[50px] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-normal w-[100px] text-xs">
                        Done
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.dispatch.done}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            dispatch: {
                              ...formData.dispatch,
                              done: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <p>=</p>
                    <div className=" w-[30%] h-[50px] bg-[#fafafa] rounded-lg border-dashed p-4 border border-[#B5BBC2]">
                      <p className="bg-white p-1 mt-[-28px] text-[#707C8B] font-[700] w-[90px] text-xs">
                        Pending
                      </p>
                      <input
                        type="text"
                        className="outline-none w-full"
                        value={formData.dispatch.pending}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            dispatch: {
                              ...formData.dispatch,
                              pending: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
