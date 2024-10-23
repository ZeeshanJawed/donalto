/* eslint-disable react/no-unknown-property */

import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { serverDomain } from "../constant/serverDomain";
import { useAuthContext } from "../context/AuthContext";

export default function Registration() {
  const { user, userLoggedIn } = useAuthContext();
  console.log(user);
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
    userType: isEmployee ? "EMPLOYEE" : "SENIOR",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverDomain}/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res);
        userLoggedIn(res.data);
        navigate("/dashboard");
      }

      //   navigate("/employee-id");
      // }
    } catch (error) {
      console.log(error);
      // navigate("/employee-id");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center  min-h-[100vh]  p-10 bg-[#F4F6F8] ">
        <form
          onSubmit={handleLogin}
          className=" sm:w-[650px] bg-white py-6 w-[400px] px-4 sm:px-10 rounded-xl"
        >
          <div className=" w-full flex justify-center items-center">
            <img className="w-[150px] h-[150px]" src="/assets/logo.png" />
          </div>
          <h2 className=" font-semibold text-lg">
            {isEmployee ? "Employee Login" : "Senior Login"}
          </h2>
          <div className=" w-full block my-2">
            <label className="text-lg text-[#090914] opacity-[0.5] font-medium w-full mb-1 block">
              Enter Employee ID
            </label>
            <input
              type="text"
              required
              name="employeeId"
              onChange={handleChange}
              value={formData.employeeId}
              placeholder=""
              className="p-4 focus:outline-none w-full bg-[#F4F6F8] rounded-lg"
            />
          </div>
          <div className=" w-full block my-3">
            <label className="text-lg text-[#090914] opacity-[0.5] font-medium w-full mb-1 block">
              Enter Your Password
            </label>
            <input
              type="password"
              required
              onChange={handleChange}
              value={formData.password}
              name="password"
              placeholder="Enter Your Password"
              className="p-4 focus:outline-none w-full bg-[#F4F6F8] rounded-lg"
            />
          </div>

          <hr className=" w-full border border-[#000] opacity-[0.2] my-5" />
          <button
            type="submit"
            className=" w-full text-lg font-semibold p-4 text-center text-white rounded-lg bg-gradient-to-r from-[#053BD3] to-[#03EAEA] mt-5"
          >
            Login
          </button>

          <div className="flex justify-center mt-5">
            <div
              onClick={() => setIsEmployee(!isEmployee)}
              className=" w-[50%] bg-[#306BFF] rounded-lg text-center text-white  p-4 cursor-pointer select-none"
            >
              {isEmployee ? "Senior Login" : "Employee Login"}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
