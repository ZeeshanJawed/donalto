/* eslint-disable react/no-unknown-property */

import { FaCaretDown } from "react-icons/fa";
import { Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { serverDomain } from "../constant/serverDomain";
import axios from "axios";
import { authToken } from "../constant/AuthToken";
import { useState } from "react";

const items = [
  {
    key: "1",
    type: "group",
    label: "Group title",
    children: [
      {
        key: "DESIGNER",
        label: "DESIGNER",
      },
      {
        key: "PROJECT",
        label: "PROJECT",
      },
      {
        key: "SENIOR",
        label: "SENIOR",
      },
    ],
  },
];

export default function AddTeam() {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    password: "",
    roleInCompany: "DESIGNER",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const isSenior = useLocation().state?.isSenior;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeam = async () => {
    setIsSubmit(true);
    try {
      const res = await axios.post(
        `${serverDomain}/employee/create`,
        formData,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] flex justify-center items-center  w-full min-h-[100vh]  p-10 bg-[#F4F6F8] ">
        <div className=" md:w-[70%] w-[400px] bg-white py-6 md:px-10 px-3 rounded-xl">
          <h1 className=" selectBOQHeading inline  text-3xl font-semibold">
            Add {isSenior ? "Senior" : "Employee"}
          </h1>
          <div className=" w-full block my-5">
            <label className="text-lg font-medium w-full my-1 block">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder={`Enter ${isSenior ? "Senior" : "Employee"} Name`}
              type="text"
              className="p-4 focus:outline-none w-full bg-[#F4F6F8] rounded-lg"
            />
          </div>

          <div className=" w-full block my-5">
            <label className="text-lg font-medium w-full my-1 block">
              Employee ID
            </label>
            <input
              placeholder="Enter Employee ID"
              type="text"
              className="p-4 focus:outline-none w-full bg-[#F4F6F8] rounded-lg"
              onChange={handleChange}
              name="employeeId"
              value={formData.employeeId}
            />
          </div>
          <div className=" w-full block my-5">
            <label className="text-lg font-medium w-full my-1 block">
              Password for {isSenior ? "Senior" : "Employee"}
            </label>
            <input
              placeholder={`Create Password for ${
                isSenior ? "Senior" : "Employee"
              }`}
              type="text"
              className="p-4 focus:outline-none w-full bg-[#F4F6F8] rounded-lg"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
          </div>
          <div className=" w-full block my-5">
            <label className="text-lg font-medium w-full my-1 block">
              Role in Company
            </label>
            <Dropdown
              menu={{
                items,
                selectable: true,
                onClick: (e) => {
                  console.log(e);
                  setFormData({ ...formData, roleInCompany: e.keyPath[0] });
                },
                selectedKeys: [formData.roleInCompany],
              }}
              trigger={["click"]}
            >
              <div className="p-4 cursor-pointer focus:outline-none w-full flex flex-row justify-between items-center text-[#A1A1A1] bg-[#F4F6F8] rounded-lg">
                <span>{formData.roleInCompany}</span>
                <FaCaretDown className="text-[#306BFF] text-xl" />
              </div>
            </Dropdown>
          </div>
          <button
            onClick={handleAddTeam}
            className=" w-full text-lg font-semibold p-4 text-center text-white rounded-lg bg-gradient-to-r from-[#053BD3] to-[#03EAEA] mt-5"
            disabled={isSubmit}
          >
            Add {isSenior ? "Senior" : "Employee"}
          </button>
        </div>
      </div>
    </>
  );
}
