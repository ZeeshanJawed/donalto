/* eslint-disable react/no-unknown-property */

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverDomain } from "../constant/serverDomain";
import axios from "axios";
import toast from "react-hot-toast";

export default function EmployeeID() {
  const navigate = useNavigate();
  
  const [employeeId, setEmployeeId] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newEmployeeId = [...employeeId];
    newEmployeeId[index] = value;
    setEmployeeId(newEmployeeId);

    // Move to the next input if the current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleSubmit = async () => {
    try {
      const id = employeeId.join(""); // Combine array elements into a single string
      console.log("employeeId:", id);

      if (id.length !== 6) {
        // alert("Please fill in all fields");
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post(`${serverDomain}/users/verify/otp`, {
        employeeId: id,
      });

      console.log("otp response", res);

      if (res.data.success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  return (
    <>
      <div className="w-full flex justify-center items-center  min-h-[100vh]  p-10 bg-[#F4F6F8] ">
        <div className=" sm:w-[600px] w-[400px] bg-white py-6 sm:px-10 px-4 rounded-xl">
          <div className=" w-full flex justify-center items-center">
            <div className=" w-[110px] h-[110px] rounded bg-white flex justify-center items-center iconBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="54"
                viewBox="0 0 55 54"
                fill="none"
              >
                <path
                  d="M25.1445 25.0352C23.0678 25.0352 21.0378 24.4193 19.3111 23.2656C17.5843 22.1118 16.2385 20.472 15.4438 18.5533C14.6491 16.6347 14.4412 14.5235 14.8463 12.4867C15.2514 10.4499 16.2515 8.57899 17.7199 7.11054C19.1884 5.64209 21.0593 4.64206 23.0961 4.23692C25.1329 3.83177 27.2441 4.03971 29.1627 4.83443C31.0813 5.62915 32.7212 6.97496 33.875 8.70167C35.0287 10.4284 35.6445 12.4585 35.6445 14.5352C35.6445 17.3199 34.5383 19.9907 32.5692 21.9598C30.6 23.9289 27.9293 25.0352 25.1445 25.0352ZM25.1445 7.15516C23.6612 7.15516 22.2111 7.59503 20.9778 8.41914C19.7444 9.24325 18.7831 10.4146 18.2154 11.785C17.6478 13.1555 17.4993 14.6635 17.7887 16.1183C18.078 17.5732 18.7923 18.9096 19.8412 19.9585C20.8901 21.0074 22.2265 21.7217 23.6814 22.0111C25.1362 22.3004 26.6442 22.1519 28.0147 21.5843C29.3851 21.0166 30.5565 20.0553 31.3806 18.8219C32.2047 17.5886 32.6445 16.1385 32.6445 14.6552C32.6445 13.6702 32.4505 12.695 32.0736 11.785C31.6967 10.8751 31.1443 10.0483 30.4478 9.35186C29.7514 8.65542 28.9246 8.10297 28.0147 7.72606C27.1047 7.34915 26.1295 7.15516 25.1445 7.15516ZM33.4995 26.8502C25.3822 25.0225 16.8898 25.9023 9.31954 29.3552C8.27838 29.8525 7.39994 30.6354 6.78649 31.6126C6.17305 32.5899 5.84985 33.7213 5.85454 34.8752V43.8002C5.85454 43.9971 5.89334 44.1922 5.96872 44.3742C6.04411 44.5562 6.15459 44.7215 6.29388 44.8608C6.43317 45.0001 6.59853 45.1106 6.78052 45.186C6.96251 45.2614 7.15756 45.3002 7.35454 45.3002C7.55153 45.3002 7.74658 45.2614 7.92857 45.186C8.11056 45.1106 8.27591 45.0001 8.4152 44.8608C8.55449 44.7215 8.66498 44.5562 8.74036 44.3742C8.81574 44.1922 8.85454 43.9971 8.85454 43.8002V34.8752C8.84148 34.2912 8.99917 33.7162 9.30826 33.2205C9.61735 32.7249 10.0644 32.3303 10.5945 32.0852C15.1548 29.979 20.1215 28.8986 25.1445 28.9202C27.959 28.9169 30.7638 29.2492 33.4995 29.9102V26.8502ZM33.7095 41.1152H42.9195V43.2152H33.7095V41.1152Z"
                  fill="#306BFF"
                />
                <path
                  d="M50.255 32.205H42.5V35.205H48.755V47.76H27.5V35.205H36.95V35.835C36.95 36.2328 37.108 36.6144 37.3893 36.8957C37.6706 37.177 38.0522 37.335 38.45 37.335C38.8478 37.335 39.2294 37.177 39.5107 36.8957C39.792 36.6144 39.95 36.2328 39.95 35.835V30C39.95 29.6022 39.792 29.2206 39.5107 28.9393C39.2294 28.658 38.8478 28.5 38.45 28.5C38.0522 28.5 37.6706 28.658 37.3893 28.9393C37.108 29.2206 36.95 29.6022 36.95 30V32.205H26C25.6022 32.205 25.2206 32.363 24.9393 32.6443C24.658 32.9256 24.5 33.3072 24.5 33.705V49.26C24.5 49.6578 24.658 50.0394 24.9393 50.3207C25.2206 50.602 25.6022 50.76 26 50.76H50.255C50.6528 50.76 51.0344 50.602 51.3157 50.3207C51.597 50.0394 51.755 49.6578 51.755 49.26V33.705C51.755 33.3072 51.597 32.9256 51.3157 32.6443C51.0344 32.363 50.6528 32.205 50.255 32.205Z"
                  fill="#306BFF"
                />
              </svg>
            </div>
          </div>
          <h1 className=" selectBOQHeading text-center text-[30px] sm:text-[40px] mt-10 sm:h-14 h-20  text-3xl font-bold">
            Enter your employee ID
          </h1>
          <p className=" text-center text-[#52525B] mb-5  text-lg">
            Write your employee ID here to <br /> login into your team
          </p>

          <div className="w-full flex flex-row justify-between mb-5 gap-2 px-4">
            {employeeId.map((char, index) => (
              <div key={index} className="bg-[#F4F6F8] w-[60px] h-[60px] p-2 flex justify-center items-center">
                <input
                  maxLength={1}
                  value={char}
                  placeholder="_"
                  type="text"
                  ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                  className="w-[15px] bg-[#F4F6F8] placeholder:text-center focus:outline-none h-full"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className=" w-full text-lg font-semibold p-4 text-center text-white rounded-lg bg-gradient-to-r from-[#053BD3] to-[#03EAEA] mt-5"
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
