/* eslint-disable react/no-unknown-property */
import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverDomain } from "../constant/serverDomain";
import { useEffect, useState } from "react";
import { authToken } from "../constant/AuthToken";

export default function Teams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const designTeam = teams?.filter((team) => team.roleInCompany === "DESIGNER");
  const projectTeam = teams?.filter((team) => team.roleInCompany === "PROJECT");

  const seniorTeam = teams?.filter((team) => team.roleInCompany === "SENIOR");
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${serverDomain}/employee/list?page=1&limit=10`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        console.log(res);
        setTeams(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="lg:ms-[18%] lg:w-[82%] mt-14 w-full  md:p-10 px-2 !py-0 bg-[#F4F6F8] ">
        <div className="w-full flex flex-row items-center p-3 rounded-xl  justify-end gap-5">
          <div className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg ">
            <button
              onClick={() =>
                navigate("/add-team", { state: { isSenior: true } })
              }
              className=" w-[150px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 "
            >
              <AiOutlinePlus className="text-white text-lg" />
              <span className=" text-sm">Add Senior</span>
            </button>
          </div>
          <div className="  justify-center bg-gradient-to-r from-[#053BD3] to-[#03EAEA] p-[1px] rounded-lg">
            <button
              onClick={() => navigate("/add-team")}
              className=" w-[150px] items-center justify-center p-2  px-5 h-[38px] flex  font-medium rounded-lg text-white  flex-row gap-1 "
            >
              <AiOutlinePlus className="text-white text-lg" />
              <span className=" text-sm">Add Team</span>
            </button>
          </div>
        </div>

        <div className=" w-full bg-white py-4 ms:px-8 px-2 rounded-xl">
          <h2 className=" text-[#306BFF] underline text-xl font-medium">
            Project Name
          </h2>

          <div className="w-full flex flex-row lg:flex-nowrap flex-wrap gap-5 my-5">
            <div className=" overflow-x-scroll lg:w-full">
              <div className="lg:w-full min-w-[400px] md:p-3 p-2 bg-[#F4F6F8] rounded-lg">
                <div className="w-full flex flex-row justify-between">
                  <h4 className="text-[#06152B] font-medium">Design Team</h4>
                  <AiOutlinePlus onClick={() => navigate("/add-team")} className="text-[#053BD3] text-lg font-bold cursor-pointer" />
                </div>
                <div className="w-full flex flex-row justify-between gap-2 p-5">
                  <div className=" w-[55%] text-xs ">Name</div>
                  <div className=" w-[45%] text-xs">Employee ID & Passcode</div>
                </div>

                {designTeam?.map((team) => (
                  <div
                    key={team?.id}
                    className="w-full flex flex-row justify-between my-2 gap-2 bg-white p-3 rounded-xl"
                  >
                    <div className=" w-[55%] text-xs  flex flex-row items-center gap-2">
                      {/* <img
                        src="/assets/images/teammember1.png"
                        className="rounded-full w-[35px] h-[35px] bg-cover bg-rose-200"
                      /> */}
                      <div className=" w-[35px] h-[35px] bg-cover bg-[#D9D9D9] rounded-full flex items-center justify-center text-white text-xs uppercase">
                        {team?.name[0] + team?.name[1]}
                      </div>
                      <p className=" text-sm">{team?.name}</p>
                    </div>
                    <div className=" w-[45%] text-xs flex flex-row justify-between items-center">
                      {team?.employeeId}
                      <RxDotsHorizontal className=" text-lg opacity-[0.3]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" overflow-x-scroll w-full">
              <div className="lg:w-full min-w-[400px] md:p-3 p-2 bg-[#F4F6F8] rounded-lg">
                <div className="w-full flex flex-row justify-between">
                  <h4 className="text-[#06152B] font-medium">Project Team</h4>
                  <AiOutlinePlus onClick={() => navigate("/add-team")} className="text-[#053BD3] text-lg font-bold cursor-pointer" />
                </div>
                <div className="w-full flex flex-row justify-between gap-2 p-5">
                  <div className=" w-[55%] text-xs ">Name</div>
                  <div className=" w-[45%] text-xs">Employee ID & Passcode</div>
                </div>

                {projectTeam?.map((team) => (
                  <div className="w-full flex flex-row justify-between my-2 gap-2 bg-white p-3 rounded-xl">
                    <div className=" w-[55%] text-xs  flex flex-row items-center gap-2">
                      <div className=" w-[35px] h-[35px] bg-cover bg-[#D9D9D9] rounded-full flex items-center justify-center text-white text-xs uppercase">
                        {team?.name[0] + team?.name[1]}
                      </div>
                      <p className=" text-sm">{team?.name}</p>
                    </div>
                    <div className=" w-[45%] text-xs flex flex-row justify-between items-center">
                      {team?.employeeId}
                      <RxDotsHorizontal className=" text-lg opacity-[0.3]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ms-[18%] lg:w-[82%] w-full  md:p-10 px-2 py-10 bg-[#F4F6F8] ">
        <div className="w-full lg:w-[50%]">
          <div className=" w-full bg-white py-4 ms:px-8 px-2 rounded-xl">
            <h2 className=" text-[#306BFF] underline text-xl font-medium">
              Senior
            </h2>

            <div className="w-full flex flex-row lg:flex-nowrap flex-wrap gap-5 my-5">
              <div className=" overflow-x-scroll lg:w-full">
                <div className="lg:w-full min-w-[400px] md:p-3 p-2 bg-[#F4F6F8] rounded-lg">
                  <div className="w-full flex flex-row justify-between">
                    <h4 className="text-[#06152B] font-medium">Senior Lists</h4>
                    <AiOutlinePlus onClick={() =>
                      navigate("/add-team", { state: { isSenior: true } })
                    } className="text-[#053BD3] text-lg font-bold cursor-pointer" />
                  </div>
                  <div className="w-full flex flex-row justify-between gap-2 p-5">
                    <div className=" w-[55%] text-xs ">Name</div>
                    <div className=" w-[45%] text-xs">Employee ID & Passcode</div>
                  </div>

                  {seniorTeam?.map((team) => (
                    <div
                      key={team?.id}
                      className="w-full flex flex-row justify-between my-2 gap-2 bg-white p-3 rounded-xl"
                    >
                      <div className=" w-[55%] text-xs  flex flex-row items-center gap-2">
                        {/* <img
                        src="/assets/images/teammember1.png"
                        className="rounded-full w-[35px] h-[35px] bg-cover bg-rose-200"
                      /> */}
                        <div className=" w-[35px] h-[35px] bg-cover bg-[#D9D9D9] rounded-full flex items-center justify-center text-white text-xs uppercase">
                          {team?.name[0] + team?.name[1]}
                        </div>
                        <p className=" text-sm">{team?.name}</p>
                      </div>
                      <div className=" w-[45%] text-xs flex flex-row justify-between items-center">
                        {team?.employeeId}
                        <RxDotsHorizontal className=" text-lg opacity-[0.3]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
