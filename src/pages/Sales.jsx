/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useJobContext } from "../context/jobContext";
import { info } from "autoprefixer";
import axios from "axios";
import { serverDomain } from "../constant/serverDomain";
import { authToken } from "../constant/AuthToken";
import toast from "react-hot-toast";

export default function Sales() {
  const { setJobFormData, jobFormData: JobFormData } = useJobContext();
  const [isSubmit, setIsSubmit] = useState(false);
  // PDF, DOC, DOCX, XLS, XLSX
  const allowedExtensions = [".pdf", ".docx", ".xlsx", ".xls", ".doc"]; // Fixed ".docs" to ".docx"
  const [isFileAllowed, setFileAllowed] = useState(false);

  const [jobData, setJobData] = useState({});

  const handleChange = (info, name) => {
    let fileList = [...info.fileList];

    localStorage.setItem(name, JSON.stringify(fileList));
    // Set file state in job form data
    setJobFormData({
      ...JobFormData,
      [name]: fileList.map((file) => file.originFileObj),
    });
  };

  const beforeUpload = (file) => {
    const isAllowed = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isAllowed) {
      setFileAllowed(false);
      toast.error('File formats allowed are ".pdf, .docx, .xlsx", .xls, .doc"');
      return Upload.LIST_IGNORE; // Return LIST_IGNORE to prevent the file from being added
    }

    setFileAllowed(true);
    return true; // Allow the file to be uploaded
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 6,
        }}
      >
        <span className=" text-[#306BFF]">Click to Upload</span> or drag & drop
      </div>
    </div>
  );

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      let estimateUrl, poUrl, tenderUrl, offerUrl;
      if (JobFormData.estimate.length > 0) {
        const estimateFile = new FormData();
        estimateFile.append("file", JobFormData.estimate[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          estimateFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );

        console.log(file1res);
        estimateUrl = file1res.data.file;
      }

      if (JobFormData.po.length > 0) {
        const poFile = new FormData();
        poFile.append("file", JobFormData.po[0]);
        const file2res = await axios.post(
          `${serverDomain}/upload/file`,
          poFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        console.log(file2res);
        poUrl = file2res.data.file;
      }

      if (JobFormData.tendor.length > 0) {
        const tendorFile = new FormData();
        tendorFile.append("file", JobFormData.tendor[0]);
        const file3res = await axios.post(
          `${serverDomain}/upload/file`,
          tendorFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        console.log(file3res);
        tenderUrl = file3res.data.file;
      }

      if (JobFormData.offer.length > 0) {
        const offerFile = new FormData();
        offerFile.append("file", JobFormData.offer[0]);
        const file4res = await axios.post(
          `${serverDomain}/upload/file`,
          offerFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        console.log(file4res);
        offerUrl = file4res.data.file;
      }

      const res = await axios.post(
        `${serverDomain}/jobcard/create`,
        {
          ...JobFormData,
          estimate: [estimateUrl],
          po: [poUrl],
          tender: [tenderUrl],
          offer: [offerUrl],
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
      setJobFormData({
        ...JobFormData,
        estimate: [],
        po: [],
        tender: [],
        offer: [],
      });
    }
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(`${serverDomain}/jobcard/details/1`, {
  //         headers: {
  //           Authorization: authToken,
  //         },
  //       });
  //       console.log(res);
  //       // setListData(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full  md:p-10 py-10 px-2 bg-[#fff] ">
        <div className="w-full flex flex-row items-center md:flex-nowrap gap-5 flex-wrap border p-3 rounded-xl border-[rgba(0, 0, 0, 0.10)] justify-between">
          <div className=" md:w-[50%] flex flex-row gap-4 ">
            <div className="flex flex-col h-full justify-center">
              <h2 className=" opacity-[0.6] text-xl font-medium mt-3">May</h2>
              <p className=" opacity-[0.5] text-sm">
                Today is Saturday, Jul 9th, 2023
              </p>
            </div>
            <vr className="border border-[#000000] opacity-[0.2]" />
            {/* <div className=" w-[200px]">
                <h3 className="font-medium ">Initial PO</h3>
                <div className="  w-full rounded-lg p-1">
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
                </div>
              </div>
              <div className=" w-[200px]">
                <h3 className="font-medium">Service PO</h3>
                <div className="  w-full rounded-lg p-1">
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
                </div>
              </div> */}
          </div>
          <div className=" md:w-[50%] flex flex-row gap-4 justify-end">
            {/* <div
              onClick={isSubmit ? null : handleSubmit}
              className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
            >
              <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                {!isSubmit && <AiOutlinePlus className="text-white text-lg" />}
                <span className=" text-sm">
                  {isSubmit ? "Submitting..." : "Create Job"}
                </span>
              </button>
            </div> */}
          </div>
        </div>

        <div className="w-full flex flex-row lg:flex-nowrap flex-wrap  gap-5 mt-10">
          <div className=" w-[300px]">
            <h3 className="font-medium ">Job Card</h3>
            <div className=" w-[250px] mt-5 justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-full">
              <button
                onClick={() => navigate("/sales-team-table")}
                className="  w-full items-center justify-center p-2  px-5 h-[50px] flex  font-medium rounded-2xl text-white  flex-row gap-1 "
              >
                <span className=" text-[16px] font-semibold">
                  View/Edit Job card
                </span>
              </button>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">Estimate</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.estimate.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))} // Ensure correct mapping
                onChange={(info) => handleChange(info, "estimate")}
                name="estimate"
                style={{
                  backgroundColor: "white",
                }}
              >
                {JobFormData.estimate.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">Offer</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.offer.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "offer")}
                name="offer"
                style={{
                  backgroundColor: "#F4F6F8",
                }}
              >
                {JobFormData.offer.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row lg:flex-nowrap flex-wrap  gap-5 mt-10">
          <div className=" w-[300px]">
            <h3 className="font-medium ">PO</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.po.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "po")}
                name="po"
                style={{
                  backgroundColor: "white",
                }}
              >
                {JobFormData.po.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">Tendor (Mails & Drawungs)</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.tendor.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "tendor")}
                name="tendor"
                style={{
                  backgroundColor: "#F4F6F8",
                }}
              >
                {JobFormData.tendor.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
            <p className=" text-[#306BFF] mt-4 text-xs">Uploaded File</p>
            <div className=" w-[150px] mt-2 h-[50px] p-2 flex bg-[#F4F6F8] rounded-lg items-center flex-row gap-2">
              <img
                src="/assets/images/excel.png"
                className=" w-[30px] h-[30px]"
              />
              <span className="text-sm font-medium">V.2.3.0.exl</span>
            </div>
          </div>
        </div>
        {/* <div
          className=" w-full flex gap-4 items-center sm:flex-nowrap flex-wrap flex-row  my-5
        "
        >
          <div className=" w-[300px]">
            <h3 className="font-medium ">Estimate</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.estimate.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))} // Ensure correct mapping
                onChange={(info) => handleChange(info, "estimate")}
                name="estimate"
                style={{
                  backgroundColor: "white",
                }}
              >
                {JobFormData.estimate.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">Offer</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.offer.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "offer")}
                name="offer"
                style={{
                  backgroundColor: "#F4F6F8",
                }}
              >
                {JobFormData.offer.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">PO</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.po.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "po")}
                name="po"
                style={{
                  backgroundColor: "white",
                }}
              >
                {JobFormData.po.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className=" w-[300px]">
            <h3 className="font-medium ">Tendor (Mails & Drawungs)</h3>
            <div className="  w-full h-[130px] rounded-lg p-1">
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={JobFormData.tendor.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                }))}
                onChange={(info) => handleChange(info, "tendor")}
                name="tendor"
                style={{
                  backgroundColor: "#F4F6F8",
                }}
              >
                {JobFormData.tendor.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
        </div> */}
        <p className=" opacity-[0.5]  text-sm font-semibold my-4">
          Note : Job card and PO will be visible to all teams.
        </p>
        <div className=" w-full flex gap-4 items-center sm:flex-nowrap flex-wrap justify-end flex-row ">
          <p className=" opacity-[0.5]  text-sm font-semibold my-4">
            Note: The files will be directly sent to Planning and designing
            teams.
          </p>

          <button
            // onClick={() => navigate("/sales-team-table")}
            className=" bg-gradient-to-r from-[#053BD3] to-[#03EAEA] w-[150px]  items-center justify-center p-2  px-5 h-[40px] flex  font-medium rounded-lg text-white  flex-row gap-1 "
          >
            <span className=" text-sm">Submit</span>
          </button>
        </div>
      </div>
    </>
  );
}
