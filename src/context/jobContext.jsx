import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const [jobFormData, setJobFormData] = useState({
    projectId: 9,
    jobDetails: {
      jobName: "job vishal",
      poNo: "90",
      date: "2024-12-12",
      workOrderNo: "80",
      amendmentPONoAndDate: "2024-12-12",
      scopeOfWork: "wall job",
      jobNumber: "8999",
    },
    contactDetails: {
      billingAddress: "delhi",
      name: "nojj",
      contactNumber: "809098989",
      email: "vk88@gmail.com",
      siteAddress: "hoo",
      name1: "44dnojj",
      contactNumber1: "3809098989",
      email1: "1vk88@gmail.com",
    },
    commercialDetails: {
      paymentTerms: "voo",
    },
    technicalSupport: {
      basetractType: null,
      connecting: null,
      panelMoc: null,
      frameMoc: null,
      panelThickness: null,
      panel: null,
      contactNumber: null,
      email: null,
    },
    estimate: localStorage.getItem("estimate")
      ? JSON.parse(localStorage.getItem("estimate"))
      : [],
    offer: localStorage.getItem("offer")
      ? JSON.parse(localStorage.getItem("offer"))
      : [],
    po: localStorage.getItem("po")
      ? JSON.parse(localStorage.getItem("po"))
      : [],
    tendor: localStorage.getItem("tendor")
      ? JSON.parse(localStorage.getItem("tendor"))
      : [],
  });

  const [search, setSearch] = useState("");

  // console.log(localStorage.getItem("estimate"));

  return (
    <JobContext.Provider
      value={{
        jobFormData,
        setJobFormData,
        search,
        setSearch,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  return useContext(JobContext);
};
