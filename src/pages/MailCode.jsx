/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";


export default function MailCode() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-center items-center  min-h-[100vh]  p-10 bg-[#F4F6F8] ">
        <div className=" sm:w-[650px] w-[400px] bg-white py-6 sm:px-10 px-4 rounded-xl">
          <div className=" w-full flex justify-center items-center">
            <div className=" w-[110px] h-[110px] rounded bg-white flex justify-center items-center iconBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="64"
                viewBox="0 0 65 64"
                fill="none"
              >
                <path
                  d="M32.5002 1.70654L22.4468 7.99988H13.8335V13.3332L8.42016 16.7732C6.8735 17.7065 5.8335 19.3865 5.8335 21.3332V47.9999C5.8335 50.9599 8.2335 53.3332 11.1668 53.3332H53.8335C56.7935 53.3332 59.1668 50.9599 59.1668 47.9999V21.3332C59.1668 19.3865 58.1268 17.7065 56.5802 16.7732L51.1668 13.3332V7.99988H42.5535M19.1668 13.3332H45.8335V26.3465L32.5002 34.6665L19.1668 26.3465M21.8335 15.9999V19.9999H43.1668V15.9999M13.8335 19.6799V23.0132L11.1668 21.3332M51.1668 19.6799L53.8335 21.3332L51.1668 23.0132M21.8335 22.6665V26.6665H43.1668V22.6665H21.8335Z"
                  fill="url(#paint0_linear_1_1723)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1_1723"
                    x1="5.8335"
                    y1="27.5199"
                    x2="59.1668"
                    y2="27.5199"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#053BD3" />
                    <stop offset="1" stop-color="#03EAEA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className=" selectBOQHeading text-center sm:text-[40px] text-[30px] mt-10 sm:h-14 h-20  text-3xl font-bold">
            Check your mail
          </h1>
          <p className=" text-center text-[#52525B] mb-5 text-lg">
            We have sent an OTP to login to <br /> your email
          </p>

          <div className=" mx-auto flex flex-row mb-5 justify-between gap-1 w-[60%] my-5">
            <div className=" bg-[#F4F6F8] w-[60px] h-[60px] p-2 flex justify-center items-center">
              <input
                maxLength={1}
                placeholder="_"
                type="text"
                className=" w-[15px] bg-[#F4F6F8] placeholder:text-center focus:outline-none  h-full"
              />
            </div>
            <div className=" bg-[#F4F6F8] w-[60px] h-[60px] p-2 flex justify-center items-center">
              <input
                maxLength={1}
                placeholder="_"
                type="text"
                className=" w-[15px] bg-[#F4F6F8] placeholder:text-center focus:outline-none  h-full"
              />
            </div>
            <div className=" bg-[#F4F6F8] w-[60px] h-[60px] p-2 flex justify-center items-center">
              <input
                maxLength={1}
                placeholder="_"
                type="text"
                className=" w-[15px] bg-[#F4F6F8] placeholder:text-center focus:outline-none  h-full"
              />
            </div>
            <div className=" bg-[#F4F6F8] w-[60px] h-[60px] p-2 flex justify-center items-center">
              <input
                maxLength={1}
                placeholder="_"
                type="text"
                className=" w-[15px] bg-[#F4F6F8] placeholder:text-center focus:outline-none  h-full"
              />
            </div>
          </div>
          <div className=" mx-auto flex flex-row justify-end gap-1 w-[60%] ">
            00:24
          </div>
          <h1 className=" text-2xl font-bold text-center mt-8 mb-4">
            Resend OTP
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className=" w-full text-lg font-semibold p-4 text-center text-white rounded-lg bg-gradient-to-r from-[#053BD3] to-[#03EAEA] mt-5"
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
