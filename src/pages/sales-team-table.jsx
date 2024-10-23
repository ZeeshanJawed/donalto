/* eslint-disable react/no-unknown-property */
import { AiOutlinePlus } from "react-icons/ai";
import { useJobContext } from "../context/jobContext";
import axios from "axios";
import { serverDomain } from "../constant/serverDomain";
import { authToken } from "../constant/AuthToken";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SalesTeamTable() {
  const { jobFormData, setJobFormData } = useJobContext();
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("jobFormData", jobFormData);
  const JobFormData = jobFormData;
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
          tendor: [tenderUrl],
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
    }
  };
  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full lg:p-10 p-5 bg-[#fff] ">
        <div className="w-full flex flex-row md:flex-nowrap gap-5 flex-wrap items-center border p-3 rounded-xl border-[rgba(0, 0, 0, 0.10)] justify-between">
          <div className=" md:w-[50%] flex flex-row gap-4 ">
            <div className="flex flex-col h-full justify-center">
              <h2 className=" opacity-[0.6] text-xl font-medium mt-3">May</h2>
              <p className=" opacity-[0.5] text-sm">
                Today is Saturday, Jul 9th, 2023
              </p>
            </div>
            <vr className="border border-[#000000] opacity-[0.2]" />
          </div>
          <div className=" md:w-[50%] flex flex-row gap-4 justify-end">
            <div
              onClick={isSubmit ? null : handleSubmit}
              className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg"
            >
              <button className=" w-[200px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 ">
                {!isSubmit && <AiOutlinePlus className="text-white text-lg" />}
                <span className=" text-sm">
                  {isSubmit ? "Submitting..." : "Create Job"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className=" flex flex-col justify-start gap-5">
          <h3 className=" my-2 text-black text-xl font-semibold">
            Job Details
          </h3>

          <div className=" w-full rounded-lg border-[2px] border-[#0000003f]">
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">JOB NAME</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Job name"
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        jobName: e.target.value,
                      },
                    })
                  }
                  required
                  value={jobFormData.jobDetails.jobName}
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%]  p-2">PO No. & DATE</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="90"
                  value={jobFormData.jobDetails.poNo}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        poNo: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">WORK ORDER No.</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="80"
                  value={jobFormData.jobDetails.workOrderNo}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        workOrderNo: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">AMENDMMENT PO No. & DATE</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />

              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="2024-12-12"
                  value={jobFormData.jobDetails.amendmentPONoAndDate}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        amendmentPONoAndDate: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%]  p-2">SCOPE OF WORK</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="wall job"
                  value={jobFormData.jobDetails.scopeOfWork}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        scopeOfWork: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">JOB NUMBER</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="8999"
                  value={jobFormData.jobDetails.jobNumber}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      jobDetails: {
                        ...jobFormData.jobDetails,
                        jobNumber: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <h3 className=" my-2 text-black text-xl font-semibold">
            Contact Details
          </h3>

          <div className=" w-full rounded-lg border-[2px] border-[#0000003f]">
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">BILLING ADDRESS</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="delhi"
                  value={jobFormData.contactDetails.billingAddress}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        billingAddress: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">NAME</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="khan"
                  value={jobFormData.contactDetails.name}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        name: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">CONTACT NO.</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="80908989"
                  value={jobFormData.contactDetails.contactNumber}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        contactNumber: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">EMAIL ID</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="vk88@gmail.com"
                  value={jobFormData.contactDetails.email}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        email: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">SITE ADDRESS</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="delhi"
                  value={jobFormData.contactDetails.siteAddress}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        siteAddress: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">NAME</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="44dnojj1"
                  value={jobFormData.contactDetails.name1}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        name1: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">CONTACT NUMBER</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="3809098989"
                  value={jobFormData.contactDetails.contactNumber1}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        contactNumber1: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <hr className=" w-full border border-black opacity-[0.2]" />
            <div className=" w-full flex -[20px] flex-row gap-2">
              <span className=" w-[30%] p-2">EMAIL ID</span>
              <vr className="border-[0.2px] border-black opacity-[0.2]" />
              <div className="w-[70%] flex items-center">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="1vk88@gmail.com"
                  value={jobFormData.contactDetails.email1}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      contactDetails: {
                        ...jobFormData.contactDetails,
                        email1: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className=" w-full">
            <h3 className=" my-2 text-black text-xl font-semibold">
              Commercial Details
            </h3>

            <div className="w-full rounded-lg border-[2px] border-[#0000003f]">
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">PAYMENT TERMS</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="voo"
                    value={jobFormData.commercialDetails.paymentTerms}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        commercialDetails: {
                          ...jobFormData.commercialDetails,
                          paymentTerms: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full">
            <h3 className=" my-2 text-black text-xl font-semibold">
              Technical Support
            </h3>

            <div className="w-full rounded-lg border-[2px] border-[#0000003f]">
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">BASETRACK TYPE</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.basetractType}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          basetractType: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">CONNECTING</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.connecting}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          connecting: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">PANEL MOC</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.panelMoc}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          panelMoc: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">PANEL THICKNESS</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.panelThickness}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          panelThickness: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">PANEL</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.panel}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          panel: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">CONATCT NUMBER</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.contactNumber}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          contactNumber: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <hr className=" w-full border border-black opacity-[0.2]" />
              <div className=" w-full flex -[20px] flex-row gap-2">
                <span className=" w-[30%] p-2">EMAIL ID</span>
                <vr className="border-[0.2px] border-black opacity-[0.2]" />
                <div className="w-[70%] flex items-center">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="null"
                    value={jobFormData.technicalSupport.email}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        technicalSupport: {
                          ...jobFormData.technicalSupport,
                          email: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
