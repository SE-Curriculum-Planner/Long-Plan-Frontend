import useGlobalStore from "common/contexts/StoreContext";
import React, { useState } from "react";
import { User } from "types";

interface Props {
  user: User;
}

const GeneralData = ({ user }: Props) => {
  return (
    <div
      className="rounded-2xl py-8 px-36"
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
    >
      <div className="bg-[#ECEEFA] rounded-t-2xl ">
        <div className="flex flex-row items-center">
          <img
            src="/imgs/ProfilePics.png"
            width="150px"
            className="my-5 mx-16 rounded-full border-2 border-gray-300"
          />
          <div>
            <h1 className="text-xl font-medium mb-4 text-[#4351CC]">
              {user.prename} {user.first_name} {user.last_name}
            </h1>
            <h1 className="text-xl font-medium mb-4 text-[#4351CC]">
              {user.student_id}
            </h1>
            <h4 className="px-4 text-base font-normal mb-3 bg-[#6974D6] rounded-lg text-white">
              {user.organization_name}
            </h4>
          </div>
        </div>
      </div>
      <div
        style={{ border: "2px solid #ECEEFA", borderTop: "0" }}
        className="text-black border-2 border-[#6974D6]-current border-t-transparent rounded-b-2xl font-normal"
      >
        <table className="table-fixed w-1/0.5 ms-36  ">
          <tbody>
            <tr>
              <td className="text-right ">
                <span className="text-[#4351CC]">ระดับการศึกษา : </span>
              </td>
              <td>ปริญญาตรี</td>
            </tr>
            <tr>
              <td className="text-right">
                <span className="text-[#4351CC]">สาขา (comming soon) : </span>
              </td>
              {/* <td className=" pt-2">{user.major}</td> */}
            </tr>
            <tr>
              <td className="text-right">
                <span className="text-[#4351CC]">
                  หลักสูตร (manual input) :{" "}
                </span>
              </td>
              {/* <td className=" pt-2">{user.program}</td> */}
            </tr>
            <tr>
              <td className="text-right">
                <span className="text-[#4351CC]">
                  อาจารย์ที่ปรึกษา (comming soon) :{" "}
                </span>
              </td>
              {/* <td className=" pt-2">{user.advisor}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EnrollData = () => {
  return (
    <div className="rounded-2xl bg-white  mx-36 py-20 px-36">
      <h2 className="text-collection-1-black-shade-bl2 text-xl text-center">
        Coming Soon
      </h2>
    </div>
  );
};

const UserPage: React.FC = () => {
  const { userData } = useGlobalStore();
  const [activeTab, setActiveTab] = useState("generalData");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    // <div>test</div>
    <div
      className="h-full flex flex-col w-screen items-center"
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
    >
      <div className="w-full max-w-5xl mt-16">
        <div className="flex bg-[#ECEEFA] rounded-t-2xl w-full shadow-2xl">
          <div
            className={`${
              activeTab === "generalData" ? "bg-white" : ""
            } rounded-t-2xl shadow-none w-full`}
            onClick={() => handleClick("generalData")}
          >
            <p className="flex justify-center">
              <a
                href="#generalData"
                className="flex items-center px-4 text-[#4351CC] text-xl font-medium"
              >
                ข้อมูลทั่วไป
              </a>
            </p>
          </div>
          <div
            className={`${
              activeTab === "enrollData" ? "bg-white" : ""
            } rounded-t-2xl shadow-none w-full`}
            onClick={() => handleClick("enrollData")}
          >
            <p className="flex justify-center">
              <a
                href="#enrollData"
                className="flex items-center px-4 text-[#4351CC] text-xl font-medium"
              >
                ข้อมูลวิชาที่ลงทะเบียนเรียน
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-b-2xl shadow-lg w-full">
          {userData &&
            (activeTab === "generalData" ? (
              <GeneralData user={userData} />
            ) : (
              <EnrollData />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
