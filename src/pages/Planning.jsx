/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import toast from "react-hot-toast";
import { authToken } from "../constant/AuthToken";
import { serverDomain } from "../constant/serverDomain";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Planning() {
  const [formData, setFormData] = useState({
    jobCardId: 1,
    projectId: 1,
    tds: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    approvedDesign: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    amendmentBoq: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    poComparison: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    boqComment: [
      {
        message: "Hello BOQ Comment",
        date: "2024-09-09",
      },
    ],
    lotWiseDistribution: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    indent: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "2024-09-09",
        status: "APPROVED",
        fileDescription: "hello files",
      },
    ],
    indentComment: [
      {
        message: "hello indent",
        date: "2024-09-09",
      },
    ],
  });
  const [formData2, setFormData2] = useState({
    jobCardId: 1,
    projectId: 1,
    tds: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    approvedDesign: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    amendmentBoq: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    poComparison: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    boqComment: [
      {
        message: "",
        date: "",
      },
    ],
    lotWiseDistribution: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    indent: [
      {
        fileUrl: "https://dsds.com",
        fileType: "pdf",
        uploadDate: "",
        status: "APPROVED",
        fileDescription: "",
      },
    ],
    indentComment: [
      {
        message: "hello indent",
        date: "2024-09-09",
      },
    ],
  });

  console.log("formData2", formData2);

  const [isSubmit, setIsSubmit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [listData, setListData] = useState({});

  // ".pdf", ".docx", ".xlsx", ".xls", ".doc"
  const allowedExtensions = [".pdf"];
  const [isFileAllowed, setFileAllowed] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const handleChange = ({ fileList: newFileList }) => {
    if (isFileAllowed) {
      setFileList(newFileList);
    }
  };
  const handleChange2 = (info, name) => {
    let fileList = [...info.fileList];
    console.log(fileList);

    // Set file state in job form data
    setFiles({
      ...files,
      [name]: fileList.map((file) => file.originFileObj),
    });
  };
  const handleChange3 = (info, name) => {
    let fileList = [...info.fileList];
    console.log(fileList);

    if (!isFileAllowed) {
      return;
    }
    // Set file state in job form data
    setFiles2({
      ...files2,
      [name]: fileList.map((file) => file.originFileObj),
    });
  };

  const [files, setFiles] = useState({
    tds: [],
    approvedDesign: [],
    amendmentBoq: [],
    poComparison: [],
    lotWiseDistribution: [],
    indent: [],
  });
  const [files2, setFiles2] = useState({
    tds: [],
    approvedDesign: [],
    amendmentBoq: [],
    poComparison: [],
    lotWiseDistribution: [],
    indent: [],
  });

  const beforeUpload = async (file) => {
    const isAllowed = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!isAllowed) {
      toast.error('File formats allowed are ".pdf"');
      setFileAllowed(false);
      return false; // Prevents the file from being added to the fileList
    }

    setFileAllowed(true);
    // return false; // Prevent upload since we handle it manually
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // console.log(files);

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      let tds,
        approvedDesign,
        amendmentBoq,
        poComparison,
        lotWiseDistribution,
        indent;
      if (files.tds.length > 0) {
        const tdsFile = new FormData();
        tdsFile.append("file", files.tds[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          tdsFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );

        console.log(file1res);
        tds = file1res.data.file;
      }
      if (files.approvedDesign.length > 0) {
        const approvedDesignFile = new FormData();
        approvedDesignFile.append("file", files.approvedDesign[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          approvedDesignFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        approvedDesign = file1res.data.file;
      }
      if (files.amendmentBoq.length > 0) {
        const amendmentBoqFile = new FormData();
        amendmentBoqFile.append("file", files.amendmentBoq[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          amendmentBoqFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        amendmentBoq = file1res.data.file;
      }
      if (files.poComparison.length > 0) {
        const poComparisonFile = new FormData();
        poComparisonFile.append("file", files.poComparison[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          poComparisonFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        poComparison = file1res.data.file;
      }
      if (files.lotWiseDistribution.length > 0) {
        const lotWiseDistributionFile = new FormData();
        lotWiseDistributionFile.append("file", files.lotWiseDistribution[0]);
        const file1res = await axios.post(
          `${serverDomain}/upload/file`,
          lotWiseDistributionFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: authToken,
            },
          }
        );
        lotWiseDistribution = file1res.data.file;
      }
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
        indent = file1res.data.file;
      }

      setFormData({
        ...formData,
        tds: [
          {
            ...formData.tds[0],
            fileUrl: tds,
          },
        ],
        approvedDesign: [
          {
            ...formData.approvedDesign[0],
            fileUrl: approvedDesign,
          },
        ],
        amendmentBoq: [
          {
            ...formData.amendmentBoq[0],
            fileUrl: amendmentBoq,
          },
        ],
        poComparison: [
          {
            ...formData.poComparison[0],
            fileUrl: poComparison,
          },
        ],
        lotWiseDistribution: [
          {
            ...formData.lotWiseDistribution[0],
            fileUrl: lotWiseDistribution,
          },
        ],
        indent: [
          {
            ...formData.indent[0],
            fileUrl: indent,
          },
        ],
      });

      console.log(
        tds,
        approvedDesign,
        amendmentBoq,
        poComparison,
        lotWiseDistribution,
        indent
      );
      console.log(formData);

      const response = await axios.post(
        `${serverDomain}/planning/create`,
        formData,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverDomain}/planning/details/1`, {
          headers: {
            Authorization: authToken,
          },
        });
        console.log(res);
        setListData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

  const handleUpdate = async () => {
    console.log("files2", files2);
    if (files2.tds.length > 0) {
      const tdsFile = new FormData();
      tdsFile.append("file", files2.tds[0]);
      const file1res = await axios.post(
        `${serverDomain}/upload/file`,
        tdsFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authToken,
          },
        }
      );
      console.log(file1res);
      setFormData2({
        ...formData2,
        tds: [
          {
            ...formData2.tds[0],
            fileUrl: file1res.data.file,
          },
        ],
      });

      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // console.log(res);
      // setRefresh(!refresh);
    }
    if (files2.approvedDesign.length > 0) {
      const approvedDesignFile = new FormData();
      approvedDesignFile.append("file", files2.approvedDesign[0]);
      const file2res = await axios.post(
        `${serverDomain}/upload/file`,
        approvedDesignFile,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData2({
        ...formData2,
        approvedDesign: [
          {
            ...formData2.approvedDesign[0],
            fileUrl: file2res.data.file,
          },
        ],
      });

      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // console.log(res);
      // setRefresh(!refresh);
    }
    if (files2.amendmentBoq.length > 0) {
      const amendmentBoqFile = new FormData();
      amendmentBoqFile.append("file", files2.amendmentBoq[0]);
      const file3res = await axios.post(
        `${serverDomain}/upload/file`,
        amendmentBoqFile,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData2({
        ...formData2,
        amendmentBoq: [
          {
            ...formData2.amendmentBoq[0],
            fileUrl: file3res.data.file,
          },
        ],
      });

      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // console.log(res);
      // setRefresh(!refresh);
    }
    if (files2.poComparison.length > 0) {
      const poComparisonFile = new FormData();
      poComparisonFile.append("file", files2.poComparison[0]);
      const file4res = await axios.post(
        `${serverDomain}/upload/file`,
        poComparisonFile,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData2({
        ...formData2,
        poComparison: [
          {
            ...formData2.poComparison[0],
            fileUrl: file4res.data.file,
          },
        ],
      });

      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // console.log(res);
      // setRefresh(!refresh);
    }
    if (files2.lotWiseDistribution.length > 0) {
      const lotWiseDistributionFile = new FormData();
      lotWiseDistributionFile.append("file", files2.lotWiseDistribution[0]);
      const file5res = await axios.post(
        `${serverDomain}/upload/file`,
        lotWiseDistributionFile,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData2({
        ...formData2,
        lotWiseDistribution: [
          {
            ...formData2.lotWiseDistribution[0],
            fileUrl: file5res.data.file,
          },
        ],
      });

      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // setRefresh(!refresh);
    }
    if (files2.indent.length > 0) {
      const indentFile = new FormData();
      indentFile.append("file", files2.indent[0]);
      const file6res = await axios.post(
        `${serverDomain}/upload/file`,
        indentFile,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData2({
        ...formData2,
        indent: [
          {
            ...formData2.indent[0],
            fileUrl: file6res.data.file,
          },
        ],
      });
      // const res = await axios.put(
      //   `${serverDomain}/planning/update/1`,
      //   formData2,
      //   {
      //     headers: {
      //       Authorization: authToken,
      //     },
      //   }
      // );

      // setRefresh(!refresh);
      // console.log(res);
    }

    const res = await axios.put(
      `${serverDomain}/planning/update/1`,
      formData2,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    setRefresh(!refresh);
    setFiles2({
      ...files2,
      po: [],
      amendmentBoq: [],
      poComparison: [],
      lotWiseDistribution: [],
      indent: [],
    });
    console.log("update res", res);
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
        console.log("pos Response", res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] bg-[#F4F6F8] w-full  ">
        <div className="w-full flex md:px-10 px-3 pb-1 pt-4  bg-white flex-col">
          {/* <h1 className=" md:text-4xl text-2xl font-medium lg:ms-0 ms-10 mb-0 ">
            Glenmark
          </h1> */}
          {/* <div
            onClick={isSubmit ? null : handleSubmit}
            className=" w-[200px] justify-center mt-5 bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
          >
            <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
              <span className=" text-sm">
                {isSubmit ? "Submitting..." : "Submit"}
              </span>
            </button>
          </div> */}
          <div className=" flex flex-row md:flex-nowrap flex-wrap gap-2 w-full mt-4 items-end p-3 justify-start">
            <div></div>
            <div className=" w-[200px]">
              <h3 className="font-medium mt-1">Initial PO</h3>
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
              <h3 className="font-medium mt-1">Service PO</h3>
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
              <h3 className="font-medium mt-1">Conceptual Layout</h3>
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
            <div
              onClick={isSubmit ? null : handleSubmit}
              className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
            >
              <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                <span className=" text-sm">
                  {isSubmit ? "Submitting..." : "Submit"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:p-10 p-4 w-full  overflow-x-scroll">
          <div className="min-w-[2000px] flex flex-row  items-start justify-start">
            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">TDS</p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full rounded-l-lg min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.tds.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) => handleChange2(info, "tds")}
                  >
                    {files.tds.length >= 1 ? null : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs"> */}

                    {/* on Nov 16, 2023 */}
                    {/* </p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.tds[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tds: [{ ...prev.tds[0], uploadDate: e.target.value }],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.tds[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tds: [
                          { ...prev.tds[0], fileDescription: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Approved design</p>
                  <FaCaretLeft />
                </div>
              </div>

              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.approvedDesign.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) => handleChange2(info, "approvedDesign")}
                  >
                    {files.approvedDesign.length >= 1 ? null : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">
                       <input type="text" /> 
                      on Nov 16, 2023
                    </p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.approvedDesign[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          approvedDesign: [
                            {
                              ...prev.approvedDesign[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.approvedDesign[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        approvedDesign: [
                          {
                            ...prev.approvedDesign[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Amendment BOQ</p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.amendmentBoq.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) => handleChange2(info, "amendmentBoq")}
                  >
                    {files.amendmentBoq.length >= 1 ? null : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.amendmentBoq[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          amendmentBoq: [
                            {
                              ...prev.amendmentBoq[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.amendmentBoq[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amendmentBoq: [
                          {
                            ...prev.amendmentBoq[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">PO Comparison</p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.poComparison.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) => handleChange2(info, "poComparison")}
                  >
                    {files.poComparison.length >= 1 ? null : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.poComparison[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          poComparison: [
                            {
                              ...prev.poComparison[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.poComparison[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        poComparison: [
                          {
                            ...prev.poComparison[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">BOQ Comment</p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div className="w-full text-xs py-3 border-2 border-dashed  bg-[#F4F6F8] h-[55px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="boq Comment"
                    value={formData.boqComment[0].message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        boqComment: [
                          { ...prev.boqComment[0], message: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
                <div className="w-full text-xs py-2 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="date"
                    className="outline-none bg-transparent h-full w-full"
                    placeholder="file description"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.boqComment[0].date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        boqComment: [
                          {
                            ...prev.boqComment[0],
                            date: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">
                    Lot wise distribution
                  </p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.lotWiseDistribution.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) =>
                      handleChange2(info, "lotWiseDistribution")
                    }
                  >
                    {files.lotWiseDistribution.length >= 1
                      ? null
                      : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.lotWiseDistribution[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lotWiseDistribution: [
                            {
                              ...prev.lotWiseDistribution[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-3 mt-5 bg-[#F4F6F8] h-[50px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.lotWiseDistribution[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lotWiseDistribution: [
                          {
                            ...prev.lotWiseDistribution[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">Indent</p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div className=" h-[60px]">
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={files.indent.map((file) => ({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                    }))} // Ensure correct mapping
                    onChange={(info) => handleChange2(info, "indent")}
                  >
                    {files.indent.length >= 1 ? null : uploadButton}
                  </Upload>
                  <div className="flex flex-row text-[#00900D] mb-2 justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row"></div>
                  </div>

                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-10">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.indent[0].uploadDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          indent: [
                            { ...prev.indent[0], uploadDate: e.target.value },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.indent[0].fileDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        indent: [
                          {
                            ...prev.indent[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full    p-3 ">
                <div className="flex flex-row bg-white  p-2 items-center justify-between rounded-lg">
                  <Checkbox onChange={() => {}}></Checkbox>
                  <p className=" text-[#505050] text-sm ">
                    Indent Senior Comment
                  </p>
                  <FaCaretLeft />
                </div>
              </div>
              <div className="w-full h-[200px] flex flex-col justify-between bg-white rounded-r-lg  p-2 ">
                <div className="w-full text-xs py-3 border-2 border-dashed  bg-[#F4F6F8] h-[55px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={formData.indentComment[0].message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        indentComment: [
                          { ...prev.indentComment[0], message: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="date"
                    className="outline-none bg-transparent h-full w-full"
                    placeholder="dd/mm/yyyy"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.indentComment[0].date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        indentComment: [
                          { ...prev.indentComment[0], date: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-[2000px] flex flex-row  items-start justify-start">
            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full rounded-l-lg min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  {/* {listData?.tds &&
                  listData.tds[0]?.fileType &&
                  files2.tds.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.tds[0]?.fileUrl}</p>
                      <Upload
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.tds.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) => handleChange3(info, "tds")}
                      >
                        {files2.tds.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.tds.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) => handleChange3(info, "tds")}
                    >
                      {files2.tds.length >= 1 ? null : uploadButton}
                    </Upload>
                  )} */}
                 {listData?.tds && <Link to={listData?.tds[0]?.fileUrl}>
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p className="truncate w-[120px]">{listData?.tds[0]?.fileUrl}</p>
                    </div> 
                  </Link>}

                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs"> */}

                    {/* on Nov 16, 2023 */}
                    {/* </p> */}
                    <input
                      disabled
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2?.tds[0]?.uploadDate
                          ? formData2?.tds[0]?.uploadDate
                          : listData?.tds && listData.tds[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          tds: [{ ...prev.tds[0], uploadDate: e.target.value }],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    disabled
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.tds[0].fileDescription
                        ? formData2.tds[0].fileDescription
                        : listData?.tds && listData.tds[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        tds: [
                          { ...prev.tds[0], fileDescription: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  {/* {listData?.tds &&
                  listData.approvedDesign[0]?.fileType &&
                  files2.approvedDesign.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.approvedDesign[0]?.fileUrl}</p>
                      <Upload
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.approvedDesign.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) =>
                          handleChange3(info, "approvedDesign")
                        }
                      >
                        {files2.approvedDesign.length >= 1
                          ? null
                          : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.approvedDesign.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) => handleChange3(info, "approvedDesign")}
                    >
                      {files2.approvedDesign.length >= 1 ? null : uploadButton}
                    </Upload>
                  )} */}
                  {listData?.approvedDesign && <Link to={listData?.approvedDesign[0]?.fileUrl}>
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p className="truncate w-[120px]">{listData?.approvedDesign[0]?.fileUrl}</p>
                    </div>
                  </Link>}
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">
                       <input type="text" /> 
                      on Nov 16, 2023
                    </p> */}
                    <input
                      type="date"
                      disabled
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2.approvedDesign[0].uploadDate
                          ? formData2.approvedDesign[0].uploadDate
                          : listData?.approvedDesign &&
                            listData.approvedDesign[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          approvedDesign: [
                            {
                              ...prev.approvedDesign[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    disabled
                    value={
                      formData2.approvedDesign[0].fileDescription
                        ? formData2.approvedDesign[0].fileDescription
                        : listData?.approvedDesign &&
                          listData.approvedDesign[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        approvedDesign: [
                          {
                            ...prev.approvedDesign[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  {/* {listData?.tds &&
                  listData.amendmentBoq[0]?.fileType &&
                  files2.amendmentBoq.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.amendmentBoq[0]?.fileUrl}</p>
                      <Upload
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.amendmentBoq.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) => handleChange3(info, "amendmentBoq")}
                      >
                        {files2.amendmentBoq.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.tds.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) => handleChange3(info, "tds")}
                    >
                      {files2.tds.length >= 1 ? null : uploadButton}
                    </Upload>
                  )} */}
                  {listData?.amendmentBoq && <Link to={listData?.amendmentBoq[0]?.fileUrl}>
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p className="truncate w-[120px]">{listData?.amendmentBoq[0]?.fileUrl}</p>
                    </div>
                  </Link>}
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                      type="date"
                      disabled
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2.amendmentBoq[0].uploadDate
                          ? formData2.amendmentBoq[0].uploadDate
                          : listData?.amendmentBoq &&
                            listData.amendmentBoq[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          amendmentBoq: [
                            {
                              ...prev.amendmentBoq[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    disabled
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.amendmentBoq[0].fileDescription
                        ? formData2.amendmentBoq[0].fileDescription
                        : listData?.amendmentBoq &&
                          listData.amendmentBoq[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        amendmentBoq: [
                          {
                            ...prev.amendmentBoq[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  {/* {listData?.tds &&
                  listData.poComparison[0]?.fileType &&
                  files2.poComparison.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.poComparison[0]?.fileUrl}</p>
                      <Upload
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.poComparison.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) => handleChange3(info, "poComparison")}
                      >
                        {files2.poComparison.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.poComparison.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) => handleChange3(info, "poComparison")}
                    >
                      {files2.poComparison.length >= 1 ? null : uploadButton}
                    </Upload>
                  )} */}
                  {
                    listData?.poComparison &&
                    listData?.poComparison[0]?.fileUrl &&
                    <Link to={listData?.poComparison[0]?.fileUrl}>
                      <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p className="truncate w-[120px]">{listData?.poComparison[0]?.fileUrl}</p>
                    </div>
                    </Link>

                  }
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                    disabled
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2.poComparison[0].uploadDate
                          ? formData2.poComparison[0].uploadDate
                          : listData?.poComparison &&
                            listData?.poComparison[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          poComparison: [
                            {
                              ...prev.poComparison[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                  disabled
                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.poComparison[0].fileDescription
                        ? formData2.poComparison[0].fileDescription
                        : listData?.poComparison &&
                          listData?.poComparison[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        poComparison: [
                          {
                            ...prev.poComparison[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div className="w-full text-xs py-3 border-2 border-dashed  bg-[#F4F6F8] h-[55px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    disabled
                    className="outline-none bg-transparent h-full"
                    placeholder="boq Comment"
                    value={
                      formData2.boqComment[0].message
                        ? formData2.boqComment[0].message
                        : listData?.boqComment &&
                          listData?.boqComment[0]?.message
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        boqComment: [
                          { ...prev.boqComment[0], message: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
                <div className="w-full text-xs py-2 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                  disabled
                    type="date"
                    className="outline-none bg-transparent h-full w-full"
                    placeholder="file description"
                    min={new Date().toISOString().split("T")[0]}
                    value={
                      formData2.boqComment[0].date
                        ? formData2.boqComment[0].date
                        : listData?.boqComment && listData?.boqComment[0]?.date
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        boqComment: [
                          {
                            ...prev.boqComment[0],
                            date: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div>
                  {/* {listData?.tds &&
                  listData.lotWiseDistribution[0]?.fileType &&
                  files2.lotWiseDistribution.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.lotWiseDistribution[0]?.fileUrl}</p>
                      <Upload
                      
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.lotWiseDistribution.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) =>
                          handleChange3(info, "lotWiseDistribution")
                        }
                      >
                        {files2.lotWiseDistribution.length >= 1
                          ? null
                          : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                    disabled
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.lotWiseDistribution.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) =>
                        handleChange3(info, "lotWiseDistribution")
                      }
                    >
                      {files2.lotWiseDistribution.length >= 1
                        ? null
                        : uploadButton}
                    </Upload>
                  )} */}

                  {
                    listData?.lotWiseDistribution &&
                    listData?.lotWiseDistribution[0]?.fileUrl &&
                   <Link to={listData?.lotWiseDistribution[0]?.fileUrl}>
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData?.lotWiseDistribution[0]?.fileUrl}</p>
                     </div>
                   </Link>
                  }
                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 "> Director Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                    
                      type="date"
                      disabled
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2.lotWiseDistribution[0].uploadDate
                          ? formData2.lotWiseDistribution[0].uploadDate
                          : listData?.lotWiseDistribution &&
                            listData?.lotWiseDistribution[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          lotWiseDistribution: [
                            {
                              ...prev.lotWiseDistribution[0],
                              uploadDate: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="w-full text-xs py-3 mt-5 bg-[#F4F6F8] h-[50px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                  disabled

                    type="text"
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.lotWiseDistribution[0].fileDescription
                        ? formData2.lotWiseDistribution[0].fileDescription
                        : listData?.lotWiseDistribution &&
                          listData?.lotWiseDistribution[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        lotWiseDistribution: [
                          {
                            ...prev.lotWiseDistribution[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full min-h-[200px] flex flex-col justify-between bg-white  p-2 ">
                <div className=" h-[60px]">
                  {/* {listData?.tds &&
                  listData.indent[0]?.fileType &&
                  files2.indent.length == 0 ? (
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData.indent[0]?.fileUrl}</p>
                      <Upload
                      disabled
                        className="absolute w-full h-full opacity-0"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        fileList={files2.indent.map((file) => ({
                          uid: file.uid,
                          name: file.name,
                          status: "done",
                          originFileObj: file,
                        }))} // Ensure correct mapping
                        onChange={(info) => handleChange3(info, "indent")}
                      >
                        {files2.indent.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  ) : (
                    <Upload
                    disabled
                      className=" w-full h-full "
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      fileList={files2.indent.map((file) => ({
                        uid: file.uid,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                      }))} // Ensure correct mapping
                      onChange={(info) => handleChange3(info, "indent")}
                    >
                      {files2.indent.length >= 1 ? null : uploadButton}
                    </Upload>
                  )} */}
                  {
                    listData?.indent &&
                    listData?.indent[0]?.fileUrl &&
                   <Link to={listData?.indent[0]?.fileUrl}>
                    <div className="flex gap-2 flex-row items-center relative">
                      <img src="/pdf.png" alt="pdf" />
                      <p>{listData?.indent[0]?.fileUrl}</p>
                     </div>
                   </Link>
                  }
                  <div className="flex flex-row text-[#00900D] mb-2 justify-between items-center gap-1 mt-2">
                    <div className=" flex flex-row"></div>
                  </div>

                  <div className="flex flex-row text-[#00900D] justify-between items-center gap-1 mt-10">
                    <div className=" flex flex-row">
                      <FiCheckCircle className=" text-xs" />
                      <p className=" text-xs mx-1 mb-0 ">Approved</p>
                    </div>
                    {/* <p className=" text-[#828282] text-xs">on Nov 16, 2023</p> */}
                    <input
                    disabled
                      type="date"
                      className="outline-none text-xs py-1 px-1 bg-[#F4F6F8] text-[#828282] rounded-sm"
                      placeholder="dd/mm/yyyy"
                      min={new Date().toISOString().split("T")[0]}
                      value={
                        formData2.indent[0].uploadDate
                          ? formData2.indent[0].uploadDate
                          : listData?.indent && listData?.indent[0]?.uploadDate
                      }
                      onChange={(e) =>
                        setFormData2((prev) => ({
                          ...prev,
                          indent: [
                            { ...prev.indent[0], uploadDate: e.target.value },
                          ],
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    disabled
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.indent[0].fileDescription
                        ? formData2.indent[0].fileDescription
                        : listData?.indent &&
                          listData?.indent[0]?.fileDescription
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        indent: [
                          {
                            ...prev.indent[0],
                            fileDescription: e.target.value,
                          },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-[270px] flex flex-col gap-6">
              <div className="w-full h-[200px] flex flex-col justify-between bg-white rounded-r-lg  p-2 ">
                <div className="w-full text-xs py-3 border-2 border-dashed  bg-[#F4F6F8] h-[55px] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="text"
                    disabled
                    className="outline-none bg-transparent h-full"
                    placeholder="file description"
                    value={
                      formData2.indentComment[0].message
                        ? formData2.indentComment[0].message
                        : listData?.indentComment &&
                          listData?.indentComment[0]?.message
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        indentComment: [
                          { ...prev.indentComment[0], message: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
                <div className="w-full text-xs py-2 mt-5 h-[50px] bg-[#F4F6F8] text-[#828282] flex flex-row justify-between items-center p-2 rounded-lg">
                  <input
                    type="date"
                    disabled
                    className="outline-none bg-transparent h-full w-full"
                    placeholder="dd/mm/yyyy"
                    min={new Date().toISOString().split("T")[0]}
                    value={
                      formData2.indentComment[0].date
                        ? formData2.indentComment[0].date
                        : listData?.indentComment &&
                          listData?.indentComment[0]?.date
                    }
                    onChange={(e) =>
                      setFormData2((prev) => ({
                        ...prev,
                        indentComment: [
                          { ...prev.indentComment[0], date: e.target.value },
                        ],
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-row md:flex-nowrap flex-wrap gap-2 w-full mt-8 items-end p-3 justify-start">
            {/* <div
              onClick={isSubmit ? null : handleUpdate}
              className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
            >
              <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                <span className=" text-sm">
                  {isSubmit ? "Updating..." : "Update"}
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
