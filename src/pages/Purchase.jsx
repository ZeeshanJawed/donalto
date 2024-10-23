/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import toast from "react-hot-toast";
import { authToken } from "../constant/AuthToken";
import { serverDomain } from "../constant/serverDomain";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Purchase() {
  const allowedExtensions = [".pdf"];
  const [isFileAllowed, setFileAllowed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    projectId: 1,
    indent: [
      {
        fileUrl: "",
        fileType: "pdf",
        uploadDate: "2024-05-23",
        status: "APPROVED",
        fileDescription: "descrfoiption",
      },
    ],
    purchaseOrder: [
      {
        fileUrl: "",
        fileType: "pdf",
        uploadDate: "2024-05-23",
        status: "APPROVED",
        fileDescription: "descrfoiption",
        deliveryDate: "2024-12-12",
      },
    ],
  });
  const [files, setFiles] = useState({
    indent: [],
    purchaseOrder: [],
  });
  const handleChange = ({ fileList: newFileList }) => {
    if (isFileAllowed) {
      setFileList(newFileList);
    }
  };
  const handleChange2 = (info, name) => {
    if (isFileAllowed) {
      let fileList = [...info.fileList];

      // Set file state in job form data
      setFiles({
        ...files,
        [name]: fileList.map((file) => file.originFileObj),
      });
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
      toast.error("Only pdf formats is allowed ");
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

  const uploadImage = async (prevFormData) => {
    let updatedFormData = { ...prevFormData };

    if (files.indent.length > 0) {
      const indentFile = new FormData();
      indentFile.append("file", files.indent[0]);
      const file1res = await axios.post(
        `${serverDomain}/upload/file`,
        indentFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authToken,
          },
        }
      );

      updatedFormData = {
        ...updatedFormData,
        indent: [
          {
            ...updatedFormData.indent[0],
            fileUrl: file1res.data.file,
          },
        ],
      };
    }

    if (files.purchaseOrder.length > 0) {
      const poFile = new FormData();
      poFile.append("file", files.purchaseOrder[0]);
      const file2res = await axios.post(`${serverDomain}/upload/file`, poFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      });

      updatedFormData = {
        ...updatedFormData,
        purchaseOrder: [
          {
            ...updatedFormData.purchaseOrder[0],
            fileUrl: file2res.data.file,
          },
        ],
      };
    }

    return updatedFormData;
  };

  const handleSubmit = async () => {
    try {
      const updatedFormData = await uploadImage(formData);
      console.log("Updated formData:", updatedFormData);

      const res = await axios.post(
        `${serverDomain}/purchase/create`,
        updatedFormData,
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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverDomain}/purchase/list`, {
          headers: {
            Authorization: authToken,
          },
        });

        console.log("purchase response", res);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] bg-[#F4F6F8] w-full  ">
        <div className="w-full flex md:px-10 px-3 pb-1 pt-4  bg-white flex-col">
          {/* <h1 className=" md:text-4xl text-2xl font-medium mb-0 lg:ms-0 ms-10 ">
            Glenmark
          </h1> */}

          <h3 className="font-medium mt-3">Indent</h3>
          <div className="  sm:w-[300px] min-w-[200px] rounded-lg p-1">
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
            {data.length > 0 && (
              <>
                <Link
                  className="flex items-center gap-2"
                  to={data[0]?.indent && data[0].indent[0]?.fileUrl}
                >
                  <img
                    src="/pdf.png"
                    alt="pdf"
                    className="w-6 h-6 object-cover"
                  />
                  <p>{data[0]?.indent[0].fileUrl}</p>
                </Link>
                <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                  <FiCheckCircle className="text-lg" />
                  <p className=" text-sm mx-1 mb-0 ">{data[0].indent[0].status}</p>
                  <p className=" text-[#828282] text-sm">{
                    data[0].indent[0].uploadDate
                    }</p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-fit text-lg font-semibold px-6 py-2 mb-4 text-center text-white rounded-lg bg-gradient-to-r from-[#053BD3] to-[#03EAEA] mt-5"
          >
            Create Order
          </button>
        </div>

        <div className=" p-10 w-full min-h-[80vh]  overflow-x-scroll">
          <div className="min-w-[1200px] flex flex-row  items-start justify-start gap-8">
            <div className="w-[100px] text-lg font-medium">Indents</div>
            <div className="w-[300px] flex flex-col gap-3">
              {data?.map((item, i) => (
                <div className="w-full bg-white p-2 rounded-lg">
                  {/* <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={fileList2}
                    onChange={handleChange2}
                  >
                    {fileList2.length >= 1 ? null : uploadButton}
                  </Upload> */}
                  <Link
                    to={item?.indent[0]?.fileUrl}
                    className="flex items-center gap-2"
                  >
                    <img src="/pdf.png" alt="" />
                    <p>{item?.indent[0]?.fileUrl}</p>
                  </Link>
                  <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                    <FiCheckCircle className=" text-xs" />
                    <p className=" text-xs mx-1 mb-0 ">{
                      item?.indent[0]?.status
                      }</p>
                    <p className=" text-[#828282] text-xs">
                      {item.indent[0]?.uploadDate}
                    </p>
                  </div>
                </div>
              ))}
              {/* <div className="w-full bg-white p-2 rounded-lg">
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList2}
                  onChange={handleChange2}
                >
                  {fileList2.length >= 1 ? null : uploadButton}
                </Upload>
                <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                  <FiCheckCircle className=" text-xs" />
                  <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                  <p className=" text-[#828282] text-xs">on Nov 16, 2023</p>
                </div>
              </div> */}
              <div className="w-full bg-white p-2 rounded-lg">
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={files?.indent?.map((file) => ({
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    originFileObj: file,
                  }))}
                  onChange={(info) => handleChange2(info, "indent")}
                >
                  {files.indent.length >= 1 ? null : uploadButton}
                </Upload>

                <div className="flex justify-end">
                  <input
                    type="date"
                    className="text-[#053BD3] p-2 border-none outline-none"
                    placeholder="2024-12-12"
                    defaultValue={"2024-12-12"}
                    min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
                    value={formData.indent[0].uploadDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        indent: [
                          {
                            ...formData.indent[0],
                            uploadDate: e.target.value,
                          },
                        ],
                      })
                    }
                  />
                </div>
                {/* <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                  <FiCheckCircle className=" text-xs" />
                  <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                  <p className=" text-[#828282] text-xs">on Nov 16, 2023</p>
                </div> */}
              </div>
            </div>
            <div className="w-[300px] flex flex-col gap-3">
              <div className="w-full bg-white p-2 rounded-lg">
                <Checkbox onChange={() => {}}>Purchase Order</Checkbox>
              </div>
              {data.map((item, i) => (
                <div className="w-full bg-white p-2 rounded-lg">
                  {/* <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList2}
                  onChange={handleChange2}
                >
                  {fileList2.length >= 1 ? null : uploadButton}
                </Upload> */}

                  {/* <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={fileList2}
                    onChange={handleChange2}
                  >
                    {fileList2.length >= 1 ? null : uploadButton}
                  </Upload> */}
                  <Link
                    to={item?.purchaseOrder[0]?.fileUrl}
                    className="flex items-center gap-2"
                  >
                    <img src="/pdf.png" alt="" />
                    <p>{item?.purchaseOrder[0]?.fileUrl}</p>
                  </Link>

                  <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                    <FiCheckCircle className=" text-xs" />
                    <p className=" text-xs mx-1 mb-0 ">{
                      item.purchaseOrder[0]?.status
                      }</p>
                    <p className=" text-[#828282] text-xs">
                      {item.purchaseOrder[0]?.uploadDate}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-full bg-white p-2 rounded-lg">
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={files?.purchaseOrder?.map((file) => ({
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    originFileObj: file,
                  }))}
                  onChange={(info) => handleChange2(info, "purchaseOrder")}
                >
                  {files.purchaseOrder.length >= 1 ? null : uploadButton}
                </Upload>
                <div className="flex justify-end">
                  <input
                    type="date"
                    className="text-[#053BD3] p-2 border-none outline-none"
                    placeholder="2024-12-12"
                    defaultValue={"2024-12-12"}
                    min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
                    value={formData.purchaseOrder[0].uploadDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        purchaseOrder: [
                          {
                            ...formData.indent[0],
                            uploadDate: e.target.value,
                          },
                        ],
                      })
                    }
                  />
                </div>
                {/* <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                  <FiCheckCircle className=" text-xs" />
                  <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                  <p className=" text-[#828282] text-xs">on Nov 16, 2023</p>
                </div> */}
              </div>
            </div>
            <div className="w-[300px] flex flex-col gap-3">
              <div className="w-full bg-white p-2 rounded-lg">
                <Checkbox onChange={() => {}}>Delivery Dates</Checkbox>
              </div>
              {data.map((item) => (
                <div className="w-full bg-white p-2 rounded-lg">
                  <div className=" bg-[#F4F6F8] flex justify-start text-[#000000] text-lg items-center p-3">
                    {item.purchaseOrder[0].deliveryDate}
                  </div>
                </div>
              ))}

              {/* <div className="w-full bg-white p-2 rounded-lg">
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  fileList={fileList2}
                  onChange={handleChange2}
                >
                  {fileList2.length >= 1 ? null : uploadButton}
                </Upload>
                 <div className="flex flex-row text-[#00900D] items-center gap-1 mt-2">
                  <FiCheckCircle className=" text-xs" />
                  <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                  <p className=" text-[#828282] text-xs">on Nov 16, 2023</p>
                </div> 
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
