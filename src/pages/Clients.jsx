/* eslint-disable react/no-unknown-property */
import { RxDotsHorizontal } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { authToken } from "../constant/AuthToken";
import { serverDomain } from "../constant/serverDomain";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Clients() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/project/projectList?page=1&limit=5`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        console.log(res);
        setClients(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full  md:p-10 px-3 py-10 bg-[#F4F6F8] ">
        <div className=" w-full flex flex-row gap-5 my-5 overflow-x-scroll">
          <div className="w-full min-w-[1000px] p-3 bg-[#F4F6F8] rounded-lg">
            <div className="w-full flex flex-row justify-between gap-2 p-5">
              <div className=" w-[25%] text-xs ">Name</div>
              <div className=" w-[25%] text-xs ">Email</div>
              <div className=" w-[18%] text-xs">Phone Number</div>
              <div className=" w-[16%] text-xs">Companty Name</div>
              <div className=" w-[16%] text-xs">Date Added</div>
            </div>

            {clients?.map((client) => (
              <div className="w-full flex flex-row justify-between my-2 gap-2 bg-white p-3 rounded-xl">
                <div className=" w-[25%] text-xs  flex flex-row items-center gap-2">
                 <div className="w-[35px] h-[35px] bg-[#D9D9D9] rounded-full flex items-center justify-center uppercase text-white">
                  {client?.clientName[0] + client?.clientName[1]} 
                 </div>
                  <p className=" text-sm text-[#06152B]">
                    {client?.clientName}
                  </p>
                </div>
                <div className=" w-[25%] text-xs flexitems-center">
                  {client.email}
                </div>
                <div className=" w-[18%] text-xs flexitems-center">
                  {client.phoneNumber}
                </div>
                <div className=" w-[16%] text-xs flexitems-center">
                  {client.companyName}
                </div>
                <div className=" w-[16%] text-xs flex flex-row justify-between items-center">
                  {client.date.split("-").join("/")}
                  <RxDotsHorizontal className=" text-lg opacity-[0.3]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
